/**
 * ==============================================================================
 * DIGITAL SAATHI (डिजिटल साथी) — Mini 2D Games Engine
 * All 8 games implemented with full gameplay, accessibility & scoring
 * ==============================================================================
 */

// Sound chime helper
function playAudioChime(freq = 520, type = 'sine', duration = 0.15) {
  if (window.digitalSaathi && !window.digitalSaathi.chimesEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio unsupported or muted
  }
}

function playFanfare() {
  playAudioChime(440, 'triangle', 0.1);
  setTimeout(() => playAudioChime(554, 'triangle', 0.1), 110);
  setTimeout(() => playAudioChime(659, 'triangle', 0.25), 220);
}

// ─── GAME A: Digital Safety Snake (Canvas 2D) ──────────────────────────────
class SafetySnakeGame {
  constructor(canvasId, tipBoxId, scoreId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.tipBox = document.getElementById(tipBoxId);
    this.scoreEl = document.getElementById(scoreId);
    
    this.gridSize = 20;
    this.tileCount = 18; // 360x360 canvas
    this.snake = [{ x: 9, y: 9 }, { x: 8, y: 9 }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('saathi_snake_high') || '0');
    this.isPaused = false;
    this.isRunning = false;
    this.gameLoop = null;

    this.tokens = [
      { label: "🔒 Protect PIN", tip: "Your UPI PIN is only for sending money. Never share it with anyone!", emoji: "🔒" },
      { label: "📱 Keep OTP Private", tip: "Banks and telecom companies will NEVER call you to ask for your OTP.", emoji: "📱" },
      { label: "🛡️ Verify Links", tip: "Never click random lottery or KYC links received on SMS or WhatsApp.", emoji: "🛡️" },
      { label: "👤 Check Receiver", tip: "Always verify the shopkeeper's name on your screen before typing your PIN.", emoji: "👤" },
      { label: "📞 Helpline 1930", tip: "If any unauthorized money deduction occurs, immediately call 1930.", emoji: "📞" }
    ];
    this.currentToken = this.tokens[0];
    this.food = { x: 14, y: 9 };
  }

  start() {
    this.snake = [{ x: 9, y: 9 }, { x: 8, y: 9 }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this.updateScore();
    this.spawnFood();
    this.isRunning = true;
    this.isPaused = false;

    if (this.gameLoop) clearInterval(this.gameLoop);
    this.gameLoop = setInterval(() => this.update(), 190); // Slower, senior-friendly pace
    this.draw();
    if (this.tipBox) {
      this.tipBox.textContent = "Use Arrow keys or on-screen buttons to guide the snake to safe digital habits!";
    }
  }

  pause() {
    this.isPaused = !this.isPaused;
    if (this.tipBox) {
      this.tipBox.textContent = this.isPaused ? "Game Paused. Tap Resume when ready." : this.currentToken.tip;
    }
  }

  changeDirection(dir) {
    if (this.isPaused || !this.isRunning) return;
    // Prevent 180 reverse
    if (dir.x !== 0 && this.direction.x !== 0) return;
    if (dir.y !== 0 && this.direction.y !== 0) return;
    this.nextDirection = dir;
    playAudioChime(420, 'sine', 0.05);
  }

  spawnFood() {
    this.food = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
    this.currentToken = this.tokens[Math.floor(Math.random() * this.tokens.length)];
  }

  update() {
    if (this.isPaused || !this.isRunning) return;

    this.direction = this.nextDirection;
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Soft wrap boundaries for seniors (less punishing)
    if (head.x < 0) head.x = this.tileCount - 1;
    if (head.x >= this.tileCount) head.x = 0;
    if (head.y < 0) head.y = this.tileCount - 1;
    if (head.y >= this.tileCount) head.y = 0;

    // Check self-collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver();
        return;
      }
    }

    this.snake.unshift(head);

    // Check food consumption
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScore();
      playFanfare();
      if (this.tipBox) {
        this.tipBox.innerHTML = `<strong>🌟 Good Habit Collected: ${this.currentToken.label}</strong><br>${this.currentToken.tip}`;
      }
      this.spawnFood();
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  updateScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('saathi_snake_high', this.highScore.toString());
    }
    if (this.scoreEl) {
      this.scoreEl.textContent = `Score: ${this.score} | Best: ${this.highScore}`;
    }
    if (window.digitalSaathi) {
      window.digitalSaathi.recordGameScore('snake', this.score);
    }
  }

  gameOver() {
    this.isRunning = false;
    clearInterval(this.gameLoop);
    playAudioChime(300, 'sawtooth', 0.3);
    if (this.tipBox) {
      this.tipBox.innerHTML = `<strong>Game Complete! Final Score: ${this.score}</strong><br>Tap Restart to play again and practice more safe habits!`;
    }
    this.draw(true);
  }

  draw(isOver = false) {
    if (!this.ctx) return;
    // Scrapbook parchment background
    this.ctx.fillStyle = "#fcf9f2";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines (subtle paper graph)
    this.ctx.strokeStyle = "#eedec7";
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i <= this.tileCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }

    // Draw Food (Safety Token)
    this.ctx.fillStyle = "#c2593f";
    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Food icon text
    this.ctx.font = "12px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      this.currentToken.emoji,
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2
    );

    // Draw Snake
    this.snake.forEach((part, index) => {
      this.ctx.fillStyle = index === 0 ? "#2a7b7a" : "#449f9e";
      this.ctx.beginPath();
      this.ctx.roundRect(
        part.x * this.gridSize + 1,
        part.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2,
        [4]
      );
      this.ctx.fill();

      // Eyes on head
      if (index === 0) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(
          part.x * this.gridSize + 6,
          part.y * this.gridSize + 6,
          2.5,
          0,
          Math.PI * 2
        );
        this.ctx.arc(
          part.x * this.gridSize + 14,
          part.y * this.gridSize + 6,
          2.5,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    });

    if (isOver) {
      this.ctx.fillStyle = "rgba(44, 30, 24, 0.75)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Well Done!", this.canvas.width / 2, this.canvas.height / 2 - 10);
      this.ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
      this.ctx.fillText("Tap 'Restart' to play again", this.canvas.width / 2, this.canvas.height / 2 + 18);
    }
  }
}


