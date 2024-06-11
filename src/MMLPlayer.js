import MMLEmitter from "./MMLEmitter";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const instList = {
  0: "sine",
  1: "square",
  2: "sawtooth",
  3: "triangle"
};

const setInst = (no, inst) => {
  if (typeof inst === "string") {
    instList[no] = inst;
    return;
  }

  const isArray = obj => (obj instanceof Array || (ArrayBuffer.isView(obj) && !(obj instanceof DataView)));

  if (isArray(inst)) {
    if (!isArray(inst[0])) {
      const computeDFT = sample => {
        const N = sample.length;
        const w0 = 2 * Math.PI / N;
        let real = new Float32Array(N);
        let imag = new Float32Array(N);

        for (let k = 0; k < N; ++k) {
          let realSum = 0;
          let imagSum = 0;

          for (let l = 0; l < N; ++l) {
            const angle = w0 * k * l;
            realSum += sample[l] * Math.cos(angle);
            imagSum -= sample[l] * Math.sin(angle);
          }

          real[k] = realSum / N;
          imag[k] = imagSum / N;
        }

        return [real, imag];
      };
      inst = computeDFT(inst);
    }
    inst = audioContext.createPeriodicWave(...inst);
  }

  if (inst instanceof PeriodicWave) {
    instList[no] = inst;
  } else {
    throw new Error("setInst: Unsupported argument");
  }
};

const bufferLength = 4096;
setInst(4, new Int8Array(bufferLength).map((_, i) => i < bufferLength * 0.25 ? 1 : -1));
setInst(5, new Int8Array(bufferLength).map((_, i) => i < bufferLength * 0.125 ? 1 : -1));

const mtof = noteNumber => 440 * Math.pow(2, (noteNumber - 69) / 12);

export default class MMLPlayer {
  onNote = null;
  #config;
  #emitter = null;

  constructor(config = {}) {
    this.#config = {
      context: audioContext,
      waitForReady: false,
      mml: null,
      ...config
    };
  }

  static setInst(no, inst) {
    setInst(no, inst);
  }

  play(mml = null) {
    mml = mml == null ? this.#config.mml : mml;
    if (mml == null) {
      throw new Error("Failed to execute 'play' on MMLPlayer: mml is null.");
    }

    if (audioContext.state != 'running') {
      if (this.#config.waitForReady) {
        const intervalId = setInterval(() => {
          if (audioContext.state == 'running') {
            clearInterval(intervalId);
            this.#play(mml);
          }
        });
        return;
      }
      throw new Error("Failed to play sound on MMLPlayer: AudioContext is not ready.");
    }

    this.#play(mml);
  }

  #play(mml) {
    this.#emitter = new MMLEmitter(mml, this.#config);

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
    const t0 = note.playbackTime;
    let t1 = t0;
    let t2 = note.duration;
    const vol = note.velocity;
    const osc = audioContext.createOscillator();
    const amp = audioContext.createGain();
    const pan = audioContext.createStereoPanner();

    if (note.instNumber in instList) {
      const inst = instList[note.instNumber];
      if (typeof inst === "string") {
        osc.type = inst;
      }
      if (inst instanceof PeriodicWave) {
        osc.setPeriodicWave(inst);
      }
    } else {
      console.warn(`Undefined inst number: ${note.instNumber}`);
    }

    osc.frequency.setValueAtTime(mtof(note.noteNumber), t0);
    pan.pan.setValueAtTime(note.panpot, t0);
    for (let i = 0; i < note.slur.length; i++) {
      t1 += t2;
      t2 = note.slur[i].duration;
      osc.frequency.exponentialRampToValueAtTime(mtof(note.slur[i].noteNumber), t1);
      pan.pan.linearRampToValueAtTime(note.slur[i].panpot, t1);
    }

    t2 = t1 + t2 * note.quantize;
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

function chore() {
  audioContext.resume();

  removeEventListener('click', chore);
  removeEventListener('touchend', chore);
  removeEventListener('keydown', chore);
}

addEventListener('click', chore);
addEventListener('touchend', chore);
addEventListener('keydown', chore);
