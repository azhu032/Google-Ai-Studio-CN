/**
 * Google AI Studio 汉化助手 - 深度优化专业版 content.js
 * 
 * 核心技术栈：
 * 1. TreeWalker 高速 DOM 过滤遍历
 * 2. 状态原子持久备份 (__originalValue) 与翻译防重标记 (__translated)
 * 3. 500ms 防抖 (Debounce) + 最大 300 节点分批分时处理，完全解决大页面高负载卡死问题
 * 4. 彻底的 MutationObserver 断开保护，翻译过程中完全屏蔽事件监听，防止产生递归级联崩溃
 * 5. 精构排叠长文本优先匹配字典与正则捕获引擎，完全回避各种局部替换冲突
 */

// ==========================================
// 400+ 词汇的高可用分类翻译字典 (rawDictionary)
// ==========================================
const rawDictionary = {
  // === 1. NAVIGATION & LAYOUT (导航与全局布局) ===
  "Get code to integrate Google's latest Gemini models into your applications": "获取将 Google 最新 Gemini 模型集成到您的应用的示例代码",
  "Use system instructions to guide model behavior": "使用系统指令来指导模型的行为与特征倾向",
  "A simple way to build dynamic and structured apps directly from prompts": "直接通过提示词即可构建动态与结构化应用的便捷通道",
  "Connect with databases, handle authorization and export clean setups": "支持配置远程数据库、维护用户安全受控授权，并一键打包导出",
  "Check the rate limits and pricing charts for various models": "查阅不同模型的限制边界和商业收费明细图表",
  "Test, compare and select the best model for your specific scenarios": "在具体场景下对不同规格的大模型进行评测、对比并做方案选型",
  "Export the full prompt workspace in standard programming languages": "将当前的提示词工程工作区导出为各标准程序开发语言代码",
  "Create structured data schemas to format and strict outputs": "配置结构化模式架构，从而严格地约束返回数据为标准 JSON 格式",
  "Manage your Gemini keys safely and consult current pricing tiers": "妥善保存与维护您的 Gemini 密钥，查看实时套餐计费规则",
  "Manage custom model fine-tuning and consult logs": "管理与配置定制模型的微调训练进度，实时查询运行日志",
  "Quickly prototype with Gemini models": "快速基于 Gemini 深度大模型开发功能原型",
  "Describe an app and let Gemini do the rest": "描述一个应用，让 Gemini 完成剩下的工作",
  "Discover and remix app ideas": "发现并复刻各种应用灵感",
  "Add database and user authentication": "添加数据库与用户身份验证",
  "Add database and auth": "添加数据库与身份验证",
  "Convert text to speech": "文本转语音",
  "Browse the app gallery": "浏览应用画廊",
  "Create & edit images": "创建与编辑图像",
  "Generate music": "生成音乐",
  "Google AI Studio": "Google AI Studio",
  "Welcome back": "欢迎回来",
  "Sign in with Google": "通过 Google 登录",
  "New prompt": "新建提示词",
  "Chat prompt": "聊天提示词",
  "Freeform prompt": "自由格式提示词",
  "Structured prompt": "结构化提示词",
  "My prompts": "我的提示词",
  "Recent prompts": "最近的提示词",
  "View all prompts": "查看所有提示词",
  "Recent": "最近使用",
  "Library": "素材库",
  "Get API key": "获取 API 密钥",
  "API keys": "API 密钥",
  "Create API key": "创建 API 密钥",
  "Home": "首页",
  "Apps": "应用",
  "Gallery": "画廊",
  "Build": "构建",
  "Documentation": "开发文档",
  "Quickstart": "快速开始",
  "API reference": "API 参考",
  "Troubleshooting": "问题排查",
  "Help": "帮助方式",
  "Send feedback": "发送反馈",
  "History": "历史记录",
  "Dashboard": "控制台",
  "Billing": "账单计费",
  "Sign out": "退出登录",
  "Log out": "登出账户",
  "Manage account": "管理账号",
  "Manage Keys": "管理密钥",
  "Pricing": "产品定价",
  "Terms of Service": "服务条款",
  "Privacy Policy": "隐私政策",
  "Developer Profile": "开发者个人资料",

  // === 2. PLAYGROUND & PROMPT EDITOR (测试沙盒与提示词编辑器以及扩大翻译) ===
  "Playground": "操作台",
  "Explore Google models": "探索 Google 模型",
  "Models": "模型",
  "Agents": "智能体",
  "Featured": "推荐",
  "Test out our most advanced and newest models.": "试用我们最先进、最新的模型。",
  "Code and Chat": "代码与聊天",
  "Build chatbots, agents, and code with Gemini 3.": "使用 Gemini 3 构建聊天机器人、智能体和代码。",
  "Image Generation": "图像生成",
  "Create and edit images with Nano Banana and Imagen.": "使用 Nano Banana 和 Imagen 创建并编辑图像。",
  "Video Generation": "视频生成",
  "Generate videos with Veo models, our state of the art video generation models.": "使用 Veo 模型生成视频，这是我们先进的视频生成模型。",
  "Speech and Music": "语音与音乐",
  "Explore our text to speech and music generation models.": "探索我们的文本转语音和音乐生成模型。",
  "Real-time": "实时",
  "Real-time voice and video with Live API.": "使用 Live API 进行实时语音和视频。",
  "Start building \u2192": "开始构建 \u2192",
  "Start building ->": "开始构建 ->",
  "Start building": "开始构建",
  "Start typing a prompt to see what our models can do": "输入提示词，查看模型能做什么",
  "Start typing a prompt to see what our agents can do": "开始输入提示词，看看我们的智能体能做些什么",
  "Grounding with Google Search": "使用 Google 搜索进行资料支撑",
  "URL context": "URL 上下文",
  "Thinking summaries": "思考过程摘要",
  "Collaborative planning": "协同规划",
  "What's new": "更新日志",
  "This model is not stable and may not be suitable for production use. Learn more.": "该模型不属于稳定版，可能不适合在生产环境中使用。了解更多。",
  "Upgrade to unlock more": "升级以解锁更多偏高配额",
  "Access higher limits, Pro models, and more.": "获取更充裕的限额、Pro 模型及更多丰富功能。",
  "Deep Research Preview": "深度研究预览版",
  "Our agent for long-running context gathering & synthesis tasks, optimized for speed and efficiency.": "我们用于处理长时间上下文收集与综合任务的智能体，针对速度和效率进行了深度优化。",
  "Optional tone and style instructions for the model": "可选的模型语气 and 风格指令",
  "Code execution": "代码执行",
  "Grounding with Google": "Google 结合搜索 (Grounding)",
  "Source: Google Search": "来源：Google 搜索",
  "Google Search": "Google 搜索",
  "Run settings": "运行设置",
  "Write your prompt here": "在此处输入您的提示词...",
  "Type your message": "输入您的消息",
  "Type your message...": "输入您的消息...",
  "Run the prompt": "运行提示词",
  "Stop generation": "停止生成",
  "Stream output": "流式输出",
  "Save prompt": "保存提示词",
  "Saved prompts": "已保存的提示",
  "Save changes": "保存更改",
  "Discard changes": "放弃更改",
  "Rename prompt": "重命名提示词",
  "Get code": "获取代码",
  "Share prompt": "分享提示词",
  "Compare models": "对比模型",
  "System instruction": "系统指令",
  "System instructions": "系统指令",
  "Write system instructions here": "在此处输入系统指令，引导模型的角色和行为...",
  "Add media": "添加多媒体",
  "Add image": "添加图片",
  "Add video": "添加视频",
  "Add audio": "添加音频",
  "Add file": "添加文件",
  "Insert file": "插入文件",
  "Upload file": "上传文件",
  "Supported formats": "支持的格式",
  "Drag and drop files here": "将文件拖放到此处",
  "Clear conversation": "清空对话",
  "Regenerate response": "重新生成回答",
  "Copy response": "复制回答",
  "Insert variable": "插入变量",
  "Test inputs": "测试输入",
  "Add test case": "添加测试样例",
  "Add testcase": "添加测试用例",
  "Variables": "变量列表",
  "Test your prompt with multiple inputs": "使用多组输入进行提示词测试",
  "No variables in prompt": "提示词中不含变量",
  "Tokens": "词元 (Token)",
  "Input tokens": "输入 Token",
  "Output tokens": "输出 Token",
  "Total tokens": "总 Token",
  "Context window": "上下文窗口",
  "Remaining tokens": "剩余 Token",

  // === 3. ADVANCED PARAMETERS & MODEL PARAMETERS (高级参数与模型配置) ===
  "Model settings": "模型设置",
  "Model configuration": "模型配置",
  "Temperature": "温度参数",
  "Controls the randomness of the output": "控制输出的随机性。数值较低时，结果更具确定性；数值较高时，结果更具创意与多样性。",
  "Max outputs": "最大输出 Token 数",
  "Max output tokens": "最大输出 Token 限制",
  "Stop sequence": "停止序列",
  "Stop sequences": "停止序列",
  "Enter a stop sequence": "输入停止字符（回车生效）",
  "Top K": "Top K 采样",
  "Top P": "Top P 采样",
  "Presence penalty": "存在惩罚",
  "Frequency penalty": "频率惩罚",
  "Response MIME type": "响应 MIME 类型",
  "JSON Schema": "JSON 模式架构",
  "Optional": "可选",
  "Required": "必填",

  // === 4. SAFETY SETTINGS (安全防护设置) ===
  "Safety settings": "安全设置",
  "Safety Settings": "安全设置",
  "Adjust safety block thresholds": "调整安全拦截阈值。过于严格的设定可能会拦截合理的询问。",
  "Block none": "不拦截",
  "Block few": "低度拦截",
  "Block some": "中度拦截 (拦截部分)",
  "Block most": "高度拦截 (拦截大部分)",
  "Harassment": "骚扰言论",
  "Hate speech": "仇恨言论",
  "Sexually explicit": "露骨或性暗示内容",
  "Dangerous content": "危险或违法内容",
  "Civic integrity": "公民与选举人诚信保全",
  "Safety threshold": "安全门槛",

  // === 5. BUILD & INTERACTIVE APPS TOOL (应用构建助手) ===
  "App Template": "应用模板",
  "Start from scratch": "白手起家 (从零开始)",
  "Preview app": "预览应用",
  "Export code": "导出代码文件",
  "Deploy": "一键部署",
  "Deploy app": "部署应用",
  "My Apps": "我的应用",
  "All Apps": "所有应用",
  "Featured Apps": "精选展示应用",
  "Remix this app": "复刻并修改此应用",
  "Fork this project": "派生 (Fork) 此项目",
  "Build interactive web apps with AI": "使用 AI 创意和构建交互式 Web 网页应用",
  "Create landing pages, mini-games, and custom AI tools": "创建落地展示页、趣味网页小游戏和自定义专属 AI 工具",
  "See what's possible": "查看令人惊叹的范例",

  // === 6. API KEYS & KEY MANAGEMENT (API 密钥管理专属) ===
  "Create API key in new project": "在新项目中创建 API 密钥",
  "Create API key in existing project": "在现有项目中创建 API 密钥",
  "Create API Key": "创建全新的 API 密钥",
  "Manage API keys": "管理您的 API 密钥",
  "Associated GCP projects": "关联的 Google Cloud Platform (GCP) 项目",
  "Project ID": "项目 ID",
  "Project name": "项目名称",
  "Create new project": "创建新的 GCP 项目",
  "Select a project": "选择一个现有项目",
  "Search projects": "快速搜索项目",
  "No projects found": "没有找到可适配的 GCP 项目",
  "Copy API key": "复制密钥字符串",
  "API key copied": "API 密钥已复制到剪贴板！",
  "Show key": "显示密钥",
  "Hide key": "隐藏密钥",
  "Delete key": "永久删除此密钥",
  "Are you sure you want to delete this API key?": "您确定要彻底删除该 API 密钥么？这将立使该密钥相关的任何应用请求失效！",
  "This action cannot be undone": "注意：本操作不可逆，无法撤销！",
  "Restricted key": "有限受控密钥",
  "Unrestricted key": "无限制自由密钥",
  "API Key Restrictions": "API 密钥来源限制",

  // === 7. SETTINGS & INTERFACE THEME (界面个性化与系统设置) ===
  "Google Settings": "Google 账号设置",
  "Platform Settings": "运行平台设置",
  "Default Model": "配置默认模型",
  "Default System Instruction": "默认系统设定指令",
  "Dark theme": "深色皮肤模式",
  "Dark Mode": "深色模式",
  "Light theme": "浅色明亮模式",
  "Light Mode": "浅色模式",
  "System default": "遵循系统全局默认",
  "Theme": "界面主题设定",
  "Appearance": "视觉外观",
  "Show token counts": "常态显示 Token 计数统计",
  "Show safety settings": "常态显示安全设置侧边栏",
  "Auto-save drafts": "自动保存修改草稿",
  "VPC Service Controls": "VPC 专用服务访问控制",
  "Sign in": "登录个人中心",
  "Account details": "账户明细详情",
  "Billing account": "关联谷歌结算账号",

  // === 8. USAGE, RATE LIMITS, COST & QUOTAS (使用度量、速度控制与计费) ===
  "Usage stats": "使用统计控制台",
  "Quota limit": "安全配额限额",
  "Quota limits": "配额限制区间",
  "Rate limit": "速率限制",
  "Rate limits": "请求限流上限 (Rate limits)",
  "Requests per minute": "每分钟最高限制请求数 (RPM)",
  "Tokens per minute": "每分钟 Token 消费上限 (TPM)",
  "Requests per day": "每天总请求配额 (RPD)",
  "Peak usage": "峰值用量走势",
  "Free Tier limits": "由于属于免费版产生的配额限制",
  "Pay-as-you-go Pricing": "量入为出（按度量收费）的定价原则",
  "Current plan": "您当前的账户方案",
  "Billing details": "计费费率明细",
  "Upgrade plan": "升级商业额度方案",
  "Spend limit": "账单消费限额",
  "Spend limits": "费用上限控制",
  "Monthly spend": "本月累计消费金额",
  "Estimated cost": "预计实时计费额",
  "Billing billing cycle": "月度账期结算环比",
  "Usage by model": "依具体模型维度得出的耗费报表",
  "Active projects": "正在产生用量的活跃项目",

  // === 9. LOGS, DATASETS & EVALUATION (评估测试、本地数据集与运行记录) ===
  "Evaluation": "提示词效果评估",
  "Dataset": "离线数据集",
  "Datasets": "离线数据集列表",
  "Log logs": "请求日志",
  "View logs": "查看云端后台日志",
  "Import dataset": "导入本地数据集",
  "Export dataset": "导出干净数据集",
  "Create new dataset": "新建分类数据集",
  "Rows": "有效数据行",
  "Columns": "属性标签列",
  "Upload CSV": "上传标准化 CSV 文件",
  "Schema mismatch": "属性列映射格式不匹配",
  "Run evaluation": "执行批量效果评测",
  "Evaluation results": "质量评测结果汇总",
  "Test cases": "调试测试样例",
  "System prompt": "默认全局 System 提示词",
  "Target metric": "指标评判标准",
  "Logs and Datasets": "日志跟踪与测试数据集",

  // === 10. MODEL SELECTOR & CHIPS (模型列表与产品选型) ===
  "Select model": "选定工作模型",
  "Select a model": "请选择用于分析的模型",
  "Latest models": "最新主力模型",
  "Legacy models": "旧版本存量模型",
  "Experimental models": "前沿实验研究模型",
  "Tuned models": "您定制微调过的专属模型",
  "Tune a model": "个性化精调模型",
  "Create tuned model": "开始并配置模型微调任务",
  "Fine-tuning": "模型微调",
  "Input limit": "最高可支持的输入上限",
  "Output limit": "单次回答最高产生的输出上限",

  // === 11. GENERAL USER ACTIONS & ALERTS (通用动作按钮与各类控制控件) ===
  "Create": "创建并使生效",
  "Cancel": "取消操作",
  "Delete": "彻底删除",
  "Save": "确认保存",
  "Share": "分享内容",
  "Download": "保存到本地",
  "Upload": "上载本地数据",
  "Close": "关闭对话框",
  "Dismiss": "忽略提醒",
  "Confirm": "确认动作",
  "OK": "明白",
  "Yes": "确定是",
  "No": "返回否",
  "Back": "返回上页",
  "Next": "进行下一步",
  "Apply": "应用此设置",
  "Reset": "还原初始值",
  "Reset to default": "一键恢复为默认状态",
  "Copy": "一键复制",
  "Copied!": "已复制到剪贴板！",
  "Loading": "数据获取中",
  "Loading...": "数据获取中...",
  "Please wait": "请耐心等候",
  "Please wait...": "进行中，请耐心等候...",
  "Edit": "进入编辑",
  "Add": "添加",
  "Source": "来源",
  "More": "更多拓展",
  "Options": "更多定制选项",
  "More options": "显示更多选项",
  "Expand": "点击展开",
  "Collapse": "点击收起",
  "Select all": "全选当前",
  "Clear all": "清空全部内容",
  "Search": "按关键字检索",
  "Filter": "筛选符合条件的行",
  "Sort by": "排序条件",
  "Unknown": "状态未知",
  "Refresh": "重新加载",
  "Reload": "刷新页面",
  "Done": "操作成功完成",
  "Finish": "结束",
  "Add role": "增加参与人角色",
  "Add content": "加入提示片段",
  "Remove": "移除当前",

  // === 12. RUNTIME NOTIFICATIONS, WARNINGS & ERRORS (运行时警告、异常及中间通知) ===
  "Error": "运行错误",
  "An error occurred": "发生系统异常错误",
  "Something went wrong": "服务器开小差了，请稍后刷新重试",
  "Network Error": "您的网络连接异常",
  "Connection timeout": "请求网络超时",
  "Invalid API Key": "您的 API 密钥无效或已失效",
  "Quota exceeded": "您的 API 消费已超出当天分配配额限额",
  "Rate limit exceeded": "您的请求频次已触碰安全防爆流控制限制",
  "Bad request": "发送的内容格式不符合服务端接口规范",
  "Forbidden": "您当前的凭证无权限访问此服务",
  "Not found": "请求的资源未在服务器中找到",
  "Internal server error": "谷歌大模型服务器发生了未知的内部服务错误",
  "Access denied": "由于安全策略原因拒绝了您的访问",
  "Please sign in": "访问本项服务前，请保证您处于登录状态",
  "Saving...": "同步至云底座中...",
  "Saved": "数据成功保存",
  "Failed to save": "云端同步失败，请检查网络",
  "Generating...": "Gemini 正在全速生成中...",
  "Running...": "任务正在处理中...",
  "Success": "操作运行成功！",

  // === 13. EXTRA PLAYGROUND & SUBPAGE DICTIONARIES (操作台子页面高精度扩设翻译) ===
  "Thinking level": "思考等级",
  "High": "高",
  "Medium": "中",
  "Low": "低",
  "Tools": "工具",
  "Structured outputs": "结构化输出",
  "Function calling": "函数调用",
  "Grounding Maps": "地图资料支撑",
  "Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities": "我们最新的前沿推理模型，具备出色的深度理解、细致推理、多模态理解和代码能力",
  "Model selection": "模型选择",
  "Model family": "模型系列",
  "Reasoning": "推理模型",
  "Multimodal": "多模态模型",
  "Text Generation": "文本生成",
  "Audio Generation": "音频生成",
  "Video Generation": "视频生成",
  "Model description": "模型描述",
  "Model parameters": "模型参数",
  "Input price": "输入计费",
  "Output price": "输出计费",
  "Pricing per 1M tokens": "每百万 (1M) 词元的价格",
  "Context window size": "上下文窗口大小",
  "Release date": "发布日期",
  "Learn more about models": "了解关于各种模型的更多信息",
  "Find the right model for your project": "为您的实际生产项目寻找最合适的模型规格",
  "Latest Gemini model family": "最新 Gemini 模型系列",
  "All-rounder model for general tasks": "适用于通用业务场景的万能型全能模型",
  "Ultra-fast and cost-effective model": "超快速且极具高性价比的轻量级模型",
  "SOTA multimodality performance": "处于行业最前沿级的多模态表现实力",
  "State-of-the-art vision capabilities": "顶尖的最先进计算机视觉理解分析能力",
  "Highly optimized for coding tasks": "专为编写与审查代码任务进行深度调优的目标模型",
  "Exceptional reasoning and mathematical skills": "具有卓越推理天赋与逻辑数学解答能力的高端规格",
  "Chat": "聊天会话",
  "Conversational agent": "对话式智能体",
  "Chat history": "历史会话记录",
  "Export chat": "导出当前会话",
  "Delete chat": "删除本条对话记录",
  "Chat settings": "聊天会话设置",
  "User turn": "用户提问轮数",
  "Model turn": "模型输出轮数",
  "Add system message": "添加全局系统消息",
  "Send a message": "发送一条消息...",
  "Send bubble": "发送消息气泡",
  "Response format": "响应数据格式",
  "Rich text": "富文本预览",
  "Plain text": "原始纯文本",
  "Markdown preview": "Markdown 渲染预览",
  "Stream response": "开启流式回答机制",
  "Edit user prompt": "编辑用户提示词",
  "Edit model response": "修改模型回复文本",
  "Delete message turn": "删除此轮对话交互",
  "Conversation history": "对话历史轨迹",
  "Generate Image": "生成图像",
  "Edit Image": "编辑图像",
  "Aspect ratio": "设定图片宽高比例",
  "Square": "方形比例 (1:1)",
  "Landscape": "宽屏横放 (16:9)",
  "Portrait": "垂直竖放 (9:16)",
  "Number of images": "批量生成输出数量",
  "Image resolution": "生成图像的分辨率",
  "Negative prompt": "排除/反向避开提示词",
  "Prompt strength": "提示词引导相关度强度 (CFG)",
  "Seed": "固定数值种子 (Seed)",
  "Style filter": "应用艺术风格滤镜",
  "No style": "不指定任何风格",
  "Photorealistic": "写实摄影大片",
  "Anime": "唯美动漫画风",
  "3D Render": "3D 拟真模型渲染",
  "Oil Painting": "古典手绘油画",
  "Sketch": "手绘铅笔铅彩素描",
  "Water color": "淡雅艺术水彩",
  "Download image": "下载本张图像",
  "Generate again": "重新运算生成",
  "Save to collection": "收藏当前精选图像",
  "High resolution image": "高清大尺寸画质",
  "Prompt guidance scale": "提示引导权重系数",
  "Generate Video": "生成视频",
  "Video prompt": "视频控制提示词",
  "Duration": "播放时长",
  "Seconds": "秒数控制",
  "Frame rate": "渲染动画帧率",
  "FPS": "FPS (每秒帧数)",
  "Camera movement": "指定运镜轨迹动作",
  "Zoom in": "镜头推近 (Zoom in)",
  "Zoom out": "镜头拉远 (Zoom out)",
  "Pan left": "平稳向左横移 (Pan left)",
  "Pan right": "平稳向右横移 (Pan right)",
  "Tilt up": "镜头向上俯仰 (Tilt up)",
  "Tilt down": "镜头向下俯仰 (Tilt down)",
  "Motion level": "合成运动幅度等级",
  "SOTA video generation": "顶尖高级质感视频合成",
  "Veo generation speed": "Veo 高维视频生成效率",
  "Render video clip": "渲染与准备视频切片",
  "Video Aspect Ratio": "视频物理显示长宽比",
  "Text to Speech": "文本转语音 (TTS)",
  "Speech synthesis": "高保真语音合成",
  "Music generation": "AI 谱曲与音乐生成",
  "Voice model": "选定配音声音模型",
  "Select voice": "选择配音角色声线",
  "Male voice": "浑厚男低音",
  "Female voice": "亲切女播音",
  "Neural voice": "拟真神经网络声音",
  "Speed rate": "播放语速节律",
  "Pitch": "声调高低强弱",
  "Generate speech": "开始运行语音合成",
  "Generate music track": "自动生成对应音乐段落",
  "Audio length": "输出音频期望长度",
  "Instrumental": "去除人声的器乐纯音乐",
  "Vocal style": "指定人声演唱特色",
  "Tempo": "声轨节奏变奏速度",
  "Beats per minute": "每分钟节拍频率 (BPM)",
  "Download audio": "下载本地音频文件",
  "Synthesizing audio": "混合与编码音频流中",
  "Real-time voice": "双向低延迟实时语音",
  "Real-time video": "毫秒级实时视频画面",
  "Live session": "热插拔实时长连会话",
  "Start session": "拉起并激活会话",
  "End session": "主动关闭释放连接",
  "Microphone permissions": "配置本地麦克风权限",
  "Camera access": "调配本地摄像头获取",
  "Latency": "端到端实时物理延迟",
  "Connection status": "当前长物理网络通道状态",
  "Connected": "通信正常连接中",
  "Connecting...": "深度握手与连接建立中...",
  "Disconnected": "通信信道已安全断开",
  "Live streaming": "低门槛实时推流服务",
  "Audio output device": "音频回放与输出物理设备",
  "Input source": "选择采音/图像捕获硬件",
  "Run Settings": "运行设置",
  "Model Selection": "大模型方案选型",
  "System Instructions": "默认系统级引导指令",
  "Advanced Configurations": "深度调优高级控制参数",
  "Input Tokens Limit": "输入上文词元边界阈值",
  "Output Tokens Limit": "单次应答词元输出硬限制",
  "Stop Sequences Settings": "终止序列配置生效",
  "Top-P Sampling": "Top-P 核概率密度采样",
  "Top-K Sampling": "Top-K 限制候选词数量采样",
  "Temperature Setting": "核心创造温度系数控制",
  "Presence Penalty Value": "存在阻尼惩罚惩罚偏好",
  "Frequency Penalty Value": "频率重现阻碍惩罚强度",
  "MIME type response": "期待响应解析 MIME 编码结构",
  "Apply configurations": "永久应用全局配置覆盖",
  "Restore default settings": "一键退回全部默认设定",
  "Tools Settings": "模型挂载工具设置",
  "Enable code execution": "批准代码自主执行计算服务沙箱",
  "Grounding settings": "结合外部检索辅助设定",
  "Google search grounding": "使用 Google Search 联网更新和依据检验",
  "Google maps grounding": "结合 Google Maps 实景地理精确定位解析",
  "Structured output schema": "强制结构化数据 JSON 严格约束模式",
  "Provide JSON schema": "输入自选的 JSON Schema 进行拦截规范",
  "Custom function declarations": "声明自定义外挂 Function 调用契约",
  "Add function": "注册新增一组可用外挂函数",
  "Function parameters": "明确函数物理出入参数",
  "Function description": "针对该函数用途与副作用的解释说明",
  "Enter your prompt": "在此书写您的具体诉求提示词...",
  "Run the current prompt": "在当前选定模型上试跑本组提示词",
  "Clear current workspace": "清空整个当前工作面板",
  "Insert variable placeholder": "植入可迭代运行 Caucasian 的动态占位变量",
  "Add data examples": "填加用于 Few-Shot 的正反向参考用例",
  "Input prompt": "上游承载提示词输入",
  "Model generated output": "模型推理计算所得的输出结果",
  "Copied successfully": "文本内容已非常安全地复制至剪贴板",
  "Select target language": "设定期待转译与整合的应用环境编程语言",
  "Export as script": "以此形态发布并导出独立工程脚本",
  "Python script": "Python 完整调用脚本",
  "JavaScript SDK": "JavaScript/TypeScript 标准 SDK 服务代码",
  "cURL request": "标准 cURL 网络交互包文本",
  "Swift code": "iOS Swift 快速实现方案",
  "Kotlin code": "Android Kotlin 标准接入方案",
  "Re-run": "重新运行",
  "Try again": "再次尝试",
  "Copy settings": "复制当前配置",
  "Duplicate prompt": "完整复制并克隆提示词",
  "Export prompt": "将提示词工作流导出为本地配置文件",
  "Import prompt": "载入本地提示词流程配置",
  "Delete prompt": "永久将此提示词从配置档案中抹去",
  "No history found": "尚未追溯到活跃的运行测试历史记录",
  "Prompt running error": "提示词引擎运作异常中止",
  "Server is busy": "模型容器资源排队压力过大，请稍后再试",
  "Authentication failed": "身份权限校验凭据过期，请刷新主页面登录",
  "Request payload too large": "请求有效字节荷载超限，请考虑压缩素材",
  "Invalid parameter": "参数越界或格式存在畸变，无法被解析服务端识别",
  "Initializing model...": "正在极速热启动并装载模型网络权重...",
  "Processing media...": "正在压缩和转码多媒体多模态输入源中...",
  "Formatting layout...": "排版微调布局排布构建...",
  "Searching web...": "正在联网通过全球网页拉取实时外部知识库体系...",
  "Generating code block...": "AI 正在全力以赴编译和规划输出的代码段...",
  "Successfully completed": "整套流程非常完美地在限时内完成！",
  "tokens": "词元",
  "images": "图像"
};