// ─── GAME B: Catch the Safe Dots (Canvas/DOM 2D) ────────────────────────────
class CatchDotsGame {
  constructor(canvasId, scoreId, livesId, feedbackId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.scoreEl = document.getElementById(scoreId);
    this.livesEl = document.getElementById(livesId);
    this.feedbackEl = document.getElementById(feedbackId);

    this.basketX = 140;
    this.basketWidth = 80;
    this.basketHeight = 22;
    this.score = 0;
    this.lives = 3;
    this.items = [];
    this.isRunning = false;
    this.animId = null;

    this.pool = [
      { text: "Verified App", safe: true, emoji: "🛡️", tip: "Great! Official apps downloaded from Google Play Store or Apple App Store are safe." },
      { text: "Strong PIN", safe: true, emoji: "🔒", tip: "Excellent! A strong, secret UPI PIN protects your hard-earned bank balance." },
      { text: "Known Contact", safe: true, emoji: "👤", tip: "Right! Calling known numbers and family contacts is safe." },
      { text: "Official 1930", safe: true, emoji: "📞", tip: "Super! 1930 is India's 24x7 official Cyber Fraud Helpline." },
      { text: "Urgent Lottery", safe: false, emoji: "⚠️", tip: "Ouch! Fake lottery SMS are traps asking for fee before releasing 'prizes'!" },
      { text: "Share OTP", safe: false, emoji: "💣", tip: "Alert! Never share an OTP. Bank employees never call to ask for OTP." },
      { text: "Unknown APK", safe: false, emoji: "🛑", tip: "Danger! APK files sent on WhatsApp can install spyware to read your messages." },
      { text: "Remote Screen App", safe: false, emoji: "❌", tip: "Warning! Apps like AnyDesk give strangers complete control of your phone." }
    ];
  }

  start() {
    this.score = 0;
    this.lives = 3;
    this.items = [];
    this.isRunning = true;
    this.basketX = (this.canvas.width - this.basketWidth) / 2;
    this.updateHUD();

    if (this.feedbackEl) {
      this.feedbackEl.textContent = "Catch GREEN safe habits into your basket! Avoid RED scam traps!";
    }

    if (this.animId) cancelAnimationFrame(this.animId);
    this.spawnTimer = 0;
    this.loop();
  }

  moveBasket(delta) {
    if (!this.isRunning) return;
    this.basketX = Math.max(0, Math.min(this.canvas.width - this.basketWidth, this.basketX + delta));
    playAudioChime(480, 'sine', 0.04);
  }

  setBasketPos(x) {
    if (!this.isRunning) return;
    const rect = this.canvas.getBoundingClientRect();
    const relativeX = (x - rect.left) * (this.canvas.width / rect.width);
    this.basketX = Math.max(0, Math.min(this.canvas.width - this.basketWidth, relativeX - this.basketWidth / 2));
  }

  updateHUD() {
    if (this.scoreEl) this.scoreEl.textContent = `Score: ${this.score}`;
    if (this.livesEl) this.livesEl.textContent = `Attempts Left: ${'❤️ '.repeat(this.lives)}`;
  }

