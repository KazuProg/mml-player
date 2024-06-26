"use strict";

const Syntax = require("./Syntax");
const Scanner = require("./Scanner");
const NOTE_INDEXES = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };

class MMLParser {
  constructor(source) {
    this.scanner = new Scanner(source);
    this.ignoreError = true;
  }

  parse() {
    let result = [];

    this._readUntil(";", () => {
      result = result.concat(this.advance());
    });

    result = result.filter(v => v != null);

    return result;
  }

  advance() {
    switch (this.scanner.peek()) {
      case "c":
      case "d":
      case "e":
      case "f":
      case "g":
      case "a":
      case "b":
        return this.readNote();
      case "[":
        return this.readChord();
      case "r":
        return this.readRest();
      case "o":
        return this.readOctave();
      case ">":
        return this.readOctaveShift(+1);
      case "<":
        return this.readOctaveShift(-1);
      case "`":
        return this._readOctaveShiftOnce(+1);
      case "\"":
        return this._readOctaveShiftOnce(-1);
      case "l":
        return this.readNoteLength();
      case "q":
        return this.readNoteQuantize();
      case "v":
        return this.readNoteVelocity();
      case "t":
        return this.readTempo();
      case "k":
        return this.readKeyChange();
      case "@":
        return this.readInstChange();
      case "p":
        return this.readPanpot();
      case "$":
        return this.readInfiniteLoop();
      case "/":
        return this.readLoop();
      default:
      // do nothing
    }

    this._parseError();
    return null;
  }

  readNote(offset = 0) {
    return {
      type: Syntax.Note,
      noteNumbers: [this._readNoteNumber(offset)],
      noteLength: this._readLength(),
      isSlur: this._readSlur()
    };
  }

  readChord() {
    this.scanner.expect("[");

    const noteList = [];

    let offset = 0;
    let offsetOnce = 0;

    this._readUntil("]", () => {
      switch (this.scanner.peek()) {
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "a":
        case "b":
          noteList.push(this._readNoteNumber(offset + offsetOnce));
          offsetOnce = 0;
          break;
        case ">":
          this.scanner.next();
          offset += 12;
          break;
        case "<":
          this.scanner.next();
          offset -= 12;
          break;
        case "`":
          this.scanner.next();
          offsetOnce += 12;
          break;
        case "\"":
          this.scanner.next();
          offsetOnce -= 12;
          break;
        default:
          this._parseError();
      }
    });

    this.scanner.expect("]");

    return {
      type: Syntax.Note,
      noteNumbers: noteList,
      noteLength: this._readLength()
    };
  }

  readRest() {
    this.scanner.expect("r");

    return {
      type: Syntax.Rest,
      noteLength: this._readLength()
    };
  }

  readOctave() {
    this.scanner.expect("o");

    return {
      type: Syntax.Octave,
      value: this._readArgument(/\d+/)
    };
  }

  readOctaveShift(direction) {
    this.scanner.expect(/<|>/);

    return {
      type: Syntax.OctaveShift,
      direction: direction | 0,
      value: this._readArgument(/\d+/)
    };
  }

  readNoteLength() {
    this.scanner.expect("l");

    return {
      type: Syntax.NoteLength,
      noteLength: this._readLength()
    };
  }

  readNoteQuantize() {
    this.scanner.expect("q");

    return {
      type: Syntax.NoteQuantize,
      value: this._readArgument(/\d+/)
    };
  }

  readNoteVelocity() {
    this.scanner.expect("v");

    return {
      type: Syntax.NoteVelocity,
      value: this._readArgument(/\d+/)
    };
  }

  readTempo() {
    this.scanner.expect("t");

    return {
      type: Syntax.Tempo,
      value: this._readArgument(/\d+(\.\d+)?/)
    };
  }

  readKeyChange() {
    this.scanner.expect("k");

    const value = this._readArgument(/\+?-?\d+/);

    if (value == null) {
      this._missingArgumentError('k');
      return null;
    }

    return {
      type: Syntax.KeyChange,
      value
    };
  }

