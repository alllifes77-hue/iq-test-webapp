<?php
// Session-based rate limiter
session_start();
$now = time();
if (!isset($_SESSION['ai_msgs']) || ($now - ($_SESSION['ai_ts'] ?? 0)) > 3600) {
    $_SESSION['ai_msgs'] = 0;
    $_SESSION['ai_ts'] = $now;
}
if ($_SESSION['ai_msgs'] >= 20) {
    http_response_code(429);
    echo json_encode(['error' => 'rate_limit']);
    exit();
}
$_SESSION['ai_msgs']++;

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://all-lifes.com', 'http://localhost', 'http://127.0.0.1'];
if (in_array($origin, $allowed)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'method_not_allowed']));
}

// ── API Key ──
define('OPENROUTER_KEY', 'REPLACE_WITH_YOUR_OPENROUTER_KEY');
define('AI_MODEL', 'google/gemma-3-12b-it:free');

// Parse input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'invalid_input']));
}

// Limit history to last 12 messages to keep cost low
$messages = array_slice($input['messages'], -12);

// Validate messages structure
foreach ($messages as $m) {
    if (!isset($m['role'], $m['content'])) {
        http_response_code(400);
        exit(json_encode(['error' => 'invalid_messages']));
    }
}

$payload = json_encode([
    'model' => AI_MODEL,
    'messages' => $messages,
    'max_tokens' => 1400,
    'temperature' => 0.72,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . OPENROUTER_KEY,
        'Content-Type: application/json',
        'HTTP-Referer: https://all-lifes.com/iq-test/',
        'X-Title: IQ & Neurodiversity AI Advisor',
    ],
]);

$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($err) {
    http_response_code(500);
    exit(json_encode(['error' => 'connection_error']));
}

$data = json_decode($resp, true);
if ($code === 200 && isset($data['choices'][0]['message']['content'])) {
    echo json_encode(['content' => $data['choices'][0]['message']['content']], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code($code ?: 500);
    echo json_encode(['error' => 'api_error', 'code' => $code]);
}
