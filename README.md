# ✓Abc Autocorrect Tool v20 ADVANCED

**Project #03 of the 100+ AI Projects series — by Aryan Kumar Shah**

An advanced autocorrect tool, built as v20 from the start — never a basic v1.
Fix spelling in a single word or a whole sentence, live, offline, on your phone.

## What it can do — v20 advanced
- **Single word mode:** type a word, get live Top-5 suggestions, tap one to use it
- **Sentence / paragraph mode:** corrects a whole text at once, shows every change (e.g. `recieve → receive`), with Copy, Share and Export .txt
- **Levenshtein distance + common-misspellings map:** `recieve → receive`, `adress → address`, `tommorow → tomorrow`, `definately → definitely`, `seperate → separate`, `teh → the`, and 80+ more real typos
- **Advanced fixes (v20):** split words (`alot → a lot`, `infront → in front`), double words (`the the → the`), lone `i → I`, capital after `. ! ?`, space after punctuation, collapsed double spaces
- **Personal dictionary:** "Learn this word" / "My words" — names and correct words you add are never flagged again, saved only on your phone
- **Recent corrections + stats:** words checked, corrections made, your-word count
- **Beautiful ultimate UI:** gradient glass cards, teal→violet theme, light/dark toggle, phone-first, no horizontal scroll
- **Works offline + as an app (PWA):** install from Chrome → "Add to Home screen", cache `autocorrect-v20` with old-cache delete
- **Python version included:** `autocorrect.py` with the exact same v20 logic

## Try it
**Website:** Open `index.html`, or enable GitHub Pages and open the live link.
**App:** Open the live link in Chrome on your phone → menu → "Add to Home screen".
**Python:**
```bash
python autocorrect.py
```
Choose 1 = word, 2 = sentence, 3 = loop.

## Examples that work
- `recieve` → `receive`
- `I recieve teh adress tommorow` → `I receive the address tomorrow`
- `i am going to the the school alot` → `I am going to the school a lot`
- `hello.world  i am here` → `Hello. World I am here`

## Files (upload exactly like this, all at repo root)
```
index.html
style.css
app.js
autocorrect.py
favicon.svg
manifest.json
sw.js
README.md
LICENSE
POSTING_KIT.md
```

## Tech stack
HTML, CSS, JavaScript (Levenshtein + PWA + localStorage), Python

## Next project
Project #04: Translator App — only after this one, one by one.