  loop() {
    if (!this.isRunning) return;

    this.spawnTimer++;
    if (this.spawnTimer > 75) {
      this.spawnTimer = 0;
      const pick = this.pool[Math.floor(Math.random() * this.pool.length)];
      this.items.push({
        ...pick,
        x: Math.random() * (this.canvas.width - 60) + 10,
        y: -20,
        speed: 1.8 + Math.random() * 0.8
      });
    }

    // Update items
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.speed;

      // Check collision with basket
      if (
        it.y + 16 >= this.canvas.height - this.basketHeight - 10 &&
        it.y <= this.canvas.height - 10 &&
        it.x + 30 >= this.basketX &&
        it.x <= this.basketX + this.basketWidth
      ) {
        if (it.safe) {
          this.score += 15;
          playFanfare();
          if (this.feedbackEl) {
            this.feedbackEl.innerHTML = `<span style="color: #15803d;">✅ Safe Catch! ${it.text}</span><br>${it.tip}`;
          }
        } else {
          this.lives--;
          playAudioChime(250, 'sawtooth', 0.25);
          if (this.feedbackEl) {
            this.feedbackEl.innerHTML = `<span style="color: #b91c1c;">⚠️ Caught Unsafe Item: ${it.text}</span><br>${it.tip}`;
          }
        }
        this.items.splice(i, 1);
        this.updateHUD();

        if (this.lives <= 0) {
          this.gameOver();
          return;
        }
        continue;
      }

      // Missed item
      if (it.y > this.canvas.height) {
        this.items.splice(i, 1);
      }
    }

    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  gameOver() {
    this.isRunning = false;
    cancelAnimationFrame(this.animId);
    if (this.feedbackEl) {
      this.feedbackEl.innerHTML = `<strong>Session Finished! Your score: ${this.score}</strong><br>Tap Restart to practice avoiding more scam traps.`;
    }
    if (window.digitalSaathi) {
      window.digitalSaathi.recordGameScore('dots', this.score);
    }
    this.draw(true);
  }

  draw(isOver = false) {
    if (!this.ctx) return;
    this.ctx.fillStyle = "#fcf9f2";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw falling items
    this.items.forEach(it => {
      this.ctx.fillStyle = it.safe ? "#dcfce7" : "#fee2e2";
      this.ctx.strokeStyle = it.safe ? "#16a34a" : "#dc2626";
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.roundRect(it.x, it.y, 80, 28, [6]);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = "#1e293b";
      this.ctx.font = "bold 11px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText(`${it.emoji} ${it.text}`, it.x + 40, it.y + 18);
    });

    // Draw basket
    this.ctx.fillStyle = "#c2593f";
    this.ctx.strokeStyle = "#8c351f";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.roundRect(this.basketX, this.canvas.height - this.basketHeight - 8, this.basketWidth, this.basketHeight, [6]);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 12px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText("🧺 Safety Net", this.basketX + this.basketWidth / 2, this.canvas.height - 12);

    if (isOver) {
      this.ctx.fillStyle = "rgba(44, 30, 24, 0.75)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Practice Complete!", this.canvas.width / 2, this.canvas.height / 2 - 10);
      this.ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
      this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 16);
    }
  }
}


// ─── GAME C: Digital Safety Tic-Tac-Toe ─────────────────────────────────────
class SafetyTicTacToe {
  constructor(containerId, questionModalId) {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById(questionModalId);
    this.board = Array(9).fill(null);
    this.turn = 'X'; // X = Player, O = Saathi AI
    this.score = { player: 0, ai: 0, ties: 0 };
    this.pendingCellIndex = null;

    this.questionBank = [
      {
        q: "A caller claims your electricity power will be disconnected in 10 minutes unless you pay right now. What should you do?",
        opts: ["Pay immediately through the link they send", "Hang up, check your physical bill, or call the official discom office", "Tell them your debit card CVV"],
        correct: 1,
        exp: "Genuine electricity boards never cut power within 10 minutes without prior written notice. Fraudsters create panic to make you pay blindly."
      },
      {
        q: "Do you ever need to enter your secret UPI PIN to RECEIVE money from someone?",
        opts: ["Yes, to verify who is receiving", "NO, never! UPI PIN is ONLY entered when sending money", "Only if it is a large amount"],
        correct: 1,
        exp: "GOLDEN RULE: You NEVER enter your UPI PIN to receive money. If someone asks for your PIN to send you money, it is 100% a scam!"
      },
      {
        q: "You receive an SMS saying your bank account is blocked due to missing KYC, with a link to update. What is safest?",
        opts: ["Click the link and upload Aadhaar/PAN", "Ignore the link, open your official bank app, or visit your local branch", "Forward the SMS to all friends"],
        correct: 1,
        exp: "Banks never send shortened bitly links for KYC. Always visit your branch or use the verified official banking app."
      },
      {
        q: "An unknown caller claims to be customer care and tells you to install 'AnyDesk' or 'TeamViewer' to fix an issue. What should you do?",
        opts: ["Refuse immediately and hang up", "Install it quickly so they can help", "Share the 9-digit code with them"],
        correct: 0,
        exp: "These screen-sharing apps give the fraudster complete access to your phone screen, bank accounts, and incoming OTPs."
      },
      {
        q: "What is the official National Cyber Crime Helpline number in India?",
        opts: ["100", "1930", "108"],
        correct: 1,
        exp: "1930 is the national helpline run by the Indian Cyber Crime Coordination Centre (I4C) for financial fraud complaints."
      }
    ];

    this.initBoard();
  }

