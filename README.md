# Antigravity 中文汉化补丁

适用版本：**Antigravity 2.0.0**

## 📦 目录结构

```
antigravity-zhcn-patch/
├── backup/              ← 原始文件备份（首次补丁时自动创建 app.asar 备份）
│   ├── app.asar         ← 由 patch.bat 自动备份
│   ├── main.js          ← 原始源文件（供参考）
│   ├── menu.js
│   ├── tray.js
│   ├── updater.js
│   ├── loadingOverlay.js
│   ├── ipcHandlers.js
│   ├── utils.js
│   ├── preload.js
│   └── ideInstall/
│       └── wizardHtml.js
├── patch-files/         ← 汉化后的文件
│   ├── main.js
│   ├── menu.js
│   ├── tray.js
│   ├── updater.js
│   ├── loadingOverlay.js
│   ├── ipcHandlers.js
│   ├── utils.js          ← 新增汉化注入逻辑
│   ├── zhcn.js            ← 新增：主界面 DOM 翻译脚本
│   └── ideInstall/
│       └── wizardHtml.js
├── patch.bat            ← 一键汉化
├── unpatch.bat          ← 一键还原
└── README.md            ← 本文件
```

## 🚀 使用方法

### 方式一：下载压缩包安装（推荐）

1. **关闭 Antigravity**（包括系统托盘）
2. 在 GitHub Releases 页面下载最新的压缩包，解压后**必须将所有文件存放至 Antigravity 安装根目录**（包含 resources 文件夹的目录）
3. 双击运行 `patch.bat`
4. 等待提示"汉化补丁安装成功"
5. 重新启动 Antigravity

### 方式二：通过 Git 安装（适合开发者）

如果你熟悉 Git，也可以直接将仓库克隆到 Antigravity 安装目录下：

```bash
cd 你的Antigravity安装根目录
git clone https://github.com/liyidao1993/antigravity-zhcn-patch.git
cd antigravity-zhcn-patch
./patch.bat
```

### 还原英文界面

1. **关闭 Antigravity**
2. 双击运行 `unpatch.bat`
3. 重新启动 Antigravity

## 🔧 汉化范围

### ✅ 完全覆盖（Electron 外壳）
- 应用菜单（文件、编辑、视图、窗口、帮助）
- 系统托盘菜单
- 退出确认对话框
- 更新检查相关提示
- 加载动画文字
- IDE 安装向导
- 打开工作区对话框

### ✅ 大部分覆盖（主界面 DOM 注入）
- 侧边栏导航
- 按钮和操作
- 命令面板
- 设置页面
- 状态提示
- 权限确认弹窗

### ⚠️ 无法覆盖
- 后端动态生成的错误消息
- Canvas/WebGL 渲染的文本
- 部分 JavaScript 模板字符串拼接的复杂文案
- 模型返回的英文内容

## ⚠️ 注意事项

- **Antigravity 更新后需重新打补丁**：自动更新会替换 `app.asar`，需再次运行 `patch.bat`
- **需要 Node.js 环境**：补丁脚本依赖 `npx` 工具解包/打包 asar
- **首次运行会自动备份**：原始 `app.asar` 保存在 `backup/` 目录
- **Agent 保持英文原文不翻译**

## 📋 技术原理

1. 解包 `app.asar`（Electron 应用资源包）
2. 替换其中的 JS 文件为汉化版本
3. 新增 `zhcn.js` 汉化脚本，通过 `MutationObserver` 实时翻译主界面
4. 重新打包为 `app.asar`
