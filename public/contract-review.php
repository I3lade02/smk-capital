<?php
declare(strict_types=1);

const RECIPIENT_EMAIL = 'info@smkcapital.cz';
const MAX_FILE_COUNT = 10;
const MAX_FILE_SIZE = 8388608;
const MAX_TOTAL_FILE_SIZE = 31457280;

$allowedOrigins = [
    'https://smkcapital.cz',
    'https://www.smkcapital.cz',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4175',
    'http://127.0.0.1:4175',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(405, false, 'Endpoint podporuje pouze odeslání formuláře.');
}

$name = clean_text($_POST['name'] ?? '');
$phone = clean_text($_POST['phone'] ?? '');
$email = clean_text($_POST['email'] ?? '');
$note = clean_text($_POST['note'] ?? '');
$website = clean_text($_POST['website'] ?? '');
$serviceSummary = clean_text($_POST['serviceSummary'] ?? '');
$privacyConsent = ($_POST['privacyConsent'] ?? '') === 'true';
$privacyConsentText = clean_text($_POST['privacyConsentText'] ?? '');
$privacyConsentAt = clean_text($_POST['privacyConsentAt'] ?? '');

if ($website !== '') {
    send_json(400, false, 'Formulář se nepodařilo ověřit.');
}

if ($phone === '' || !preg_match('/^(\+420\s?)?(\d[\s.-]?){9}$/', $phone)) {
    send_json(400, false, 'Zadejte prosím platné české telefonní číslo.');
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(400, false, 'Zadejte prosím platný e-mail.');
}

if ($serviceSummary === '') {
    send_json(400, false, 'Vyberte alespoň jednu oblast k revizi.');
}

if (!$privacyConsent) {
    send_json(400, false, 'Pro odeslání je nutné souhlasit se zpracováním osobních údajů.');
}

$attachments = normalize_attachments($_FILES['contracts'] ?? null);
if (count($attachments) === 0) {
    send_json(400, false, 'Nahrajte prosím alespoň jednu smlouvu nebo fotografii.');
}

if (count($attachments) > MAX_FILE_COUNT) {
    send_json(400, false, 'Nahrajte prosím maximálně ' . MAX_FILE_COUNT . ' souborů.');
}

$totalSize = 0;
foreach ($attachments as $attachment) {
    if ($attachment['error'] !== UPLOAD_ERR_OK) {
        send_json(400, false, upload_error_message((int) $attachment['error']));
    }

    $totalSize += (int) $attachment['size'];

    if ((int) $attachment['size'] > MAX_FILE_SIZE) {
        send_json(413, false, 'Jeden soubor může mít maximálně 8 MB.');
    }

    if (!is_allowed_attachment($attachment)) {
        send_json(415, false, 'Přílohy mohou být pouze PDF nebo obrázky JPG, PNG, WEBP či HEIC.');
    }
}

if ($totalSize > MAX_TOTAL_FILE_SIZE) {
    send_json(413, false, 'Soubory mohou mít dohromady maximálně 30 MB.');
}

$subject = 'Bezplatná revize smluv - SMK Capital';
$lines = [
    'Nový požadavek na bezplatnou revizi smluv.',
    '',
    'Jméno: ' . ($name !== '' ? $name : 'Neuvedeno'),
    'Telefon: ' . $phone,
    'E-mail: ' . $email,
    'Oblasti k revizi: ' . $serviceSummary,
    'Počet příloh: ' . count($attachments),
    'Velikost příloh celkem: ' . format_bytes($totalSize),
    '',
    'Poznámka:',
    $note !== '' ? $note : 'Bez poznámky.',
    '',
    'Souhlas: ' . ($privacyConsentText !== '' ? $privacyConsentText : 'Souhlas udělen.'),
    'Souhlas udělen v: ' . ($privacyConsentAt !== '' ? $privacyConsentAt : date(DATE_ATOM)),
];

$sent = send_mail_with_attachments(
    RECIPIENT_EMAIL,
    $subject,
    implode("\n", $lines),
    $email,
    $attachments,
);

if (!$sent) {
    send_json(500, false, 'Revizi se nepodařilo odeslat kvůli chybě serveru.');
}