  initBoard() {
    if (!this.container) return;
    this.container.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("button");
      cell.className = "ttt-cell";
      cell.setAttribute("data-cell", i);
      cell.setAttribute("aria-label", `Cell ${i + 1}`);
      cell.addEventListener("click", () => this.handleCellClick(i));
      this.container.appendChild(cell);
    }
  }

  handleCellClick(idx) {
    if (this.board[idx] || this.turn !== 'X') return;
    this.pendingCellIndex = idx;
    this.showSafetyQuestion();
  }

  showSafetyQuestion() {
    const qData = this.questionBank[Math.floor(Math.random() * this.questionBank.length)];
    const qTitle = document.getElementById("tttQuestionText");
    const optContainer = document.getElementById("tttOptionsContainer");
    const expBox = document.getElementById("tttExplanation");

    if (qTitle) qTitle.textContent = qData.q;
    if (expBox) expBox.style.display = "none";

    if (optContainer) {
      optContainer.innerHTML = "";
      qData.opts.forEach((opt, oIdx) => {
        const btn = document.createElement("button");
        btn.className = "btn-senior-secondary";
        btn.style.width = "100%";
        btn.style.textAlign = "left";
        btn.style.marginBottom = "8px";
        btn.textContent = opt;

        btn.addEventListener("click", () => {
          if (oIdx === qData.correct) {
            playFanfare();
            btn.style.background = "#dcfce7";
            btn.style.borderColor = "#16a34a";
            if (expBox) {
              expBox.style.display = "block";
              expBox.className = "mood-feedback-banner";
              expBox.innerHTML = `<strong>Correct! 🌟</strong> ${qData.exp}`;
            }
            setTimeout(() => {
              this.modal?.classList.remove("active");
              this.applyMove(this.pendingCellIndex, 'X');
              if (!this.checkWinner()) {
                this.turn = 'O';
                setTimeout(() => this.aiMove(), 600);
              }
            }, 1200);
          } else {
            playAudioChime(300, 'sawtooth', 0.25);
            btn.style.background = "#fee2e2";
            btn.style.borderColor = "#dc2626";
            if (expBox) {
              expBox.style.display = "block";
              expBox.innerHTML = `<strong>Incorrect choice.</strong> ${qData.exp}<br><em>Please choose the safe option to make your move!</em>`;
            }
          }
        });
        optContainer.appendChild(btn);
      });
    }

    this.modal?.classList.add("active");
  }

  applyMove(idx, mark) {
    this.board[idx] = mark;
    const cells = this.container.querySelectorAll(".ttt-cell");
    if (cells[idx]) {
      cells[idx].textContent = mark;
      cells[idx].classList.add(mark === 'X' ? 'player-x' : 'player-o');
    }
    playAudioChime(mark === 'X' ? 550 : 440);
  }

  aiMove() {
    // Find empty spots
    const emptyIndices = [];
    this.board.forEach((val, i) => { if (!val) emptyIndices.push(i); });
    if (emptyIndices.length === 0) return;

    // Pick random empty spot for friendly, gentle difficulty
    const choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    this.applyMove(choice, 'O');
    this.checkWinner();
    this.turn = 'X';
  }

  checkWinner() {
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const statusEl = document.getElementById("tttStatus");

    for (let combo of wins) {
      const [a, b, c] = combo;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        const winner = this.board[a];
        if (winner === 'X') {
          this.score.player++;
          playFanfare();
          if (statusEl) statusEl.textContent = "🎉 You Won! Excellent Safety Knowledge!";
        } else {
          this.score.ai++;
          if (statusEl) statusEl.textContent = "Saathi AI Won! Let's play another round!";
        }
        this.updateScoreboard();
        this.highlightWin(combo);
        return true;
      }
    }

    if (this.board.every(cell => cell !== null)) {
      this.score.ties++;
      if (statusEl) statusEl.textContent = "It's a Draw! Well defended!";
      this.updateScoreboard();
      return true;
    }

    return false;
  }

  highlightWin(combo) {
    const cells = this.container.querySelectorAll(".ttt-cell");
    combo.forEach(i => {
      cells[i]?.classList.add("win-cell");
    });
  }

  updateScoreboard() {
    const el = document.getElementById("tttScoreText");
    if (el) {
      el.textContent = `You: ${this.score.player} | Saathi AI: ${this.score.ai} | Draws: ${this.score.ties}`;
    }
    if (window.digitalSaathi) {
      window.digitalSaathi.recordGameScore('ttt', this.score.player * 10);
    }
  }

  reset() {
    this.board = Array(9).fill(null);
    this.turn = 'X';
    this.initBoard();
    const statusEl = document.getElementById("tttStatus");
    if (statusEl) statusEl.textContent = "Your turn (X). Tap any box to answer a safety question!";
  }
}


