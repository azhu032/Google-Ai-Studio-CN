# Google AI Studio CN — Google AI Studio 汉化插件

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Extension Engine: Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-orange.svg?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Target: Google AI Studio](https://img.shields.io/badge/Target-Google_AI_Studio-deepskyblue.svg?logo=google-gemini&logoColor=white)](https://aistudio.google.com/)

An elegant, secure, and ultra-high-performance Chrome Extension that localizes **Google AI Studio** with precise Chinese translations on the fly. Designed specifically for developers and prompt engineers, it translates system instructions, playground parameter settings, model configurations, and advanced subpages while strictly retaining core technical terms, code snippets, and sensitive credentials uncompromised.

一款专为大模型研究者及提示词工程师量身定制的 Google AI Studio 浏览器汉化插件。基于原生安全的 Web 技术，一键提供高精准度、行级流畅的中文交互体验，同时杜绝误译、不占用多余网络及系统开销。

---

## 📸 Preview / 效果预览

### Translation Active (汉化开启)
| Featured & Chat Playgrounds | Image / Video & Structured Parameters |
| :---: | :---: |
| ![Playground Chinese UI](screenshots/preview-on-1.jpg) | ![Advanced Parameters Panel](screenshots/preview-on-2.jpg) |

### Original UI (汉化关闭)
| Interactive Menu Control Panel |
| :---: |
| ![Original English UI](screenshots/preview-off-1.jpg) |

---

## ✨ Features / 功能特点

- **🎯 Specialized Translation Dictionary (专业大模型语境对齐)**
  - Curated 500+ precise translations specifically targeted for LLM workspace parameters and metadata.
  - Full interface localization including **Temperature (温度参数)**, **Thinking Level (思考等级)**, **Safety settings (安全阈值)**, **System instructions (系统指令)**, **Grounding with Google Search (使用 Google 搜索进行资料支撑)**, and **Structured outputs (结构化输出)**.
  - Optimized for advanced Playgrounds: Chat, Freeform, Image / Video prompt parameters, and Real-time Live WebSockets controls.

- **🛡️ Strict Technical Preservation & Privacy (无源局部防御隔离)**
  - **Prompt Protection**: Never translates user-input prompts, text inside active `contenteditable` editors, textareas, CSS declarations, or code blocks (`<pre>`, `<code>`).
  - **Technical Identifiers Untouched**: Preserves original model identifiers (e.g., *Gemini 1.5/2.5 Pro/Flash*, *Llama*, *Veo 3.1*, *Imagen 3*, *Lyria*), GCP folder/project IDs, API Keys, URLs, and emails.
  - **Zero Server Overhead**: 100% local translation, requires no external servers, maintaining a zero-trust architecture to keep your secrets and prompts fully confidential.

- **⚡ Lightweight Engine with Anti-Crash Shield (零开销智能拦截)**
  - Powered by Chromium's native `TreeWalker` to walk DOM text nodes instantly, keeping the thread footprint near-zero.
  - Features a precise **500ms Debounce** loop to compress dynamic streaming rendering payloads into batch updates.
  - Leverages a **Self-Disconnecting DOM lifecycle** pattern, pausing the `MutationObserver` momentarily during node injection to prevent recursive infinite-loop browser freeze.

---

## 📦 Installation / 安装说明

Follow these simple steps to install the extension manually using Chrome's Developer Mode:

### Step 1: Download & Extract (下载并解压)
Download this repository by clicking **Code** -> **Download ZIP** (or clone it using git). Extract the downloaded `.zip` file into a clean local directory.

### Step 2: Open Extensions Page (进入扩展中心)
Open your Google Chrome (or any Chromium-based browser like Microsoft Edge, Brave, Opera, etc.), type the following URL in the address bar, and press Enter:
```bash
chrome://extensions/
```

### Step 3: Enable Developer Mode (开启开发者模式)
Locate the **"Developer mode" (开发者模式)** toggle switch in the upper-right corner of the Extensions page and turn it **ON**.

### Step 4: Load Unpacked Extension (加载已解压的扩展程序)
1. Click the **"Load unpacked" (加载已解压的扩展程序)** button in the top-left corner.
2. In the folder selection dialog, navigate to the extracted directory.
3. ⚠️ **IMPORTANT**: Select the folder named **`extension`** (which contains the `manifest.json` file inside it) and click **Select Folder**. Select this direct subfolder rather than the main project root folder.

### Step 5: Refresh AI Studio (刷新控制台体验)
Go to [Google AI Studio (https://aistudio.google.com/)](https://aistudio.google.com/) and refresh the page. The interface will now automatically render in localized Chinese!

---

## 🛠️ Installation Step-by-Step Image Guide

![Installation Process Map](screenshots/installation-guide.png)

---

## 💡 Usage / 使用方法

1. **Enable & Disabling**: Click the **Chinese Translator** logo icon in your browser toolbar to summon the popup control panel.
2. **Toggle Switch**: Simply flip the toggle on or off. 
3. **Apply Changes**: Refresh the active [Google AI Studio](https://aistudio.google.com/) workspace tab to immediately apply or disable the translation.

---

## ⚙️ Technical Details / 开发设计要素

The architecture of `Google AI Studio CN` is built strictly on raw Web standards to maximize speed and guarantee zero security risks:

- **Manifest V3**: Native Service Worker structure ensuring compatibility with standard enterprise extension environments.
- **TreeWalker Filtering**: Instead of heavy global string replacement, our script leverages `document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)` to locate and translate text nodes, skipping ignored tags (`SCRIPT`, `STYLE`, `PRE`, `CODE`, and elements carrying `contenteditable` properties).
- **Mutative Anti-Oscillation Shielding**:
  ```javascript
  // Temporary disconnection ensures the observer doesn't capture 
  // its own translation changes, completely avoiding stack overflows.
  observer.disconnect();
  textNode.nodeValue = translatedText;
  observer.observe(document.body, observerConfig);
  ```
- **State Serialization**: Saves user toggle preferences automatically within `chrome.storage.sync` to sync preferences across signed-in Chromium sessions.

---

## 🗺️ TODO / 前瞻规划

- [ ] Support custom hotkeys for on-the-fly toggles.
- [ ] Implement a custom user-defined dictionary for developers to add custom overrides.
- [ ] Publish the extension to the Chrome Web Store for automated background updates.
- [ ] Elaborate translation mapping for advanced tuning dashboard sections.

---

## 📄 License / 许可协议

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for more details.

本项目基于 **MIT 许可证** 开放，代码 100% 自由查阅及个人二次分发。
