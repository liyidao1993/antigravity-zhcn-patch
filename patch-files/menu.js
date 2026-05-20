"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApplicationMenu = setupApplicationMenu;
const electron_1 = require("electron");
const utils_1 = require("./utils");
const updater_1 = require("./updater");
/**
 * Applies modifications to the default application menu.
 */
function setupApplicationMenu(url) {
    const menu = electron_1.Menu.getApplicationMenu();
    if (!menu) {
        return;
    }
    // Adds a "New Window" item to the top of the existing File menu.
    addItemToSubmenu(menu, 'File', 0, new electron_1.MenuItem({
        label: '新建窗口',
        accelerator: 'CmdOrCtrl+Shift+N',
        click: () => {
            (0, utils_1.createWindow)(url);
        },
    }));
    // Add "Check for Updates" to the application menu on macOS.
    if ((0, utils_1.isMacOS)()) {
        const appSubmenu = menu.items[0]?.submenu;
        if (appSubmenu) {
            appSubmenu.insert(1, new electron_1.MenuItem({
                id: 'check-for-updates',
                label: updater_1.MenuUpdateStep.CheckForUpdates,
                click: (menuItem) => {
                    const action = updater_1.updateActions[menuItem.label];
                    action?.();
                },
            }));
        }
    }
    // Adds Docs and Toggle Developer Tools to the Help menu
    addItemToSubmenu(menu, 'Help', 0, new electron_1.MenuItem({
        label: '文档',
        click: async () => {
            await electron_1.shell.openExternal('https://antigravity.google/docs');
        },
    }));
    addItemToSubmenu(menu, 'Help', 1, new electron_1.MenuItem({
        role: 'toggleDevTools',
    }));
    // Localize default menu labels to Chinese
    const menuTranslations = { 'File': '文件', 'Edit': '编辑', 'View': '视图', 'Window': '窗口', 'Help': '帮助' };
    for (const item of menu.items) {
        if (menuTranslations[item.label]) {
            item.label = menuTranslations[item.label];
        }
    }
    // Re-apply the menu so the change takes effect.
    electron_1.Menu.setApplicationMenu(menu);
}
/**
 * Adds a menu item to a submenu of the main application menu.
 */
function addItemToSubmenu(appMenu, submenuLabel, position, item) {
    const submenuItem = appMenu.items.find((item) => item.label === submenuLabel);
    if (!submenuItem?.submenu) {
        return;
    }
    submenuItem.submenu.insert(position, item);
}