// ─── GAME D: Spot the Scam ─────────────────────────────────────────────────
class SpotTheScamGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.scenarios = [
      {
        type: "SMS Message",
        sender: "VK-SBINB-ALRT",
        message: "DEAR CUSTOMER, YOUR YONO ACCOUNT IS BLOCKED TODAY DUE TO EXPIRED PAN. CLICK HTTP://BIT.LY/YONO-RENEW-NOW TO AVOID 5000 FINE.",
        redFlags: [
          { text: "Urgent threat ('BLOCKED TODAY' / 'FINE')", found: false },
          { text: "Shortened suspicious bit.ly link", found: false },
          { text: "Asking to update banking credentials via SMS", found: false }
        ],
        explanation: "Banks never send unverified bitly links or threaten fines via SMS. All KYC updates happen in-branch or via the official net banking portal."
      },
      {
        type: "WhatsApp Lottery Claim",
        sender: "+92 300 1234567 (Unknown Number)",
        message: "Namaste! Congratulations! You have won 25 Lakh Rupees in KBC Kaun Banega Crorepati WhatsApp Lucky Draw! Contact Mr. Rana on this WhatsApp to claim your cheque.",
        redFlags: [
          { text: "Unexpected lottery you never bought a ticket for", found: false },
          { text: "Foreign country code (+92)", found: false },
          { text: "Asking to contact an unknown individual on WhatsApp", found: false }
        ],
        explanation: "There is NO SUCH THING as a WhatsApp lucky draw. Fraudsters tell you you've won, then demand a 'processing fee' or 'GST payment'."
      },
      {
        type: "Electricity Power Cut Alert",
        sender: "DM-POWER-OFFICE",
        message: "URGENT NOTICE: Your electricity connection will be disconnected tonight at 09:30 PM from the power station because last month bill is unpaid. Immediately call officer at 9876543210.",
        redFlags: [
          { text: "Extreme urgency ('disconnected tonight at 9:30 PM')", found: false },
          { text: "Personal 10-digit mobile number for official discom", found: false },
          { text: "No consumer account number (CA Number) mentioned", found: false }
        ],
        explanation: "Discoms issue formal notice on physical bills. They never provide personal mobile numbers to make instant bill payments."
      }
    ];
  }

  render() {
    if (!this.container) return;
    const item = this.scenarios[this.currentIndex];

    this.container.innerHTML = `
      <div class="senior-card" style="border-left: 6px solid #c2593f;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.9rem; font-weight: 800; color: #c2593f; text-transform: uppercase;">
            ${item.type} — Scenario ${this.currentIndex + 1} of ${this.scenarios.length}
          </span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">From: <strong>${item.sender}</strong></span>
        </div>

        <!-- Simulated Phone Message Box -->
        <div style="background: #ffffff; border: 2px dashed #c2593f; border-radius: 12px; padding: 18px; margin-bottom: 16px; font-family: monospace; font-size: 1.15rem; color: #1e293b; line-height: 1.6;">
          "${item.message}"
        </div>

        <p style="font-weight: 700; margin-bottom: 10px;">Tap all the Red Flags (Scam Signs) in this message:</p>
        <div id="redFlagButtons" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;"></div>

        <div id="scamVerdictBox" style="display: none; padding: 16px; border-radius: 10px; background: #dcfce7; border: 2px solid #16a34a; margin-bottom: 16px;">
          <h4 style="color: #14532d; font-size: 1.15rem; margin-bottom: 6px;">🎯 All Warning Signs Spotted!</h4>
          <p style="color: #166534; font-size: 1rem;">${item.explanation}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button id="btnPrevScam" class="btn-senior-secondary" ${this.currentIndex === 0 ? 'disabled' : ''}>← Previous</button>
          <button id="btnNextScam" class="btn-senior-primary">Next Scenario →</button>
        </div>
      </div>
    `;

    const flagsContainer = document.getElementById("redFlagButtons");
    const verdictBox = document.getElementById("scamVerdictBox");

    item.redFlags.forEach((flag, idx) => {
      const btn = document.createElement("button");
      btn.className = "btn-senior-secondary";
      btn.style.textAlign = "left";
      btn.style.width = "100%";
      btn.textContent = `🚩 ${flag.text}`;

      btn.addEventListener("click", () => {
        flag.found = true;
        btn.style.background = "#fee2e2";
        btn.style.borderColor = "#dc2626";
        btn.textContent = `🚩 ${flag.text} (SPOTTED!)`;
        playAudioChime(600);

        if (item.redFlags.every(f => f.found)) {
          verdictBox.style.display = "block";
          playFanfare();
          if (window.digitalSaathi) {
            window.digitalSaathi.recordGameScore('spot', 20);
          }
        }
      });
      flagsContainer?.appendChild(btn);
    });

    document.getElementById("btnPrevScam")?.addEventListener("click", () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.render();
      }
    });

    document.getElementById("btnNextScam")?.addEventListener("click", () => {
      if (this.currentIndex < this.scenarios.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Wrap around
      }
      this.render();
    });
  }
}


// ─── GAME E: Digital Memory Match ──────────────────────────────────────────
class DigitalMemoryMatch {
  constructor(gridId, scoreId, resetBtnId) {
    this.grid = document.getElementById(gridId);
    this.scoreEl = document.getElementById(scoreId);
    this.resetBtn = document.getElementById(resetBtnId);

    this.cardsData = [
      { id: 1, icon: "🔒", label: "Secret PIN" },
      { id: 2, icon: "🛡️", label: "Safe Device" },
      { id: 3, icon: "📱", label: "Private OTP" },
      { id: 4, icon: "👤", label: "Verified Name" },
      { id: 5, icon: "📞", label: "1930 Helpline" },
      { id: 6, icon: "🏪", label: "Official Store" }
    ];

    this.deck = [];
    this.flipped = [];
    this.matches = 0;
    this.moves = 0;

    this.resetBtn?.addEventListener("click", () => this.init());
  }

