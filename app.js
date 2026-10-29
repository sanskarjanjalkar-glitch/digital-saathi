/**
 * ==============================================================================
 * DIGITAL SAATHI (डिजिटल साथी) — Main Application Controller
 * Handles Navigation, Accessibility, Translations, Scam Detective, UPI, & Progress
 * ==============================================================================
 */

class DigitalSaathiApp {
  constructor() {
    this.currentLang = localStorage.getItem('saathi_lang') || 'en';
    this.currentTheme = localStorage.getItem('saathi_theme') || 'warm';
    this.fontScale = parseFloat(localStorage.getItem('saathi_font_scale') || '1');
    this.chimesEnabled = localStorage.getItem('saathi_chimes') !== 'false';
    this.speechSynthesisActive = false;

    // Progress State
    this.progress = {
      lessons: JSON.parse(localStorage.getItem('saathi_lessons') || '[]'),
      games: JSON.parse(localStorage.getItem('saathi_games') || '{}'),
      scams: JSON.parse(localStorage.getItem('saathi_scams') || '[]'),
      upi: JSON.parse(localStorage.getItem('saathi_upi') || '[]')
    };

    // Games Instances
    this.games = {};
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.applyFontScale(this.fontScale);
    this.initNavigation();
    this.initAccessibility();
    this.initLanguageSwitcher();
    this.initScamDetective();
    this.initUpiSimulator();
    this.initKnowledgeCentre();
    this.initGamesHub();
    this.updateProgressUI();
    this.applyTranslations(this.currentLang);

    // Global tactile button sounds
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (btn && this.chimesEnabled) {
        playAudioChime(500, 'sine', 0.06);
      }
    });
  }

  // ─── Translations & Language Switcher ─────────────────────────────────────
  initLanguageSwitcher() {
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const lang = e.currentTarget.getAttribute("data-lang");
        this.setLanguage(lang);
      });
    });
  }

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('saathi_lang', lang);

    document.querySelectorAll(".lang-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    this.applyTranslations(lang);
    this.showToast(`Language changed to ${lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : 'English'}`, 'info');
  }

  applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update dynamically bound headers & placeholders
    const txtBrandTitle = document.getElementById("txtBrandTitle");
    const txtBrandSubtitle = document.getElementById("txtBrandSubtitle");
    const txtWelcomeGreeting = document.getElementById("txtWelcomeGreeting");
    const txtWelcomeSub = document.getElementById("txtWelcomeSub");
    const kcSearch = document.getElementById("kcSearchInput");

    if (txtBrandTitle) {
      txtBrandTitle.innerHTML = `${dict.brandTitle} <span class="brand-tag-pill">${lang === 'en' ? 'डिजिटल साथी' : 'Digital Saathi'}</span>`;
    }
    if (txtBrandSubtitle) txtBrandSubtitle.textContent = dict.brandSubtitle;
    if (txtWelcomeGreeting) txtWelcomeGreeting.textContent = dict.welcomeGreeting;
    if (txtWelcomeSub) txtWelcomeSub.textContent = dict.welcomeSub;
    if (kcSearch) kcSearch.placeholder = dict.kcSearchPlaceholder;
  }

  // ─── Accessibility Controls ───────────────────────────────────────────────
  initAccessibility() {
    const btnFontInc = document.getElementById("btnFontInc");
    const btnFontDec = document.getElementById("btnFontDec");
    const btnCycleTheme = document.getElementById("btnCycleTheme");
    const themeLabel = document.getElementById("themeLabel");
    const btnToggleSpeech = document.getElementById("btnToggleSpeech");
    const btnStopSpeech = document.getElementById("btnStopSpeech");
    const btnToggleChime = document.getElementById("btnToggleChime");

    btnFontInc?.addEventListener("click", () => {
      if (this.fontScale < 1.35) {
        this.fontScale += 0.1;
        this.applyFontScale(this.fontScale);
        this.showToast("Text size increased", "info");
      }
    });

    btnFontDec?.addEventListener("click", () => {
      if (this.fontScale > 0.9) {
        this.fontScale -= 0.1;
        this.applyFontScale(this.fontScale);
        this.showToast("Text size decreased", "info");
      }
    });

    const themes = ["warm", "contrast", "dark"];
    btnCycleTheme?.addEventListener("click", () => {
      const curIdx = themes.indexOf(this.currentTheme);
      const nextTheme = themes[(curIdx + 1) % themes.length];
      this.applyTheme(nextTheme);
      if (themeLabel) themeLabel.textContent = nextTheme === 'contrast' ? 'Contrast' : nextTheme === 'dark' ? 'Dark' : 'Warm';
      this.showToast(`Theme: ${nextTheme}`, 'info');
    });

    btnToggleSpeech?.addEventListener("click", () => {
      const activeSection = document.querySelector(".view-section.active");
      const textToRead = activeSection ? activeSection.innerText : document.body.innerText;
      this.readTextAloud(textToRead.slice(0, 500));
    });

    btnStopSpeech?.addEventListener("click", () => {
      this.stopSpeech();
      this.showToast("Speech stopped", "info");
    });

    btnToggleChime?.addEventListener("click", () => {
      this.chimesEnabled = !this.chimesEnabled;
      localStorage.setItem('saathi_chimes', this.chimesEnabled ? 'true' : 'false');
      btnToggleChime.textContent = this.chimesEnabled ? "🔔" : "🔕";
      this.showToast(`Sound effects: ${this.chimesEnabled ? 'ON' : 'OFF'}`, 'info');
    });

    document.getElementById("btnReadHomeAloud")?.addEventListener("click", () => {
      const dict = TRANSLATIONS[this.currentLang];
      const text = `${dict.welcomeGreeting}. ${dict.welcomeSub}. ${dict.dailyActivityTitle}: ${dict.dailyActivityDesc}`;
      this.readTextAloud(text);
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem('saathi_theme', theme);
  }

  applyFontScale(scale) {
    this.fontScale = scale;
    document.documentElement.style.setProperty("--font-scale", scale.toString());
    localStorage.setItem('saathi_font_scale', scale.toString());
  }

  readTextAloud(text) {
    if (!('speechSynthesis' in window)) {
      this.showToast("Voice reading not supported in this browser.", "error");
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*_~`\[\]()<>]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.88; // Gentle pace for senior comprehension

    const langCode = this.currentLang === 'hi' ? 'hi-IN' : this.currentLang === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.lang = langCode;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(this.currentLang));
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
    this.showToast("Reading aloud...", "info");
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // ─── Navigation ───────────────────────────────────────────────────────────
  initNavigation() {
    const navButtons = document.querySelectorAll(".nav-item-btn");
    const sections = document.querySelectorAll(".view-section");

    navButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetId = e.currentTarget.getAttribute("data-tab");
        this.navigateTo(targetId);
      });
    });

    // Home Card Portals
    document.querySelectorAll("[data-nav-target]").forEach(card => {
      card.addEventListener("click", (e) => {
        const target = e.currentTarget.getAttribute("data-nav-target");
        if (target) this.navigateTo(target);
      });
    });

    // Start learning button
    document.getElementById("btnStartLearningNow")?.addEventListener("click", () => {
      this.navigateTo("tab-games");
    });

    document.getElementById("btnGoDailyActivity")?.addEventListener("click", () => {
      this.navigateTo("tab-scam");
    });
  }

  navigateTo(targetId) {
    const navButtons = document.querySelectorAll(".nav-item-btn");
    const sections = document.querySelectorAll(".view-section");

    navButtons.forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === targetId));
    sections.forEach(s => s.classList.toggle("active", s.id === targetId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playAudioChime(460, 'sine', 0.05);
  }

  // ─── Mini Games Hub ───────────────────────────────────────────────────────
  initGamesHub() {
    const shelf = document.getElementById("gamesShelfMenu");
    const btnBack = document.getElementById("btnBackToShelf");
    const stages = document.querySelectorAll(".game-active-stage");

    document.querySelectorAll(".btn-open-game").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const gameKey = e.currentTarget.getAttribute("data-game");
        this.openGame(gameKey);
      });
    });

    btnBack?.addEventListener("click", () => {
      shelf.style.display = "grid";
      btnBack.style.display = "none";
      stages.forEach(st => st.style.display = "none");
    });
  }

  openGame(gameKey) {
    const shelf = document.getElementById("gamesShelfMenu");
    const btnBack = document.getElementById("btnBackToShelf");
    const stages = document.querySelectorAll(".game-active-stage");

    shelf.style.display = "none";
    btnBack.style.display = "inline-flex";
    stages.forEach(st => st.style.display = "none");

    const activeStage = document.getElementById(`stage-${gameKey}`);
    if (activeStage) activeStage.style.display = "block";

    // Initialize individual games
    if (gameKey === 'snake') {
      if (!this.games.snake) {
        this.games.snake = new SafetySnakeGame('snakeCanvas', 'snakeTipBox', 'snakeScore');
        document.getElementById("dpadUp")?.addEventListener("click", () => this.games.snake.changeDirection({ x: 0, y: -1 }));
        document.getElementById("dpadDown")?.addEventListener("click", () => this.games.snake.changeDirection({ x: 0, y: 1 }));
        document.getElementById("dpadLeft")?.addEventListener("click", () => this.games.snake.changeDirection({ x: -1, y: 0 }));
        document.getElementById("dpadRight")?.addEventListener("click", () => this.games.snake.changeDirection({ x: 1, y: 0 }));
        document.getElementById("btnSnakeRestart")?.addEventListener("click", () => this.games.snake.start());
        document.getElementById("btnSnakePause")?.addEventListener("click", () => this.games.snake.pause());
        window.addEventListener("keydown", (e) => {
          if (e.key === "ArrowUp") this.games.snake.changeDirection({ x: 0, y: -1 });
          if (e.key === "ArrowDown") this.games.snake.changeDirection({ x: 0, y: 1 });
          if (e.key === "ArrowLeft") this.games.snake.changeDirection({ x: -1, y: 0 });
          if (e.key === "ArrowRight") this.games.snake.changeDirection({ x: 1, y: 0 });
        });
      }
      this.games.snake.start();
    } else if (gameKey === 'dots') {
      if (!this.games.dots) {
        this.games.dots = new CatchDotsGame('dotsCanvas', 'dotsScore', 'dotsLives', 'dotsFeedback');
        document.getElementById("btnBasketLeft")?.addEventListener("click", () => this.games.dots.moveBasket(-30));
        document.getElementById("btnBasketRight")?.addEventListener("click", () => this.games.dots.moveBasket(30));
        document.getElementById("btnDotsRestart")?.addEventListener("click", () => this.games.dots.start());
        window.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") this.games.dots.moveBasket(-25);
          if (e.key === "ArrowRight") this.games.dots.moveBasket(25);
        });
      }
      this.games.dots.start();
    } else if (gameKey === 'ttt') {
      if (!this.games.ttt) {
        this.games.ttt = new SafetyTicTacToe('tttGridContainer', 'tttQuestionModal');
        document.getElementById("btnTttReset")?.addEventListener("click", () => this.games.ttt.reset());
      }
      this.games.ttt.reset();
    } else if (gameKey === 'spot') {
      if (!this.games.spot) {
        this.games.spot = new SpotTheScamGame('spotScamContainer');
      }
      this.games.spot.render();
    } else if (gameKey === 'memory') {
      if (!this.games.memory) {
        this.games.memory = new DigitalMemoryMatch('memoryGridContainer', 'memoryScoreHUD', 'btnResetMemory');
      }
      this.games.memory.init();
    } else if (gameKey === 'sort') {
      if (!this.games.sort) {
        this.games.sort = new SafeSortingGame('sortCardDisplay', 'btnChooseSafe', 'btnChooseUnsafe', 'sortFeedback', 'sortScoreHUD');
      }
      this.games.sort.init();
    } else if (gameKey === 'quiz') {
      if (!this.games.quiz) {
        this.games.quiz = new DigitalQuizGame('quizQuestionText', 'quizOptionsList', 'quizFeedbackBox', 'quizScoreHUD', 'btnQuizNext');
      }
      this.games.quiz.init();
    } else if (gameKey === 'skills') {
      if (!this.games.skills) {
        this.games.skills = new SmartphoneSkillsChallenge('skillsScreenContent', 'skillsMissionText', 'skillsFeedback');
      }
      this.games.skills.init();
    }

    this.recordGamePlayed(gameKey);
  }

  recordGamePlayed(gameKey) {
    this.progress.games[gameKey] = (this.progress.games[gameKey] || 0) + 1;
    localStorage.setItem('saathi_games', JSON.stringify(this.progress.games));
    this.updateProgressUI();
  }

  recordGameScore(gameKey, score) {
    this.showToast(`Game score recorded: ${score}`, 'success');
    this.updateProgressUI();
  }

  // ─── Scam Detective Engine ────────────────────────────────────────────────
  initScamDetective() {
    const container = document.getElementById("scamMainDisplayArea");
    const counter = document.getElementById("scamScenarioCounter");

    const scenarios = [
      {
        id: 1,
        title: "Bank KYC Expiry Threat (SMS)",
        sender: "AD-SBIBNK",
        message: "DEAR VALUED CUSTOMER, YOUR SBI REWARDS AND ATM CARD WILL BE PERMANENTLY DISABLED TONIGHT AT 11 PM DUE TO INCOMPLETE KYC. TO UNBLOCK, IMMEDIATELY VERIFY DETAILS HERE: http://bit.ly/sbi-pan-update",
        classification: "fraud",
        redFlags: [
          "Urgent artificial deadline ('tonight at 11 PM')",
          "Unverified shortened bit.ly link instead of official onlinesbi.sbi portal",
          "Threat of 'permanent disabling' designed to cause panic"
        ],
        safestStep: "Do NOT click the link. Log into your genuine SBI YONO app or visit your local home branch to verify your KYC status."
      },
      {
        id: 2,
        title: "KBC Lottery Winner Notification (WhatsApp)",
        sender: "+92 312 9876543 (Unknown International Number)",
        message: "Congratulations! Your mobile number won 25,00,000 INR in Jio-KBC All India Lucky Draw! Call Rana Pratap Singh on WhatsApp to claim your prize cheque immediately.",
        classification: "fraud",
        redFlags: [
          "You never participated or purchased any ticket for this lottery",
          "International phone code (+92) pretending to be Indian television program",
          "Real lotteries do not operate via personal WhatsApp numbers"
        ],
        safestStep: "Block and report this number immediately. Never pay any 'processing fee' or 'GST tax' to claim fake prizes."
      },
      {
        id: 3,
        title: "Official OTP Delivery for Grocery App",
        sender: "VM-BLINKT",
        message: "Your OTP for login to Blinkit is 482910. Valid for 5 minutes. NEVER share this OTP with anyone, including delivery partners.",
        classification: "safe",
        redFlags: [
          "Explicitly reminds you: 'NEVER share this OTP with anyone'",
          "Generated because you just requested a grocery login",
          "Contains no suspicious third-party links or payment threats"
        ],
        safestStep: "Safe to use only in the official Blinkit app where you initiated the login. Never tell this code to a delivery driver or caller."
      },
      {
        id: 4,
        title: "Electricity Power Disconnection Notice",
        sender: "BP-MSEDCL",
        message: "URGENT: Power supply to your home will be disconnected at 8:30 PM due to unpaid electricity bill. Contact electricity officer Mr. Verma at 9876543210 to clear payment.",
        classification: "fraud",
        redFlags: [
          "Power companies provide notices on your monthly physical/digital bill, not via panic SMS",
          "Directs you to call a personal 10-digit mobile number instead of the official discom portal",
          "High-pressure evening timing to make you pay without thinking"
        ],
        safestStep: "Hang up or ignore. Check your genuine electricity bill or visit the official discom customer portal."
      },
      {
        id: 5,
        title: "Courier Package Address Update Fee",
        sender: "VK-INDPST",
        message: "IndiaPost: Your parcel has arrived at local hub but cannot be delivered due to incorrect house number. Pay ₹5 redelivery fee to update address: http://indpost-tracking-help.site",
        classification: "fraud",
        redFlags: [
          "Fake website domain (.site instead of official indiapost.gov.in)",
          "Small ₹5 fee is a psychological trick to get you to enter your card/UPI details and CVV"
        ],
        safestStep: "Do not pay. Genuine postal services do not demand online redelivery fees via unofficial links."
      }
    ];

    let currentIdx = 0;

    const renderScenario = () => {
      const cur = scenarios[currentIdx];
      if (counter) counter.textContent = `Scenario ${currentIdx + 1} of ${scenarios.length}`;

      if (!container) return;
      container.innerHTML = `
        <div class="scrapbook-card" style="border-left: 6px solid var(--antique-gold);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 1.35rem; color: var(--ink-espresso);">${cur.title}</h3>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--ink-subtle);">Sender: ${cur.sender}</span>
          </div>

          <div style="background: #ffffff; border: 2px dashed var(--bg-aged-border); border-radius: 12px; padding: 20px; font-family: monospace; font-size: 1.15rem; color: #1e293b; line-height: 1.6; margin-bottom: 20px;">
            "${cur.message}"
          </div>

          <p style="font-weight: 800; font-size: 1.1rem; margin-bottom: 12px;">What is your detective judgment on this message?</p>
          <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 20px;">
            <button class="btn-teal btn-scam-choice" data-choice="safe" style="min-width: 160px;">🟢 Safe & Genuine</button>
            <button class="btn-parchment btn-scam-choice" data-choice="suspicious" style="min-width: 160px;">🟡 Suspicious</button>
            <button class="btn-terracotta btn-scam-choice" data-choice="fraud" style="min-width: 160px;">🔴 Fraudulent Scam</button>
          </div>

          <div id="scamFeedbackBox" style="display: none; padding: 20px; border-radius: var(--radius-md); margin-bottom: 20px;"></div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button id="btnPrevScenario" class="btn-parchment" ${currentIdx === 0 ? 'disabled' : ''}>← Previous</button>
            <button id="btnNextScenario" class="btn-terracotta" style="display: none;">Next Scenario →</button>
          </div>
        </div>
      `;

      const fbBox = document.getElementById("scamFeedbackBox");
      const nextBtn = document.getElementById("btnNextScenario");

      container.querySelectorAll(".btn-scam-choice").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const choice = e.currentTarget.getAttribute("data-choice");
          const isCorrect = (choice === cur.classification);

          if (isCorrect) {
            playFanfare();
            fbBox.style.display = "block";
            fbBox.style.background = "#dcfce7";
            fbBox.style.border = "2px solid #16a34a";
            fbBox.innerHTML = `
              <h4 style="color: #14532d; font-size: 1.2rem; margin-bottom: 8px;">🎯 Excellent Detective Work! Correct Assessment.</h4>
              <p style="color: #166534; font-weight: 700; margin-bottom: 6px;">Warning Flags Identified:</p>
              <ul style="color: #166534; margin-left: 20px; margin-bottom: 10px;">
                ${cur.redFlags.map(f => `<li>${f}</li>`).join('')}
              </ul>
              <p style="color: #14532d;"><strong>Safest Next Step:</strong> ${cur.safestStep}</p>
            `;

            if (!this.progress.scams.includes(cur.id)) {
              this.progress.scams.push(cur.id);
              localStorage.setItem('saathi_scams', JSON.stringify(this.progress.scams));
              this.updateProgressUI();
            }
          } else {
            playAudioChime(280, 'sawtooth', 0.25);
            fbBox.style.display = "block";
            fbBox.style.background = "#fee2e2";
            fbBox.style.border = "2px solid #dc2626";
            fbBox.innerHTML = `
              <h4 style="color: #991b1b; font-size: 1.2rem; margin-bottom: 8px;">⚠️ Caution! Re-evaluate the warning signs:</h4>
              <p style="color: #b91c1c;">This message is actually <strong>${cur.classification.toUpperCase()}</strong>. Look for artificial urgency or unverified links.</p>
              <p style="color: #7f1d1d; margin-top: 6px;"><strong>Safest Next Step:</strong> ${cur.safestStep}</p>
            `;
          }

          nextBtn.style.display = "inline-flex";
        });
      });

      document.getElementById("btnPrevScenario")?.addEventListener("click", () => {
        if (currentIdx > 0) {
          currentIdx--;
          renderScenario();
        }
      });

      nextBtn?.addEventListener("click", () => {
        if (currentIdx < scenarios.length - 1) {
          currentIdx++;
          renderScenario();
        } else {
          alert("🎉 Congratulations! You have completed all Scam Detective training scenarios!");
        }
      });
    };

    renderScenario();
  }

  // ─── Safe UPI Practice Simulator ──────────────────────────────────────────
  initUpiSimulator() {
    const screen = document.getElementById("upiPhoneScreen");
    const btnPay = document.getElementById("btnUpiDrillPay");
    const btnReceive = document.getElementById("btnUpiDrillReceive");
    const btnFake = document.getElementById("btnUpiDrillFake");

    let currentDrill = 'pay';

    const renderDrill = (drillType) => {
      currentDrill = drillType;
      [btnPay, btnReceive, btnFake].forEach(b => b?.classList.remove("active"));
      if (drillType === 'pay') btnPay?.classList.add("active");
      if (drillType === 'receive') btnReceive?.classList.add("active");
      if (drillType === 'fake') btnFake?.classList.add("active");

      if (!screen) return;

      if (drillType === 'pay') {
        screen.innerHTML = `
          <div class="mock-phone-header">
            <span>🛒 Paying Shopkeeper</span>
            <span style="color: #16a34a; font-weight: 800;">DEMO</span>
          </div>
          <div style="text-align: center; margin-bottom: 16px;">
            <div style="font-size: 2.2rem;">🏪</div>
            <h4 style="font-size: 1.2rem; color: #1e293b;">Sharma Provision Store</h4>
            <span style="font-size: 0.85rem; color: #64748b;">UPI ID: sharma.grocery@oksbi (Verified)</span>
          </div>

          <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 16px;">
            <span style="font-size: 0.9rem; color: #64748b;">Amount to Pay:</span>
            <div style="font-size: 2rem; font-weight: 800; color: #0f172a;">₹ 120.00</div>
          </div>

          <p style="font-size: 0.85rem; color: #475569; text-align: center; margin-bottom: 12px;">
            Step 1: Check receiver's name. Step 2: Enter secret UPI PIN on official bank screen.
          </p>

          <div id="mockPinDisplay" style="letter-spacing: 8px; font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 10px; color: #0284c7;">
            • • • •
          </div>

          <div class="mock-pin-keypad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map(k => `<button class="mock-key-btn" data-key="${k}">${k}</button>`).join('')}
          </div>

          <div id="upiDrillResult" style="margin-top: 14px;"></div>
        `;

        let enteredPin = "";
        screen.querySelectorAll(".mock-key-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const k = e.currentTarget.getAttribute("data-key");
            const pinDisplay = document.getElementById("mockPinDisplay");
            const resultBox = document.getElementById("upiDrillResult");

            if (k === 'C') {
              enteredPin = "";
            } else if (k === '✓') {
              if (enteredPin.length === 4) {
                playFanfare();
                resultBox.innerHTML = `
                  <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 14px; text-align: center;">
                    <div style="font-size: 1.8rem;">✅</div>
                    <strong style="color: #15803d;">Payment Successful (Demo)!</strong>
                    <p style="font-size: 0.85rem; color: #166534; margin-top: 4px;">You successfully verified the merchant name and entered your PIN securely.</p>
                  </div>
                `;
                if (!this.progress.upi.includes('pay')) {
                  this.progress.upi.push('pay');
                  localStorage.setItem('saathi_upi', JSON.stringify(this.progress.upi));
                  this.updateProgressUI();
                }
              } else {
                alert("Please enter a 4-digit mock PIN.");
              }
            } else if (enteredPin.length < 4) {
              enteredPin += k;
              playAudioChime(600, 'sine', 0.05);
            }

            if (pinDisplay) {
              pinDisplay.textContent = '• '.repeat(enteredPin.length) || '• • • •';
            }
          });
        });
      } else if (drillType === 'receive') {
        screen.innerHTML = `
          <div class="mock-phone-header">
            <span>🎁 Receiving Money</span>
            <span style="color: #16a34a; font-weight: 800;">DEMO</span>
          </div>

          <div style="text-align: center; margin-bottom: 16px;">
            <div style="font-size: 2.2rem;">👨‍💼</div>
            <h4 style="font-size: 1.2rem; color: #1e293b;">Son (Rahul) sent you ₹ 2,000</h4>
            <span style="font-size: 0.85rem; color: #64748b;">Direct Bank Credit</span>
          </div>

          <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 12px; padding: 18px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 2rem;">💰</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #14532d;">₹ 2,000 Credited Successfully!</div>
            <p style="font-size: 0.9rem; color: #166534; margin-top: 8px;">
              Notice: You did NOT have to enter your PIN or scan any QR code! Money is credited automatically into your account.
            </p>
          </div>

          <button id="btnCompleteReceive" class="btn-teal" style="width: 100%;">
            I Understand the Golden Rule! 🌟
          </button>
        `;

        document.getElementById("btnCompleteReceive")?.addEventListener("click", () => {
          playFanfare();
          alert("🎉 Rule Mastered: Money comes in automatically. Never enter a PIN to receive money!");
          if (!this.progress.upi.includes('receive')) {
            this.progress.upi.push('receive');
            localStorage.setItem('saathi_upi', JSON.stringify(this.progress.upi));
            this.updateProgressUI();
          }
        });
      } else if (drillType === 'fake') {
        screen.innerHTML = `
          <div class="mock-phone-header">
            <span>⚠️ Fake Collect Request</span>
            <span style="color: #dc2626; font-weight: 800;">SCAM TRAP</span>
          </div>

          <div style="text-align: center; margin-bottom: 14px;">
            <div style="font-size: 2.2rem;">🚨</div>
            <h4 style="font-size: 1.2rem; color: #991b1b;">Request from 'KBC Prize Officer'</h4>
            <span style="font-size: 0.85rem; color: #dc2626;">Wants to collect ₹ 4,999 from your account!</span>
          </div>

          <div style="background: #fee2e2; border: 2px solid #dc2626; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 18px;">
            <p style="font-size: 0.95rem; color: #991b1b; font-weight: 700;">
              Caller says: "Click PAY and enter PIN to receive your lottery cashback!"
            </p>
            <strong style="color: #7f1d1d; display: block; margin-top: 6px;">What should you do?</strong>
          </div>

          <div style="display: flex; gap: 12px;">
            <button id="btnDeclineTrap" class="btn-teal" style="flex: 1; font-size: 1rem;">
              🛡️ DECLINE & BLOCK
            </button>
            <button id="btnPayTrap" class="btn-terracotta" style="flex: 1; font-size: 1rem;">
              Pay ₹ 4,999 (TRAP)
            </button>
          </div>

          <div id="fakeCollectResult" style="margin-top: 14px;"></div>
        `;

        document.getElementById("btnDeclineTrap")?.addEventListener("click", () => {
          playFanfare();
          const res = document.getElementById("fakeCollectResult");
          res.innerHTML = `
            <div style="background: #dcfce7; border: 2px solid #16a34a; border-radius: 10px; padding: 14px; text-align: center;">
              <strong style="color: #15803d;">🛡️ Brilliant Save!</strong>
              <p style="font-size: 0.85rem; color: #166534; margin-top: 4px;">
                You wisely declined the fake collect request. If you had clicked Pay, ₹4,999 would have been deducted immediately!
              </p>
            </div>
          `;
          if (!this.progress.upi.includes('fake')) {
            this.progress.upi.push('fake');
            localStorage.setItem('saathi_upi', JSON.stringify(this.progress.upi));
            this.updateProgressUI();
          }
        });

        document.getElementById("btnPayTrap")?.addEventListener("click", () => {
          playAudioChime(250, 'sawtooth', 0.3);
          alert("🛑 STOP! Clicking Pay and typing your PIN would send ₹4,999 to the fraudster! Always DECLINE unexpected collect requests.");
        });
      }
    };

    btnPay?.addEventListener("click", () => renderDrill('pay'));
    btnReceive?.addEventListener("click", () => renderDrill('receive'));
    btnFake?.addEventListener("click", () => renderDrill('fake'));

    renderDrill('pay');
  }

  // ─── Knowledge Centre (15 Practical Lessons) ───────────────────────────────
  initKnowledgeCentre() {
    const container = document.getElementById("kcLessonsContainer");
    const searchInput = document.getElementById("kcSearchInput");

    const lessons = [
      { id: 1, title: "1. Smartphone Basics: Touching, Scrolling & Volume", cat: "basics", summary: "Master screen taps, swiping up/down, and adjusting caller volume with ease.", details: "Hold your phone gently. Use the pad of your index finger or thumb. Tap lightly — no heavy pressure needed. Use the side physical buttons to adjust ringtone volume." },
      { id: 2, title: "2. Making Phone Calls & WhatsApp Voice/Video Calls", cat: "basics", summary: "How to call children, grandchildren, and friends for free over home Wi-Fi.", details: "Open WhatsApp, tap the contact name, and look for the phone icon (voice call) or camera icon (video call). Keep your face centered in the camera." },
      { id: 3, title: "3. Saving Family & Emergency Contacts", cat: "basics", summary: "Organizing your phonebook so emergency numbers are readily accessible.", details: "Add your son, daughter, or neighbor with clear names. Put a star (favorite) next to them so they appear at the top of your phonebook." },
      { id: 4, title: "4. Safe Web Browsing & Looking for the HTTPS Lock", cat: "safety", summary: "How to tell if a website is genuine or a fake replica.", details: "Always look at the web address bar. A small padlock symbol 🔒 and 'https://' means your connection is encrypted. Never enter personal details on websites without this lock." },
      { id: 5, title: "5. WhatsApp Privacy & Protecting Your Profile Photo", cat: "safety", summary: "Keep strangers from viewing your photo or adding you to random groups.", details: "Go to WhatsApp Settings → Privacy → Profile Photo → Change to 'My Contacts'. Also change 'Groups' to 'My Contacts' to prevent spam additions." },
      { id: 6, title: "6. Online Banking & Net Banking Safety", cat: "payments", summary: "Golden rules when logging into your State Bank, HDFC, or ICICI bank account.", details: "Never log into net banking using public cyber café computers or free open Wi-Fi at railway stations. Always type the official bank URL directly into your browser." },
      { id: 7, title: "7. What is UPI & QR Code Safety", cat: "payments", summary: "Understanding how QR codes work at shops without fear.", details: "Scanning a QR code is ONLY for paying money to a shopkeeper. You never scan a QR code to receive money. Always check the shop's name before typing your PIN." },
      { id: 8, title: "8. Recognizing Digital Fraud & Fake Numbers", cat: "safety", summary: "How scammers buy Google ads to show fake customer care numbers.", details: "Never search 'SBI Customer Care' on Google and call the first number you see. Fraudsters manipulate Google search results. Call only the number printed on the back of your passbook or debit card." },
      { id: 9, title: "9. Passwords, PINs & OTP Secrets", cat: "safety", summary: "Why these three numbers must never be spoken or shown to anyone.", details: "Your ATM PIN, UPI PIN, and OTP are your digital signatures. No bank manager, police officer, or government official has the legal right to ask for them." },
      { id: 10, title: "10. Understanding App Permissions", cat: "safety", summary: "Why does a flashlight app want access to your contacts and microphone?", details: "When an app asks for permission, think: does a calculator need my contacts? If not, tap 'Don't Allow'. Only give location or camera permissions to apps that genuinely need them." },
      { id: 11, title: "11. Government Digital Services: DigiLocker & Sanchar Saathi", cat: "gov", summary: "Accessing Aadhaar, PAN card, and checking registered SIM cards safely.", details: "DigiLocker is the Government of India's official app for storing digital copies of Aadhaar, driving licenses, and ration cards. It is legal and recognized across India." },
      { id: 12, title: "12. Reporting Online Fraud: Dial 1930 & cybercrime.gov.in", cat: "gov", summary: "The golden hour rule for freezing stolen funds in India.", details: "If money is wrongly deducted, call 1930 within 2 hours. The police coordinate with the Reserve Bank of India to freeze the fraudster's wallet before they withdraw the cash." },
      { id: 13, title: "13. Recognizing Fake Electricity & Gas Bill Threats", cat: "safety", summary: "Why official utilities never cut your power with an instant SMS.", details: "Power boards give formal paper warnings. They never send SMS messages with personal mobile numbers asking for immediate payment." },
      { id: 14, title: "14. Safe Practices with Digital Payment Apps (GPay, PhonePe, Paytm)", cat: "payments", summary: "Setting daily transaction limits and safe notifications.", details: "Set a daily transfer limit of ₹5,000 or ₹10,000 on your UPI app so that even in case of an error, large balances cannot be moved at once." },
      { id: 15, title: "15. Essential Smartphone Settings for Seniors", cat: "basics", summary: "Setting larger display text, high ringtone volume, and screen timeout.", details: "Go to Settings → Display → Font Size → Slide to 'Large'. Also set Screen Timeout to 2 minutes so the screen does not turn black while you are reading." }
    ];

    const renderLessons = (filtered) => {
      if (!container) return;
      container.innerHTML = "";

      filtered.forEach(lesson => {
        const item = document.createElement("div");
        item.className = "kc-lesson-item";
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-size: 1.25rem; color: var(--ink-espresso);">${lesson.title}</h4>
            <span style="font-size: 1.2rem;">📖</span>
          </div>
          <p style="color: var(--ink-muted); margin-top: 6px;">${lesson.summary}</p>

          <div class="lesson-expanded-content">
            <p style="color: var(--ink-espresso); margin-bottom: 12px; line-height: 1.6;">${lesson.details}</p>
            <div style="display: flex; gap: 10px;">
              <button class="btn-parchment btn-read-lesson" data-text="${lesson.title}. ${lesson.details}">
                🔊 Listen Guide
              </button>
              <button class="btn-teal btn-mark-lesson" data-id="${lesson.id}">
                ${this.progress.lessons.includes(lesson.id) ? '✔️ Explored' : 'Mark as Explored'}
              </button>
            </div>
          </div>
        `;

        item.addEventListener("click", (e) => {
          if (e.target.closest("button")) return;
          item.classList.toggle("open");
        });

        item.querySelector(".btn-read-lesson")?.addEventListener("click", (e) => {
          const text = e.currentTarget.getAttribute("data-text");
          this.readTextAloud(text);
        });

        item.querySelector(".btn-mark-lesson")?.addEventListener("click", (e) => {
          if (!this.progress.lessons.includes(lesson.id)) {
            this.progress.lessons.push(lesson.id);
            localStorage.setItem('saathi_lessons', JSON.stringify(this.progress.lessons));
            e.currentTarget.textContent = "✔️ Explored";
            playFanfare();
            this.showToast(`Lesson ${lesson.id} marked as explored!`, 'success');
            this.updateProgressUI();
          }
        });

        container.appendChild(item);
      });
    };

    renderLessons(lessons);

    searchInput?.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = lessons.filter(l => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.details.toLowerCase().includes(q));
      renderLessons(filtered);
    });
  }

  // ─── My Progress & Badges ─────────────────────────────────────────────────
  updateProgressUI() {
    const statLessons = document.getElementById("statLessons");
    const statGames = document.getElementById("statGames");
    const statScams = document.getElementById("statScams");
    const statUpi = document.getElementById("statUpi");
    const badgesContainer = document.getElementById("badgesContainer");

    const lessonsCount = this.progress.lessons.length;
    const gamesCount = Object.keys(this.progress.games).length;
    const scamsCount = this.progress.scams.length;
    const upiCount = this.progress.upi.length;

    if (statLessons) statLessons.textContent = `${lessonsCount} / 15`;
    if (statGames) statGames.textContent = `${gamesCount} / 8`;
    if (statScams) statScams.textContent = `${scamsCount} / 5`;
    if (statUpi) statUpi.textContent = `${upiCount} / 3`;

    // Badges calculation
    const badges = [
      { name: "Digital Explorer", icon: "🌱", earned: lessonsCount >= 1, desc: "Explored your first safety lesson." },
      { name: "Game Champion", icon: "🎮", earned: gamesCount >= 2, desc: "Played 2 or more digital learning games." },
      { name: "Scam Detective", icon: "🕵️", earned: scamsCount >= 2, desc: "Identified 2 real-life fraud traps correctly." },
      { name: "UPI Safety Master", icon: "🛡️", earned: upiCount >= 2, desc: "Mastered the golden rules of UPI payments." },
      { name: "Digital Saathi Senior", icon: "🏆", earned: lessonsCount >= 5 && gamesCount >= 4, desc: "High confidence in smartphone handling & online safety." }
    ];

    if (badgesContainer) {
      badgesContainer.innerHTML = "";
      badges.forEach(b => {
        const badgeEl = document.createElement("div");
        badgeEl.className = "scrapbook-card";
        badgeEl.style.padding = "14px 18px";
        badgeEl.style.display = "flex";
        badgeEl.style.alignItems = "center";
        badgeEl.style.gap = "12px";
        badgeEl.style.border = b.earned ? "2px solid var(--antique-gold)" : "2px dashed var(--bg-aged-border)";
        badgeEl.style.background = b.earned ? "var(--antique-gold-light)" : "var(--bg-subtle-sepia)";
        badgeEl.style.opacity = b.earned ? "1" : "0.5";

        badgeEl.innerHTML = `
          <div style="font-size: 2rem;">${b.icon}</div>
          <div>
            <h4 style="font-size: 1.1rem; color: var(--ink-espresso);">${b.name}</h4>
            <p style="font-size: 0.85rem; color: var(--ink-muted);">${b.desc}</p>
            <span style="font-size: 0.75rem; font-weight: 800; color: ${b.earned ? 'var(--antique-gold-dark)' : 'var(--ink-subtle)'};">
              ${b.earned ? '🏅 EARNED' : '🔒 IN PROGRESS'}
            </span>
          </div>
        `;
        badgesContainer.appendChild(badgeEl);
      });
    }

    // Reset button handler
    const btnReset = document.getElementById("btnResetAllProgress");
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm("Are you sure you want to reset your saved scores and completed badges?")) {
          this.progress = { lessons: [], games: {}, scams: [], upi: [] };
          localStorage.removeItem('saathi_lessons');
          localStorage.removeItem('saathi_games');
          localStorage.removeItem('saathi_scams');
          localStorage.removeItem('saathi_upi');
          this.updateProgressUI();
          this.showToast("Progress reset successfully", "info");
        }
      };
    }
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : 'ℹ️'}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.digitalSaathi = new DigitalSaathiApp();
  window.digitalSaathi.init();
});
