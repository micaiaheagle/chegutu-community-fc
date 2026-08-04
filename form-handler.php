<?php
/**
 * Chegutu Community Football Club — website form handler
 * ---------------------------------------------------------------------------
 * Receives every form on the site (contact, registration, membership, tickets,
 * donations, partnerships, careers, shop and newsletter) and emails it to the
 * club. Works on standard cPanel hosting with PHP mail() enabled.
 *
 * SETUP — change these two lines and nothing else:
 */
$CLUB_EMAIL = 'admin@ccfc-zw.com';   // where enquiries are delivered
$FROM_EMAIL = 'admin@ccfc-zw.com'; // must be a real mailbox on YOUR domain

/**
 * Optional: send safeguarding and commercial enquiries to their own inbox.
 * Leave blank to send everything to $CLUB_EMAIL.
 */
$ROUTES = [
    'Safeguarding'              => '',   // e.g. 'admin@ccfc-zw.com'
    'Commercial & partnerships' => '',   // e.g. 'admin@ccfc-zw.com'
    'Media & press'             => '',   // e.g. 'admin@ccfc-zw.com'
];
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'message' => $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('This endpoint only accepts form submissions.', 405);
}

/* ---- simple rate limit: one submission per 20 seconds per visitor -------- */
session_start();
$now = time();
if (isset($_SESSION['ccfc_last']) && ($now - $_SESSION['ccfc_last']) < 20) {
    fail('Please wait a few seconds before sending another message.', 429);
}

/* ---- honeypot: bots fill hidden fields, humans do not ------------------- */
if (!empty($_POST['website']) || !empty($_POST['_gotcha'])) {
    echo json_encode(['ok' => true, 'message' => 'Thank you.']);  // silent success
    exit;
}

$subject_tag = isset($_POST['_subject']) ? trim($_POST['_subject']) : 'Website Enquiry';
$page        = isset($_POST['_page']) ? trim($_POST['_page']) : '';

/* ---- collect and clean every submitted field ---------------------------- */
$lines   = [];
$replyTo = '';
$sender  = '';

foreach ($_POST as $key => $value) {
    if (strpos($key, '_') === 0) { continue; }              // internal fields
    if (is_array($value)) { $value = implode(', ', $value); }

    $label = trim(strip_tags($key));
    $value = trim(strip_tags((string) $value));
    if ($value === '') { continue; }

    // block header-injection attempts in any value
    if (preg_match('/(%0A|%0D|\r|\n|bcc:|cc:|content-type:)/i', $value)) {
        fail('Your message contained characters we cannot accept. Please remove any line breaks from short fields and try again.');
    }

    if ($replyTo === '' && filter_var($value, FILTER_VALIDATE_EMAIL)) { $replyTo = $value; }
    if ($sender === '' && stripos($label, 'name') !== false) { $sender = $value; }

    $lines[] = str_pad($label . ':', 26) . $value;
}

if (!count($lines)) { fail('The form was empty. Please complete it and try again.'); }
if (count($lines) > 60) { fail('That submission was too large. Please shorten it and try again.'); }

/* ---- route to the right inbox ------------------------------------------ */
$to = $CLUB_EMAIL;
$dept = isset($_POST['Department']) ? trim($_POST['Department']) : '';
if ($dept !== '' && isset($ROUTES[$dept]) && $ROUTES[$dept] !== '') {
    $to = $ROUTES[$dept];
}

/* ---- build the email --------------------------------------------------- */
$subject = 'CCFC Website — ' . $subject_tag;

$body  = "A new submission has been received from the Chegutu Community FC website.\r\n";
$body .= str_repeat('=', 62) . "\r\n";
$body .= "Form:      " . $subject_tag . "\r\n";
$body .= "Received:  " . date('D, d M Y H:i:s') . "\r\n";
if ($page !== '') { $body .= "Page:      " . $page . "\r\n"; }
$body .= "IP:        " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown') . "\r\n";
$body .= str_repeat('=', 62) . "\r\n\r\n";
$body .= implode("\r\n", $lines) . "\r\n\r\n";
$body .= str_repeat('-', 62) . "\r\n";
$body .= "Reply directly to this email to respond to the sender.\r\n";
$body .= "Chegutu Community Football Club — Developing Talent, Building Character, Inspiring Communities\r\n";

$headers  = 'From: Chegutu Community FC Website <' . $FROM_EMAIL . '>' . "\r\n";
$headers .= 'Reply-To: ' . ($replyTo !== '' ? $replyTo : $FROM_EMAIL) . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";

$sent = @mail($to, $subject, $body, $headers, '-f' . $FROM_EMAIL);

/* ---- keep a local copy so nothing is ever lost -------------------------- */
$logDir = __DIR__ . '/form-submissions';
if (!is_dir($logDir)) { @mkdir($logDir, 0750, true); }
if (is_dir($logDir)) {
    @file_put_contents($logDir . '/.htaccess', "Require all denied\nDeny from all\n");
    @file_put_contents(
        $logDir . '/' . date('Y-m') . '.log',
        "\n\n===== " . date('Y-m-d H:i:s') . " | " . $subject_tag . " | mail=" . ($sent ? 'sent' : 'FAILED') . " =====\n" . implode("\n", $lines) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

$_SESSION['ccfc_last'] = $now;

if ($sent) {
    echo json_encode([
        'ok' => true,
        'message' => 'Thank you' . ($sender !== '' ? ', ' . htmlspecialchars($sender, ENT_QUOTES, 'UTF-8') : '') .
                     ' — your message has been received. A member of the club will be in touch shortly.'
    ]);
} else {
    // mail() disabled or misconfigured — tell the browser to offer the email fallback
    fail('We could not send your message automatically. Please email admin@ccfc-zw.com or call +263 784 658 667.', 500);
}