  init() {
    this.matches = 0;
    this.moves = 0;
    this.flipped = [];
    this.updateHUD();

    // Create 12 card deck (6 pairs)
    const combined = [...this.cardsData, ...this.cardsData];
    this.deck = combined.sort(() => 0.5 - Math.random());

    if (!this.grid) return;
    this.grid.innerHTML = "";

    this.deck.forEach((item, index) => {
      const card = document.createElement("button");
      card.className = "memory-card hidden-card";
      card.setAttribute("data-index", index);
      card.innerHTML = `<span class="card-inner">❓</span>`;
      card.addEventListener("click", () => this.flip(index, card));
      this.grid.appendChild(card);
    });
  }

  flip(index, el) {
    if (this.flipped.length >= 2 || el.classList.contains("matched") || this.flipped.some(f => f.index === index)) {
      return;
    }

    el.classList.remove("hidden-card");
    el.innerHTML = `<div style="font-size: 1.8rem;">${this.deck[index].icon}</div><div style="font-size: 0.75rem; font-weight: 700; margin-top: 4px;">${this.deck[index].label}</div>`;
    this.flipped.push({ index, el, data: this.deck[index] });
    playAudioChime(580);

    if (this.flipped.length === 2) {
      this.moves++;
      this.updateHUD();

      const [first, second] = this.flipped;
      if (first.data.id === second.data.id) {
        first.el.classList.add("matched");
        second.el.classList.add("matched");
        this.matches++;
        playFanfare();
        this.flipped = [];

        if (this.matches === this.cardsData.length) {
          setTimeout(() => {
            alert(`🎉 Wonderful Job! You matched all digital safety cards in ${this.moves} moves!`);
            if (window.digitalSaathi) {
              window.digitalSaathi.recordGameScore('memory', Math.max(10, 100 - this.moves * 5));
            }
          }, 300);
        }
      } else {
        setTimeout(() => {
          first.el.classList.add("hidden-card");
          second.el.classList.add("hidden-card");
          first.el.innerHTML = `<span class="card-inner">❓</span>`;
          second.el.innerHTML = `<span class="card-inner">❓</span>`;
          this.flipped = [];
        }, 900);
      }
    }
  }

  updateHUD() {
    if (this.scoreEl) {
      this.scoreEl.textContent = `Matches: ${this.matches} / ${this.cardsData.length} | Moves: ${this.moves}`;
    }
  }
}


// ─── GAME F: Safe or Unsafe Sorting ────────────────────────────────────────
class SafeSortingGame {
  constructor(cardDisplayId, btnSafeId, btnUnsafeId, feedbackId, scoreId) {
    this.cardDisplay = document.getElementById(cardDisplayId);
    this.btnSafe = document.getElementById(btnSafeId);
    this.btnUnsafe = document.getElementById(btnUnsafeId);
    this.feedback = document.getElementById(feedbackId);
    this.scoreEl = document.getElementById(scoreId);

    this.items = [
      { text: "Checking the shopkeeper's name on your screen before typing your UPI PIN", safe: true, exp: "SAFE: Always check the receiver's name to ensure your money goes to the right person." },
      { text: "Sharing your 6-digit OTP with a bank representative who calls you on phone", safe: false, exp: "UNSAFE: Bank employees never ask for OTPs. Sharing OTP gives direct access to your money!" },
      { text: "Downloading banking apps only from the official Google Play Store or Apple Store", safe: true, exp: "SAFE: Official app stores scan apps for viruses before making them available." },
      { text: "Clicking a link in WhatsApp that promises a free ₹500 mobile recharge", safe: false, exp: "UNSAFE: Such links steal your phone contacts or install spyware." },
      { text: "Calling 1930 immediately if unauthorized money is deducted from your bank", safe: true, exp: "SAFE: 1930 is the national cybercrime financial fraud helpline for freezing stolen funds." },
      { text: "Installing 'AnyDesk' or 'TeamViewer' because an unknown caller said your phone has a virus", safe: false, exp: "UNSAFE: Screen-sharing apps let strangers see your screen and passwords." }
    ];

    this.currentIndex = 0;
    this.score = 0;

    this.btnSafe?.addEventListener("click", () => this.classify(true));
    this.btnUnsafe?.addEventListener("click", () => this.classify(false));
  }

  init() {
    this.currentIndex = 0;
    this.score = 0;
    this.render();
  }

  render() {
    if (this.currentIndex >= this.items.length) {
      if (this.cardDisplay) {
        this.cardDisplay.innerHTML = `<h3>🎉 All Items Sorted! Final Score: ${this.score} / ${this.items.length * 10}</h3><p>Tap Restart to practice again!</p>`;
      }
      if (window.digitalSaathi) {
        window.digitalSaathi.recordGameScore('sort', this.score);
      }
      return;
    }

    const cur = this.items[this.currentIndex];
    if (this.cardDisplay) {
      this.cardDisplay.innerHTML = `
        <div style="font-size: 1.25rem; font-weight: 700; color: #2c1e18; line-height: 1.5; padding: 20px;">
          "${cur.text}"
        </div>
      `;
    }
    if (this.scoreEl) {
      this.scoreEl.textContent = `Score: ${this.score} | Item ${this.currentIndex + 1} of ${this.items.length}`;
    }
  }

