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
define('OPENROUTER_KEY', 'ENV_PLACEHOLDER');

// Fallback model list — verified available on OpenRouter free tier (2026-05)
// Ordered: quality-first, then smaller fallbacks
$models = [
    'openai/gpt-oss-120b:free',
    'nvidia/nemotron-3-super-120b-a12b:free',
    'google/gemma-4-31b-it:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemma-4-26b-a4b-it:free',
    'openai/gpt-oss-20b:free',
    'z-ai/glm-4.5-air:free',
    'deepseek/deepseek-v4-flash:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'minimax/minimax-m2.5:free',
];

// Parse input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'invalid_input']));
}

// Limit history to last 12 messages
$messages = array_slice($input['messages'], -12);
foreach ($messages as $m) {
    if (!isset($m['role'], $m['content'])) {
        http_response_code(400);
        exit(json_encode(['error' => 'invalid_messages']));
    }
}

function callOpenRouter(string $model, array $messages): array {
    $payload = json_encode([
        'model'       => $model,
        'messages'    => $messages,
        'max_tokens'  => 1400,
        'temperature' => 0.72,
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 55,
        CURLOPT_HTTPHEADER     => [
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
    return ['code' => $code, 'body' => $resp, 'err' => $err];
}

// Try each model in order
$lastCode = 500;
$rateLimited = 0;
foreach ($models as $model) {
    $result = callOpenRouter($model, $messages);
    if ($result['err']) continue;

    $code = $result['code'];
    $data = json_decode($result['body'], true);

    if ($code === 200 && isset($data['choices'][0]['message']['content'])) {
        echo json_encode(['content' => $data['choices'][0]['message']['content']], JSON_UNESCAPED_UNICODE);
        exit();
    }

    $lastCode = $code;
    if ($code === 429 || $code === 503 || $code === 404) {
        if ($code === 429 || $code === 503) $rateLimited++;
        continue; // try next model (404 = model not found, 429/503 = rate limited)
    }
    // Hard stop on auth/bad-request errors
    if ($code === 401 || $code === 400) break;
}

// All models failed
$isRateLimit = ($rateLimited > 0 && $lastCode === 429) || ($lastCode === 503);
http_response_code($isRateLimit ? 503 : ($lastCode ?: 500));
echo json_encode([
    'error' => $isRateLimit ? 'upstream_busy' : 'api_error',
    'code'  => $lastCode,
]);
