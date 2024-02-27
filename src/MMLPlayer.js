import MMLEmitter from "./MMLEmitter";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

function mtof(noteNumber) {
  return 440 * Math.pow(2, (noteNumber - 69) / 12);
}

export default class MMLPlayer {
  onNote = null;
  #mml = null;
  #emitter = null;

  constructor(mml = null) {
    this.#mml = typeof mml === 'string' ? mml : null;
  }

  play(mml = null) {
    let _mml = typeof mml === 'string' ? mml : this.#mml;

    if (_mml == null) {
      console.error("Failed to execute 'play' on MMLPlayer: mml is null.");
      return;
    }

    this.#emitter = new MMLEmitter(_mml, { context: audioContext });

    this.#emitter.on("note", e => this.#playNote(e));
    this.#emitter.on("end:all", () => this.stop());

    this.#emitter.start();
  }

  stop() {
    if (this.#emitter == null) {
      console.warn("Failed to execute 'stop' on MMLPlayer: cannot call stop without calling play first.");
      return;
    }

    if (this.#emitter.state == 'running') {
      this.#emitter.stop();
    }

    this.#emitter = null;
  }

  #playNote(note) {
    if (audioContext.state != 'running') {
      console.error("Failed to play sound on MMLPlayer: AudioContext is not ready.");
      return;
    }
    const t0 = note.playbackTime;
    const t1 = t0 + note.duration * (note.quantize / 100);
    const t2 = t1 + 0.1;
    const vol = note.velocity / 128;
    const osc = audioContext.createOscillator();
    const amp = audioContext.createGain();

    osc.frequency.value = mtof(note.noteNumber);
    osc.start(t0);
    osc.stop(t2);
    osc.connect(amp);

    amp.gain.setValueAtTime(vol, t0);
    amp.gain.setValueAtTime(vol, t1);
    amp.gain.exponentialRampToValueAtTime(1e-3, t2);
    amp.connect(audioContext.destination);

    if (typeof this.onNote === "function") {
      this.onNote(note);
    }
  }
}

function chore() {
  audioContext.resume();

  removeEventListener('click', chore);
  removeEventListener('touchend', chore);
  removeEventListener('keydown', chore);
}

addEventListener('click', chore);
addEventListener('touchend', chore);
addEventListener('keydown', chore);
