// SpeechSynthesis Engine - Presentador Juvenil de Concurso
// 100% Native Browser Voice API - Offline, sin APIs de pago ni servidores externos

export interface VoiceOptionInfo {
  name: string;
  lang: string;
  voiceURI: string;
  isColombia: boolean;
  isLatino: boolean;
  isNatural: boolean;
  score: number;
  label: string;
}

// Clase para evitar repetir frases seguidas
class AntiRepeatPool {
  private phrases: string[];
  private lastUsed: string[] = [];
  private maxMemory: number;

  constructor(phrases: string[], maxMemory: number = 2) {
    this.phrases = phrases;
    this.maxMemory = Math.min(maxMemory, Math.max(1, phrases.length - 1));
  }

  public getNext(): string {
    const available = this.phrases.filter((p) => !this.lastUsed.includes(p));
    const pool = available.length > 0 ? available : this.phrases;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    this.lastUsed.push(selected);
    if (this.lastUsed.length > this.maxMemory) {
      this.lastUsed.shift();
    }
    return selected;
  }
}

class SpeechEngine {
  private voiceEnabled: boolean = true;
  private volume: number = 1.0; // 0.0 to 1.0
  private speechRateMultiplier: number = 1.0; // 0.85 to 1.15
  private isCurrentlySpeaking: boolean = false;
  private selectedVoiceURI: string | null = null;
  private cachedVoice: SpeechSynthesisVoice | null = null;
  private availableVoices: VoiceOptionInfo[] = [];

  private listeners: Array<(enabled: boolean) => void> = [];
  private speakingListeners: Array<(speaking: boolean) => void> = [];
  private volumeListeners: Array<(volume: number) => void> = [];
  private voiceChangeListeners: Array<() => void> = [];

  private currentSequenceId: number = 0;
  private timerAlertTriggeredForQuestion: number = -1;

  // Pools de frases variadas estilo presentador de concurso juvenil
  private introPool = new AntiRepeatPool([
    '¡Arranca el Reto Relámpago! ¡A pensar rápido y a ganar!',
    '¡Luces, cámara y acción! Concéntrate y demuestra de qué estás hecho.',
    '¡Comienza el juego! Diez preguntas contra el reloj. ¡Vamos con toda!',
    '¡Reloj en marcha! Piensa veloz y no dejes escapar ningún punto.',
    '¡Bienvenidos al desafío! Velocidad mental activada, ¡a jugar!',
  ]);

  private correctPool = new AntiRepeatPool([
    '¡Eso es! ¡Totalmente correcto!',
    '¡De una! ¡La clavaste!',
    '¡Brillante! ¡Puntos para ti!',
    '¡Respuesta impecable! ¡Estás volando!',
    '¡Precisión absoluta! ¡Excelente jugada!',
    '¡Qué crack! ¡Puntaje en subida!',
    '¡Justo en el blanco! ¡Muy bien pensado!',
  ]);

  private streak3Pool = new AntiRepeatPool([
    '¡Racha de tres aciertos! ¡Estás encendido!',
    '¡Tres seguidas! ¡Qué ritmo llevas!',
    '¡Triple acierto! ¡Ese cerebro está a mil por hora!',
  ]);

  private streak5Pool = new AntiRepeatPool([
    '¡Super racha de cinco! ¡Puro fuego mental!',
    '¡Cinco al hilo! ¡Eres una máquina imparable!',
    '¡Racha legendaria de cinco! ¡Qué nivelazo!',
  ]);

  private incorrectPool = new AntiRepeatPool([
    '¡Tranqui, no pasa nada! La correcta era: {CORRECT}. ¡En la siguiente te repones!',
    '¡Casi la tienes! La respuesta era: {CORRECT}. ¡Cabeza arriba y a sumar!',
    '¡Buen intento! La opción era: {CORRECT}. ¡Sigue con toda que aún queda partida!',
    '¡Patinamos por poco! Era: {CORRECT}. ¡Concéntrate en la que viene!',
    '¡No te preocupes! La correcta era: {CORRECT}. ¡A recuperar terreno!',
  ]);