  classify(userSaidSafe) {
    const cur = this.items[this.currentIndex];
    const isCorrect = (userSaidSafe === cur.safe);

    if (isCorrect) {
      this.score += 10;
      playFanfare();
      if (this.feedback) {
        this.feedback.innerHTML = `<span style="color: #15803d; font-weight: 800;">✅ Correct!</span> ${cur.exp}`;
      }
    } else {
      playAudioChime(280, 'sawtooth', 0.2);
      if (this.feedback) {
        this.feedback.innerHTML = `<span style="color: #b91c1c; font-weight: 800;">⚠️ Incorrect!</span> ${cur.exp}`;
      }
    }

    this.currentIndex++;
    setTimeout(() => this.render(), 1400);
  }
}


// ─── GAME G: Digital Knowledge Quiz ────────────────────────────────────────
class DigitalQuizGame {
  constructor(questionId, optionsId, feedbackId, scoreId, nextBtnId) {
    this.qEl = document.getElementById(questionId);
    this.optsEl = document.getElementById(optionsId);
    this.feedbackEl = document.getElementById(feedbackId);
    this.scoreEl = document.getElementById(scoreId);
    this.nextBtn = document.getElementById(nextBtnId);

    this.questions = [
      {
        q: "What should you do if an unknown caller asks for your Debit Card CVV and Expiry date?",
        options: ["Share it politely", "Hang up immediately — genuine banks never ask for CVV", "Tell them half the digits", "Write it on WhatsApp"],
        correct: 1,
        exp: "CVV and Expiry dates are confidential keys to your money. No bank employee will ever ask for them."
      },
      {
        q: "Why is a UPI PIN entered on your smartphone?",
        options: ["Only to send or transfer money out", "To receive cash prize from someone", "To register on WhatsApp", "To check the time"],
        correct: 0,
        exp: "A UPI PIN is ONLY entered to DEBIT (send) money. You never enter a PIN to receive money."
      },
      {
        q: "Which helpline number should you dial in India within the golden hour if you fall victim to an online financial fraud?",
        options: ["100", "1930", "108", "139"],
        correct: 1,
        exp: "1930 is the dedicated Cyber Fraud Helpline run by the Ministry of Home Affairs."
      },
      {
        q: "What is the safest place to download apps for your Android phone?",
        options: ["Google Play Store", "Links sent in WhatsApp groups", "Websites promising free games", "Random SMS links"],
        correct: 0,
        exp: "Google Play Store checks apps with Google Play Protect for malicious software."
      },
      {
        q: "If an unknown person sends you a QR code and says 'Scan this to receive your cashback', what will happen if you scan and enter your PIN?",
        options: ["You will receive cashback", "Money will be DEDUCTED from your bank account!", "Nothing will happen", "Your phone will charge faster"],
        correct: 1,
        exp: "Scanning a QR code and entering your PIN ALWAYS debits money from your account. Never scan to receive money!"
      }
    ];

    this.currentIdx = 0;
    this.score = 0;

    this.nextBtn?.addEventListener("click", () => this.nextQuestion());
  }

  init() {
    this.currentIdx = 0;
    this.score = 0;
    this.render();
  }

  render() {
    if (this.currentIdx >= this.questions.length) {
      if (this.qEl) this.qEl.textContent = `Quiz Completed! 🌟 Final Score: ${this.score} / ${this.questions.length * 10}`;
      if (this.optsEl) this.optsEl.innerHTML = "";
      if (this.feedbackEl) this.feedbackEl.textContent = "Great dedication to digital learning! You are becoming a confident Digital Saathi.";
      if (this.nextBtn) this.nextBtn.style.display = "none";
      if (window.digitalSaathi) {
        window.digitalSaathi.recordGameScore('quiz', this.score);
      }
      return;
    }

    const cur = this.questions[this.currentIdx];
    if (this.qEl) this.qEl.textContent = `${this.currentIdx + 1}. ${cur.q}`;
    if (this.feedbackEl) this.feedbackEl.textContent = "";
    if (this.nextBtn) this.nextBtn.style.display = "none";

    if (this.optsEl) {
      this.optsEl.innerHTML = "";
      cur.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn-senior-secondary";
        btn.style.width = "100%";
        btn.style.textAlign = "left";
        btn.style.marginBottom = "8px";
        btn.textContent = opt;

        btn.addEventListener("click", () => {
          this.checkAnswer(idx, btn, cur);
        });
        this.optsEl.appendChild(btn);
      });
    }

    if (this.scoreEl) {
      this.scoreEl.textContent = `Score: ${this.score} | Question ${this.currentIdx + 1} of ${this.questions.length}`;
    }
  }

  checkAnswer(chosenIdx, btn, cur) {
    const allBtns = this.optsEl.querySelectorAll("button");
    allBtns.forEach(b => b.disabled = true);

    if (chosenIdx === cur.correct) {
      this.score += 10;
      btn.style.background = "#dcfce7";
      btn.style.borderColor = "#16a34a";
      playFanfare();
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = `<span style="color: #15803d; font-weight: 700;">✅ Correct!</span> ${cur.exp}`;
      }
    } else {
      btn.style.background = "#fee2e2";
      btn.style.borderColor = "#dc2626";
      allBtns[cur.correct].style.background = "#dcfce7";
      allBtns[cur.correct].style.borderColor = "#16a34a";
      playAudioChime(300, 'sawtooth', 0.2);
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = `<span style="color: #b91c1c; font-weight: 700;">⚠️ Not quite!</span> ${cur.exp}`;
      }
    }

    if (this.nextBtn) this.nextBtn.style.display = "inline-flex";
  }

  nextQuestion() {
    this.currentIdx++;
    this.render();
  }
}