// ==========================================
// 动态带有变量的特殊文本匹配正则规则库 (regexRules)
// ==========================================
const regexRules = [
  { pattern: /\bRun for (\d+(?:\.\d+)?)\s*s\b/gi, replacement: "运行 $1 秒" },
  { pattern: /\bRun for (\d+(?:\.\d+)?)\s*ms\b/gi, replacement: "运行 $1 毫秒" },
  { pattern: /\bGenerated in (\d+(?:\.\d+)?)\s*s\b/gi, replacement: "已在 $1 秒内生成" },
  { pattern: /\bGenerated in (\d+(?:\.\d+)?)\s*ms\b/gi, replacement: "已在 $1 毫秒内生成" },
  { pattern: /\bGenerating for (\d+(?:\.\d+)?)\s*s\b/gi, replacement: "生成耗时 $1 秒" },
  { pattern: /\bGenerating for (\d+(?:\.\d+)?)\s*ms\b/gi, replacement: "生成耗时 $1 毫秒" },
  { pattern: /\bUsed (\d+)\s*tokens?\b/gi, replacement: "已用 $1 个词元" },
  { pattern: /\bUsing (\d+)\s*tokens?\b/gi, replacement: "正使用 $1 个词元" },
  { pattern: /\bLimit of ([\d,]+)\s*tokens?\b/gi, replacement: "限制为 $1 个词元" },
  { pattern: /\b(\d+)\s*of\s*(\d+)\s*characters\b/gi, replacement: "$1 / $2 个字符" },
  { pattern: /\bShowing (\d+)\s*prompts?\b/gi, replacement: "显示 $1 个提示词" },
  { pattern: /\bCreated on ([\d-]+)\b/gi, replacement: "创建于 $1" },
  { pattern: /\b(\d+)\s*tokens\b/gi, replacement: "$1 个词元" },
  { pattern: /\b(\d+)\s*images\b/gi, replacement: "$1 张图像" }
];

