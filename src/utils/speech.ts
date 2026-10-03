export class SpeechHelper {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  static speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      onEnd?: () => void;
      onBoundary?: (charIndex: number) => void;
      onError?: (err: any) => void;
    } = {}
  ) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;

    // Prefer Traditional Chinese / Taiwanese Mandarin or standard Chinese
    const voices = this.getVoices();
    const zhVoice = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh-HK' || v.lang.startsWith('zh'));
    if (zhVoice) {
      utterance.voice = zhVoice;
      utterance.lang = zhVoice.lang;
    } else {
      utterance.lang = 'zh-TW';
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options.onError?.(e);
    };

    if (options.onBoundary) {
      utterance.onboundary = (event) => {
        options.onBoundary?.(event.charIndex);
      };
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  static pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  static resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }

  static isPaused(): boolean {
    return !!(this.synth && this.synth.paused);
  }
}
