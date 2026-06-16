<?php
// ======================================================
// CORS nastaveni
// ======================================================

$allowedOrigins = [
    "https://i3lade02.github.io",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://smkcapital.cz",
    "https://www.smkcapital.cz",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// ======================================================
// PHPMailer importy
// ======================================================

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/PHPMailer/src/Exception.php";
require __DIR__ . "/PHPMailer/src/PHPMailer.php";
require __DIR__ . "/PHPMailer/src/SMTP.php";

// ======================================================
// Povolená metoda
// ======================================================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Nepovolená metoda."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Načtení JSON dat
// ======================================================

$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

if (stripos($contentType, "application/json") !== 0) {
    http_response_code(415);
    echo json_encode([
        "success" => false,
        "message" => "Formulář musí být odeslán jako application/json."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ((int)($_SERVER["CONTENT_LENGTH"] ?? 0) > 16384) {
    http_response_code(413);
    echo json_encode([
        "success" => false,
        "message" => "Požadavek je příliš velký."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawData = file_get_contents("php://input");

if ($rawData === false || trim($rawData) === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Neplatný formát dat."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($rawData, true);

if (!is_array($data) || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Neplatný formát dat."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Honeypot proti botům.
// Ve frontendu je skryté pole name="website".
$website = getStringValue($data, "website", 120);

if ($website === null) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Formulář obsahuje neplatné údaje."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($website !== "") {
    echo json_encode([
        "success" => true,
        "message" => "Žádost byla odeslána."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Validace
// ======================================================

$loanYears = getIntegerValue($data, "loanYears");
$monthlyIncome = getMoneyValue($data, "monthlyIncome");
$monthlyPayment = getMoneyValue($data, "monthlyPayment");
$otherObligations = getMoneyValue($data, "otherObligations");
$email = getStringValue($data, "email", 180);
$phone = getStringValue($data, "phone", 60);
$privacyConsent = getBooleanConsent($data, "privacyConsent");

if (
    $loanYears === null ||
    $monthlyIncome === null ||
    $monthlyPayment === null ||
    $otherObligations === null ||
    $email === null ||
    $phone === null ||
    $privacyConsent !== true
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Formulář obsahuje neplatné údaje."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($loanYears < 1 || $loanYears > 40) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Doba splatnosti musí být mezi 1 a 40 lety."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($monthlyIncome <= 0 || $monthlyIncome > 10000000) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Měsíční příjmy musí být kladné číslo do 10 000 000 Kč."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($monthlyPayment < 0 || $monthlyPayment > 10000000) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Měsíční splátka musí být nula nebo kladné číslo do 10 000 000 Kč."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($otherObligations < 0 || $otherObligations > 10000000) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Jiné závazky musí být nula nebo kladné číslo do 10 000 000 Kč."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zadaný e-mail není platný."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!isValidCzechPhone($phone)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zadaný telefon není platný."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Konfigurace mailu
// ======================================================

$smtpHost = "mailin.endora.cz";
$smtpPort = 465;

// Heslo neukládej do repozitáře. Nastav ho na serveru jako proměnnou
// SMK_SMTP_PASSWORD nebo ho načti z privátního souboru mimo verzování.
$smtpUsername = "info@smkcapital.cz";
$smtpPassword = getenv("SMK_SMTP_PASSWORD") ?: "";

$privateMailConfig = __DIR__ . "/mail-config.local.php";

if (is_file($privateMailConfig)) {
    $mailConfig = require $privateMailConfig;

    if (is_array($mailConfig)) {
        $smtpHost = $mailConfig["smtpHost"] ?? $smtpHost;
        $smtpPort = (int)($mailConfig["smtpPort"] ?? $smtpPort);
        $smtpUsername = $mailConfig["smtpUsername"] ?? $smtpUsername;
        $smtpPassword = $mailConfig["smtpPassword"] ?? $smtpPassword;
    }
}

$fromEmail = "info@smkcapital.cz";
$fromName = "SMK Capital";

$recipientEmail = "info@smkcapital.cz";
$recipientName = "SMK Capital";

if ($smtpPassword === "") {
    error_log("Mortgage calculation endpoint: missing SMTP password.");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Žádost se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Odeslání přes PHPMailer
// ======================================================

$mail = new PHPMailer(true);

try {
    date_default_timezone_set("Europe/Prague");
    $submittedAt = date("d.m.Y H:i:s");

    $safeEmail = sanitizeTextForEmail($email);
    $safePhone = sanitizeTextForEmail($phone);
    $formattedIncome = formatCzechMoney($monthlyIncome);
    $formattedPayment = formatCzechMoney($monthlyPayment);
    $formattedObligations = formatCzechMoney($otherObligations);

    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;

    $mail->CharSet = "UTF-8";
    $mail->Encoding = "base64";

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($recipientEmail, $recipientName);
    $mail->addReplyTo($email);

    $mail->Subject = "Nová žádost o hypoteční propočet";

    $plainBody = "Nová žádost o hypoteční propočet\n\n";
    $plainBody .= "Doba splatnosti: {$loanYears} let\n";
    $plainBody .= "Měsíční příjmy: {$formattedIncome}\n";
    $plainBody .= "Měsíční splátka: {$formattedPayment}\n";
    $plainBody .= "Jiné měsíční závazky: {$formattedObligations}\n";
    $plainBody .= "E-mail: {$safeEmail}\n";
    $plainBody .= "Telefon: {$safePhone}\n";
    $plainBody .= "Souhlas se zpracováním osobních údajů: Ano\n";
    $plainBody .= "Odesláno: {$submittedAt}\n";

    $htmlBody = "
        <h2>Nová žádost o hypoteční propočet</h2>
        <p><strong>Doba splatnosti:</strong> " . htmlspecialchars((string)$loanYears, ENT_QUOTES, "UTF-8") . " let</p>
        <p><strong>Měsíční příjmy:</strong> " . htmlspecialchars($formattedIncome, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Měsíční splátka:</strong> " . htmlspecialchars($formattedPayment, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Jiné měsíční závazky:</strong> " . htmlspecialchars($formattedObligations, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>E-mail:</strong> " . htmlspecialchars($safeEmail, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Telefon:</strong> " . htmlspecialchars($safePhone, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Souhlas se zpracováním osobních údajů:</strong> Ano</p>
        <p><strong>Odesláno:</strong> " . htmlspecialchars($submittedAt, ENT_QUOTES, "UTF-8") . "</p>
    ";

    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Žádost o hypoteční propočet byla úspěšně odeslána."
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    error_log("Mortgage calculation PHPMailer error: " . $mail->ErrorInfo . " | " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Žádost se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    error_log("Mortgage calculation endpoint error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Žádost se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
}

function getStringValue(array $data, string $key, int $maxLength): ?string
{
    if (!array_key_exists($key, $data) || is_array($data[$key]) || is_object($data[$key])) {
        return null;
    }

    if (!is_string($data[$key]) && !is_numeric($data[$key])) {
        return null;
    }

    $value = trim((string)$data[$key]);

    if (mb_strlen($value) > $maxLength) {
        return null;
    }

    return $value;
}

function getIntegerValue(array $data, string $key): ?int
{
    if (!array_key_exists($key, $data) || is_array($data[$key]) || is_object($data[$key]) || is_bool($data[$key])) {
        return null;
    }

    if (is_int($data[$key])) {
        return $data[$key];
    }

    if (is_float($data[$key])) {
        return floor($data[$key]) === $data[$key] ? (int)$data[$key] : null;
    }

    if (!is_string($data[$key])) {
        return null;
    }

    $value = trim($data[$key]);

    if (!preg_match("/^\d+$/", $value)) {
        return null;
    }

    return (int)$value;
}

function getMoneyValue(array $data, string $key): ?float
{
    if (!array_key_exists($key, $data) || is_array($data[$key]) || is_object($data[$key]) || is_bool($data[$key])) {
        return null;
    }

    if (is_int($data[$key]) || is_float($data[$key])) {
        $value = (float)$data[$key];
        return is_finite($value) ? $value : null;
    }

    if (!is_string($data[$key])) {
        return null;
    }

    $value = trim(str_replace(",", ".", $data[$key]));

    if (!preg_match("/^\d+(\.\d{1,2})?$/", $value)) {
        return null;
    }

    return (float)$value;
}

function isValidCzechPhone(string $phone): bool
{
    $normalizedPhone = preg_replace("/[\s.\-()]+/", "", $phone) ?? "";

    return preg_match("/^(?:\+?420)?[1-9][0-9]{8}$/", $normalizedPhone) === 1;
}

function getBooleanConsent(array $data, string $key): ?bool
{
    if (!array_key_exists($key, $data) || is_array($data[$key]) || is_object($data[$key])) {
        return null;
    }

    if (is_bool($data[$key])) {
        return $data[$key];
    }

    if (!is_string($data[$key]) && !is_numeric($data[$key])) {
        return null;
    }

    return in_array(strtolower(trim((string)$data[$key])), ["true", "1", "on", "ano"], true);
}

function sanitizeTextForEmail(string $value): string
{
    return trim(str_replace(["\r", "\n"], " ", $value));
}

function formatCzechMoney(float $value): string
{
    $decimals = floor($value) === $value ? 0 : 2;

    return number_format($value, $decimals, ",", " ") . " Kč";
}
