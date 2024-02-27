import SeqEmitter from "seq-emitter";
import MMLIterator from "mml-iterator";
import reverseOctave from "./reverseOctave";

export default class MMLEmitter extends SeqEmitter {
  constructor(source, config = {}) {
    if (config.reverseOctave) {
      source = reverseOctave(source);
    }

    let MMLIteratorClass = config.MMLIterator || MMLIterator;
    let tracks = source.replace(/(\/\/.*)/g, "").split(";");

    tracks = tracks.filter(source => !!source.trim());
    tracks = tracks.map(track => new MMLIteratorClass(track, config));

    super(tracks, config);
  }
}