// ==========================================
// 5. 新增高精度子页面字典 (addonDictionary)
// ==========================================
const addonDictionary = {
  // === PLAYGROUND SUBPAGES SPECIFIED BY USER ===
  "New": "新",
  "Paid": "付费",
  "Preview": "预览",
  "Lite": "轻量版",
  "Fast": "快速版",
  "Pro": "专业版",
  "Flash": "Flash",
  "State-of-the-art": "前沿",
  "cost-efficient": "成本高效",
  "optimized for": "针对……优化",
  "available to developers": "面向开发者开放",
  "paid tier": "付费层级",
  "generation model": "生成模型",
  "editing model": "编辑模型",
  "multimodal understanding": "多模态理解",
  "coding capabilities": "代码能力",
  "real-time dialogue": "实时对话",
  "multimodal awareness": "多模态感知",

  // 精选模型 (Featured)
  "Featured": "精选模型",
  "Test out our most advanced and newest models.": "测试我们最新、最先进的模型。",
  "Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.": "我们成本最高效的模型，适合高频智能体任务、翻译和简单数据处理。",
  "Our most intelligent model built for speed, combining frontier intelligence with superior search and grounding.": "我们面向速度打造的智能模型，结合前沿智能、强大的搜索和资料支撑能力。",
  "Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities.": "我们最新的前沿推理模型，具备出色的深度理解、细致推理、多模态理解和代码能力。",

  // 代码与聊天 (Code and Chat)
  "Code and Chat": "代码与聊天",
  "Build chatbots, agents, and code with Gemini 3.": "使用 Gemini 3 构建聊天机器人、智能体和代码。",
  "Build apps with Gemini": "使用 Gemini 构建应用",
  "chatbots": "聊天机器人",
  "agents": "智能体",
  "code": "代码",

  // 图像生成 (Image Generation)
  "Image Generation": "图像生成",
  "Create and edit images with Nano Banana and Imagen.": "使用 Nano Banana 和 Imagen 创建并编辑图像。",
  "Pro-level visual intelligence with Flash-speed efficiency and reality-grounded generation capabilities.": "专业级视觉智能，具备 Flash 级效率和贴近现实的生成能力。",
  "State-of-the-art image generation and editing model.": "前沿图像生成与编辑模型。",
  "Our state-of-the-art image generation and editing model.": "我们的前沿图像生成与编辑模型。",

  // 视频生成 (Video Generation)
  "Video Generation": "视频生成",
  "Generate videos with Veo models, our state of the art video generation models.": "使用 Veo 模型生成视频，这是我们的前沿视频生成模型。",
  "Our latest video generation model, available to developers on the paid tier of the Gemini API.": "我们最新的视频生成模型，面向 Gemini API 付费层级开发者开放。",
  "A faster, more accessible version of Veo 3.1, optimized for speed and business use cases. Available to developers on the paid tier of the Gemini API.": "Veo 3.1 的更快速、更易用版本，针对速度和商业场景优化，面向 Gemini API 付费层级开发者开放。",
  "Our most cost-efficient video generation model, designed for rapid iteration and building high-volume applications.": "我们成本最高效的视频生成模型，适合快速迭代和构建高频应用。",

  // 语音与音乐 (Speech and Music)
  "Speech and Music": "语音与音乐",
  "Explore our text to speech and music generation models.": "探索我们的文本转语音和音乐生成模型。",
  "Powerful, low-latency speech generation.": "强大的低延迟语音生成。",
  "Enjoy natural outputs, steerable prompts, and new expressive audio tags for precise narration control.": "支持自然输出、可控提示词和新的表现型音频标签，便于精确控制旁白。",
  "Our advanced, full-song generative model with deep compositional understanding, optimized for precise structural control and complex transitions across diverse musical styles.": "我们先进的整首歌曲生成模型，具备深入的作曲理解能力，适合在多种音乐风格中进行精确结构控制和复杂转场。",
  "Our low-latency, music generation model optimized for high-fidelity audio clips and precise rhythmic control.": "我们的低延迟音乐生成模型，适合生成高保真音频片段并进行精确节奏控制。",

  // 实时互动 (Real-time)
  "Real-time": "实时互动",
  "Real-time voice and video with Live API.": "通过 Live API 实现实时语音与视频功能。",
  "Our low-latency, audio-to-audio model optimized for real-time dialogue with acoustic nuance detection, numeric precision, and multimodal awareness.": "我们的低延迟音频到音频模型，适合实时对话，支持声学细节检测、数值精度和多模态感知。",

  // 底部输入区和右侧设置
  "Start typing a prompt to see what our models can do": "输入提示词，查看模型能做什么",
  "Tools": "工具",
  "Add": "添加",
  "Grounding with Google Search": "使用 Google 搜索进行资料支撑",
  "Run settings": "运行设置",
  "System instructions": "系统指令",
  "Optional tone and style instructions for the model": "可选的模型语气与风格指令",
  "Temperature": "温度参数",
  "Thinking level": "思考等级",
  "High": "高",
  "Medium": "中",
  "Low": "低",
  "Structured outputs": "结构化输出",
  "Code execution": "代码执行",
  "Function calling": "函数调用",
  "Grounding Maps": "地图资料支撑",
  "URL context": "URL 上下文",
  "Edit": "编辑",
  "Source": "来源",

  // 左侧栏
  "Playground": "操作台",
  "Build": "构建",
  "Apps": "应用",
  "Gallery": "画廊",
  "Dashboard": "控制台",
  "Documentation": "开发文档",
  "Search": "搜索",
  "What's new": "最新动态",
  "Get API key": "获取 API 密钥",
  "Settings": "设置",
  "Upgrade to unlock more": "升级以解锁更多功能",
  "Access higher limits, Pro models, and more.": "获得更高额度、Pro 模型以及更多功能。"
};

