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
// Načtení dat z multipart/form-data
// ======================================================

$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

if (stripos($contentType, "multipart/form-data") !== 0) {
    http_response_code(415);
    echo json_encode([
        "success" => false,
        "message" => "Formulář musí být odeslán jako multipart/form-data."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$spz = trim($_POST["spz"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$privacyConsent = trim($_POST["privacyConsent"] ?? "");

// Honeypot proti botům.
// Ve frontendu je skryté pole name="website".
$website = trim($_POST["website"] ?? "");

if ($website !== "") {
    echo json_encode([
        "success" => true,
        "message" => "Poptávka byla odeslána."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!isConsentAccepted($privacyConsent)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Pro odeslání je nutné souhlasit se zpracováním osobních údajů."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Validace textových polí
// ======================================================

if ($spz === "" || $phone === "" || $email === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Vyplňte prosím SPZ, telefon a e-mail."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($spz) > 20) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "SPZ je příliš dlouhá."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($phone) > 60 || !isValidCzechPhone($phone)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zadaný telefon není platný."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($email) > 180 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zadaný e-mail není platný."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Validace volitelného PDF
// ======================================================

$maxPdfSizeBytes = 8 * 1024 * 1024;
$attachmentPath = null;
$attachmentName = null;
$hasAttachment = false;

$uploadedFileCount = 0;

foreach ($_FILES as $file) {
    if (is_array($file["error"] ?? null)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Je povolen pouze jeden PDF soubor."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (($file["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $uploadedFileCount++;
    }
}

if ($uploadedFileCount > 1) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Je povolen pouze jeden PDF soubor."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($uploadedFileCount === 1 && !isset($_FILES["insurancePdf"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Soubor musí být odeslán v poli insurancePdf."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_FILES["insurancePdf"]) && $_FILES["insurancePdf"]["error"] !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES["insurancePdf"];

    if ($file["error"] === UPLOAD_ERR_INI_SIZE || $file["error"] === UPLOAD_ERR_FORM_SIZE) {
        http_response_code(413);
        echo json_encode([
            "success" => false,
            "message" => "PDF může mít maximálně 8 MB."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($file["error"] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "PDF se nepodařilo nahrát."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $attachmentPath = $file["tmp_name"] ?? "";
    $attachmentSize = (int)($file["size"] ?? 0);

    if ($attachmentSize <= 0 || $attachmentSize > $maxPdfSizeBytes) {
        http_response_code(413);
        echo json_encode([
            "success" => false,
            "message" => "PDF může mít maximálně 8 MB."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($attachmentPath === "" || !is_uploaded_file($attachmentPath)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Soubor nebyl nahrán platným HTTP uploadem."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $fileInfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $fileInfo->file($attachmentPath);

    if ($mimeType !== "application/pdf") {
        http_response_code(415);
        echo json_encode([
            "success" => false,
            "message" => "Příloha musí být PDF."
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $hasAttachment = true;
    $attachmentName = buildAttachmentFilename($spz);
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
    error_log("Car insurance endpoint: missing SMTP password.");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Poptávku se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ======================================================
// Odeslání přes PHPMailer
// ======================================================

$mail = new PHPMailer(true);

try {
    $safeSpz = sanitizeTextForEmail($spz);
    $safePhone = sanitizeTextForEmail($phone);
    $safeEmail = sanitizeTextForEmail($email);
    $attachmentLabel = $hasAttachment ? $attachmentName : "Nepřiloženo";

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

    $mail->Subject = "Nová poptávka autopojištění - " . $safeSpz;

    $plainBody = "Nová poptávka autopojištění\n\n";
    $plainBody .= "SPZ: {$safeSpz}\n";
    $plainBody .= "Telefon: {$safePhone}\n";
    $plainBody .= "E-mail: {$safeEmail}\n";
    $plainBody .= "Souhlas se zpracováním osobních údajů: Ano\n";
    $plainBody .= "PDF přiloženo: " . ($hasAttachment ? "Ano" : "Ne") . "\n";
    $plainBody .= "Název přílohy: {$attachmentLabel}\n";

    $htmlBody = "
        <h2>Nová poptávka autopojištění</h2>
        <p><strong>SPZ:</strong> " . htmlspecialchars($safeSpz, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Telefon:</strong> " . htmlspecialchars($safePhone, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>E-mail:</strong> " . htmlspecialchars($safeEmail, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>PDF přiloženo:</strong> " . ($hasAttachment ? "Ano" : "Ne") . "</p>
        <p><strong>Název přílohy:</strong> " . htmlspecialchars($attachmentLabel, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Souhlas se zpracováním osobních údajů:</strong> Ano</p>
    ";

    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;

    if ($hasAttachment) {
        $mail->addAttachment(
            $attachmentPath,
            $attachmentName,
            PHPMailer::ENCODING_BASE64,
            "application/pdf"
        );
    }

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Poptávka autopojištění byla úspěšně odeslána."
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    error_log("Car insurance PHPMailer error: " . $mail->ErrorInfo . " | " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Poptávku se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    error_log("Car insurance endpoint error: " . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Poptávku se nepodařilo odeslat."
    ], JSON_UNESCAPED_UNICODE);
}

function isValidCzechPhone(string $phone): bool
{
    $normalizedPhone = preg_replace("/[\s.\-()]+/", "", $phone) ?? "";

    return preg_match("/^(?:\+?420)?[1-9][0-9]{8}$/", $normalizedPhone) === 1;
}

function isConsentAccepted(string $value): bool
{
    return in_array(strtolower(trim($value)), ["true", "1", "on", "ano"], true);
}

function sanitizeTextForEmail(string $value): string
{
    return trim(str_replace(["\r", "\n"], " ", $value));
}

function buildAttachmentFilename(string $spz): string
{
    $safeSpz = strtoupper(trim($spz));
    $safeSpz = preg_replace("/[^A-Z0-9]+/", "-", $safeSpz) ?? "";
    $safeSpz = trim($safeSpz, "-");

    if ($safeSpz === "") {
        $safeSpz = "VOZIDLO";
    }

    return "autopojisteni-" . $safeSpz . ".pdf";
}