// ─── GAME H: Smartphone Skills Challenge ───────────────────────────────────
class SmartphoneSkillsChallenge {
  constructor(screenDisplayId, missionTextId, feedbackId) {
    this.screenDisplay = document.getElementById(screenDisplayId);
    this.missionText = document.getElementById(missionTextId);
    this.feedback = document.getElementById(feedbackId);

    this.missions = [
      {
        task: "Mission 1: You need to make a phone call to your family. Tap the correct Phone Call icon.",
        icons: [
          { name: "Camera", icon: "📷", correct: false },
          { name: "Phone", icon: "📞", correct: true },
          { name: "Music", icon: "🎵", correct: false },
          { name: "Calculator", icon: "🔢", correct: false }
        ],
        praise: "Excellent! The green Phone icon is what you tap to dial numbers or view your contacts."
      },
      {
        task: "Mission 2: An unknown scam call is ringing. Tap the RED button to decline and avoid answering.",
        icons: [
          { name: "Answer Call", icon: "🟢 Accept", correct: false },
          { name: "Decline Call", icon: "🔴 Decline", correct: true }
        ],
        praise: "Spot on! Declining unknown suspicious calls is the best way to prevent scammers from engaging you."
      },
      {
        task: "Mission 3: You want to browse the web safely. Tap the official Web Browser icon.",
        icons: [
          { name: "Gallery", icon: "🖼️", correct: false },
          { name: "Settings", icon: "⚙️", correct: false },
          { name: "Browser", icon: "🌐", correct: true },
          { name: "Flashlight", icon: "🔦", correct: false }
        ],
        praise: "Great! The Globe/Browser icon opens the internet. Always look for the lock symbol (https) in the address bar!"
      }
    ];

    this.currentIdx = 0;
  }

  init() {
    this.currentIdx = 0;
    this.render();
  }

  render() {
    if (this.currentIdx >= this.missions.length) {
      if (this.missionText) this.missionText.textContent = "🏆 All Smartphone Skills Mastered!";
      if (this.screenDisplay) {
        this.screenDisplay.innerHTML = `<div style="padding: 24px; text-align: center;"><h3>🎉 Congratulations!</h3><p>You have proven your practical smartphone handling skills!</p></div>`;
      }
      if (this.feedback) this.feedback.textContent = "";
      if (window.digitalSaathi) {
        window.digitalSaathi.recordGameScore('skills', 50);
      }
      return;
    }

    const cur = this.missions[this.currentIdx];
    if (this.missionText) this.missionText.textContent = cur.task;
    if (this.feedback) this.feedback.textContent = "";

    if (this.screenDisplay) {
      this.screenDisplay.innerHTML = "";
      const grid = document.createElement("div");
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";
      grid.style.gap = "14px";
      grid.style.padding = "20px";

      cur.icons.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "btn-senior-secondary";
        btn.style.height = "90px";
        btn.style.display = "flex";
        btn.style.flexDirection = "column";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.innerHTML = `<span style="font-size: 2rem;">${item.icon}</span><span style="font-size: 0.85rem; font-weight: 700; margin-top: 4px;">${item.name}</span>`;

        btn.addEventListener("click", () => {
          if (item.correct) {
            playFanfare();
            btn.style.background = "#dcfce7";
            btn.style.borderColor = "#16a34a";
            if (this.feedback) {
              this.feedback.innerHTML = `<span style="color: #15803d; font-weight: 700;">✅ Excellent!</span> ${cur.praise}`;
            }
            setTimeout(() => {
              this.currentIdx++;
              this.render();
            }, 1500);
          } else {
            playAudioChime(300, 'sawtooth', 0.2);
            btn.style.background = "#fee2e2";
            btn.style.borderColor = "#dc2626";
            if (this.feedback) {
              this.feedback.innerHTML = `<span style="color: #b91c1c;">Try again! Look closely for the intended action.</span>`;
            }
          }
        });
        grid.appendChild(btn);
      });

      this.screenDisplay.appendChild(grid);
    }
  }
}
