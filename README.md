# mml-player

> MML(Music Macro Language) Player based on [mohayonao/mml-emitter](https://github.com/mohayonao/mml-emitter) demo

## Installation

downloads:

- [mml-player.js](./dist/mml-player.js)
- [mml-player.js.LICENSE.txt](./dist/mml-player.js.LICENSE.txt)

## API
### MMLPlayer
- `constructor(mml = null)`

#### Instance methods
- `play(mml = null): void`
- `stop(): void`

#### Event
- `onNote`
  - `type: "note"`
  - `playbackTime: number`
  - `trackNumber: number`
  - `noteNumber: number`
  - `duration: number`
  - `velocity: number`
  - `quantize: number`

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
```

## See Also
- MML Emitter
  - [mohayonao/mml-emitter](https://github.com/mohayonao/mml-emitter) / MML(Music Macro Language) Emitter
  - [MMLEmitter Demo](http://mohayonao.github.io/mml-emitter/)

## License

MIT