// 合并主字典与新增子页面高频字典
const combinedDictionary = { ...rawDictionary, ...addonDictionary };

// 预先对字典的键进行长度降序排序，确保匹配复合词和长短句先于单片单词
const sortedTranslationKeys = Object.keys(combinedDictionary).sort((a, b) => b.length - a.length);

// 忽略汉化的选择标签/交互元素，包含防破坏表单和不翻译代码/样式声明
const IGNORED_TAGS = new Set([
  'INPUT', 'TEXTAREA', 'SVG', 'PATH', 'SCRIPT', 'STYLE', 'CODE', 'PRE', 
  'NOSCRIPT', 'IFRAME', 'HEAD', 'LINK', 'META', 'MAT-ICON', 'GOOG-COSMO-ICON'
]);

let isEnabledCache = false;
let isObserving = false;
let debounceTimer = null;
const pendingAddedNodes = new Set();

/**
 * 保护机制：判断某些文本是否不应进行翻译覆盖，例如模型代号、秘钥、纯数字等
 */
function shouldSkipText(text) {
  const trimmed = text.trim();
  if (!trimmed) return true;
  
  // 1. 已含有中文则跳过（避免重复翻译破坏已有内容）
  if (/[\u4e00-\u9fa5]/.test(trimmed)) return true;
  
  // 2. 纯数字、时间、百分比、标点物理量不予替换
  if (/^[\d,.\s\-:\/\|%()+*#@]+$/.test(trimmed)) return true;
  
  // 3. 电子邮箱地址
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) return true;
  
  // 4. 标准 URL
  if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(trimmed)) return true;
  
  // 5. 大模型技术物理代号（如 gemini-1.5, gemma-2b, veo-2.0）
  if (/^(gemini|gemma|veo|imagen|claude|gpt|llama|bison|gecko|text-embedding|embedding)-[a-zA-Z0-9.-]+$/i.test(trimmed)) {
    return true;
  }
  
  // 6. 开发者 API Key（例如 GCP AIzaSy 打头）
  if (/^(AIzaSy)[a-zA-Z0-9_-]{35}$/.test(trimmed)) return true;
  
  // 7. 极单字符
  if (trimmed.length <= 1 && !/^[a-zA-Z]$/.test(trimmed)) return true;
  
  return false;
}