  readInstChange() {
    this.scanner.expect("@");

    const value = this._readArgument(/\d+/);

    if (value == null) {
      this._missingArgumentError('@');
      return null;
    }

    return {
      type: Syntax.InstChange,
      value
    };
  }

  readPanpot() {
    this.scanner.expect("p");

    return {
      type: Syntax.Panpot,
      value: this._readArgument(/\d+/)
    };
  }

  readInfiniteLoop() {
    this.scanner.expect("$");

    return {
      type: Syntax.InfiniteLoop
    };
  }

  readLoop() {
    this.scanner.expect("/");
    this.scanner.expect(":");

    const loopBegin = { type: Syntax.LoopBegin };
    const loopEnd = { type: Syntax.LoopEnd };

    let result = [];

    result = result.concat(loopBegin);
    this._readUntil(/[|:]/, () => {
      result = result.concat(this.advance());
    });
    result = result.concat(this._readLoopExit());

    this.scanner.expect(":");
    this.scanner.expect("/");

    loopBegin.value = this._readArgument(/\d+/) || null;

    result = result.concat(loopEnd);

    return result;
  }

  _readUntil(matcher, callback) {
    while (this.scanner.hasNext()) {
      this.scanner.forward();
      if (!this.scanner.hasNext() || this.scanner.match(matcher)) {
        break;
      }
      callback();
    }
  }

  _readArgument(matcher) {
    const num = this.scanner.scan(matcher);

    return num !== null ? +num : null;
  }

  _readOctaveShiftOnce(direction, value = 0) {
    this.scanner.expect(/`|"/);

    value += direction;

    switch (this.scanner.peek()) {
      case "c":
      case "d":
      case "e":
      case "f":
      case "g":
      case "a":
      case "b":
        return this.readNote(value * 12);
      case "`":
        return this._readOctaveShiftOnce(+1, value);
      case "\"":
        return this._readOctaveShiftOnce(-1, value);
      default:
        this._parseError();
    }
  }

  _readNoteNumber(offset) {
    const noteIndex = NOTE_INDEXES[this.scanner.next()];

    return noteIndex + this._readAccidental() + offset;
  }

  _readAccidental() {
    if (this.scanner.match("+") || this.scanner.match("#")) {
      return +1 * this.scanner.scan(/(\+|#)+/).length;
    }
    if (this.scanner.match("-")) {
      return -1 * this.scanner.scan(/\-+/).length;
    }
    return 0;
  }

  _readDot() {
    const len = (this.scanner.scan(/\.+/) || "").length;
    const result = new Array(len);

    for (let i = 0; i < len; i++) {
      result[i] = 0;
    }

    return result;
  }

  _readLength() {
    let result = [];

    result = result.concat(this._readArgument(/\d+/));
    result = result.concat(this._readDot());

    const tie = this._readTie();

    if (tie) {
      result = result.concat(tie);
    }

    return result;
  }

  _readTie() {
    this.scanner.forward();

    if (this.scanner.match("^")) {
      this.scanner.next();
      return this._readLength();
    }

    return null;
  }

  _readSlur() {
    return this.scanner.scan(/&+/) != null;
  }

  _readLoopExit() {
    let result = [];

    if (this.scanner.match("|")) {
      this.scanner.next();

      const loopExit = { type: Syntax.LoopExit };

      result = result.concat(loopExit);

      this._readUntil(":", () => {
        result = result.concat(this.advance());
      });
    }

    return result;
  }

  _parseError() {
    if (this.ignoreError) {
      console.warn(`Unexpected token: ${this.scanner.next()}`);
      this._readArgument(/\d+/);
    } else {
      this.scanner.throwUnexpectedToken();
    }
  }

  _missingArgumentError(command) {
    const message = `Missing argument: ${command} requires argument.`;
    if (this.ignoreError) {
      console.warn(message);
    } else {
      throw new SyntaxError(message);
    }
  }
}

module.exports = MMLParser;
