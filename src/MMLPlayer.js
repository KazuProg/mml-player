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
    let t1 = t0;
    let t2 = note.duration;
    const vol = note.velocity / 128;
    const osc = audioContext.createOscillator();
    const amp = audioContext.createGain();
    const pan = audioContext.createPanner();

    switch (note.instIndex) {
      case 0: osc.type = "sine"; break;
      case 1: osc.type = "square"; break;
      case 2: osc.type = "sawtooth"; break;
      case 3: osc.type = "triangle"; break;
      default:
        console.warn(`Unexpected inst index: ${note.instIndex}`);
    }
    const panCon = new panControl(pan, note.panpot, t0);
    osc.frequency.setValueAtTime(mtof(note.noteNumber), t0);
    for (let i = 0; i < note.slur.length; i++) {
      t1 += t2;
      t2 = note.slur[i].duration;
      osc.frequency.exponentialRampToValueAtTime(mtof(note.slur[i].noteNumber), t1);
      panCon.linearRampToValueAtTime(note.slur[i].panpot, t1);
    }

    t2 = t1 + t2 * (note.quantize / 100);
    osc.start(t0);
    osc.stop(t2);
    osc.connect(amp);

    amp.gain.setValueAtTime(vol, t0);
    amp.gain.setValueAtTime(vol, t2);
    amp.gain.exponentialRampToValueAtTime(1e-3, t2 + 0.1);
    amp.connect(pan);

    pan.connect(audioContext.destination);

    if (typeof this.onNote === "function") {
      this.onNote(note);
    }
  }
}

class panControl {
  #panNode;
  #time;
  #value;

  constructor(panNode, value, time) {
    this.#panNode = panNode;

    this.#panNode.positionZ.setValueAtTime(1 - Math.abs(value), time);
    this.#panNode.positionX.setValueAtTime(value, time);

    this.#time = time;
    this.#value = value;

  }

  linearRampToValueAtTime(value, time) {
    const isZeroCrossing = (v1, v2) => v1 * v2 < 0;
    if (isZeroCrossing(this.#value, value)) {
      const findZeroCrossing = (t1, v1, t2, v2) => {
        const slope = (v2 - v1) / (t2 - t1);
        return t1 - (v1 / slope);
      };

      const centerTime = findZeroCrossing(this.#time, this.#value, time, value);

      this.#panNode.positionZ.linearRampToValueAtTime(1, centerTime);
      this.#panNode.positionX.linearRampToValueAtTime(0, centerTime);
    }

    this.#panNode.positionZ.linearRampToValueAtTime(1 - Math.abs(value), time);
    this.#panNode.positionX.linearRampToValueAtTime(value, time);

    this.#time = time;
    this.#value = value;
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