/**
 * 安全检查：过滤用户活跃编辑区或特殊不翻译的代码和样式声明
 */
function shouldSkipNode(node) {
  if (!node) return true;
  
  if (node.nodeType === Node.ELEMENT_NODE && IGNORED_TAGS.has(node.tagName)) {
    return true;
  }
  
  let parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  while (parent) {
    if (IGNORED_TAGS.has(parent.tagName)) {
      return true;
    }
    // 保护 contenteditable 活跃编辑区，防止破坏用户正处于手打拼写或候字状态的输入
    if (parent.isContentEditable || parent.getAttribute('contenteditable') === 'true') {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

/**
 * 基于 DOM TreeWalker 急速收集未汉化合格的文本节点
 */
function collectTextNodes(root, targetArray) {
  if (!root) return;
  if (shouldSkipNode(root)) return;
  
  if (root.nodeType === Node.TEXT_NODE) {
    if (!root.__translated && !shouldSkipText(root.nodeValue)) {
      targetArray.push(root);
    }
    return;
  }
  
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (shouldSkipNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.__translated || shouldSkipText(node.nodeValue)) {
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  while (walker.nextNode()) {
    targetArray.push(walker.currentNode);
  }
}

/**
 * 遍历翻译单个文本节点内容
 */
function translateTextNode(node) {
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  
  const originalValue = node.nodeValue;
  let textToTranslate = node.__originalValue !== undefined ? node.__originalValue : originalValue;
  
  if (shouldSkipText(textToTranslate)) return;
  
  let changed = false;
  
  // 1. 优先执行有变量的正则替换规则 (重置 lastIndex 以防全局匹配标志导致无法复用)
  for (const rule of regexRules) {
    rule.pattern.lastIndex = 0;
    const newText = textToTranslate.replace(rule.pattern, rule.replacement);
    if (newText !== textToTranslate) {
      textToTranslate = newText;
      changed = true;
    }
  }
  
  // 2. 依次匹配 500+ 合并字典项（长文本优先）
  for (const key of sortedTranslationKeys) {
    if (textToTranslate.includes(key)) {
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // 对于无空格的纯拼写单字，使用单词边界匹配保障不会破坏 complex words (如 Chatting / Builder)
      const isSingleWord = /^[a-zA-Z0-9_]+$/.test(key);
      const regex = isSingleWord ? new RegExp('\\b' + escapedKey + '\\b', 'g') : new RegExp(escapedKey, 'g');
      
      const newText = textToTranslate.replace(regex, combinedDictionary[key]);
      if (newText !== textToTranslate) {
        textToTranslate = newText;
        changed = true;
      }
    }
  }
  
  if (changed) {
    // 首次翻译变动时，持久化原生态的英文原文作为还原基盘
    if (node.__originalValue === undefined) {
      node.__originalValue = originalValue;
    }
    node.nodeValue = textToTranslate;
    node.__translated = true;
  }
}

/**
 * 调度汉化动作执行队列
 */
function runTranslationQueue() {
  if (!isEnabledCache) {
    pendingAddedNodes.clear();
    return;
  }
  
  // 翻译前强制断开监听，隔绝对 nodeValue 替换触发二次变更通知引起的无线重入和堆栈溢出
  disconnectObserver();
  
  try {
    const nodesToProcess = [];
    
    if (pendingAddedNodes.size === 0) {
      collectTextNodes(document.body, nodesToProcess);
    } else {
      for (const startNode of pendingAddedNodes) {
        if (document.body.contains(startNode)) {
          collectTextNodes(startNode, nodesToProcess);
        }
      }
    }
    
    let processedCount = 0;
    
    for (const textNode of nodesToProcess) {
      // 阈值限制：单次跑批不超过 300，彻底消除界面卡顿或假死
      if (processedCount >= 300) {
        break;
      }
      
      if (textNode.__translated) {
        continue;
      }
      
      const prevVal = textNode.nodeValue;
      translateTextNode(textNode);
      if (textNode.__translated && textNode.nodeValue !== prevVal) {
        processedCount++;
      }
    }
  } catch (error) {
    console.error('AI Studio 汉化助手出错:', error);
  } finally {
    pendingAddedNodes.clear();
    // 跑批完毕重新安全介入动态监控
    connectObserver();
  }
}

/**
 * 增量节点防抖归拢
 */
function queueTranslate(node) {
  if (!node) return;
  pendingAddedNodes.add(node);
  
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    runTranslationQueue();
  }, 500); // 500ms 深度防抖，大幅降低高频变动开销
}

/**
 * 关闭汉化，全盘恢复页面出厂原有状态
 */
function restoreAllNodes() {
  disconnectObserver();
  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.__originalValue !== undefined) {
        node.nodeValue = node.__originalValue;
        delete node.__originalValue;
        delete node.__translated;
      }
    }
  } catch (e) {
    console.error('还原原始文本失败:', e);
  } finally {
    connectObserver();
  }
}

