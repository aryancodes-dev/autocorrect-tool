<div align="center">

# ✍️ Autocorrect Tool v20 ADVANCED

### *Fix spelling in a single word or a whole sentence — live, offline, on your phone.*

[![Project](https://img.shields.io/badge/Project-%2303_of_100%2B_AI_Projects-8B5CF6?style=for-the-badge)](https://github.com/aryancodes-dev/autocorrect-tool)
[![Version](https://img.shields.io/badge/Version-v20_ADVANCED-36D6C5?style=for-the-badge)](https://github.com/aryancodes-dev/autocorrect-tool)
[![Live](https://img.shields.io/badge/🌐_Live-GitHub_Pages-0B1220?style=for-the-badge)](https://aryancodes-dev.github.io/autocorrect-tool/)
[![License](https://img.shields.io/badge/License-MIT-FFD700?style=for-the-badge)](https://github.com/aryancodes-dev/autocorrect-tool/blob/main/LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Installable-FF69B4?style=for-the-badge)](https://aryancodes-dev.github.io/autocorrect-tool/)

**Project #03 of the 100+ AI Projects series — by Aryan Kumar Shah**

*An advanced autocorrect tool, built as v20 from the start — never a basic v1.*

</div>

---

## ✨ What It Can Do — v20 Advanced

| Feature | Details |
|:---|:---|
| 🔤 **Single word mode** | Type a word, get live **Top-5 suggestions**, tap one to use it |
| 📝 **Sentence / paragraph mode** | Corrects a whole text at once, shows every change |
| 🧠 **Levenshtein distance** | Smart suggestions based on how close a word is to the correct spelling |
| 📖 **Common-misspellings map** | `recieve → receive`, `adress → address`, `tommorow → tomorrow`, `definately → definitely`, `seperate → separate`, `teh → the` — and **80+ more real typos** |
| ⚡ **Advanced fixes (v20)** | Split words (`alot → a lot`, `infront → in front`), double words (`the the → the`), lone `i → I`, capital after `. ! ?`, space after punctuation, collapsed double spaces |
| 📚 **Personal dictionary** | **"Learn this word" / "My words"** — names and correct words you add are never flagged again, saved only on your phone |
| 📊 **Recent corrections + stats** | Words checked, corrections made, your-word count |
| 🎨 **Beautiful ultimate UI** | Gradient glass cards, teal → violet theme, light/dark toggle, phone-first, no horizontal scroll |
| 📴 **Works offline + as an app (PWA)** | Install from Chrome → "Add to Home screen", cache `autocorrect-v20` with old-cache delete |
| 🐍 **Python version included** | `autocorrect.py` with the exact same v20 logic |

---

## 🎯 Examples That Work

| You type | It corrects to | Why |
|:---|:---:|:---|
| `recieve` | **receive** | Common misspelling |
| `adress` | **address** | Missing `d` |
| `tommorow` | **tomorrow** | Missing `r` |
| `definately` | **definitely** | `a` → `i` |
| `seperate` | **separate** | `e` → `a` |
| `teh` | **the** | Swapped letters |
| `alot` | **a lot** | Split word |
| `infront` | **in front** | Split word |
| `the the` | **the** | Double word removed |
| `i am here` | **I am here** | Lone `i` → `I` |
| `hello.world` | **Hello. World** | Capital + space after `.` |

---

## 🚀 Try It

### 🌐 Website / App

1. Open the live link: **[aryancodes-dev.github.io/autocorrect-tool](https://aryancodes-dev.github.io/autocorrect-tool/)**
2. Or open `index.html` directly
3. **Install as an app:** open the live link in Chrome on your phone → menu → **"Add to Home screen"**

### 🐍 Python

```bash
python autocorrect.py
```

Choose:
- `1` = word mode
- `2` = sentence mode
- `3` = loop mode

---

## 🛠️ Tech Stack

| | |
|:---|:---|
| **Web** | HTML, CSS, JavaScript (`index.html`, `style.css`, `app.js`) |
| **Python** | `autocorrect.py` — same v20 logic |
| **PWA** | `manifest.json`, `sw.js` — cache `autocorrect-v20` |
| **Languages** | JavaScript 46.6% • Python 27.1% • HTML 13.5% • CSS 12.8% |
| **License** | MIT |

---

## 📁 Project Structure

```
autocorrect-tool/
├── index.html          # Web app
├── style.css           # Gradient glass UI, teal → violet, light/dark
├── app.js              # v20 autocorrect logic — Levenshtein + maps
├── autocorrect.py      # Python version — same v20 logic
├── manifest.json       # PWA manifest
├── sw.js               # Service worker — offline cache autocorrect-v20
├── favicon.svg         # Custom favicon
├── POSTING_KIT.md      # Posting kit
├── LICENSE             # MIT
└── README.md           # This file
```

---

## 💡 How It Works

1. **You type** — a word or a whole paragraph
2. **Levenshtein distance** finds the closest correct words
3. **Common-misspellings map** catches the 80+ typos everyone makes
4. **Advanced rules** fix split words, double words, capitals, spacing
5. **You tap** a suggestion — or copy / share / export the corrected text as `.txt`

*Everything runs on your device. No server, no API key, no data leaves your phone.*

---

## 🔗 Links

| | |
|:---|:---|
| 🌐 **Live** | [aryancodes-dev.github.io/autocorrect-tool](https://aryancodes-dev.github.io/autocorrect-tool/) |
| 🐙 **GitHub** | [github.com/aryancodes-dev/autocorrect-tool](https://github.com/aryancodes-dev/autocorrect-tool) |
| 🌐 **Portfolio** | [aryancodes-dev.github.io](https://aryancodes-dev.github.io/) |
| 💼 **LinkedIn** | [aryan-kumar-shah-933222443](https://www.linkedin.com/in/aryan-kumar-shah-933222443) |

---

<div align="center">

### 💜 *Made by Aryan Kumar Shah — Aspiring Software Developer*

### ✍️ *Type wrong. Get it right. Every time.*

</div>
