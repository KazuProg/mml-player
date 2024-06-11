# mml-player
> MML(Music Macro Language) Player based on [mohayonao/mml-emitter](https://github.com/mohayonao/mml-emitter) demo

## Installation
downloads:
- [mml-player.js](./dist/mml-player.js)
- [mml-player.js.LICENSE.txt](./dist/mml-player.js.LICENSE.txt)

## API
### MMLPlayer
- `constructor(config: object)`
  - `config.mml: string`
  - `config.reverseOctave: bool`
    - reverse `<` and `>` command
  - `config.defaultParams: object`
    - `velocity: number`
    - `velocityMax: number`
    - `quantize: number`
    - `quantizeMax: number`
    - `instNumber: number`
    - `panpotRange: number`

#### Instance methods
- `setInst(no, inst): void`
  - set custom instrument
  - `no`: int
    - instrument number (@{index})
  - `inst`: PeriodicWave
  - `inst`: Array
    - the values of one cycle of the audio waveform
    - e.g. `[1,-1]`(sine wave)
  - `inst`: [Array, Array]
    - the result of a Fourier transform, where you get frequency domain values from time domain value
    - e.g. `[[0,1],[0,0]]`(sine wave)

- `play(mml = null): void`
- `stop(): void`

#### Event
- `onNote`
  - `type: "note"`
  - `time: number`
  - `playbackTime: number`
  - `trackNumber: number`
  - `noteNumber: number`
  - `duration: number`
  - `velocity: number(0 - 1)`
  - `quantize: number(0 - 1)`
  - `slur: Array`
    - `time: number`
    - `duration: number`
    - `noteNumber: number`
    - `panpot: number(-1 - 1)`
  - `instNumber: number`
  - `panpot: number(-1 - 1)`

## Example
To play sound, the user must make a gesture (click, tap, or keystroke) on the page first.

```js
let mml = "cde2";
let player = new MMLPlayer();

player.onNote = e => {
  console.log("NOTE: " + JSON.stringify(e));
}

document.querySelector("#playbtn").addEventListener('click', e => {
  player.play(mml);
});

// one-liner
new MMLPlayer().play("cde2");
```

## MML Syntax
### NoteEvent
- ([__`"__]+)?[__cdefgab__][__-+#__]?(\\d+)?\\.*&?
  - note on
  - ([__`"__]+)?
    - octave change
    - `+
      - octave up
      - e.g. ``ceg `c egc``
    - "+
      - octave down
      - e.g. `edc "b c`
  - [__cdefgab__]
    - musical scales
    - e.g. `c d e`
  - [__-+#__]?
    - semitone change
    - __\-__
      - lower a semitone
    - [__+#__]
      - raise a semitone
    - e.g. `c c+ d d# e e- d d- c`
  - (\\d+)?
    - note length (default: l)
    - e.g. `c4 c8 c8 c2`
  - \\.*
    - dotted note
    - e.g. ``c e8. g16 `c2``
  - __&__
    - slur
    - e.g. ``"c&`c2``
- __\\[__ (([`"]+)?[cdefgab][-+#]?|[__<>__])+ __\\]__(\\d+)?\\.*
  - chord (default: l)
  - e.g. `[ <g>ce ]2 [ <gb>d ]2 [ <g>ce ]1`
- __r__(\\d+)?\\.*
  - rest (default: l)
  - e.g. `l16 crcc crcc crccr crcc`

### NoteLength
- __l__(\\d+)?\\.*
  - length (default: 4)
  - e.g. `l8 cc l4 e l2 g`
- __^__(\\d+)?\\.*
  - tie (default: l)
  - e.g `l16 c^^ e^^ g^`
- __q__(\\d+)?
  - quantize (default: 75)
  - e.g. `l16 q50 crcc crcc crcc crcc`

### NotePitch
- __o__(\\d+)?
  - octave (default: 4)
  - e.g. `o4 ceg o5 c`
- __>__(\\d+)?
  - octave up (default: 1)
  - e.g. `ceg > c`
- __<__(\\d+)?
  - octave down (default: 1)
  - e.g. `c < gec`
- __k__\(\\+|-)?\\d+
  - key change (relavive value)
  - e.g. `cde2k+1cde2`

### Control
- __t__(\\d+)?
  - tempo (default: 120)
  - e.g. `t140 cdefgab<c`
- __v__(\\d+)?
  - velocity (default: 100)
  - e.g. `v75 c v50 e v25 g`
- __@__\\d+
  - change instrument
    - 0: sine wave
    - 1: square wave
    - 2: sawtooth wave
    - 3: triangle wave
    - 4: 25% pulse wave
    - 5: 12.5% pulse wave
  - e.g. `@0c @1c @2c @3c @4c @5c`
- __p__(\\d+)?
  - panpot (default: 128)
    - 1(left) - 128(center) - 255(right)
  - e.g. `p128cp1cp255c`
- __$__
  - infinite loop
  - e.g. `l2 $ [fa>ce] [gb>d] [egb>d] [ea>c]`
- __/:__ ... __|__ ... __:/__(\\d+)?
  - loop (default: 2)
  - commands after __|__ are skipped in the last loop
  - e.g. `l2 /: [fa>ce] [gb>d] [egb>d] | [ea>c] :/4 [eg>c]`


## See Also
- MML Emitter
  - [mohayonao/mml-emitter](https://github.com/mohayonao/mml-emitter) / MML(Music Macro Language) Emitter
  - [MMLEmitter Demo](http://mohayonao.github.io/mml-emitter/)
- MML Syntax
  - [mohayonao/mml-iterator](https://github.com/mohayonao/mml-iterator) / MML(Music Macro Language) Iterator


## License
MIT