// 初始化 MutationObserver 实例
const observer = new MutationObserver((mutations) => {
  if (!isEnabledCache) return;
  
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        queueTranslate(node);
      });
    } else if (mutation.type === 'characterData') {
      const node = mutation.target;
      // 当底层原始数据被宿主页面重组并擦写覆盖时，重置其翻译就绪状态以备重新汉化
      if (node.__translated) {
        if (node.nodeValue !== node.__originalValue && !Object.values(combinedDictionary).includes(node.nodeValue)) {
          delete node.__originalValue;
          delete node.__translated;
        }
      }
      queueTranslate(node);
    }
  });
});

function connectObserver() {
  if (isObserving) return;
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
  isObserving = true;
}

function disconnectObserver() {
  if (!isObserving) return;
  observer.disconnect();
  isObserving = false;
}

// 缓存同步载入
chrome.storage.sync.get(['enabled'], (result) => {
  isEnabledCache = !!result.enabled;
  if (isEnabledCache) {
    runTranslationQueue();
  } else {
    connectObserver();
  }
});

// 接收来自 popup 开关联动变更
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.enabled) {
    isEnabledCache = !!changes.enabled.newValue;
    if (isEnabledCache) {
      runTranslationQueue();
    } else {
      restoreAllNodes();
    }
  }
});
