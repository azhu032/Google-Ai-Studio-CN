# Google AI Studio CN

<div align="center">

<img src="screenshots/preview-on-1.jpg" width="100%" />

<br>
<br>

A lightweight Chrome extension for translating Google AI Studio into Chinese.
Google AI Studio 中文界面汉化插件。

<br>

![License](https://img.shields.io/badge/license-MIT-green)
![Manifest](https://img.shields.io/badge/Manifest-V3-blue)
![Platform](https://img.shields.io/badge/Platform-Chrome-orange)

</div>

---

## Overview ｜ 项目简介

Google AI Studio CN is a lightweight Chrome extension designed to localize the Google AI Studio interface into Chinese.

The extension performs local DOM text replacement directly inside the browser, allowing users to switch between English and Chinese UI through a simple toggle.

Google AI Studio CN 是一个用于 Google AI Studio 的 Chrome 浏览器汉化插件。

插件通过本地网页文本替换实现界面中文化，并支持通过开关控制启用与关闭。

---

## Preview ｜ 效果展示

### Translation Enabled ｜ 汉化开启

<div align="center">
<img src="screenshots/preview-on-1.jpg" width="90%" />
<br><br>
<img src="screenshots/preview-on-2.jpg" width="90%" />
</div>

---

### Original Interface ｜ 原始英文界面

<div align="center">
<img src="screenshots/preview-off-1.jpg" width="90%" />
</div>

---

### Installation Guide ｜ 安装方式

<div align="center">
<img src="screenshots/installation-guide.png" width="90%" />
</div>

---

## Features ｜ 功能特点

* Chinese localization for Google AI Studio
* One-click translation toggle
* Dynamic page translation support
* Lightweight and local-only
* No server required
* Chrome Extension Manifest V3
* MutationObserver-based DOM detection
* Dynamic translation dictionary

---

## Installation ｜ 安装教程

### 1. Download Repository

Download this repository as ZIP.

下载当前仓库 ZIP 文件。

---

### 2. Extract Files

Extract the ZIP file to a local folder.

将 ZIP 文件解压到本地目录。

---

### 3. Open Chrome Extensions

Open:

```text
chrome://extensions/
```

---

### 4. Enable Developer Mode

Enable the Developer Mode switch.

开启开发者模式。

---

### 5. Load Extension

Click:

```text
Load unpacked
```

Then select the extracted project folder containing:

```text
manifest.json
```

点击“加载已解压的扩展程序”，并选择包含 manifest.json 的项目根目录。

---

## Usage ｜ 使用方法

1. Open Google AI Studio

2. Click the extension icon

3. Enable the translation switch

4. Refresh the page if necessary

5. 打开 Google AI Studio

6. 点击插件图标

7. 开启汉化开关

8. 如有需要刷新页面

---

## Technical Details ｜ 技术说明

### Core Technologies

* Chrome Extension Manifest V3
* MutationObserver
* TreeWalker DOM traversal
* Local DOM text replacement
* Dynamic translation dictionary

### Architecture

The extension monitors DOM changes in real time and dynamically replaces predefined interface text with localized Chinese content.

插件通过监听页面 DOM 变化，对预设英文界面文本进行动态中文替换。

---

## Roadmap ｜ 后续计划

* Expand translation dictionary

* Improve dynamic content detection

* Support more AI Studio pages

* Multi-language support

* Chrome Web Store release

* 扩展翻译词典

* 优化动态内容识别

* 支持更多 AI Studio 页面

* 多语言支持

* 发布 Chrome Web Store 版本

---

## License ｜ 开源协议

MIT License