send_json(200, true, 'Požadavek na revizi smluv byl úspěšně odeslán.');

function send_json(int $statusCode, bool $success, string $message): void
{
    http_response_code($statusCode);
    echo json_encode(
        [
            'success' => $success,
            'message' => $message,
        ],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

function clean_text($value): string
{
    $text = is_string($value) ? $value : '';
    $text = str_replace(["\r", "\0"], '', $text);
    return trim($text);
}

function normalize_attachments(?array $files): array
{
    if ($files === null || !isset($files['name'])) {
        return [];
    }

    if (!is_array($files['name'])) {
        return [
            [
                'name' => $files['name'] ?? '',
                'type' => $files['type'] ?? '',
                'tmp_name' => $files['tmp_name'] ?? '',
                'error' => $files['error'] ?? UPLOAD_ERR_NO_FILE,
                'size' => $files['size'] ?? 0,
            ],
        ];
    }

    $normalized = [];
    foreach ($files['name'] as $index => $name) {
        $normalized[] = [
            'name' => $name,
            'type' => $files['type'][$index] ?? '',
            'tmp_name' => $files['tmp_name'][$index] ?? '',
            'error' => $files['error'][$index] ?? UPLOAD_ERR_NO_FILE,
            'size' => $files['size'][$index] ?? 0,
        ];
    }

    return array_values(array_filter($normalized, static function (array $file): bool {
        return (int) $file['error'] !== UPLOAD_ERR_NO_FILE;
    }));
}

function is_allowed_attachment(array $file): bool
{
    $extension = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];

    if (!in_array($extension, $allowedExtensions, true)) {
        return false;
    }

    $mime = detect_mime_type((string) $file['tmp_name']);
    $allowedMimes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
        'application/octet-stream',
    ];

    return in_array($mime, $allowedMimes, true);
}

function detect_mime_type(string $path): string
{
    if (class_exists('finfo')) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($path);
        if (is_string($mime) && $mime !== '') {
            return $mime;
        }
    }

    if (function_exists('mime_content_type')) {
        $mime = mime_content_type($path);
        if (is_string($mime) && $mime !== '') {
            return $mime;
        }
    }

    return 'application/octet-stream';
}

function send_mail_with_attachments(
    string $to,
    string $subject,
    string $message,
    string $replyTo,
    array $attachments
): bool {
    $boundary = 'smk-review-' . bin2hex(random_bytes(12));
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $headers = [
        'From: SMK Capital <' . RECIPIENT_EMAIL . '>',
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    ];

    $body = [];
    $body[] = '--' . $boundary;
    $body[] = 'Content-Type: text/plain; charset=UTF-8';
    $body[] = 'Content-Transfer-Encoding: 8bit';
    $body[] = '';
    $body[] = $message;
    $body[] = '';

    foreach ($attachments as $attachment) {
        $safeName = preg_replace('/[^A-Za-z0-9._-]+/', '_', basename((string) $attachment['name']));
        $mime = detect_mime_type((string) $attachment['tmp_name']);
        $content = chunk_split(base64_encode((string) file_get_contents((string) $attachment['tmp_name'])));

        $body[] = '--' . $boundary;
        $body[] = 'Content-Type: ' . $mime . '; name="' . $safeName . '"';
        $body[] = 'Content-Transfer-Encoding: base64';
        $body[] = 'Content-Disposition: attachment; filename="' . $safeName . '"';
        $body[] = '';
        $body[] = $content;
    }

    $body[] = '--' . $boundary . '--';
    $body[] = '';

    return mail($to, $encodedSubject, implode("\r\n", $body), implode("\r\n", $headers));
}

function upload_error_message(int $error): string
{
    switch ($error) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return 'Příloha je příliš velká.';
        case UPLOAD_ERR_PARTIAL:
            return 'Příloha se nahrála pouze částečně.';
        default:
            return 'Přílohu se nepodařilo nahrát.';
    }
}

function format_bytes(int $bytes): string
{
    if ($bytes < 1048576) {
        return (string) ceil($bytes / 1024) . ' kB';
    }

    return number_format($bytes / 1048576, 1, ',', ' ') . ' MB';
}
