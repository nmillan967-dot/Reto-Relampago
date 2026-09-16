// Web Audio API Synthesizer - 100% self-contained, no external audio files required

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private listeners: Array<(enabled: boolean) => void> = [];

  constructor() {
    const saved = localStorage.getItem('reto_relampago_sound');
    if (saved !== null) {
      this.soundEnabled = saved === 'true';
    }
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.soundEnabled));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('reto_relampago_sound', String(this.soundEnabled));
    if (this.soundEnabled) {
      this.playClick();
    }
    this.notify();
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    localStorage.setItem('reto_relampago_sound', String(this.soundEnabled));
    this.notify();
  }

  // 1. Sonido al iniciar la partida
  public playGameStart() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Energizing rising major arpeggio
      const notes = [
        { f: 261.63, t: 0, d: 0.1 },     // C4
        { f: 329.63, t: 0.08, d: 0.1 },  // E4
        { f: 392.0, t: 0.16, d: 0.1 },   // G4
        { f: 523.25, t: 0.24, d: 0.15 }, // C5
        { f: 659.25, t: 0.35, d: 0.3 },  // E5
      ];

      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.2, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  // 2. Sonido al seleccionar una respuesta
  public playSelectOption() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // 3. Sonido de respuesta correcta
  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sparkling major arpeggio: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // 4. Sonido de respuesta incorrecta
  public playWrong() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Descending dissonant tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.32);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch {
      // Ignore
    }
  }

  // 5. Sonido de cuenta regresiva
  public playTick() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }

  // 6. Sonido especial cuando se activa una racha
  public playStreakBonus() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // High exciting power-up chime with shimmer
      const freqs = [587.33, 739.99, 880, 1174.66, 1479.98];
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.05);

        gain.gain.setValueAtTime(0.18, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // 7. Sonido de victoria
  public playVictory() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Triumphant orchestral celebratory fanfare
      const fanfare = [
        { f: 523.25, d: 0.12, t: 0 },      // C5
        { f: 523.25, d: 0.12, t: 0.13 },   // C5
        { f: 523.25, d: 0.12, t: 0.26 },   // C5
        { f: 659.25, d: 0.24, t: 0.40 },   // E5
        { f: 783.99, d: 0.24, t: 0.65 },   // G5
        { f: 1046.5, d: 0.55, t: 0.90 },   // C6
      ];

      fanfare.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0.01, now + item.t);
        gain.gain.linearRampToValueAtTime(0.24, now + item.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + item.t);
        osc.stop(now + item.t + item.d + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  // 8. Sonido de finalización
  public playGameOver() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Completion chord cadence
      const melody = [
        { f: 440.0, d: 0.14, t: 0 },       // A4
        { f: 554.37, d: 0.14, t: 0.14 },   // C#5
        { f: 659.25, d: 0.14, t: 0.28 },   // E5
        { f: 880.0, d: 0.4, t: 0.42 },     // A5
      ];

      melody.forEach((item) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0.01, now + item.t);
        gain.gain.linearRampToValueAtTime(0.18, now + item.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + item.t);
        osc.stop(now + item.t + item.d + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  // Click de interfaz
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }

  // 9. Sonido breve y agradable al subir de nivel o activar racha especial
  public playLevelUp() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sparkling warm ascending modern game-show chime
      const notes = [
        { f: 440.0, t: 0, d: 0.12 },     // A4
        { f: 554.37, t: 0.08, d: 0.14 }, // C#5
        { f: 659.25, t: 0.16, d: 0.16 }, // E5
        { f: 880.0, t: 0.24, d: 0.28 },  // A5
        { f: 1108.73, t: 0.32, d: 0.35 },// C#6
      ];

      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.16, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundEffects();

/**
 * AmbientMusicManager - Música ambiental ligera de concurso moderno
 * Sintetizada 100% en Web Audio API (offline, sin archivos externos pesados).
 * Crea una atmósfera sutil, elegante y moderna (pad armónico cálido + pulso rítmico suave)
 * que mantiene el suspenso y la energía sin competir con la voz ni fatigar el oído.
 */
class AmbientMusicManager {
  private ctx: AudioContext | null = null;
  private musicEnabled: boolean = true;
  private volume: number = 0.16; // Nivel suave y discreto de fondo
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private loopTimer: number | null = null;
  private step: number = 0;
  private listeners: Array<(enabled: boolean) => void> = [];
  private volumeListeners: Array<(vol: number) => void> = [];

  constructor() {
    const saved = localStorage.getItem('reto_relampago_ambient_music');
    if (saved !== null) {
      this.musicEnabled = saved === 'true';
    }
    const savedVol = localStorage.getItem('reto_relampago_ambient_music_volume');
    if (savedVol !== null) {
      const parsed = parseFloat(savedVol);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        this.volume = parsed;
      }
    }
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public subscribeVolume(listener: (vol: number) => void): () => void {
    this.volumeListeners.push(listener);
    return () => {
      this.volumeListeners = this.volumeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.musicEnabled));
  }

  private notifyVolume() {
    this.volumeListeners.forEach((l) => l(this.volume));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public isEnabled(): boolean {
    return this.musicEnabled;
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('reto_relampago_ambient_music_volume', this.volume.toFixed(2));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notifyVolume();
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('reto_relampago_ambient_music', String(this.musicEnabled));
    if (this.musicEnabled) {
      this.start();
    } else {
      this.stop();
    }
    this.notify();
    return this.musicEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    localStorage.setItem('reto_relampago_ambient_music', String(this.musicEnabled));
    if (this.musicEnabled) {
      this.start();
    } else {
      this.stop();
    }
    this.notify();
  }

  /**
   * Arranca la ambientación sonora de concurso moderno con fade-in suave
   */
  public start() {
    if (!this.musicEnabled || this.isPlaying) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      this.isPlaying = true;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 1.2);

      this.step = 0;
      this.scheduleNextTick();
    } catch {
      this.isPlaying = false;
    }
  }

  /**
   * Detiene la ambientación musical con fade-out suave para evitar cortes bruscos
   */
  public stop() {
    if (!this.isPlaying) return;
    try {
      if (this.loopTimer !== null) {
        window.clearTimeout(this.loopTimer);
        this.loopTimer = null;
      }
      if (this.masterGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      }
      this.isPlaying = false;
    } catch {
      this.isPlaying = false;
    }
  }

  /**
   * Bucle rítmico generativo que produce una atmósfera sutil de concurso digital:
   * Acordes atmosféricos en tonos cálidos + pulso rítmico orgánico a 106 BPM.
   */
  private scheduleNextTick() {
    if (!this.isPlaying || !this.musicEnabled) return;
    const stepDurationMs = 566; // ~106 BPM (tiempo óptimo de concentración)

    try {
      this.renderAmbientStep();
    } catch {
      // Ignorar fallos de audio puntuales
    }

    this.step++;
    this.loopTimer = window.setTimeout(() => {
      this.scheduleNextTick();
    }, stepDurationMs);
  }

  private renderAmbientStep() {
    if (!this.ctx || !this.masterGain || this.ctx.state === 'suspended') return;
    const now = this.ctx.currentTime;

    // Ciclo armónico de 16 tiempos de concurso: Cm -> Ab -> Bb -> Gm
    const chordIndex = Math.floor((this.step % 16) / 4);
    const chords = [
      [130.81, 196.0, 311.13], // C3, G3, Eb4 (misterio y foco)
      [116.54, 174.61, 277.18], // Bb2, F3, Db4
      [103.83, 155.56, 261.63], // Ab2, Eb3, C4
      [98.0, 146.83, 246.94],  // G2, D3, B3 (resolución tensa)
    ];
    const currentChord = chords[chordIndex] || chords[0];

    // 1. Pad atmosférico suave al inicio de cada compás (cada 4 pasos)
    if (this.step % 4 === 0) {
      currentChord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Filtro paso-bajo cálido para que no compita con frecuencias de voz humana
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(360, now);
        filter.Q.setValueAtTime(1.0, now);

        // Envolvente de volumen muy suave y gradual
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 2.3);
      });
    }

    // 2. Pulso de concurso ligero en cada paso (sub-bass suave + click discreto)
    const beatInBar = this.step % 4;

    // Sub-pulse rítmico en tiempos 0 y 2
    if (beatInBar === 0 || beatInBar === 2) {
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();

      subOsc.type = 'triangle';
      const root = currentChord[0] ? currentChord[0] / 2 : 65;
      subOsc.frequency.setValueAtTime(root, now);
      subOsc.frequency.exponentialRampToValueAtTime(root * 0.8, now + 0.2);

      subGain.gain.setValueAtTime(0.04, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);

      subOsc.start(now);
      subOsc.stop(now + 0.25);
    }

    // Tick rítmico sutil de reloj digital / concurso en contratiempos (tiempos 1 y 3)
    if (beatInBar === 1 || beatInBar === 3) {
      const tickOsc = this.ctx.createOscillator();
      const tickFilter = this.ctx.createBiquadFilter();
      const tickGain = this.ctx.createGain();

      tickOsc.type = 'sine';
      tickOsc.frequency.setValueAtTime(740, now);

      tickFilter.type = 'bandpass';
      tickFilter.frequency.setValueAtTime(700, now);
      tickFilter.Q.setValueAtTime(3.0, now);

      tickGain.gain.setValueAtTime(0.015, now);
      tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      tickOsc.connect(tickFilter);
      tickFilter.connect(tickGain);
      tickGain.connect(this.masterGain);

      tickOsc.start(now);
      tickOsc.stop(now + 0.06);
    }
  }
}

export const ambientMusic = new AmbientMusicManager();
