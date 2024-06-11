import SeqEmitter from "seq-emitter";
import MMLIterator from "./MMLIterator";
import reverseOctave from "./reverseOctave";

export default class MMLEmitter extends SeqEmitter {
  constructor(source, config = {}) {
    config = {
      reverseOctave: false,
      defaultParams: {},
      ...config
    };

    if (config.reverseOctave) {
      source = reverseOctave(source);
    }

    let tracks = source.replace(/(\/\/.*)/g, "").split(";");

    tracks = tracks.filter(source => !!source.trim());
    tracks = tracks.map(track => new MMLIterator(track, config.defaultParams));

    super(tracks, config);
  }
}
