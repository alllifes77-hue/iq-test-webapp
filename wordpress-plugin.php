<?php
/**
 * Plugin Name: 무료 IQ 테스트
 * Plugin URI: https://jeybeeicon.com
 * Description: 레이븐 행렬 & CHC 이론 기반 과학적 IQ 테스트 웹앱을 WordPress에 임베드합니다. [iq_test] 단축코드로 사용하세요.
 * Version: 1.0.0
 * Author: JeybeeIcon
 * Author URI: https://jeybeeicon.com
 * License: GPL v2 or later
 * Text Domain: iq-test
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'IQ_TEST_VERSION', '1.0.0' );
define( 'IQ_TEST_DIR', plugin_dir_path( __FILE__ ) );
define( 'IQ_TEST_URL', plugin_dir_url( __FILE__ ) );

/**
 * 플러그인 활성화 시 에셋 폴더 확인
 */
function iq_test_activate() {
    // 에셋이 플러그인 폴더에 있어야 함
}
register_activation_hook( __FILE__, 'iq_test_activate' );

/**
 * CSS / JS 에셋 등록 (단축코드가 있는 페이지에서만 로드)
 */
function iq_test_enqueue_assets() {
    // Chart.js CDN
    wp_register_script(
        'chartjs',
        'https://cdn.jsdelivr.net/npm/chart.js',
        [],
        '4.4.0',
        true
    );

    // 카카오 SDK (앱키 등록 후 사용)
    wp_register_script(
        'kakao-sdk',
        'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js',
        [],
        '2.7.2',
        true
    );

    // IQ 테스트 데이터
    wp_register_script(
        'iq-test-data',
        IQ_TEST_URL . 'iq-data.js',
        [],
        IQ_TEST_VERSION,
        true
    );

    // IQ 테스트 앱 엔진
    wp_register_script(
        'iq-test-app',
        IQ_TEST_URL . 'iq-app.js',
        [ 'chartjs', 'kakao-sdk', 'iq-test-data' ],
        IQ_TEST_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'iq_test_enqueue_assets' );

/**
 * [iq_test] 단축코드 핸들러
 *
 * 사용법:
 *   [iq_test]                    ← 기본 (전체 높이 자동)
 *   [iq_test height="900px"]     ← 높이 지정 (iframe 모드 시 유용)
 *   [iq_test mode="inline"]      ← 인라인 임베드 (기본, 권장)
 *   [iq_test mode="iframe"]      ← iframe 임베드
 *   [iq_test iframe_src="https://your-subdomain.com/iq-test/"]  ← iframe 주소 지정
 */
function iq_test_shortcode( $atts ) {
    $atts = shortcode_atts( [
        'mode'       => 'inline',
        'height'     => 'auto',
        'iframe_src' => '',
    ], $atts, 'iq_test' );

    // ── iframe 모드 ──────────────────────────────────────────────
    if ( $atts['mode'] === 'iframe' ) {
        $src = esc_url( $atts['iframe_src'] );
        if ( empty( $src ) ) {
            return '<p style="color:red;">⚠️ iframe 모드에서는 <code>iframe_src</code> 속성에 URL을 지정해주세요.</p>';
        }
        $height = esc_attr( $atts['height'] === 'auto' ? '900px' : $atts['height'] );
        return sprintf(
            '<iframe src="%s" width="100%%" height="%s" frameborder="0" scrolling="auto" style="border:none;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,.1);"></iframe>',
            $src,
            $height
        );
    }

    // ── 인라인 모드 ─────────────────────────────────────────────
    // 에셋 로드
    wp_enqueue_script( 'chartjs' );
    wp_enqueue_script( 'kakao-sdk' );
    wp_enqueue_script( 'iq-test-data' );
    wp_enqueue_script( 'iq-test-app' );

    // 인라인 HTML (index.html의 <body> 내용을 그대로 사용)
    // WordPress 테마 충돌을 피하기 위해 Shadow DOM이 아닌 네임스페이스 래퍼로 감쌈
    ob_start();
    $html_file = IQ_TEST_DIR . 'index.html';
    if ( ! file_exists( $html_file ) ) {
        return '<p style="color:red;">⚠️ <code>index.html</code> 파일을 플러그인 폴더에 복사해주세요.</p>';
    }

    // index.html에서 <body>...</body> 사이 내용만 추출
    $html    = file_get_contents( $html_file );
    $body    = preg_replace( '/^.*?<body[^>]*>/si', '', $html );
    $body    = preg_replace( '/<\/body>.*$/si', '', $body );

    // <style> 블록을 <head>가 아닌 인라인으로 이동 (WordPress 방식)
    // CSS는 이미 index.html의 <head>에 있으므로 별도 추출 불필요
    // (인라인 모드에서는 CSS가 로드되지 않으므로 스타일 태그를 추출해서 출력)
    $css_match = [];
    preg_match( '/<style>(.*?)<\/style>/si', $html, $css_match );
    $inline_css = isset( $css_match[1] ) ? '<style>' . $css_match[1] . '</style>' : '';

    echo $inline_css;
    echo '<div id="iq-test-wp-wrapper">';
    echo $body;
    echo '</div>';

    return ob_get_clean();
}
add_shortcode( 'iq_test', 'iq_test_shortcode' );

/**
 * 관리자 설정 페이지
 */
function iq_test_admin_menu() {
    add_options_page(
        'IQ 테스트 설정',
        'IQ 테스트',
        'manage_options',
        'iq-test-settings',
        'iq_test_settings_page'
    );
}
add_action( 'admin_menu', 'iq_test_admin_menu' );

function iq_test_settings_page() {
    if ( isset( $_POST['iq_test_save'] ) ) {
        check_admin_referer( 'iq_test_settings' );
        update_option( 'iq_test_kakao_key', sanitize_text_field( $_POST['kakao_key'] ) );
        echo '<div class="notice notice-success"><p>설정이 저장되었습니다.</p></div>';
    }
    $kakao_key = get_option( 'iq_test_kakao_key', '' );
    ?>
    <div class="wrap">
        <h1>🧠 IQ 테스트 설정</h1>
        <form method="post">
            <?php wp_nonce_field( 'iq_test_settings' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="kakao_key">카카오 JavaScript 앱키</label></th>
                    <td>
                        <input type="text" id="kakao_key" name="kakao_key"
                               value="<?php echo esc_attr( $kakao_key ); ?>"
                               class="regular-text"
                               placeholder="YOUR_KAKAO_JS_KEY">
                        <p class="description">
                            <a href="https://developers.kakao.com" target="_blank">developers.kakao.com</a>에서
                            앱 등록 후 JavaScript 키를 발급받아 입력하세요.<br>
                            비워두면 카카오 공유 대신 텍스트 복사로 대체됩니다.
                        </p>
                    </td>
                </tr>
            </table>
            <h2>사용 방법</h2>
            <ol style="line-height:2;">
                <li>원하는 WordPress 페이지/포스트 편집기를 엽니다.</li>
                <li>단축코드 블록을 추가하고 <code>[iq_test]</code>를 입력합니다.</li>
                <li>페이지를 공개하면 IQ 테스트가 인라인으로 표시됩니다.</li>
            </ol>
            <h3>단축코드 옵션</h3>
            <table class="widefat" style="max-width:600px;">
                <thead><tr><th>속성</th><th>기본값</th><th>설명</th></tr></thead>
                <tbody>
                    <tr><td><code>mode</code></td><td>inline</td><td>inline 또는 iframe</td></tr>
                    <tr><td><code>height</code></td><td>auto</td><td>높이 지정 (예: 900px) — iframe 모드 시 유용</td></tr>
                    <tr><td><code>iframe_src</code></td><td>없음</td><td>iframe 모드 시 index.html 직접 URL</td></tr>
                </tbody>
            </table>
            <br>
            <?php submit_button( '설정 저장', 'primary', 'iq_test_save' ); ?>
        </form>
    </div>
    <?php
}

/**
 * 카카오 앱키를 JS 변수로 주입 (관리자 설정에서 저장된 값 사용)
 */
function iq_test_inject_kakao_key() {
    $kakao_key = get_option( 'iq_test_kakao_key', '' );
    if ( ! empty( $kakao_key ) ) {
        echo '<script>window.IQ_KAKAO_KEY=' . json_encode( esc_js( $kakao_key ) ) . ';</script>';
    }
}
add_action( 'wp_head', 'iq_test_inject_kakao_key' );
