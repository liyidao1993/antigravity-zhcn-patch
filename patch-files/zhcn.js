"use strict";
/**
 * Antigravity 中文汉化 — 主界面 DOM 注入脚本
 *
 * 通过 MutationObserver 实时替换 language_server 前端 bundle 中的英文文案。
 * 由 utils.js 在页面加载完成后通过 webContents.executeJavaScript() 注入。
 *
 * 注意：Agent 保留英文不翻译，Workspace → 工作区
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalizationScript = getLocalizationScript;

function getLocalizationScript() {
    return `(function() {
  'use strict';

  // 防止重复注入
  if (window.__ZHCN_LOCALIZED__) return;
  window.__ZHCN_LOCALIZED__ = true;

  // ============================================================
  // 精确匹配翻译字典
  // ============================================================
  const T = {
    // ---- 导航与侧边栏 ----
    'Settings': '设置',
    'Extensions': '扩展',
    'Conversations': '对话',
    'History': '历史记录',
    'New Conversation': '新建对话',
    'Starred': '已收藏',
    'All Conversations': '所有对话',
    'Recent': '最近',
    'Older': '更早',
    'Today': '今天',
    'Yesterday': '昨天',
    'Previous 7 Days': '最近 7 天',
    'Previous 30 Days': '最近 30 天',

    // ---- 按钮与操作 ----
    'Send': '发送',
    'Stop': '停止',
    'Cancel': '取消',
    'Copy': '复制',
    'Copied': '已复制',
    'Copied!': '已复制！',
    'Save': '保存',
    'Delete': '删除',
    'Close': '关闭',
    'Confirm': '确认',
    'Submit': '提交',
    'Skip': '跳过',
    'Retry': '重试',
    'Approve': '批准',
    'Deny': '拒绝',
    'Allow': '允许',
    'Reject': '拒绝',
    'Done': '完成',
    'Apply': '应用',
    'Reset': '重置',
    'Clear': '清除',
    'Search': '搜索',
    'Search...': '搜索...',
    'Filter': '筛选',
    'Rename': '重命名',
    'Pin': '置顶',
    'Unpin': '取消置顶',
    'Archive': '归档',
    'Share': '分享',
    'Download': '下载',
    'Upload': '上传',
    'Refresh': '刷新',
    'Edit': '编辑',
    'Run': '运行',
    'Continue': '继续',
    'Dismiss': '忽略',
    'Expand': '展开',
    'Collapse': '收起',

    // ---- 命令与操作 ----
    'Open Settings': '打开设置',
    'Open Command Palette': '打开命令面板',
    'Command Palette': '命令面板',
    'Toggle Sidebar': '切换侧边栏',
    'Toggle Theme': '切换主题',
    'New Window': '新建窗口',
    'Open File': '打开文件',
    'Open Folder': '打开文件夹',
    'Open Workspace': '打开工作区',
    'Save File': '保存文件',
    'New File': '新建文件',
    'Toggle Developer Tools': '切换开发者工具',

    // ---- 状态 ----
    'Loading': '加载中',
    'Loading...': '加载中...',
    'Connecting': '连接中',
    'Connecting...': '连接中...',
    'Connected': '已连接',
    'Disconnected': '已断开连接',
    'Error': '错误',
    'Ready': '就绪',
    'Running': '运行中',
    'Running...': '运行中...',
    'Stopped': '已停止',
    'Completed': '已完成',
    'Failed': '失败',
    'Pending': '等待中',
    'Pending...': '等待中...',
    'Idle': '空闲',


    // ---- 设置 ----
    'Theme': '主题',
    'Dark': '深色',
    'Light': '浅色',
    'System': '跟随系统',
    'Font Size': '字号',
    'Font Family': '字体',
    'Auto Save': '自动保存',
    'Word Wrap': '自动换行',
    'Line Numbers': '行号',
    'Minimap': '小地图',
    'Bracket Pairs': '括号匹配',
    'General': '通用',
    'Appearance': '外观',
    'Editor': '编辑器',
    'Keyboard Shortcuts': '快捷键',
    'About': '关于',
    'Preferences': '偏好设置',
    'Account': '账户',
    'Advanced': '高级',
    'Experimental': '实验性',

    // ---- Agent 相关 ----
    'Workspace': '工作区',
    'Workspaces': '工作区',
    'Permission': '权限',
    'Permissions': '权限',
    'Approve all': '全部批准',
    'Approve All': '全部批准',
    'Select a workspace': '选择工作区',
    'Set Workspace': '设置工作区',
    'Change Workspace': '更改工作区',
    'No workspace selected': '未选择工作区',
    'Active agents': '活跃的 Agent',

    // ---- MCP / 工具 ----
    'Add an MCP server above': '在上方添加 MCP 服务器',
    'MCP Servers': 'MCP 服务器',
    'MCP Server': 'MCP 服务器',
    'Tools': '工具',
    'Add MCP Server': '添加 MCP 服务器',
    'Add Server': '添加服务器',
    'Remove Server': '移除服务器',
    'Server Name': '服务器名称',
    'Server URL': '服务器 URL',
    'Connected to': '已连接到',

    // ---- 聊天 / 对话 ----
    'Type a message': '输入消息',
    'Type a message...': '输入消息...',
    'Send a message': '发送消息',
    'Send a message...': '发送消息...',
    'Ask anything...': '随便问点什么...',
    'Ask anything': '随便问点什么',
    'What would you like to do?': '你想做什么？',
    'Type your message here...': '在这里输入消息...',
    'Message': '消息',
    'Chat': '聊天',
    'Response': '回复',
    'Responses': '回复',

    // ---- 面板与标签 ----
    'Terminal': '终端',
    'Output': '输出',
    'Problems': '问题',
    'Debug Console': '调试控制台',
    'Explorer': '资源管理器',
    'Source Control': '源代码管理',
    'Outline': '大纲',
    'Timeline': '时间线',
    'Preview': '预览',
    'Console': '控制台',
    
    // ---- 新增：辅助窗格、Agent与审核 ----
    'Overview': '概览',
    'Subagents': '子 Agent',
    'Background Tasks': '后台任务',
    'Review Changes': '检查更改',
    'Files Changed': '已更改文件',
    'Task': '任务',
    'Implementation Plan': '实施计划',
    'Artifacts': '工件',
    'Edit Conversation Title': '编辑对话标题',
    'Stop Execution': '停止执行',
    'Querying Antigravity Updates': '正在查询 Antigravity 更新',

    // ---- 通用短语 ----
    'Are you sure?': '确定吗？',
    'Yes': '是',
    'No': '否',
    'OK': '确定',
    'Back': '返回',
    'Next': '下一步',
    'Previous': '上一步',
    'Finish': '完成',
    'More': '更多',
    'Less': '收起',
    'Show More': '显示更多',
    'Show Less': '收起',
    'Show All': '显示全部',
    'Hide': '隐藏',
    'Show': '显示',
    'Details': '详情',
    'Options': '选项',
    'None': '无',
    'Default': '默认',
    'Custom': '自定义',
    'Other': '其他',
    'All': '全部',
    'Select': '选择',
    'Select All': '全选',
    'Deselect All': '取消全选',

    // ---- 文件状态 ----
    'Untitled': '未命名',
    'Modified': '已修改',
    'Saved': '已保存',
    'Read Only': '只读',
    'Read-only': '只读',

    // ---- 模型相关 ----
    'Model': '模型',
    'Select Model': '选择模型',
    'Select a model': '选择模型',
    'Model Selection': '模型选择',
    'Change Model': '更改模型',

    // ---- 欢迎 / 引导 ----
    'Welcome': '欢迎',
    'Get Started': '开始使用',
    'Getting Started': '开始使用',
    'Learn More': '了解更多',
    "What's New": '新功能',
    
    // ---- 补充截图漏网之鱼 ----
    "Plan": "计划",
    "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "您可以升级到 Google AI Ultra 计划以获得更高的使用频率上限。",
    "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "启用后，当模型配额耗尽时，Antigravity 将使用您的 AI 额度来处理模型请求。Antigravity 始终会优先使用模型配额，然后再使用 AI 额度。",
    "Within each group, models share a weekly limit and a 5-hour limit. Quota is consumed proportionally to the cost of the tokens. Thus, limits will last longer with shorter tasks or using more cost-effective models. The 5-hour limit smooths out aggregate demand to fairly distribute global capacity across all users, while your weekly limit is tied directly to your individual tier.": "在每个分组中，模型共享每周限额和 5 小时限额。配额消耗与 Token 成本成正比。因此，执行较短任务或使用高性价比模型时，限额维持更久。5 小时限额旨在平滑总需求以确保公平分配，而每周限额则与您的个人订阅等级挂钩。",
    "Gemini Models": "Gemini 模型",
    "Weekly Limit": "每周限额",
    "Five Hour Limit": "5 小时限额",
    "Show all": "显示全部",

    // ---- 通知 / 更新 ----
    'Notification': '通知',
    'Notifications': '通知',
    'Mark as read': '标记为已读',
    'Clear all': '清除全部',
    'Update Available': '有可用更新',
    'Update available': '有可用更新',
    'Restart to update': '重启以更新',

    // ---- 认证 / 用户 ----
    'Terms of Service': '服务条款',
    'Privacy Policy': '隐私政策',
    'Terms of Service & Data Use': '服务条款与数据使用',
    'Data Use': '数据使用',
    'Sign in': '登录',
    'Sign out': '退出登录',
    'Sign In': '登录',
    'Sign Out': '退出登录',
    'Log in': '登录',
    'Log out': '退出登录',
    'Log In': '登录',
    'Log Out': '退出登录',
    'Feedback': '反馈',
    'Send Feedback': '发送反馈',
    'Report an issue': '报告问题',
    'Report Issue': '报告问题',

    // ---- 编辑操作 ----
    'Undo': '撤销',
    'Redo': '重做',
    'Cut': '剪切',
    'Paste': '粘贴',
    'Find': '查找',
    'Find and Replace': '查找和替换',
    'Replace': '替换',
    'Replace All': '全部替换',
    'Go to Line': '跳转到行',

    // ---- 视图 ----
    'Zoom In': '放大',
    'Zoom Out': '缩小',
    'Reset Zoom': '重置缩放',
    'Full Screen': '全屏',
    'Toggle Full Screen': '切换全屏',
    'Actual Size': '实际大小',
    'Fit to Window': '适应窗口',

    // ---- 权限确认 ----
    'Allow this action?': '允许此操作？',
    'This action requires your approval': '此操作需要你的批准',
    'Always allow': '始终允许',
    'Allow once': '仅允许一次',
    'always allow': '始终允许',
    'allow once': '仅允许一次',

    // ---- 补充汉化：导航与菜单 ----
    'File': '文件',
    'View': '视图',
    'Window': '窗口',
    'Conversation History': '历史记录',
    'Scheduled Tasks': '计划任务',
    'Projects': '项目',
    'Minimize': '最小化',
    'Maximize': '最大化',
    'Ask anything, @ to mention, / for actions': '随便问点什么，使用 @ 提及，使用 / 执行操作',

    // ---- 补充汉化：设置面板 ----
    'Models': '模型',
    'Customizations': '自定义',
    'Browser': '浏览器',
    'App': '应用',
    'Not in Project': '不在项目中',
    'Shortcuts': '快捷键',
    'Provide Feedback': '提供反馈',
    'Agent settings and permissions for conversations outside of projects.': '针对项目外对话的 Agent 设置和权限。',
    'Agent Settings': 'Agent 设置',
    'Security Preset': '安全预设',
    'Choose a predefined security preset for the agent. This controls terminal auto-execution policy, and file access policy.': '为 Agent 选择一个预设的安全策略。这将控制终端自动执行策略和文件访问策略。',
    'Outside of folders file access policy': '工作区外文件访问策略',
    'Configures how the agent tries to access files outside of its working folders.': '配置 Agent 如何尝试访问工作区之外的文件。',
    'Always Ask': '总是询问',
    'Require Review': '需要审核',
    'Terminal Command Auto Execution': '终端命令自动执行',
    'Controls whether terminal commands require your approval before running.': '控制终端命令在运行前是否需要你的批准。',
    'Agent Behavior': 'Agent 行为',
    'Artifact Review Policy': '工件审核策略',
    'Specifies Agent\\'s behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.': '指定 Agent 在请求审核工件时的行为（工件是它为了提供更丰富的对话体验而创建的文档）。',
    'Local Permissions': '本地权限',
    'Inherits from ': '继承自 ',
    'global settings': '全局设置',
    '. Local permissions have higher priority. ': '。本地权限具有更高优先级。',
    'Learn more': '了解更多',
    'File Access Rules': '文件访问规则',
    'Configure allowed and denied paths for file reads and writes.': '配置允许和拒绝读写的文件路径。',
    'Network Access Rules': '网络访问规则',
    'Configure allowed and denied URLs for reading.': '配置允许和拒绝读取的 URL。',
    'Terminal Commands': '终端命令',
    'Configure allowed terminal commands.': '配置允许执行的终端命令。',
    'Open': '打开',
    
    // ---- 补充汉化：应用菜单、快捷键与权限面板 ----
    'Create Project': '创建项目',
    'Keyboard shortcuts for quick navigation and control.': '用于快速导航和控制的快捷键。',
    'RECOMMENDED': '推荐',
    'Open Conversation Picker': '打开对话选择器',
    'Open File Search': '打开文件搜索',
    'Focus Input': '聚焦输入框',
    'NAVIGATION': '导航',
    'Go Back': '返回',
    'Go Forward': '前进',
    'File Picker': '文件选择器',
    'Select Previous Conversation': '选择上一个对话',
    'Select Next Conversation': '选择下一个对话',
    'CONVERSATION': '对话',
    'Configure global allowed and denied resource permissions.': '配置全局允许和拒绝的资源权限。',
    'Configure global allowed and denied resource permissions. ': '配置全局允许和拒绝的资源权限。 ',
    'Project-Specific Settings': '项目特定设置',
    'Modify scoped permissions, folders, and agent settings like Sandbox and Terminal Command Execution.': '修改范围权限、文件夹和 Agent 设置，如沙盒和终端命令执行。',
    'Go to Projects': '转到项目',
    'File Permissions': '文件权限',
    'Network Permissions': '网络权限',
    'Terminal & Tooling Permissions': '终端和工具权限',
    'Commands Outside Sandbox': '沙盒外命令',
    'Configure allowed commands outside the sandbox.': '配置沙盒外允许的命令。',
    'MCP Tools': 'MCP 工具',
    'Configure external tools via Model Context Protocol.': '通过模型上下文协议配置外部工具。',

    // ---- 自动收集的新增词条 ----
    'Select Project': '选择项目',
    'No Model Selected': '未选择模型',
    'Authenticating...': '验证中...',
    'now': '现在',
    'Review': '审核',
    'Add Context': '添加上下文',
    'Inherits from': '继承自',
    'No token data available.': '没有可用的 Token 数据。',
    'Loading workspace customizations...': '正在加载工作区自定义设置...',
    'Manage your plan, credentials, and general preferences.': '管理您的计划、凭证和通用偏好设置。',
    'Enable Telemetry': '启用遥测',
    'When toggled on, Antigravity collects usage data to help Google enhance performance and features.': '启用后，Antigravity 将收集使用数据以帮助 Google 提升性能和功能。',
    'Marketing Emails': '营销邮件',
    'Receive product updates, tips, and promotions from Google Antigravity via email.': '通过电子邮件接收 Google Antigravity 的产品更新、提示和促销信息。',
    'Your Plan:': '您的计划：',
    'You can upgrade to a Google AI Ultra plan to receive the highest rate limits.': '您可以升级到 Google AI Ultra 计划以获取最高频次限制。',
    'Upgrade': '升级',
    'Email': '邮箱',
    'By using this app, you agree to its': '使用此应用即表示您同意其',
    'Google Drive integration not available': 'Google Drive 集成不可用',
    'Configure the agent\\'s visual theme and display preferences.': '配置 Agent 的视觉主题和显示偏好。',
    'Chat Settings': '聊天设置',
    'Verbose agent chat': '详细的 Agent 聊天',
    'Display and preserve intermediate thinking steps': '显示并保留中间思考步骤',
    'Select light, dark, or inherit system settings.': '选择浅色、深色或跟随系统设置。',
    'Light Theme': '浅色主题',
    'Preset': '预设',
    'Default Light': '默认浅色',
    'Background': '背景',
    'Foreground': '前景',
    'Accent': '强调色',
    'Dark Theme': '深色主题',
    'Default Dark': '默认深色',
    'Editor Settings': '编辑器设置',
    'Configure editor-specific behaviors and shortcuts.': '配置编辑器特定的行为和快捷键。',
    'Marketplace': '扩展市场',
    'Marketplace Item URL': '扩展市场项目 URL',
    'Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.': '更改每个扩展页面的基础 URL。更改此值后必须重启 Antigravity 才能使用新的市场。',
    'Marketplace Gallery URL': '扩展市场图库 URL',
    'Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.': '更改扩展市场搜索结果的基础 URL。更改此值后必须重启 Antigravity 才能使用新的市场。',
    'Selection Actions': '选中文本操作',
    'Show Selection Actions': '显示选中文本操作',
    'Show "Edit" and "Chat" buttons when selecting text in the editor.': '在编辑器中选中文本时显示“编辑”和“聊天”按钮。',
    'To modify editor settings, open Settings within the editor window.': '要修改编辑器设置，请在编辑器窗口内打开“设置”。',
    'Open Editor Settings': '打开编辑器设置',
    'Browser Settings': '浏览器设置',
    'Configure the browser subagent. It requires': '配置浏览器子 Agent。它需要',
    'Google Chrome': 'Google Chrome',
    'to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.': '被安装。可以在对话输入框中输入 /browser 来调用浏览器子 Agent。',
    'Browser Javascript Execution Policy': '浏览器 Javascript 执行策略',
    'Controls whether the agent can run custom JavaScript to automate complex browser actions.': '控制 Agent 是否可以运行自定义 JavaScript 来自动化复杂的浏览器操作。',
    'Request Review': '请求审核',
    'Actuation Permissions': '操作权限',
    'Browser Actuation Rules': '浏览器操作规则',
    'Configure allowed and denied URLs for browser actuation.': '配置允许和拒绝浏览器操作的 URL。',
    'Manage your notification preferences.': '管理您的通知偏好设置。',
    'Notification Settings': '通知设置',
    'To modify notification settings, open your operating system\\'s system preferences.': '要修改通知设置，请打开您操作系统的系统偏好设置。',
    'Open System Preferences': '打开系统偏好设置',
    'Configure default behaviors, skills, and MCP servers.': '配置默认行为、技能和 MCP 服务器。',
    'Token Usage': 'Token 用量',
    'Installed MCP Servers': '已安装的 MCP 服务器',
    'Add MCP': '添加 MCP',
    'Loading MCP servers...': '正在加载 MCP 服务器...',
    'Build With Google Plugins': 'Google 官方插件构建',
    'App Settings': '应用设置',
    'Manage application settings.': '管理应用程序设置。',
    'Prevent Sleep': '防止休眠',
    'Prevent the computer from sleeping while the app is running.': '在应用运行时防止计算机休眠。',
    'Keep In Menu Bar': '保留在菜单栏',
    'The app will be accessible from the menu bar and will keep running in the background when all windows are closed.': '应用将可从菜单栏访问，并在所有窗口关闭时继续在后台运行。',
    'Feedback Type': '反馈类型',
    'Bug Report': '错误报告',
    'Feature Request': '功能请求',
    'Auth and Billing': '认证与账单',
    'General Feedback': '常规反馈',
    'Description': '描述',
    'Steps to reproduce the issue': '重现问题的步骤',
    'Expected behavior': '预期行为',
    'Actual behavior': '实际行为',
    'Any error messages': '任何错误消息',
    'Any relevant information': '任何相关信息',
    'Steps to Reproduce': '重现步骤',
    'Attach a screenshot (optional)': '附加截图（可选）',
    'Attach Antigravity server logs': '附加 Antigravity 服务器日志',
    'We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.': '我们建议您附上日志。附带日志将帮助 Antigravity 团队处理并优先考虑您的反馈。',
    'Toggle Model Selector': '切换模型选择器',
    'Toggle Voice Recording': '切换录音',
    'Find in Pane': '在窗格中查找',
    'Layout Controls': '布局控制',
    'Toggle Auxiliary Pane': '切换辅助窗格',
    'Configure AI models and view your quota.': '配置 AI 模型并查看您的配额。',
    'Model Credits': '模型额度',
    'Enable AI Credit Overages': '启用 AI 额度超额',
    'Model Quota': '模型配额',
    'Loading token usage...': '正在加载 token 用量...',
    'Global': '全局',
    'Plugin:': '插件：',
    'No MCP Servers': '没有 MCP 服务器',
    'You currently don\\'t have any MCP Servers installed.': '您目前没有安装任何 MCP 服务器。',
    'See Activity': '查看活动',
    'Get More AI Credits': '获取更多 AI 额度',
    'Disabled': '已禁用',
    '0% remaining': '剩余 0%',
    'Model quota exhausted': '模型配额已耗尽',
    'Add MCP Servers': '添加 MCP 服务器',
    'Installing': '安装中',
    'Installed': '已安装',
    'Error:': '错误：',
    'Block all browser JavaScript execution.': '拦截所有浏览器 JavaScript 执行。',
    'Prompt for approval before running browser scripts.': '在运行浏览器脚本前提示审批。',
    'Always Proceed': '始终继续',
    'Allow full browser script execution without prompting.': '允许完整执行浏览器脚本且不提示。',
    'Browser Actuation Permissions': '浏览器操作权限',
    'Execute URLs': '执行 URL',
    'Allow/deny agent browser actuation access to specific URLs.': '允许/拒绝 Agent 对特定 URL 的浏览器操作访问。',
    'allow': '允许',
    
    // ---- 计划任务弹窗 ----
    'New Scheduled Task': '新建计划任务',
    'Name': '名称',
    'Enter task name': '输入任务名称',
    'Project': '项目',
    'Create a project in the sidebar first': '请先在侧边栏中创建一个项目',
    'Schedule': '计划时间',
    'Hourly': '每小时',
    'Daily': '每天',
    'Weekly': '每周',
    'Monthly': '每月',
    'around': '大概',
    'on': '按',
    'Cron expression e.g. 0 */6 * * *': 'Cron 表达式，例如 0 */6 * * *',
    'Prompt': '提示词',
    'Enter a prompt for the agent': '输入给 Agent 的提示词',
    'All tasks run as Flash.': '所有任务均使用 Flash 模型运行。',
    'Add Scheduled Task': '添加计划任务',

    // ---- 创建项目弹窗 ----
    'Select folder(s)': '选择文件夹',
    'Add Folder': '添加文件夹',
    '+ Add Folder': '+ 添加文件夹',

    // ---- 显示选项 (Display Options) ----
    'Display Options': '显示选项',
    'Group By': '分组方式',
    'Project': '项目',
    'Status': '状态',
    'Sort Conversations': '对话排序',
    'Last Updated': '最近更新',
    'Alphabetical (A-Z)': '按字母顺序 (A-Z)',
    'Date Added': '添加日期',
    'Subtitles': '副标题',
    'Worktree': '工作树',
    'No Subtitle': '无副标题',

    // ---- 对话与项目操作 ----
    'Create New Project': '创建新项目',
    'Pin Conversation': '置顶对话',
    'Unpin Conversation': '取消置顶对话',
    'Archive Conversation': '归档对话',
    'Unarchive Conversation': '取消归档对话',

    // ---- 快捷键与其他面板标题 ----
    'RECOMMENDED': '推荐',
    'NAVIGATION': '导航',
    'CONVERSATION': '对话',
    'CONVERSATIONS': '对话',

    // ---- 新建项目 (New Project) ----
    'New Project': '新建项目',
    'Quick Start': '快速开始',
    'Create a new project. You can add folders to it now or later.': '创建一个新项目。您可以现在或以后向其中添加文件夹。',
    'Instantly create a new project and folder to start building.': '立即创建一个新项目和文件夹以开始构建。',

    // ---- 聊天输入框加号菜单 ----
    'Media': '媒体',
    'Mentions': '提及',
    'Actions': '操作',

    // ---- 安全预设下拉菜单 ----
    'Requires manual review for all terminal commands and file accesses outside of the working folders.': '需要对工作区外的所有终端命令和文件访问进行手动审核。',
    'Full Machine': '整机访问',
    'All terminal commands require review. The agent can read or write to any file in the machine.': '所有终端命令需要审核。Agent 可以读取或写入机器上的任何文件。',
    'Unrestricted': '无限制',
    'Disables all safety barriers for maximal iteration velocity.': '禁用所有安全屏障以获得最大的迭代速度。',

    // ---- 权限与规则弹窗 ----
    'Yes, save rule when not in a project': '是，当不在项目中时保存规则',
    'Yes, save rule globally': '是，全局保存规则',
    '(tell the agent what to do instead)': '(告诉 Agent 替代做法)',
    ' (tell the agent what to do instead)': ' (告诉 Agent 替代做法)',
    
    // ---- 菜单栏 ----
    'Check for Updates': '检查更新',
    
    // ---- 其他 ----
    'Clarifying Standalone Usage': '澄清独立使用',
  };

  // ============================================================
  // 正则匹配翻译（处理动态文案）
  // ============================================================
  const RE = [
    [/^(\\d+) agents? running$/, (m) => m[1] + ' 个 Agent 正在运行'],
    [/^No agents? running$/, () => '没有正在运行的 Agent'],
    [/^(\\d+) results?$/, (m) => m[1] + ' 个结果'],
    [/^(\\d+) files? changed?$/, (m) => m[1] + ' 个文件已更改'],
    [/^(\\d+) files?$/, (m) => m[1] + ' 个文件'],
    [/^(\\d+) errors?$/, (m) => m[1] + ' 个错误'],
    [/^(\\d+) warnings?$/, (m) => m[1] + ' 个警告'],
    [/^(\\d+) conversations?$/, (m) => m[1] + ' 个对话'],
    [/^(\\d+) messages?$/, (m) => m[1] + ' 条消息'],
    [/^Showing (\\d+) of (\\d+)$/, (m) => '显示 ' + m[1] + '/' + m[2]],
    [/^Page (\\d+) of (\\d+)$/, (m) => '第 ' + m[1] + '/' + m[2] + ' 页'],
    [/^(\\d+) items?$/, (m) => m[1] + ' 项'],
    [/^(\\d+) selected$/, (m) => '已选择 ' + m[1] + ' 项'],
    [/^Last updated (.+)$/, (m) => '上次更新：' + m[1]],
    [/^Created (.+)$/, (m) => '创建于 ' + m[1]],
    [/^Version (.+)$/, (m) => '版本 ' + m[1]],
    [/^Powered by (.+)$/, (m) => '由 ' + m[1] + ' 提供支持'],
    [/^Step (\\d+) of (\\d+)$/, (m) => '步骤 ' + m[1] + '/' + m[2]],
    [/^Refreshes in (.+)$/, (m) => '将在 ' + m[1].replace(/hours?/g, '小时').replace(/minutes?/g, '分钟') + ' 后刷新'],
    [/^Show (\\d+) breakdowns$/, (m) => '显示 ' + m[1] + ' 个明细'],
    [/^(.+)% of the customization budget is available\\.$/, (m) => '有 ' + m[1] + '% 的自定义预算可用。'],
    [/^The breakdown below shows token usage from customizations like skills, rules, and MCP\\.\\s+If the budget is exceeded, large customizations will be truncated automatically\\.\\s+(.+)% of the customization budget is available\\.$/, (m) => '下方的明细展示了技能、规则和 MCP 等自定义内容的 Token 使用情况。\\n如果超出预算，大型的自定义内容将会被自动截断。\\n有 ' + m[1] + '% 的自定义预算可用。'],
    [/^Send feedback as (.+)$/, (m) => '作为 ' + m[1] + ' 发送反馈'],
    [/^Save rule to always allow (.+) access to this path\?$/, (m) => '保存规则以始终允许对此路径的' + (m[1] === 'read' ? '读取' : m[1] === 'write' ? '写入' : m[1] === 'execute' ? '执行' : m[1]) + '访问权限？'],
    [/^See all \((\d+)\)$/, (m) => '查看全部 (' + m[1] + ')'],
    [/^Worked for (.+)$/, (m) => '已运行 ' + m[1].replace('m', '分钟').replace('s', '秒').replace('h', '小时')],
    [/^You have used some of your weekly limit, it will fully refresh in (.+)\.$/, (m) => "您已使用了部分每周限额，将在 " + m[1].replace(/days?/g, "天").replace(/hours?/g, "小时").replace(/minutes?/g, "分钟") + " 后完全刷新。"],
  ];

  // ============================================================
  // 翻译引擎
  // ============================================================
  function translate(text) {
    if (!text || typeof text !== 'string') return null;
    var trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) return null;

    // 跳过纯数字、路径、URL、代码
    if (/^[\\d.,%:;\\-+*/=<>()\\[\\]{}]+$/.test(trimmed)) return null;
    if (/^(https?:\\/\\/|file:\\/\\/|\\/)/.test(trimmed)) return null;
    if (/[{}();=]/.test(trimmed) && trimmed.length > 30) return null;

    // 精确匹配
    var exact = T[trimmed];
    if (exact) return text.replace(trimmed, exact);

    // 正则匹配
    for (var i = 0; i < RE.length; i++) {
      var match = trimmed.match(RE[i][0]);
      if (match) return text.replace(trimmed, RE[i][1](match));
    }

    return null;
  }

  // ============================================================
  // 防抖 / 防死循环 (Anti-thrashing)
  // ============================================================
  var mutationCount = 0;
  var isThrashing = false;
  
  setInterval(function() {
      if (mutationCount > 50) {
          console.warn('ZHCN: Thrashing detected! Pausing translation to prevent UI freeze.');
          isThrashing = true;
          setTimeout(function() { isThrashing = false; }, 2000);
      }
      mutationCount = 0;
  }, 500);

  // ============================================================
  // DOM 遍历与替换
  // ============================================================
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1, PRE: 1, SVG: 1, MATH: 1, NOSCRIPT: 1 };
  var ATTR_LIST = ['title', 'aria-label', 'placeholder', 'alt', 'data-tooltip'];

  function processTextNode(node) {
    if (!node.textContent || !node.textContent.trim()) return false;
    var parent = node.parentElement;
    if (parent && SKIP_TAGS[parent.tagName]) return false;

    var result = translate(node.textContent);
    if (result !== null && result !== node.textContent) {
       node.textContent = result;
       return true;
    }
    return false;
  }

  function processAttributes(el) {
    var changed = false;
    for (var i = 0; i < ATTR_LIST.length; i++) {
      var val = el.getAttribute(ATTR_LIST[i]);
      if (val) {
        var result = translate(val);
        if (result !== null && result !== val) {
          el.setAttribute(ATTR_LIST[i], result);
          changed = true;
        }
      }
    }
    return changed;
  }

  function processTree(root) {
    if (!root) return false;
    var changed = false;
    // 文本节点
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while (node = walker.nextNode()) {
      if (processTextNode(node)) changed = true;
    }
    // 属性
    if (root.querySelectorAll) {
      var elements = root.querySelectorAll('[title], [aria-label], [placeholder], [alt], [data-tooltip]');
      for (var i = 0; i < elements.length; i++) {
        if (processAttributes(elements[i])) changed = true;
      }
    }
    return changed;
  }

  // ============================================================
  // 初始化 & MutationObserver
  // ============================================================
  function init() {
    processTree(document.body);

    var observer = new MutationObserver(function(mutations) {
      if (isThrashing) return;
      
      var hasChanges = false;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) {
            var added = m.addedNodes[j];
            if (added.nodeType === Node.TEXT_NODE) {
              if (processTextNode(added)) hasChanges = true;
            } else if (added.nodeType === Node.ELEMENT_NODE) {
              if (processTree(added)) hasChanges = true;
            }
          }
        } else if (m.type === 'characterData') {
          if (processTextNode(m.target)) hasChanges = true;
        }
      }
      
      if (hasChanges) {
          mutationCount++;
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // 确保 body 存在
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();`;
}