  private timeoutPool = new AntiRepeatPool([
    '¡Uff, se nos agotó el tiempo! La opción correcta era: {CORRECT}. ¡A meterle más velocidad!',
    '¡Tiempo cumplido! La respuesta era: {CORRECT}. ¡En la próxima no lo dudes!',
    '¡Sonó la campana! La correcta era: {CORRECT}. ¡Reacciona más rápido en la que sigue!',
    '¡El reloj no perdona! Era: {CORRECT}. ¡Ojo al temporizador!',
  ]);

  private timerSuspensePool = new AntiRepeatPool([
    '¡Ojo, cinco segundos!',
    '¡Se acaba el tiempo!',
    '¡Cinco segundos, decide ya!',
    '¡Rápido, rápido, últimos segundos!',
  ]);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedEnabled = localStorage.getItem('reto_relampago_voice');
      if (savedEnabled !== null) {
        this.voiceEnabled = savedEnabled === 'true';
      }

      const savedVol = localStorage.getItem('reto_relampago_voice_volume');
      if (savedVol !== null) {
        const num = parseFloat(savedVol);
        if (!isNaN(num) && num >= 0 && num <= 1) {
          this.volume = num;
        }
      }

      const savedRate = localStorage.getItem('reto_relampago_voice_rate');
      if (savedRate !== null) {
        const r = parseFloat(savedRate);
        if (!isNaN(r) && r >= 0.8 && r <= 1.2) {
          this.speechRateMultiplier = r;
        }
      }

      this.selectedVoiceURI = localStorage.getItem('reto_relampago_selected_voice');

