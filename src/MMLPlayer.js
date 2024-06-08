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
    let t1 = t0
    let t2 = note.duration;
    const vol = note.velocity / 128;
    const osc = audioContext.createOscillator();
    const amp = audioContext.createGain();

    osc.frequency.setValueAtTime(mtof(note.noteNumber), t0);
    for (let i = 0; i < note.slur.length; i++) {
      t1 += t2
      t2 = note.slur[i].duration;
      osc.frequency.exponentialRampToValueAtTime(mtof(note.slur[i].noteNumber), t1);
    }

    t2 = t1 + t2 * (note.quantize / 100);
    osc.start(t0);
    osc.stop(t2);
    osc.connect(amp);

    amp.gain.setValueAtTime(vol, t0);
    amp.gain.setValueAtTime(vol, t2);
    amp.gain.exponentialRampToValueAtTime(1e-3, t2 + 0.1);
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
