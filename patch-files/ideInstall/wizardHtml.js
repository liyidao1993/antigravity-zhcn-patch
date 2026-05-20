"use strict";
/**
 * IDE Install Wizard — HTML template for the wizard UI.
 *
 * This is a self-contained page with all CSS/JS embedded, rendered inline
 * in a standalone BrowserWindow.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWizardHtml = getWizardHtml;
/**
 * Returns the inline HTML for the IDE install wizard.
 * This is a self-contained page with all CSS/JS embedded.
 */
function getWizardHtml(iconBase64) {
    return `<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
<meta charset="utf-8">\r
<meta name="viewport" content="width=device-width, initial-scale=1">\r
<title>欢迎使用 Antigravity</title>\r
<style>\r
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');\r
\r
  * {\r
    margin: 0;\r
    padding: 0;\r
    box-sizing: border-box;\r
  }\r
\r
  :root {\r
    --bg-primary: #000000;\r
    --bg-secondary: #1A1A1A;\r
    --bg-tertiary: #242424;\r
    --bg-hover: #2A2A2A;\r
    --text-primary: #F5F5F5;\r
    --text-secondary: #A0A0A0;\r
    --text-muted: #666;\r
    --accent: #2F80ED;\r
    --accent-hover: #2D74D7;\r
    --border: #2A2A2A;\r
    --radius: 12px;\r
    --radius-sm: 8px;\r
    --transition: 200ms ease;\r
  }\r
\r
  body {\r
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\r
    background: var(--bg-primary);\r
    color: var(--text-primary);\r
    height: 100vh;\r
    overflow: hidden;\r
    display: flex;\r
    flex-direction: column;\r
    -webkit-app-region: drag;\r
    -webkit-user-select: none;\r
    user-select: none;\r
  }\r
\r
  /* Traffic-light spacer for macOS */\r
  .titlebar-spacer {\r
    height: 38px;\r
    flex-shrink: 0;\r
  }\r
\r
  .container {\r
    flex: 1;\r
    display: flex;\r
    flex-direction: column;\r
    align-items: center;\r
    justify-content: center;\r
    padding: 0 68px 68px;\r
    -webkit-app-region: no-drag;\r
  }\r
\r
  /* --- Step screens --- */\r
  .step {\r
    display: none;\r
    flex-direction: column;\r
    align-items: center;\r
    text-align: center;\r
    max-width: 480px;\r
    width: 100%;\r
    animation: fadeIn 0.4s ease;\r
  }\r
  .step.active {\r
    display: flex;\r
  }\r
\r
  @keyframes fadeIn {\r
    from { opacity: 0; transform: translateY(12px); }\r
    to   { opacity: 1; transform: translateY(0); }\r
  }\r
\r
  /* Icon */\r
  .icon-wrapper {\r
    width: 80px;\r
    height: 80px;\r
    margin-bottom: 32px;\r
  }\r
  .icon-wrapper img {\r
    width: 100%;\r
    height: 100%;\r
    border-radius: 18px;\r
  }\r
\r
  h1 {\r
    font-size: 19px;\r
    font-weight: 700;\r
    line-height: 1.3;\r
    margin-bottom: 8px;\r
    letter-spacing: -0.02em;\r
  }\r
\r
  p {\r
    font-size: 14px;\r
    line-height: 1.6;\r
    color: var(--text-secondary);\r
    margin-bottom: 36px;\r
  }\r
\r
  /* Loader styling */\r
  .loader {\r
    display: flex;\r
    gap: 8px;\r
    margin-bottom: 16px;\r
  }\r
  .loader div {\r
    width: 8px;\r
    height: 8px;\r
    border-radius: 50%;\r
    background-color: var(--accent);\r
    opacity: 0.3;\r
    animation: dot-pulse 1.5s infinite ease-in-out;\r
  }\r
  .loader div:nth-child(1) { animation-delay: 0s; }\r
  .loader div:nth-child(2) { animation-delay: 0.3s; }\r
  .loader div:nth-child(3) { animation-delay: 0.6s; }\r
\r
  @keyframes dot-pulse {\r
    0%, 100% { opacity: 0.2; transform: scale(0.9); }\r
    50% { opacity: 0.7; transform: scale(1.1); }\r
  }\r
\r
  /* Checkbox styling */\r
  .checkbox-label {\r
    display: flex;\r
    align-items: center;\r
    gap: 10px;\r
    cursor: pointer;\r
    font-size: 14px;\r
    color: var(--text-secondary);\r
    transition: color var(--transition);\r
    margin-bottom: 18px;\r
    -webkit-app-region: no-drag;\r
  }\r
\r
  .checkbox-label:hover {\r
    color: var(--text-primary);\r
  }\r
\r
  .checkbox-label input {\r
    display: none;\r
  }\r
\r
  .custom-checkbox {\r
    width: 18px;\r
    height: 18px;\r
    border: 2px solid #333;\r
    border-radius: 4px;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    transition: var(--transition);\r
    background: var(--bg-secondary);\r
  }\r
\r
  .checkbox-label:hover .custom-checkbox {\r
    border-color: var(--accent);\r
  }\r
\r
  .checkbox-label input:checked + .custom-checkbox {\r
    background: var(--accent);\r
    border-color: var(--accent);\r
  }\r
\r
  .custom-checkbox::after {\r
    content: '';\r
    width: 4px;\r
    height: 8px;\r
    border: solid white;\r
    border-width: 0 2px 2px 0;\r
    transform: rotate(45deg) translate(-1px, -1px);\r
    display: none;\r
  }\r
\r
  .checkbox-label input:checked + .custom-checkbox::after {\r
    display: block;\r
  }\r
\r
  /* Buttons */\r
  .button-group {\r
    display: flex;\r
    flex-direction: column;\r
    gap: 12px;\r
    width: 100%;\r
    max-width: 320px;\r
  }\r
\r
  button {\r
    font-family: inherit;\r
    font-size: 14px;\r
    font-weight: 500;\r
    padding: 13px 24px;\r
    border-radius: var(--radius-sm);\r
    border: none;\r
    cursor: pointer;\r
    transition: all var(--transition);\r
    -webkit-app-region: no-drag;\r
  }\r
\r
  .btn-primary {\r
    background: var(--accent);\r
    color: #fff;\r
  }\r
  .btn-primary:hover {\r
    background: var(--accent-hover);\r
    transform: translateY(-1px);\r
  }\r
  .btn-primary:active {\r
    transform: translateY(0);\r
  }\r
\r
</style>\r
</head>\r
<body>\r
  <div class="titlebar-spacer"></div>\r
  <div class="container">\r
\r
    <!-- Step 0: Setting up -->\r
    <div id="step-setup" class="step active">\r
      <div class="loader">\r
        <div></div><div></div><div></div>\r
      </div>\r
      <div class="text" style="font-size: 13px; opacity: 0.6; letter-spacing: 0.03em;">正在初始化…</div>\r
    </div>\r
\r
    <!-- Step 1: Welcome -->\r
    <div id="step-ask" class="step">\r
      <div class="icon-wrapper">\r
        <img src="data:image/png;base64,${iconBase64}" alt="Antigravity Icon">\r
      </div>\r
      <h1>欢迎使用全新的 Antigravity！</h1>\r
      <p>Antigravity 已全新升级，以 Agent 为核心，带来全新能力体验。如果你仍需要代码编辑器，可以单独下载 <b>Antigravity IDE</b>。</p>\r
      \r
      <label class="checkbox-label">\r
        <input type="checkbox" id="chk-download" checked>\r
        <span class="custom-checkbox"></span>\r
        <span>下载 Antigravity IDE</span>\r
      </label>\r
\r
      <div class="button-group">\r
        <button class="btn-primary" id="btn-skip">探索全新的 Antigravity</button>\r
      </div>\r
    </div>\r
\r
  </div>\r
\r
<script>\r
  function showStep(stepId) {\r
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));\r
    document.getElementById(stepId).classList.add('active');\r
  }\r
\r
  document.getElementById('btn-skip').addEventListener('click', async () => {\r
    const chk = document.getElementById('chk-download');\r
    const shouldDownload = chk ? chk.checked : false;\r
    await window.wizardAPI.completeWizard(shouldDownload);\r
  });\r
\r
  window.wizardAPI.onSetupComplete(() => {\r
    showStep('step-ask');\r
  });\r
</script>\r
</body>\r
</html>`;
}
