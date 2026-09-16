import { CATEGORIES } from '../data/categories';
import { QUESTIONS } from '../data/questions';

export function generateStandaloneHtml(): string {
  const categoriesJson = JSON.stringify(CATEGORIES);
  const questionsJson = JSON.stringify(QUESTIONS);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reto Relámpago - Juego Educativo Contrarreloj</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    body {
      background-color: #0f172a;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
    }
    .container {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #334155;
      flex-wrap: wrap;
      gap: 10px;
    }
    .logo {
      font-weight: 900;
      font-size: 1.3rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f59e0b;
    }
    .header-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #cbd5e1;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .icon-btn:hover {
      background: #334155;
      color: #fff;
    }
    .icon-btn.active-voice {
      background: rgba(8, 145, 178, 0.25);
      border-color: #06b6d4;
      color: #67e8f9;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 8px;
      color: #fff;
    }
    .subtitle {
      text-align: center;
      font-size: 1.1rem;
      color: #38bdf8;
      font-style: italic;
      margin-bottom: 24px;
    }
    .btn {
      display: block;
      width: 100%;
      padding: 14px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
      text-align: center;
      margin-bottom: 10px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #0f172a;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: #334155;
      color: #f8fafc;
      border: 1px solid #475569;
    }
    .btn-secondary:hover {
      background: #475569;
    }
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      border: 1px solid #334155;
      padding: 10px 16px;
      border-radius: 14px;
      margin-bottom: 16px;
      font-size: 0.85rem;
    }
    .timer-badge {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }
    .timer-warning {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.5);
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .streak-badge {
      color: #f97316;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .progress-track {
      width: 100%;
      height: 8px;
      background: #0f172a;
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #f59e0b, #38bdf8);
      width: 0%;
      transition: width 0.3s ease;
    }
    .question-box {
      font-size: 1.3rem;
      font-weight: 800;
      line-height: 1.4;
      margin-bottom: 16px;
      color: #fff;
    }
    .voice-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .voice-btn {
      background: #0f172a;
      border: 1px solid #38bdf8;
      color: #38bdf8;
      padding: 6px 12px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .voice-btn:hover {
      background: #0284c7;
      color: #fff;
    }
    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 16px;
    }
    .option-btn {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 14px 18px;
      color: #f8fafc;
      font-size: 1rem;
      font-weight: 700;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .option-btn:hover:not(:disabled) {
      background: #1e293b;
      border-color: #38bdf8;
      transform: translateY(-1px);
    }
    .option-letter {
      width: 28px;
      height: 28px;
      background: #1e293b;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 0.85rem;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .option-correct {
      background: rgba(16, 185, 129, 0.2) !important;
      border-color: #10b981 !important;
      color: #6ee7b7 !important;
    }
    .option-correct .option-letter {
      background: #10b981 !important;
      color: #0f172a !important;
    }
    .option-wrong {
      background: rgba(239, 68, 68, 0.2) !important;
      border-color: #ef4444 !important;
      color: #fca5a5 !important;
    }
    .option-wrong .option-letter {
      background: #ef4444 !important;
      color: #fff !important;
    }
    .explanation-box {
      background: #0f172a;
      border-left: 4px solid #38bdf8;
      padding: 12px 16px;
      border-radius: 0 12px 12px 0;
      margin-bottom: 16px;
      font-size: 0.9rem;
      color: #cbd5e1;
      line-height: 1.5;
    }
    .motivational-msg {
      padding: 10px 14px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.95rem;
      margin-bottom: 12px;
      background: #0f172a;
      border: 1px solid #334155;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }
    .stat-card {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 12px;
      border-radius: 14px;
      text-align: center;
    }
    .stat-val {
      font-size: 1.6rem;
      font-weight: 900;
      color: #f59e0b;
    }
    .stat-lbl {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      font-weight: 700;
      margin-top: 2px;
    }
    .level-select {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 16px;
    }
    .pill-btn {
      background: #0f172a;
      border: 1px solid #334155;
      color: #cbd5e1;
      padding: 8px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
    }
    .pill-btn.active {
      background: #0284c7;
      border-color: #38bdf8;
      color: #fff;
    }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">⚡ RETO RELÁMPAGO</div>
      <div class="header-controls">
        <button id="soundToggleBtn" class="icon-btn">🔊 Sonido: ON</button>
        <button id="voiceToggleBtn" class="icon-btn active-voice">🔊 Voz: ACTIVADA</button>
      </div>
    </header>

    <!-- PANTALLA INICIO -->
    <div id="screenHome" class="card">
      <h1>⚡ RETO RELÁMPAGO ⚡</h1>
      <p class="subtitle">“¿Qué tan rápido puedes pensar?”</p>

      <div style="margin-bottom: 16px;">
        <label style="font-size: 0.85rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px;">NIVEL DE DIFICULTAD:</label>
        <div class="level-select">
          <div class="pill-btn active" data-lvl="facil">Fácil</div>
          <div class="pill-btn" data-lvl="intermedio">Intermedio</div>
          <div class="pill-btn" data-lvl="dificil">Difícil</div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="font-size: 0.85rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px;">CATEGORÍA SELECCIONADA:</label>
        <div id="selectedCatLabel" style="background: #0f172a; padding: 12px 16px; border-radius: 12px; border: 1px solid #334155; font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
          <span>🌐 Todas las categorías</span>
          <button id="changeCatBtn" style="background:none; border:none; color:#38bdf8; font-weight:700; cursor:pointer;">Cambiar</button>
        </div>
      </div>

      <button id="startBtn" class="btn btn-primary">🚀 ¡JUGAR AHORA!</button>
      <button id="instructionsBtn" class="btn btn-secondary">📖 INSTRUCCIONES</button>
      <button id="categoriesBtn" class="btn btn-secondary">🏷️ CATEGORÍAS</button>
      <button id="recordsBtn" class="btn btn-secondary">🏆 MEJORES RESULTADOS</button>
    </div>

    <!-- PANTALLA CATEGORÍAS -->
    <div id="screenCategories" class="card hidden">
      <h2 style="font-size: 1.5rem; text-align: center; margin-bottom: 16px;">Selecciona una Categoría</h2>
      <div id="categoriesList" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;"></div>
      <button id="closeCatBtn" class="btn btn-secondary">Volver al Menú</button>
    </div>

    <!-- PANTALLA INSTRUCCIONES -->
    <div id="screenInstructions" class="card hidden">
      <h2 style="font-size: 1.5rem; text-align: center; margin-bottom: 16px;">¿Cómo Jugar?</h2>
      <div style="font-size: 0.95rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; display: flex; flex-direction: column; gap: 12px;">
        <p>⏱️ <strong>15 Segundos por Pregunta:</strong> Piensa rápido antes de que el contador llegue a cero.</p>
        <p>🎯 <strong>Puntos Base:</strong> 100 puntos por respuesta correcta.</p>
        <p>⚡ <strong>Bono de Velocidad:</strong> Entre más segundos te sobren, ¡más puntos extra ganas!</p>
        <p>🔥 <strong>Rachas Imparables:</strong> Respuestas consecutivas multiplican tus puntos y otorgan bonos a las 3 y 5 seguidas.</p>
        <p>🔊 <strong>Audio & Voz Completa:</strong> Web Audio API sintetiza sonidos y SpeechSynthesis lee las preguntas y respuestas en español de forma nativa.</p>
        <p>💡 <strong>Aprende Jugando:</strong> Cada pregunta tiene una explicación educativa instantánea.</p>
      </div>
      <button id="closeInstBtn" class="btn btn-primary">¡ENTENDIDO! VOLVER</button>
    </div>

    <!-- PANTALLA MEJORES RESULTADOS -->
    <div id="screenRecords" class="card hidden">
      <h2 style="font-size: 1.5rem; text-align: center; margin-bottom: 16px;">🏆 Mejores Resultados</h2>
      <div id="recordsList" style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px;"></div>
      <button id="closeRecBtn" class="btn btn-secondary">Volver</button>
    </div>

    <!-- PANTALLA DE JUEGO -->
    <div id="screenGame" class="card hidden">
      <div class="status-bar">
        <div>Pregunta <strong id="questionNum">1/10</strong></div>
        <div id="timerDisplay" class="timer-badge">15s</div>
        <div class="streak-badge">🔥 Racha: <span id="streakNum">0</span></div>
        <div>Puntos: <strong id="scoreNum" style="color: #f59e0b;">0</strong></div>
      </div>

      <div class="progress-track">
        <div id="progressFill" class="progress-fill"></div>
      </div>

      <div id="catBadge" style="display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; background: #0284c7; color: #fff; margin-bottom: 12px;">CULTURA GENERAL</div>

      <div id="questionText" class="question-box">¿Cargando pregunta?</div>

      <!-- BOTONES DE VOZ -->
      <div class="voice-actions">
        <button id="listenQuestionBtn" class="voice-btn">🔊 Escuchar pregunta</button>
        <button id="listenOptionsBtn" class="voice-btn">📋 Escuchar opciones</button>
        <button id="stopVoiceBtn" class="voice-btn" style="border-color:#ef4444; color:#ef4444; display:none;">⏹️ Detener voz</button>
      </div>

      <div id="optionsContainer" class="options-grid"></div>

      <div id="postAnswerBox" class="hidden">
        <div id="motivationalText" class="motivational-msg"></div>
        <div id="explanationText" class="explanation-box"></div>
        <button id="nextQuestionBtn" class="btn btn-primary">SIGUIENTE PREGUNTA ➡️</button>
      </div>
    </div>

    <!-- PANTALLA FINAL -->
    <div id="screenFinal" class="card hidden">
      <h2 id="finalClassification" style="text-align: center; font-size: 1.8rem; font-weight: 900; margin-bottom: 8px; color: #f59e0b;">¡MENTE BRILLANTE!</h2>
      <p style="text-align: center; color: #94a3b8; margin-bottom: 16px;">Has completado el Reto Relámpago</p>

      <button id="listenSummaryBtn" class="btn btn-secondary" style="border-color: #38bdf8; color: #38bdf8; margin-bottom: 20px;">
        🔊 Escuchar resultado de la partida
      </button>

      <div class="grid-2">
        <div class="stat-card">
          <div id="finalScore" class="stat-val">0</div>
          <div class="stat-lbl">Puntaje Total</div>
        </div>
        <div class="stat-card">
          <div id="finalAccuracy" class="stat-val">0%</div>
          <div class="stat-lbl">Porcentaje Aciertos</div>
        </div>
        <div class="stat-card">
          <div id="finalCorrect" class="stat-val" style="color: #10b981;">0</div>
          <div class="stat-lbl">Correctas</div>
        </div>
        <div class="stat-card">
          <div id="finalWrong" class="stat-val" style="color: #ef4444;">0</div>
          <div class="stat-lbl">Incorrectas</div>
        </div>
        <div class="stat-card">
          <div id="finalMaxStreak" class="stat-val" style="color: #f97316;">0</div>
          <div class="stat-lbl">Racha Máxima 🔥</div>
        </div>
        <div class="stat-card">
          <div id="finalAvgTime" class="stat-val" style="color: #38bdf8;">0s</div>
          <div class="stat-lbl">Tiempo Promedio ⏱️</div>
        </div>
      </div>

      <button id="playAgainBtn" class="btn btn-primary">🔄 JUGAR OTRA VEZ</button>
      <button id="changeCatFinalBtn" class="btn btn-secondary">🏷️ CAMBIAR CATEGORÍA</button>
      <button id="backHomeBtn" class="btn btn-secondary">🏠 VOLVER AL INICIO</button>
    </div>
  </div>

  <script>
    // DATOS DE PREGUNTAS Y CATEGORÍAS
    const CATEGORIES = ${categoriesJson};
    const ALL_QUESTIONS = ${questionsJson};

    // AUDIO CON WEB AUDIO API
    class WebAudioSynth {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }
      init() {
        if (!this.ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
      }
      playStart() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [261.63, 329.63, 392.0, 523.25, 659.25].forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.001, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);
          osc.connect(gain); gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.2);
        });
      }
      playSelect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now); osc.stop(now + 0.08);
      }
      playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.07);
          gain.gain.setValueAtTime(0.001, now + i * 0.07);
          gain.gain.linearRampToValueAtTime(0.2, now + i * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.22);
          osc.connect(gain); gain.connect(this.ctx.destination);
          osc.start(now + i * 0.07); osc.stop(now + i * 0.07 + 0.25);
        });
      }
      playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now); osc.stop(now + 0.35);
      }
      playTick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(now); osc.stop(now + 0.06);
      }
      playStreak() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [587.33, 739.99, 880, 1174.66].forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.06);
          gain.gain.setValueAtTime(0.15, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);
          osc.connect(gain); gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06); osc.stop(now + i * 0.06 + 0.2);
        });
      }
      playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const fanfare = [
          { f: 523.25, t: 0 },
          { f: 523.25, t: 0.12 },
          { f: 523.25, t: 0.24 },
          { f: 659.25, t: 0.38 },
          { f: 783.99, t: 0.60 },
          { f: 1046.5, t: 0.85 }
        ];
        fanfare.forEach(n => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n.f, now + n.t);
          gain.gain.setValueAtTime(0.01, now + n.t);
          gain.gain.linearRampToValueAtTime(0.22, now + n.t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.35);
          osc.connect(gain); gain.connect(this.ctx.destination);
          osc.start(now + n.t); osc.stop(now + n.t + 0.4);
        });
      }
      playGameOver() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [440, 554.37, 659.25, 880].forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.12);
          gain.gain.setValueAtTime(0.01, now + i * 0.12);
          gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
          osc.connect(gain); gain.connect(this.ctx.destination);
          osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.35);
        });
      }
    }
    const audio = new WebAudioSynth();

    // SPEECHSYNTHESIS NATIVO (Presentador Juvenil Inteligente)
    class NativeSpeechSynth {
      constructor() {
        this.enabled = true;
        this.speaking = false;
        this.selectedVoice = null;
        this.voiceName = 'Voz predeterminada';
        this.volume = 1.0;
        this.currentSequenceId = 0;
        this.lastPhrase = '';
        this.initVoice();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = () => this.initVoice();
        }
      }

      initVoice() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        const esVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('es'));
        if (esVoices.length === 0) return;

        const scored = esVoices.map(v => {
          let score = 0;
          const lang = v.lang.toLowerCase();
          const name = v.name.toLowerCase();

          // Prioridad Español Colombia y Latinoamérica
          if (lang === 'es-co') score += 100;
          else if (lang === 'es-419' || lang === 'es-mx' || lang === 'es-us') score += 70;
          else if (lang.startsWith('es-')) score += 40;

          // Voces neuronales y naturales modernas
          if (name.includes('natural') || name.includes('neural') || name.includes('online')) score += 50;
          if (name.includes('salome') || name.includes('gonzalo') || name.includes('sabina') || name.includes('dalia') || name.includes('jorge')) score += 40;
          if (name.includes('google') || name.includes('microsoft')) score += 25;

          return { voice: v, score };
        });

        scored.sort((a, b) => b.score - a.score);
        if (scored[0]) {
          this.selectedVoice = scored[0].voice;
          this.voiceName = scored[0].voice.name;
        }
      }

      sanitize(text) {
        if (!text) return '';
        var s = String(text);
        s = s.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
        s = s.replace(/[*_~#>[\]\\]/g, ' ');
        s = s.replace(/\b(\d+)\s*pts?\b/gi, '$1 puntos');
        s = s.replace(/\b(\d+)\s*s\b/gi, '$1 segundos');
        s = s.replace(/\b(\d+)%/g, '$1 por ciento');
        s = s.replace(/\s+/g, ' ');
        return s.trim();
      }

      stop() {
        this.currentSequenceId++;
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          this.speaking = false;
          const stopBtn = document.getElementById('stopVoiceBtn');
          if (stopBtn) stopBtn.style.display = 'none';
        }
      }

      speak(text, opts = {}) {
        if (!this.enabled || !('speechSynthesis' in window)) return;
        this.stop();
        const clean = this.sanitize(text);
        if (!clean) return;

        const u = new SpeechSynthesisUtterance(clean);
        u.lang = this.selectedVoice ? this.selectedVoice.lang : 'es-CO';
        if (this.selectedVoice) u.voice = this.selectedVoice;
        u.volume = this.volume;
        u.rate = opts.rate !== undefined ? opts.rate : 0.98;
        u.pitch = opts.pitch !== undefined ? opts.pitch : 1.05;

        const stopBtn = document.getElementById('stopVoiceBtn');
        u.onstart = () => {
          this.speaking = true;
          if (stopBtn) stopBtn.style.display = 'inline-block';
        };
        u.onend = () => {
          this.speaking = false;
          if (stopBtn) stopBtn.style.display = 'none';
        };
        u.onerror = () => {
          this.speaking = false;
          if (stopBtn) stopBtn.style.display = 'none';
        };

        window.speechSynthesis.speak(u);
      }

      speakSequence(segments) {
        if (!this.enabled || !('speechSynthesis' in window)) return;
        this.stop();
        const seqId = this.currentSequenceId;
        const valid = segments.map(s => ({ ...s, text: this.sanitize(s.text) })).filter(s => s.text.length > 0);
        if (valid.length === 0) return;

        let index = 0;
        const speakNext = () => {
          if (seqId !== this.currentSequenceId) return;
          if (index >= valid.length) {
            this.speaking = false;
            const stopBtn = document.getElementById('stopVoiceBtn');
            if (stopBtn) stopBtn.style.display = 'none';
            return;
          }

          const seg = valid[index];
          index++;
          const u = new SpeechSynthesisUtterance(seg.text);
          u.lang = this.selectedVoice ? this.selectedVoice.lang : 'es-CO';
          if (this.selectedVoice) u.voice = this.selectedVoice;
          u.volume = this.volume;
          u.rate = seg.rate !== undefined ? seg.rate : 0.98;
          u.pitch = seg.pitch !== undefined ? seg.pitch : 1.05;

          const stopBtn = document.getElementById('stopVoiceBtn');
          u.onstart = () => {
            this.speaking = true;
            if (stopBtn) stopBtn.style.display = 'inline-block';
          };
          u.onend = () => {
            if (seqId !== this.currentSequenceId) return;
            const pause = seg.pauseAfterMs || 100;
            setTimeout(speakNext, pause);
          };
          u.onerror = () => {
            if (seqId !== this.currentSequenceId) return;
            setTimeout(speakNext, 50);
          };

          window.speechSynthesis.speak(u);
        };

        speakNext();
      }

      pickNonRepeating(list) {
        const available = list.filter(p => p !== this.lastPhrase);
        const chosen = available[Math.floor(Math.random() * (available.length || list.length))] || list[0];
        this.lastPhrase = chosen;
        return chosen;
      }

      speakQuestion(qText, qNum) {
        const intros = [
          'Pregunta número ' + qNum + ':',
          'Atención con la pregunta ' + qNum + ':',
          'Vamos con la siguiente:',
          'Pregunta ' + qNum + ':'
        ];
        const intro = this.pickNonRepeating(intros);
        this.speakSequence([
          { text: intro, pitch: 1.08, rate: 1.0, pauseAfterMs: 400 },
          { text: qText, pitch: 1.02, rate: 0.96, pauseAfterMs: 150 }
        ]);
      }

      speakOptions(options) {
        const letters = ['Opción A', 'Opción B', 'Opción C', 'Opción D'];
        const segs = [{ text: 'Las opciones son:', pitch: 1.05, rate: 1.0, pauseAfterMs: 300 }];
        options.forEach((opt, idx) => {
          segs.push({
            text: (letters[idx] || 'Opción') + ': ' + opt,
            pitch: 1.0,
            rate: 0.98,
            pauseAfterMs: 350
          });
        });
        this.speakSequence(segs);
      }

      speakCorrect(streak, points) {
        const praises = [
          '¡Respuesta correcta!',
          '¡Exacto! ¡Muy bien jugado!',
          '¡Correcto! Excelente reflejo.',
          '¡Brillante! Respuesta acertada.',
          '¡Perfecto! Directo al blanco.'
        ];
        const praise = this.pickNonRepeating(praises);
        const segs = [{ text: praise, pitch: 1.15, rate: 1.05, pauseAfterMs: 250 }];
        if (streak >= 3) {
          segs.push({ text: '¡Llevas una racha de ' + streak + ' aciertos seguidos!', pitch: 1.12, rate: 1.02, pauseAfterMs: 200 });
        }
        this.speakSequence(segs);
      }

      speakIncorrect(correctOption) {
        const encourages = [
          'No te preocupes, ¡aprende el dato y sigue adelante!',
          '¡Casi lo logras! La siguiente será tuya.',
          '¡Buen intento! Mantén el ritmo.',
          '¡Ánimo! El próximo reto lo dominas.'
        ];
        const segs = [
          { text: 'Respuesta incorrecta.', pitch: 0.95, rate: 0.95, pauseAfterMs: 300 }
        ];
        if (correctOption) {
          segs.push({ text: 'La respuesta correcta era: ' + correctOption + '.', pitch: 1.0, rate: 0.97, pauseAfterMs: 350 });
        }
        segs.push({ text: this.pickNonRepeating(encourages), pitch: 1.05, rate: 1.0, pauseAfterMs: 150 });
        this.speakSequence(segs);
      }

      speakTimeOut(correctOption) {
        const segs = [
          { text: '¡Tiempo agotado!', pitch: 1.08, rate: 1.05, pauseAfterMs: 300 }
        ];
        if (correctOption) {
          segs.push({ text: 'La opción correcta era: ' + correctOption + '.', pitch: 1.0, rate: 0.96, pauseAfterMs: 350 });
        }
        segs.push({ text: '¡Apresúrate en la próxima para ganar más puntos!', pitch: 1.02, rate: 1.0, pauseAfterMs: 150 });
        this.speakSequence(segs);
      }

      speakTimerSuspense() {
        const warnings = ['¡Cinco segundos!', '¡El tiempo se acaba!', '¡Decídete rápido!'];
        this.speak(this.pickNonRepeating(warnings), { pitch: 1.18, rate: 1.12 });
      }

      speakFinal(score, accuracy, maxStreak, classification) {
        this.speakSequence([
          { text: '¡Partida finalizada!', pitch: 1.15, rate: 1.02, pauseAfterMs: 400 },
          { text: 'Tu resultado es: ' + classification + '.', pitch: 1.1, rate: 0.98, pauseAfterMs: 350 },
          { text: 'Obtuviste ' + score + ' puntos, con ' + accuracy + ' por ciento de precisión y racha de ' + maxStreak + '.', pitch: 1.02, rate: 0.98, pauseAfterMs: 200 }
        ]);
      }
    }
    const voice = new NativeSpeechSynth();

    // CANVAS CONFETTI
    function runConfetti() {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0'; canvas.style.left = '0';
      canvas.style.width = '100vw'; canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none'; canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'];
      const particles = [];
      for(let i=0; i<100; i++) {
        particles.push({
          x: width/2, y: height/3,
          vx: (Math.random()-0.5)*16, vy: Math.random()*-14 - 3,
          w: Math.random()*8+6, h: Math.random()*6+4,
          color: colors[Math.floor(Math.random()*colors.length)],
          opacity: 1
        });
      }
      const start = Date.now();
      function tick() {
        const elapsed = Date.now() - start;
        ctx.clearRect(0,0,width,height);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.35;
          if (elapsed > 1800) p.opacity -= 0.02;
          if (p.opacity > 0) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillRect(p.x, p.y, p.w, p.h);
          }
        });
        if (elapsed < 3200) requestAnimationFrame(tick);
        else canvas.remove();
      }
      tick();
    }

    // ESTADO DEL JUEGO
    let currentLevel = 'facil';
    let currentCategory = 'all';
    let gameQuestions = [];
    let currentQIndex = 0;
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let timeLeft = 15;
    let timerInterval = null;
    let questionStartTime = 0;
    let responseTimes = [];

    // ELEMENTOS DOM
    const screens = {
      home: document.getElementById('screenHome'),
      categories: document.getElementById('screenCategories'),
      instructions: document.getElementById('screenInstructions'),
      records: document.getElementById('screenRecords'),
      game: document.getElementById('screenGame'),
      final: document.getElementById('screenFinal')
    };

    function showScreen(name) {
      voice.stop();
      Object.keys(screens).forEach(k => {
        screens[k].classList.toggle('hidden', k !== name);
      });
    }

    // CONTROLES DE AUDIO Y VOZ
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    soundToggleBtn.onclick = () => {
      audio.enabled = !audio.enabled;
      soundToggleBtn.textContent = audio.enabled ? '🔊 Sonido: ON' : '🔇 Sonido: OFF';
    };

    const voiceToggleBtn = document.getElementById('voiceToggleBtn');
    voiceToggleBtn.onclick = () => {
      voice.enabled = !voice.enabled;
      voiceToggleBtn.textContent = voice.enabled ? '🔊 Voz: ACTIVADA' : '🔇 Voz: DESACTIVADA';
      voiceToggleBtn.classList.toggle('active-voice', voice.enabled);
      if (!voice.enabled) voice.stop();
      else voice.speak('Voz activada.');
    };

    const stopVoiceBtn = document.getElementById('stopVoiceBtn');
    if (stopVoiceBtn) {
      stopVoiceBtn.onclick = () => voice.stop();
    }

    // SELECCIÓN DE NIVEL
    document.querySelectorAll('.pill-btn[data-lvl]').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.pill-btn[data-lvl]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLevel = btn.dataset.lvl;
      };
    });

    // RENDERIZAR CATEGORÍAS
    const categoriesList = document.getElementById('categoriesList');
    function renderCategories() {
      categoriesList.innerHTML = '';
      const allBtn = document.createElement('button');
      allBtn.className = 'option-btn' + (currentCategory === 'all' ? ' option-correct' : '');
      allBtn.innerHTML = '<span class="option-letter">🌐</span> <div><strong>Todas las categorías</strong><div style="font-size:0.8rem; color:#94a3b8">Preguntas mezcladas de todas las temáticas</div></div>';
      allBtn.onclick = () => selectCategory('all', '🌐 Todas las categorías');
      categoriesList.appendChild(allBtn);

      CATEGORIES.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'option-btn' + (currentCategory === c.id ? ' option-correct' : '');
        btn.innerHTML = '<span class="option-letter">' + c.emoji + '</span> <div><strong>' + c.name + '</strong><div style="font-size:0.8rem; color:#94a3b8">' + c.description + '</div></div>';
        btn.onclick = () => selectCategory(c.id, c.emoji + ' ' + c.name);
        categoriesList.appendChild(btn);
      });
    }
    function selectCategory(id, label) {
      currentCategory = id;
      document.getElementById('selectedCatLabel').querySelector('span').textContent = label;
      showScreen('home');
    }

    // BOTONES INICIO
    document.getElementById('startBtn').onclick = () => {
      audio.init();
      audio.playStart();
      startGame();
    };
    document.getElementById('instructionsBtn').onclick = () => showScreen('instructions');
    document.getElementById('closeInstBtn').onclick = () => showScreen('home');
    document.getElementById('categoriesBtn').onclick = () => { renderCategories(); showScreen('categories'); };
    document.getElementById('changeCatBtn').onclick = () => { renderCategories(); showScreen('categories'); };
    document.getElementById('closeCatBtn').onclick = () => showScreen('home');
    document.getElementById('recordsBtn').onclick = () => { renderRecords(); showScreen('records'); };
    document.getElementById('closeRecBtn').onclick = () => showScreen('home');
    document.getElementById('playAgainBtn').onclick = () => {
      audio.playStart();
      startGame();
    };
    document.getElementById('changeCatFinalBtn').onclick = () => { renderCategories(); showScreen('categories'); };
    document.getElementById('backHomeBtn').onclick = () => showScreen('home');

    function startGame() {
      let pool = ALL_QUESTIONS.filter(q => {
        const matchCat = currentCategory === 'all' || q.categoryId === currentCategory;
        const matchLevel = q.level === currentLevel;
        return matchCat && matchLevel;
      });
      if (pool.length < 10) {
        pool = ALL_QUESTIONS.filter(q => currentCategory === 'all' || q.categoryId === currentCategory);
      }
      pool.sort(() => Math.random() - 0.5);
      gameQuestions = pool.slice(0, 10);

      currentQIndex = 0;
      score = 0;
      streak = 0;
      maxStreak = 0;
      correctCount = 0;
      incorrectCount = 0;
      responseTimes = [];

      showScreen('game');
      renderQuestion();
    }

    function renderQuestion() {
      clearInterval(timerInterval);
      voice.stop();
      const q = gameQuestions[currentQIndex];

      document.getElementById('questionNum').textContent = (currentQIndex + 1) + '/10';
      document.getElementById('scoreNum').textContent = score;
      document.getElementById('streakNum').textContent = streak;
      document.getElementById('progressFill').style.width = ((currentQIndex) / 10 * 100) + '%';

      const catObj = CATEGORIES.find(c => c.id === q.categoryId);
      document.getElementById('catBadge').textContent = (catObj ? catObj.emoji + ' ' + catObj.name : 'RETO RELÁMPAGO');
      document.getElementById('questionText').textContent = q.question;

      // Lectura por voz de la pregunta
      if (voice.enabled) {
        voice.speakQuestion(q.question, currentQIndex + 1);
      }

      // Conectar botones de voz
      document.getElementById('listenQuestionBtn').onclick = () => {
        voice.speakQuestion(q.question, currentQIndex + 1);
      };
      document.getElementById('listenOptionsBtn').onclick = () => {
        voice.speakOptions(q.options);
      };

      const postBox = document.getElementById('postAnswerBox');
      postBox.classList.add('hidden');

      const container = document.getElementById('optionsContainer');
      container.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = '<span class="option-letter">' + letters[idx] + '</span> <span>' + opt + '</span>';
        btn.onclick = () => handleAnswer(idx);
        container.appendChild(btn);
      });

      // Temporizador 15s
      timeLeft = 15;
      updateTimerUI();
      questionStartTime = Date.now();
      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 4 && timeLeft > 0) {
          audio.playTick();
          if (timeLeft === 4 && voice.enabled) {
            voice.speakTimerSuspense();
          }
        }
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          handleTimeOut();
        }
      }, 1000);
    }

    function updateTimerUI() {
      const display = document.getElementById('timerDisplay');
      display.textContent = timeLeft + 's';
      display.classList.toggle('timer-warning', timeLeft <= 4);
    }

    function handleAnswer(selectedIndex) {
      clearInterval(timerInterval);
      audio.playSelect();
      voice.stop();

      const q = gameQuestions[currentQIndex];
      const elapsedSeconds = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
      responseTimes.push(elapsedSeconds);

      const buttons = document.querySelectorAll('#optionsContainer .option-btn');
      buttons.forEach(b => b.disabled = true);

      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) {
        audio.playCorrect();
        correctCount++;
        streak++;
        if (streak > maxStreak) maxStreak = streak;

        let points = 100 + (timeLeft * 10);
        let bonusText = '';

        if (streak === 3) {
          points += 50;
          bonusText = ' ¡Racha de 3 (+50 pts)! 🔥';
          audio.playStreak();
        } else if (streak === 5) {
          points += 100;
          bonusText = ' ¡Super Racha de 5 (+100 pts)! ⚡';
          audio.playStreak();
        } else if (streak > 5) {
          points += 30;
        }

        score += points;
        buttons[selectedIndex].classList.add('option-correct');

        const motivators = ['¡Excelente!', '¡Vas muy bien!', '¡Racha activa!', '¡Respuesta brillante!'];
        const chosen = motivators[Math.floor(Math.random() * motivators.length)];
        document.getElementById('motivationalText').style.color = '#10b981';
        document.getElementById('motivationalText').textContent = '✅ ' + chosen + ' (+' + points + ' pts)' + bonusText;

        if (voice.enabled) {
          voice.speakCorrect(streak, points);
        }
      } else {
        audio.playWrong();
        incorrectCount++;
        streak = 0;
        buttons[selectedIndex].classList.add('option-wrong');
        buttons[q.correctIndex].classList.add('option-correct');

        const encourages = ['¡Buen intento!', '¡Casi lo logras!', '¡No te rindas!'];
        const chosenEncourage = encourages[Math.floor(Math.random() * encourages.length)];
        document.getElementById('motivationalText').style.color = '#ef4444';
        document.getElementById('motivationalText').textContent = '❌ ' + chosenEncourage;

        if (voice.enabled) {
          voice.speakIncorrect(q.options[q.correctIndex]);
        }
      }

      showPostAnswer(q);
    }

    function handleTimeOut() {
      const q = gameQuestions[currentQIndex];
      responseTimes.push(15);
      audio.playWrong();
      incorrectCount++;
      streak = 0;

      const buttons = document.querySelectorAll('#optionsContainer .option-btn');
      buttons.forEach(b => b.disabled = true);
      buttons[q.correctIndex].classList.add('option-correct');

      document.getElementById('motivationalText').style.color = '#ef4444';
      document.getElementById('motivationalText').textContent = '⏰ ¡Tiempo agotado!';

      if (voice.enabled) {
        voice.speakTimeOut(q.options[q.correctIndex]);
      }

      showPostAnswer(q);
    }

    function showPostAnswer(q) {
      document.getElementById('scoreNum').textContent = score;
      document.getElementById('streakNum').textContent = streak;
      document.getElementById('explanationText').innerHTML = '<strong>💡 ¿Por qué?</strong> ' + q.explanation;
      document.getElementById('postAnswerBox').classList.remove('hidden');

      const nextBtn = document.getElementById('nextQuestionBtn');
      nextBtn.textContent = (currentQIndex === 9 ? 'VER RESULTADOS 🏁' : 'SIGUIENTE PREGUNTA ➡️');
      nextBtn.onclick = () => {
        if (currentQIndex < 9) {
          currentQIndex++;
          renderQuestion();
        } else {
          finishGame();
        }
      };
    }

    function finishGame() {
      const accuracy = Math.round((correctCount / 10) * 100);
      const totalTime = responseTimes.reduce((a, b) => a + b, 0);
      const avgTime = (responseTimes.length ? (totalTime / responseTimes.length).toFixed(1) : '0');

      if (accuracy >= 70) {
        audio.playVictory();
      } else {
        audio.playGameOver();
      }

      let classification = '¡SIGUE ENTRENANDO TU MENTE!';
      if (accuracy >= 90) classification = '¡MENTE BRILLANTE!';
      else if (accuracy >= 70) classification = '¡GRAN RETADOR!';
      else if (accuracy >= 50) classification = '¡VAS POR BUEN CAMINO!';

      if (accuracy >= 60) {
        runConfetti();
      }

      document.getElementById('finalClassification').textContent = classification;
      document.getElementById('finalScore').textContent = score;
      document.getElementById('finalAccuracy').textContent = accuracy + '%';
      document.getElementById('finalCorrect').textContent = correctCount;
      document.getElementById('finalWrong').textContent = incorrectCount;
      document.getElementById('finalMaxStreak').textContent = maxStreak;
      document.getElementById('finalAvgTime').textContent = avgTime + 's';

      if (voice.enabled) {
        voice.speakFinal(score, accuracy, maxStreak, classification);
      }

      document.getElementById('listenSummaryBtn').onclick = () => {
        voice.speakFinal(score, accuracy, maxStreak, classification);
      };

      saveRecord({
        date: new Date().toLocaleDateString(),
        score, correctCount, accuracy, maxStreak, avgTime,
        level: currentLevel, classification
      });

      showScreen('final');
    }

    function saveRecord(rec) {
      try {
        const records = JSON.parse(localStorage.getItem('reto_records') || '[]');
        records.unshift(rec);
        if (records.length > 5) records.pop();
        localStorage.setItem('reto_records', JSON.stringify(records));
      } catch(e) {}
    }

    function renderRecords() {
      const list = document.getElementById('recordsList');
      list.innerHTML = '';
      try {
        const records = JSON.parse(localStorage.getItem('reto_records') || '[]');
        if (records.length === 0) {
          list.innerHTML = '<div style="text-align:center; color:#94a3b8; padding:20px;">Aún no tienes partidas registradas. ¡Juega una ahora!</div>';
          return;
        }
        records.forEach(r => {
          const item = document.createElement('div');
          item.style = 'background:#0f172a; border:1px solid #334155; border-radius:12px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center;';
          item.innerHTML = '<div><strong style="color:#f59e0b; font-size:1.1rem;">' + r.score + ' pts</strong> <div style="font-size:0.8rem; color:#94a3b8">' + r.date + ' • ' + r.classification + '</div></div> <div style="text-align:right; font-size:0.85rem;"><strong>' + r.accuracy + '%</strong> aciertos</div>';
          list.appendChild(item);
        });
      } catch(e) {
        list.innerHTML = '<div style="text-align:center; color:#ef4444;">No se pudieron cargar los récords locales.</div>';
      }
    }
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtml() {
  const htmlContent = generateStandaloneHtml();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reto-relampago.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
