# Google AI Studio CN

A Chrome extension for translating Google AI Studio into Chinese.

## Preview

### Chinese Translation Enabled

![Preview On](screenshots/preview-on-1.jpg)

![Preview On 2](screenshots/preview-on-2.jpg)

### Original English Interface

![Preview Off](screenshots/preview-off-1.jpg)

### Installation Guide

![Installation Guide](screenshots/installation-guide.png)

---

## Features

* Translate Google AI Studio UI into Chinese
* One-click enable / disable switch
* Dynamic page translation support
* Lightweight local-only extension
* No server required
* Chrome Extension Manifest V3

---

## Installation

1. Download this repository as ZIP
2. Extract the ZIP file
3. Open Chrome and go to:

```text
chrome://extensions/
```

4. Enable **Developer Mode**
5. Click **Load unpacked**
6. Select the extracted project folder that contains `manifest.json`

---

## Usage

1. Open Google AI Studio
2. Click the extension icon
3. Enable the translation switch
4. Refresh the page if necessary

---

## Technical Details

* Chrome Extension Manifest V3
* MutationObserver
* TreeWalker DOM traversal
* Dynamic translation dictionary
* Local DOM text replacement

---

## TODO

* Expand translation dictionary
* Improve dynamic content detection
* Support more UI pages
* Add multilingual support
* Publish to Chrome Web Store

---

## License

MIT License