      if (this.isSupported()) {
        this.refreshVoices();
        if (window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = () => {
            this.refreshVoices();
          };
        }
      }
    }
  }

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window
    );
  }

  // Selección inteligente y ponderada de la mejor voz en español
  public refreshVoices() {
    if (!this.isSupported()) return;

    try {
      const rawVoices = window.speechSynthesis.getVoices();
      const spanishVoices = rawVoices.filter(
        (v) =>
          v.lang.toLowerCase().startsWith('es') ||
          v.lang.toLowerCase().includes('es-') ||
          v.lang.toLowerCase().includes('es_')
      );

      // Calcular puntuación de naturalidad y adecuación
      const scored: VoiceOptionInfo[] = spanishVoices.map((v) => {
        let score = 0;
        const langLower = v.lang.toLowerCase().replace('_', '-');
        const nameLower = v.name.toLowerCase();

        const isColombia = langLower === 'es-co' || nameLower.includes('colombia');
        const isMexico = langLower === 'es-mx' || nameLower.includes('mexic') || nameLower.includes('paulina');
        const isUSLatino = langLower === 'es-us' || langLower === 'es-419';
        const isOtherLatino =
          isColombia ||
          isMexico ||
          isUSLatino ||
          langLower.startsWith('es-ar') ||
          langLower.startsWith('es-cl') ||
          langLower.startsWith('es-pe') ||
          langLower.startsWith('es-ve');

        const isNatural =
          nameLower.includes('natural') ||
          nameLower.includes('neural') ||
          nameLower.includes('online') ||
          nameLower.includes('google') ||
          nameLower.includes('premium') ||
          nameLower.includes('enhanced');

        // Prioridad máxima: Español de Colombia (solicitud explícita)
        if (isColombia) score += 120;
        else if (isUSLatino) score += 95;
        else if (isMexico) score += 90;
        else if (isOtherLatino) score += 75;
        else if (langLower === 'es-es') score += 45;
        else score += 30;

        // Calidad de la síntesis (voces neurales/naturales vs mecánicas)
        if (nameLower.includes('natural')) score += 70;
        if (nameLower.includes('neural')) score += 70;
        if (nameLower.includes('online')) score += 40;
        if (nameLower.includes('google')) score += 35;
        if (nameLower.includes('salome') || nameLower.includes('gonzalo')) score += 50; // Voces estrella de Colombia en Edge/Windows
        if (nameLower.includes('paulina') || nameLower.includes('jorge') || nameLower.includes('dalia')) score += 30;

        // Penalizar voces robóticas de baja fidelidad (eSpeak, compact)
        if (nameLower.includes('espeak') || nameLower.includes('compact')) {
          score -= 60;
        }

        let label = v.name;
        if (isColombia) label += ' 🇨🇴 (Colombia)';
        else if (isMexico) label += ' 🇲🇽 (México)';
        else if (isUSLatino) label += ' 🌎 (Latinoamérica)';
        else if (langLower === 'es-es') label += ' 🇪🇸 (España)';

        return {
          name: v.name,
          lang: v.lang,
          voiceURI: v.voiceURI,
          isColombia,
          isLatino: isOtherLatino,
          isNatural,
          score,
          label,
        };
      });

      scored.sort((a, b) => b.score - a.score);
      this.availableVoices = scored;

      // Determinar la voz activa
      if (this.selectedVoiceURI) {
        const userChosen = rawVoices.find((v) => v.voiceURI === this.selectedVoiceURI);
        if (userChosen) {
          this.cachedVoice = userChosen;
          this.notifyVoiceChange();
          return;
        }
      }

      // Si no hay voz manual o no existe, seleccionar la mejor valorada
      if (scored.length > 0) {
        const best = rawVoices.find((v) => v.voiceURI === scored[0].voiceURI);
        this.cachedVoice = best || spanishVoices[0] || null;
      } else {
        this.cachedVoice = null;
      }

      this.notifyVoiceChange();
    } catch {
      // Fallback silencioso
    }
  }

  public getAvailableVoices(): VoiceOptionInfo[] {
    return this.availableVoices;
  }

  public getSelectedVoiceName(): string {
    if (this.cachedVoice) {
      return this.cachedVoice.name;
    }
    return 'Voz predeterminada del navegador';
  }

  public getSelectedVoiceURI(): string | null {
    return this.cachedVoice ? this.cachedVoice.voiceURI : null;
  }

  public setSelectedVoice(voiceURI: string) {
    if (!this.isSupported()) return;
    this.selectedVoiceURI = voiceURI;
    localStorage.setItem('reto_relampago_selected_voice', voiceURI);
    const rawVoices = window.speechSynthesis.getVoices();
    const match = rawVoices.find((v) => v.voiceURI === voiceURI);
    if (match) {
      this.cachedVoice = match;
    }
    this.notifyVoiceChange();
  }

  public resetToBestVoice() {
    this.selectedVoiceURI = null;
    localStorage.removeItem('reto_relampago_selected_voice');
    this.refreshVoices();
  }

  public isEnabled(): boolean {
    return this.voiceEnabled;
  }

  public isSpeaking(): boolean {
    return this.isCurrentlySpeaking;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    localStorage.setItem('reto_relampago_voice_volume', clamped.toString());
    this.volumeListeners.forEach((l) => l(clamped));
  }

  public getSpeechRate(): number {
    return this.speechRateMultiplier;
  }

  public setSpeechRate(rate: number) {
    const clamped = Math.max(0.8, Math.min(1.2, rate));
    this.speechRateMultiplier = clamped;
    localStorage.setItem('reto_relampago_voice_rate', clamped.toString());
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public subscribeSpeaking(listener: (speaking: boolean) => void): () => void {
    this.speakingListeners.push(listener);
    return () => {
      this.speakingListeners = this.speakingListeners.filter((l) => l !== listener);
    };
  }

  public subscribeVolume(listener: (volume: number) => void): () => void {
    this.volumeListeners.push(listener);
    return () => {
      this.volumeListeners = this.volumeListeners.filter((l) => l !== listener);
    };
  }

  public subscribeVoiceChange(listener: () => void): () => void {
    this.voiceChangeListeners.push(listener);
    return () => {
      this.voiceChangeListeners = this.voiceChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.voiceEnabled));
  }

  private notifySpeaking(state: boolean) {
    this.isCurrentlySpeaking = state;
    this.speakingListeners.forEach((l) => l(state));
  }

  private notifyVoiceChange() {
    this.voiceChangeListeners.forEach((l) => l());
  }

  public toggleVoice(): boolean {
    this.voiceEnabled = !this.voiceEnabled;
    localStorage.setItem('reto_relampago_voice', String(this.voiceEnabled));
    if (!this.voiceEnabled) {
      this.stop();
    } else {
      this.speakPhrase('¡Voz de presentador activada!', { pitch: 1.1, rate: 1.05 });
    }
    this.notify();
    return this.voiceEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    localStorage.setItem('reto_relampago_voice', String(this.voiceEnabled));
    if (!enabled) {
      this.stop();
    }
    this.notify();
  }

  public stop() {
    this.currentSequenceId++;
    if (!this.isSupported()) return;
    try {
      window.speechSynthesis.cancel();
      this.notifySpeaking(false);
    } catch {
      // Ignore
    }
  }

  // Limpieza y fonética natural: elimina emojis, símbolos, códigos y expande abreviaturas en español
  public sanitizeForSpeech(raw: string): string {
    if (!raw) return '';

    return (
      raw
        // Eliminar emojis y pictogramas unicode
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ''
        )
        // Eliminar markdown y caracteres de código
        .replace(/[*_#~`|\\<>{}[\]]/g, '')
        // Expansión fonética en español
        .replace(/(\d+)\s*%/g, '$1 por ciento')
        .replace(/%/g, ' por ciento')
        .replace(/\bpts\b/gi, 'puntos')
        .replace(/\bptos\b/gi, 'puntos')
        .replace(/(\d+)\s*seg\b/gi, '$1 segundos')
        .replace(/(\d+)\s*s\b/gi, '$1 segundos')
        .replace(/\bkm\/h\b/gi, 'kilómetros por hora')
        .replace(/\bm\/s\b/gi, 'metros por segundo')
        .replace(/°C\b/gi, 'grados centígrados')
        .replace(/\b(n°|no\.)\s*(\d+)/gi, 'número $2')
        .replace(/(\d+)\/10\b/g, '$1 de diez')
        // Eliminar signos de exclamación/interrogación duplicados
        .replace(/!{2,}/g, '!')
        .replace(/\?{2,}/g, '?')
        // Normalizar espacios
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  // Reproducción de frase individual con entonación, tono y velocidad de presentador
  public speakPhrase(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
    }
  ) {
    if (!this.isSupported() || !this.voiceEnabled || this.volume <= 0.01) return;

    const cleaned = this.sanitizeForSpeech(text);
    if (!cleaned) return;

    try {
      this.stop();
      const utterance = new SpeechSynthesisUtterance(cleaned);

      if (!this.cachedVoice) {
        this.refreshVoices();
      }
      if (this.cachedVoice) {
        utterance.voice = this.cachedVoice;
        utterance.lang = this.cachedVoice.lang || 'es-CO';
      } else {
        utterance.lang = 'es-CO';
      }

      // Ajuste de volumen
      utterance.volume = this.volume;

      // Ritmo y tono adaptados para sonar natural y ágil, no robótico
      const baseRate = (options?.rate ?? 1.0) * this.speechRateMultiplier;
      utterance.rate = Math.max(0.8, Math.min(1.25, baseRate));
      utterance.pitch = Math.max(0.85, Math.min(1.3, options?.pitch ?? 1.05));

      utterance.onstart = () => {
        this.notifySpeaking(true);
        if (options?.onStart) options.onStart();
      };

      utterance.onend = () => {
        this.notifySpeaking(false);
        if (options?.onEnd) options.onEnd();
      };

      utterance.onerror = () => {
        this.notifySpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.notifySpeaking(false);
    }
  }

  // Reproducción con pausas naturales entre bloques (cadencia conversacional)
  public speakSequence(
    segments: Array<{
      text: string;
      pauseAfterMs?: number;
      rate?: number;
      pitch?: number;
    }>,
    onComplete?: () => void
  ) {
    if (!this.isSupported() || !this.voiceEnabled || this.volume <= 0.01) return;

    this.stop();
    const currentSeq = ++this.currentSequenceId;

    let index = 0;
    const playNext = () => {
      if (currentSeq !== this.currentSequenceId) return; // Cancelado

      if (index >= segments.length) {
        this.notifySpeaking(false);
        if (onComplete) onComplete();
        return;
      }

      const segment = segments[index];
      const cleaned = this.sanitizeForSpeech(segment.text);

      if (!cleaned) {
        index++;
        playNext();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      if (this.cachedVoice) {
        utterance.voice = this.cachedVoice;
        utterance.lang = this.cachedVoice.lang;
      } else {
        utterance.lang = 'es-CO';
      }

      utterance.volume = this.volume;
      const baseRate = (segment.rate ?? 1.0) * this.speechRateMultiplier;
      utterance.rate = Math.max(0.8, Math.min(1.25, baseRate));
      utterance.pitch = Math.max(0.85, Math.min(1.3, segment.pitch ?? 1.05));

      utterance.onstart = () => {
        if (currentSeq === this.currentSequenceId) {
          this.notifySpeaking(true);
        }
      };

      utterance.onend = () => {
        if (currentSeq !== this.currentSequenceId) return;
        index++;
        const delay = segment.pauseAfterMs ?? 160;
        if (delay > 0 && index < segments.length) {
          setTimeout(playNext, delay);
        } else {
          playNext();
        }
      };

      utterance.onerror = () => {
        if (currentSeq === this.currentSequenceId) {
          this.notifySpeaking(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    playNext();
  }

  // --- MÉTODOS DE NARRACIÓN CONTEXTUAL (PRESENTADOR JUVENIL) ---

  // 1. Voz entusiasta al iniciar el juego
  public speakGameStart(onEnd?: () => void) {
    const introPhrase = this.introPool.getNext();
    this.speakPhrase(introPhrase, {
      rate: 1.05,
      pitch: 1.12,
      onEnd,
    });
  }

  // 2. Lectura natural de la pregunta con pausa adecuada
  public speakQuestion(questionText: string, questionNumber?: number, onEnd?: () => void) {
    const prefix = questionNumber ? `Pregunta ${questionNumber}. ` : 'Atento: ';
    const cleanQ = this.sanitizeForSpeech(questionText);

    // Secuencia con cadencia: anuncio de pregunta + pausa corta + texto de la pregunta
    this.speakSequence(
      [
        { text: prefix, pauseAfterMs: 140, rate: 1.04, pitch: 1.08 },
        { text: cleanQ, pauseAfterMs: 200, rate: 0.98, pitch: 1.04 },
      ],
      onEnd
    );
  }

  // 3. Lectura de opciones con pausas humanas entre A, B, C, D
  public speakOptions(options: string[], onEnd?: () => void) {
    const letters = ['A', 'B', 'C', 'D'];
    const segments = options.map((opt, i) => ({
      text: `Opción ${letters[i] || i + 1}: ${this.sanitizeForSpeech(opt)}.`,
      pauseAfterMs: i < options.length - 1 ? 220 : 100,
      rate: 1.0,
      pitch: 1.02,
    }));

    this.speakSequence(segments, onEnd);
  }

  // 4. Lectura fluida de pregunta y luego opciones
  public speakQuestionAndOptions(
    questionText: string,
    options: string[],
    questionNumber?: number,
    onEnd?: () => void
  ) {
    const prefix = questionNumber ? `Pregunta ${questionNumber}. ` : '';
    const letters = ['A', 'B', 'C', 'D'];

    const segments: Array<{ text: string; pauseAfterMs?: number; rate?: number; pitch?: number }> = [
      { text: `${prefix}${this.sanitizeForSpeech(questionText)}`, pauseAfterMs: 300, rate: 0.98, pitch: 1.05 },
    ];

    options.forEach((opt, i) => {
      segments.push({
        text: `Opción ${letters[i] || i + 1}: ${this.sanitizeForSpeech(opt)}.`,
        pauseAfterMs: i < options.length - 1 ? 200 : 100,
        rate: 1.0,
        pitch: 1.02,
      });
    });

    this.speakSequence(segments, onEnd);
  }

  // 5. Voz emocionante al anunciar una respuesta correcta
  public speakCorrect(streak: number = 0, pointsGained?: number) {
    let mainPhrase = this.correctPool.getNext();

    if (streak === 3) {
      mainPhrase = `${this.streak3Pool.getNext()} ${mainPhrase}`;
    } else if (streak === 5) {
      mainPhrase = `${this.streak5Pool.getNext()} ${mainPhrase}`;
    } else if (streak > 5) {
      mainPhrase = `¡Imparable! Racha de ${streak} aciertos. ${mainPhrase}`;
    }

    if (pointsGained && pointsGained > 0) {
      mainPhrase += ` Sumas ${pointsGained} puntos.`;
    }

    this.speakPhrase(mainPhrase, {
      rate: 1.08,
      pitch: 1.18, // Entonación alegre y de celebración
    });
  }

  // 6. Voz motivadora y empática cuando el jugador falla
  public speakIncorrect(correctText?: string) {
    const template = this.incorrectPool.getNext();
    const cleanCorrect = correctText ? this.sanitizeForSpeech(correctText) : '';
    const message = template.replace('{CORRECT}', cleanCorrect || 'la opción correcta');

    this.speakPhrase(message, {
      rate: 0.98,
      pitch: 0.98, // Tono suave y cercano, sin desmotivar
    });
  }

  // 7. Voz de aviso cuando se agota el tiempo
  public speakTimeOut(correctText?: string) {
    const template = this.timeoutPool.getNext();
    const cleanCorrect = correctText ? this.sanitizeForSpeech(correctText) : '';
    const message = template.replace('{CORRECT}', cleanCorrect || 'la opción correcta');

    this.speakPhrase(message, {
      rate: 1.02,
      pitch: 0.98,
    });
  }

  // 8. Voz de suspenso durante los últimos segundos del temporizador
  public speakTimerSuspense(questionIndex: number) {
    // Alertar únicamente una vez por pregunta para no ser invasivo
    if (this.timerAlertTriggeredForQuestion === questionIndex) return;
    this.timerAlertTriggeredForQuestion = questionIndex;

    const alertPhrase = this.timerSuspensePool.getNext();
    this.speakPhrase(alertPhrase, {
      rate: 1.15, // Más rápido y urgente
      pitch: 1.14, // Tono agudo de alerta
    });
  }

  // 9. Reset de alerta de temporizador para nueva pregunta
  public resetTimerAlert() {
    this.timerAlertTriggeredForQuestion = -1;
  }

  // 10. Voz de celebración al subir de nivel o ganar partida
  public speakFinalSummary(data: {
    badgeTitle: string;
    score: number;
    accuracy: number;
    correctCount: number;
    maxStreak: number;
  }) {
    let celebrationHook = '';
    let pitch = 1.08;

    if (data.accuracy >= 90) {
      celebrationHook = '¡Qué partidazo acabas de jugar! ¡Descomunal, mente brillante absoluta!';
      pitch = 1.16;
    } else if (data.accuracy >= 70) {
      celebrationHook = '¡Gran demostración de talento! ¡Estás a un paso de la corona!';
      pitch = 1.12;
    } else if (data.accuracy >= 50) {
      celebrationHook = '¡Buenísimo esfuerzo! Tus reflejos están cada vez más afilados.';
      pitch = 1.06;
    } else {
      celebrationHook = '¡Bien jugado! La práctica hace al maestro y cada intento te hace más veloz.';
      pitch = 1.02;
    }

    const segments = [
      { text: celebrationHook, pauseAfterMs: 250, rate: 1.04, pitch },
      {
        text: `Lograste ${data.score} puntos, con ${data.correctCount} aciertos de diez preguntas y un ${data.accuracy} por ciento de precisión.`,
        pauseAfterMs: 200,
        rate: 1.0,
        pitch: 1.04,
      },
      {
        text: `Tu racha máxima fue de ${data.maxStreak} respuestas seguidas. ¡A seguir desafiando tus límites!`,
        pauseAfterMs: 100,
        rate: 1.02,
        pitch: 1.08,
      },
    ];

    this.speakSequence(segments);
  }

  // 11. Narración de dato curioso / explicación
  public speakExplanation(explanation: string, onEnd?: () => void) {
    const intros = [
      'Dato curioso:',
      '¿Sabías qué?',
      'Aprende este dato:',
      'Para que lo tengas en cuenta:'
    ];
    const intro = intros[Math.floor(Math.random() * intros.length)];
    this.speakSequence(
      [
        { text: intro, pauseAfterMs: 250, rate: 1.02, pitch: 1.08 },
        { text: explanation, pauseAfterMs: 150, rate: 0.98, pitch: 1.03 },
      ],
      onEnd
    );
  }

  // 12. Método genérico de habla con sanitización y entonación
  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
    }
  ) {
    this.speakPhrase(text, options);
  }

  // 13. Prueba rápida de voz para que el usuario verifique la voz seleccionada
  public testVoicePreview(onEnd?: () => void) {
    const previewPhrases = [
      '¡Hola! Soy tu presentador en Reto Relámpago. ¿Qué tan rápido puedes pensar hoy?',
      '¡Atención competidor! Estoy listo para narrar tu camino hacia el récord.',
      '¡Probando audio en cabina! Todo listo para jugar a toda velocidad.',
    ];
    const phrase = previewPhrases[Math.floor(Math.random() * previewPhrases.length)];
    this.speakPhrase(phrase, {
      rate: 1.04,
      pitch: 1.1,
      onEnd,
    });
  }
}

export const speechEngine = new SpeechEngine();
