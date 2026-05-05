class VocalEngine {
  private audio: HTMLAudioElement | null = null;
  private currentVocal: string | null = null;
  private setVolCallback: ((v: number) => void) | null = null;

  private init() {
    if (typeof window !== "undefined" && !this.audio) {
      this.audio = new Audio();
      this.audio.onended = () => this.handleEnd();
      this.audio.onerror = () => this.handleEnd();
    }
  }

  private handleEnd() {
    if (this.setVolCallback) this.setVolCallback(1);
    this.currentVocal = null;
  }

  public play(vocal: string, setVolFn: (v: number) => void) {
    this.init();
    this.setVolCallback = setVolFn;

    if (!this.audio) return;

    if (this.currentVocal === vocal && !this.audio.paused) {
      return;
    }

    this.currentVocal = vocal;
    this.setVolCallback(0.25); // Lower music

    this.audio.src = vocal;
    this.audio.play().catch((err) => {
      console.warn("Playback blocked by browser:", err);
      this.handleEnd(); // Fail-safe: reset volume if it fails
    });
  }
}

export default VocalEngine;
