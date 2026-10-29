# 📖 Digital Saathi (डिजिटल साथी)

> **A warm Indian vintage scrapbook digital literacy platform designed especially for elderly citizens and first-time smartphone users in India.**

---

## 🌟 Visual Identity & Aesthetic

Inspired by an **Indian vintage scrapbook, handmade warm paper textures, and deep espresso ink**:
- **Warm Parchment & Cream Backgrounds**: Soothing on the eyes with gentle paper textures (`#fcf9f2`, `#f6efe2`).
- **Deep Espresso-Brown Ink**: High-readability typography (`#2b1d16`, `#574136`).
- **Muted Terracotta Accents**: Bold tactile action buttons and alerts (`#c2593f`).
- **Soft Vedic Teal**: Helpful guidance, success badges, and safe practices (`#2a7b7a`).
- **Antique Gold Details**: Stitched borders, corner stamps, and honor badges (`#c6923c`).

---

## 🎮 The 8 Playable 2D Mini Games

Every single game is fully functional with native 2D canvas/DOM rendering, on-screen touch controls, score tracking, and instant educational feedback:

1. **Game A: Digital Safety Snake (Canvas 2D)**
   - Guide the friendly snake to collect safe digital habits (*Protect PIN*, *Verify Links*, *Keep OTP Secret*).
   - Features gentle senior-friendly speed, wrap-around walls, on-screen D-Pad, and instant safety tip popups.
2. **Game B: Catch the Safe Dots (Canvas/DOM 2D)**
   - Move the safety basket with Left/Right buttons to catch green safe items (*Verified Apps*, *Strong Passwords*) and avoid red scam traps (*Urgent Lottery*, *Screen Share*).
3. **Game C: Digital Safety Tic-Tac-Toe**
   - Play against Saathi AI or family. Before placing a mark, answer a quick digital safety question. Correct answers unlock your move!
4. **Game D: Spot the Scam**
   - Fictional realistic SMS & WhatsApp messages with interactive tap-to-spot warning signs (urgent deadlines, fake links, OTP requests).
5. **Game E: Digital Memory Match**
   - Flip 12 scrapbook cards to pair digital safety icons with their real meanings.
6. **Game F: Safe or Unsafe Sorting**
   - Classify everyday phone scenarios into the **🟢 SAFE** or **🔴 UNSAFE** boxes with clear explanations.
7. **Game G: Digital Knowledge Quiz**
   - Friendly question-and-answer rounds about smartphone tips, cyber hygiene, and privacy.
8. **Game H: Smartphone Skills Challenge**
   - Practice everyday phone tasks on a mock phone screen: dial calls, open safe browsers, and decline spam calls.

---

## 🛡️ Core Educational Modules

### 1. 🕵️ Scam Detective
- Real-life scenarios covering Bank KYC threats, KBC lottery claims, electricity power disconnection threats, courier delivery fees, and grocery OTP deliveries.
- Real-time choice buttons: **🟢 Safe & Genuine**, **🟡 Suspicious**, and **🔴 Fraudulent Scam**.
- Red flag analysis & safest next step guidance.

### 2. 💳 Safe UPI Practice Simulator
- **DEMO ONLY — NO REAL MONEY**: Strictly a safe educational simulator.
- Teaches the **Golden Rule**: *You NEVER need to enter your UPI PIN to RECEIVE money!*
- Practice drills:
  1. Pay a Shopkeeper (verify merchant name before entering mock PIN).
  2. Receive Money from a relative (demonstrates automatic credit without PIN).
  3. Trap: Fake Collect Request (learn to safely decline and block).

### 3. 📚 Knowledge Centre (15 Complete Lessons)
1. Smartphone Basics (touching, scrolling, volume).
2. Making Phone Calls & WhatsApp Voice/Video Calls.
3. Saving Family & Emergency Contacts.
4. Safe Web Browsing & Looking for HTTPS Lock.
5. WhatsApp Privacy (profile photo visibility, group additions).
6. Online Banking & Net Banking Safety.
7. What is UPI & QR Code Safety.
8. Recognizing Digital Fraud & Fake Numbers on Google.
9. Passwords, PINs & OTP Secrets.
10. Understanding App Permissions.
11. Government Digital Services (DigiLocker, Umang, Sanchar Saathi).
12. Reporting Online Fraud (Dial 1930 & cybercrime.gov.in).
13. Recognizing Fake Electricity & Gas Bill Threats.
14. Safe Practices with Digital Payment Apps.
15. Essential Smartphone Settings for Seniors.

### 4. 📊 My Progress & Badges
- Real local storage tracking of lessons read, games played, best scores, and scams identified.
- Real earned badges: *Digital Explorer*, *Game Champion*, *Scam Detective*, *UPI Safety Master*, and *Digital Saathi Senior*.

### 5. 🆘 Official Helplines
- Direct information and one-tap dialing for:
  - 📞 **1930**: National Cyber Crime Helpline (24x7 across India).
  - 🌐 **cybercrime.gov.in**: National Cybercrime Reporting Portal.
  - 📱 **Sanchar Saathi**: Department of Telecommunications portal for blocking stolen phones and verifying registered SIM cards.

---

## 🌐 Complete Multilingual Support
Built-in complete interface dictionaries for:
- **English**
- **Hindi (हिंदी)**
- **Marathi (मराठी)**

Easily extensible to Bengali, Gujarati, Kannada, Tamil, Telugu, and other Indian regional languages via `translations.js`.

---

## 🚀 How to Run Locally

### Option 1: One-Click Windows Batch File (Recommended)
1. Double-click **`run_app.bat`** in this folder.
2. It will launch on **`http://localhost:8000`** (or 8080 if 8000 is in use) and automatically open in your default browser.

### Option 2: PowerShell Runner
```powershell
powershell -ExecutionPolicy Bypass -File .\run_app.ps1
```

### Option 3: Direct Browser File (Offline Mode)
Simply double-click **`index.html`** in any web browser. Everything works 100% offline with zero dependencies!
