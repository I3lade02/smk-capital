<?php
// ======================================================
// CORS nastavení
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

// Preflight request z prohlížeče
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
    ]);
    exit;
}

// ======================================================
// Načtení dat z requestu
// ======================================================

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Neplatný formát dat."
    ]);
    exit;
}

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$message = trim($data["message"] ?? "");

// Honeypot proti botům.
// Ve frontendu můžeš mít skryté pole name="website".
// Normální uživatel ho nevyplní, bot často ano.
$website = trim($data["website"] ?? "");

if ($website !== "") {
    echo json_encode([
        "success" => true,
        "message" => "Zpráva byla odeslána."
    ]);
    exit;
}

// ======================================================
// Validace
// ======================================================

if ($name === "" || $email === "" || $message === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Vyplňte prosím jméno, e-mail a zprávu."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zadaný e-mail není platný."
    ]);
    exit;
}

if (mb_strlen($name) > 120) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Jméno je příliš dlouhé."
    ]);
    exit;
}

if (mb_strlen($email) > 180) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "E-mail je příliš dlouhý."
    ]);
    exit;
}

if (mb_strlen($phone) > 60) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Telefon je příliš dlouhý."
    ]);
    exit;
}

if (mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Zpráva je příliš dlouhá."
    ]);
    exit;
}

// ======================================================
// Konfigurace mailu
// ======================================================

$smtpHost = "mailin.endora.cz";
$smtpPort = 465;

// TADY UPRAV podle své schránky na Endoře:
$smtpUsername = "info@smkcapital.cz";
$smtpPassword = "L0hxQS5W";

// Odesílatel musí být stejný nebo kompatibilní s SMTP účtem.
$fromEmail = "info@smkcapital.cz";
$fromName = "SMK Capital";

// Kam se má formulář doručit:
$recipientEmail = "info@smkcapital.cz";
$recipientName = "SMK Capital";

// ======================================================
// Odeslání přes PHPMailer
// ======================================================

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;

    $mail->CharSet = "UTF-8";
    $mail->Encoding = "base64";

    // Důležité:
    // From necháváme jako tvoji schránku, ne e-mail návštěvníka.
    $mail->setFrom($fromEmail, $fromName);

    // Příjemce:
    $mail->addAddress($recipientEmail, $recipientName);

    // Když klikneš na odpovědět, odpovíš návštěvníkovi.
    $mail->addReplyTo($email, $name);

    $mail->Subject = "Nová zpráva z kontaktního formuláře";

    $plainBody = "Nová zpráva z webového formuláře\n\n";
    $plainBody .= "Jméno: {$name}\n";
    $plainBody .= "E-mail: {$email}\n";

    if ($phone !== "") {
        $plainBody .= "Telefon: {$phone}\n";
    }

    $plainBody .= "\nZpráva:\n{$message}\n";

    $htmlBody = "
        <h2>Nová zpráva z webového formuláře</h2>
        <p><strong>Jméno:</strong> " . htmlspecialchars($name, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>E-mail:</strong> " . htmlspecialchars($email, ENT_QUOTES, "UTF-8") . "</p>
    ";

    if ($phone !== "") {
        $htmlBody .= "<p><strong>Telefon:</strong> " . htmlspecialchars($phone, ENT_QUOTES, "UTF-8") . "</p>";
    }

    $htmlBody .= "
        <p><strong>Zpráva:</strong></p>
        <p>" . nl2br(htmlspecialchars($message, ENT_QUOTES, "UTF-8")) . "</p>
    ";

    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Zpráva byla úspěšně odeslána."
    ]);
} catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Zprávu se nepodařilo odeslat.",
        "debug" => $mail->ErrorInfo,
        "exception" => $e->getMessage()
    ]);
}