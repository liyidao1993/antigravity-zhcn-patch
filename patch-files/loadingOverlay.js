"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachLoadingOverlay = attachLoadingOverlay;
const electron_1 = require("electron");
/**
 * Generates the HTML content for the initial loading screen overlay.
 * This is injected into a WebContentsView and shown to the user before
 * the main application bundle finishes loading.
 *
 * @param foregroundColor - The text and loader animation color (hex or CSS color string).
 * @param backgroundColor - The background color of the loading view.
 */
function getLoadingHtml(foregroundColor, backgroundColor) {
    return `\r\n<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<style>\r\n  body {\r\n    margin: 0;\r\n    padding: 0;\r\n    background: ${backgroundColor};\r\n    color: ${foregroundColor};\r\n    font-family: system-ui, -apple-system, sans-serif;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100vh;\r\n    overflow: hidden;\r\n    -webkit-app-region: drag;\r\n    -webkit-user-select: none;\r\n  }\r\n  .loader {\r\n    display: flex;\r\n    gap: 8px;\r\n    margin-bottom: 16px;\r\n  }\r\n  .loader div {\r\n    width: 8px;\r\n    height: 8px;\r\n    border-radius: 50%;\r\n    background-color: ${foregroundColor};\r\n    opacity: 0.3;\r\n    animation: dot-pulse 1.5s infinite ease-in-out;\r\n  }\r\n  .loader div:nth-child(1) { animation-delay: 0s; }\r\n  .loader div:nth-child(2) { animation-delay: 0.3s; }\r\n  .loader div:nth-child(3) { animation-delay: 0.6s; }\r\n  .text {\r\n    font-size: 13px;\r\n    font-weight: 400;\r\n    letter-spacing: 0.03em;\r\n    opacity: 0.6;\r\n  }\r\n  @keyframes dot-pulse {\r\n    0%, 100% { opacity: 0.2; transform: scale(0.9); }\r\n    50% { opacity: 0.7; transform: scale(1.1); }\r\n  }\r\n</style>\r\n</head>\r\n<body>\r\n  <div class="loader">\r\n    <div></div><div></div><div></div>\r\n  </div>\r\n  <div class="text">正在加载 Antigravity</div>\r\n</body>\r\n</html>\r\n  `;
}
/**
 * Attaches a temporary WebContentsView overlay that shows a loading animation.
 * It is automatically removed when the window's main content finishes loading.
 */
function attachLoadingOverlay(win, foregroundColor, backgroundColor) {
    const view = new electron_1.WebContentsView({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    const html = getLoadingHtml(foregroundColor, backgroundColor);
    void view.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    win.contentView.addChildView(view);
    const updateBounds = () => {
        const [width, height] = win.getContentSize();
        view.setBounds({ x: 0, y: 0, width, height });
    };
    updateBounds();
    win.on('resize', updateBounds);
    win.webContents.once('did-finish-load', () => {
        try {
            win.contentView.removeChildView(view);
        }
        catch (_) {
            // In case window was closed quickly
        }
        win.off('resize', updateBounds);
    });
}
