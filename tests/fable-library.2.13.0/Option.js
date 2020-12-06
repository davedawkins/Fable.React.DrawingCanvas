"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;
exports.value = value;
exports.tryValue = tryValue;
exports.toArray = toArray;
exports.defaultArg = defaultArg;
exports.defaultArgWith = defaultArgWith;
exports.filter = filter;
exports.map = map;
exports.map2 = map2;
exports.map3 = map3;
exports.bind = bind;
exports.tryOp = tryOp;
exports.choice1Of2 = choice1Of2;
exports.choice2Of2 = choice2Of2;
exports.tryValueIfChoice1Of2 = tryValueIfChoice1Of2;
exports.tryValueIfChoice2Of2 = tryValueIfChoice2Of2;
exports.ok = ok;
exports.error = error;
exports.mapOk = mapOk;
exports.mapError = mapError;
exports.bindOk = bindOk;
exports.Result = exports.Choice7 = exports.Choice6 = exports.Choice5 = exports.Choice4 = exports.Choice3 = exports.Choice = exports.Some = void 0;

var _Types = require("./Types");

var _Util = require("./Util");

// Using a class here for better compatibility with TS files importing Some
class Some {
  constructor(value) {
    this.value = value;
  } // Don't add "Some" for consistency with erased options


  toString() {
    return String(this.value);
  }

  toJSON() {
    return this.value;
  }

  GetHashCode() {
    return (0, _Util.structuralHash)(this.value);
  }

  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return (0, _Util.equals)(this.value, other instanceof Some ? other.value : other);
    }
  }

  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return (0, _Util.compare)(this.value, other instanceof Some ? other.value : other);
    }
  }

}

exports.Some = Some;

function some(x) {
  return x == null || x instanceof Some ? new Some(x) : x;
}

function value(x) {
  if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x instanceof Some ? x.value : x;
  }
}

function tryValue(x) {
  return x instanceof Some ? x.value : x;
}

function toArray(opt) {
  return opt == null ? [] : [value(opt)];
}

function defaultArg(opt, defaultValue) {
  return opt != null ? value(opt) : defaultValue;
}

function defaultArgWith(opt, defThunk) {
  return opt != null ? value(opt) : defThunk();
}

function filter(predicate, opt) {
  return opt != null ? predicate(value(opt)) ? opt : undefined : opt;
}

function map(mapping, opt) {
  return opt != null ? some(mapping(value(opt))) : undefined;
}

function map2(mapping, opt1, opt2) {
  return opt1 != null && opt2 != null ? mapping(value(opt1), value(opt2)) : undefined;
}

function map3(mapping, opt1, opt2, opt3) {
  return opt1 != null && opt2 != null && opt3 != null ? mapping(value(opt1), value(opt2), value(opt3)) : undefined;
}

function bind(binder, opt) {
  return opt != null ? binder(value(opt)) : undefined;
}

function tryOp(op, arg) {
  try {
    return some(op(arg));
  } catch (_a) {
    return undefined;
  }
} // CHOICE


class Choice extends _Types.Union {}

exports.Choice = Choice;

class Choice3 extends _Types.Union {}

exports.Choice3 = Choice3;

class Choice4 extends _Types.Union {}

exports.Choice4 = Choice4;

class Choice5 extends _Types.Union {}

exports.Choice5 = Choice5;

class Choice6 extends _Types.Union {}

exports.Choice6 = Choice6;

class Choice7 extends _Types.Union {}

exports.Choice7 = Choice7;

function choice1Of2(x) {
  return new Choice(0, "Choice1Of2", x);
}

function choice2Of2(x) {
  return new Choice(1, "Choice2Of2", x);
}

function tryValueIfChoice1Of2(x) {
  return x.tag === 0 ? some(x.fields[0]) : undefined;
}

function tryValueIfChoice2Of2(x) {
  return x.tag === 1 ? some(x.fields[0]) : undefined;
} // RESULT


class Result extends _Types.Union {}

exports.Result = Result;

function ok(x) {
  return new Result(0, "Ok", x);
}

function error(x) {
  return new Result(1, "Error", x);
}

function mapOk(f, result) {
  return result.tag === 0 ? ok(f(result.fields[0])) : result;
}

function mapError(f, result) {
  return result.tag === 1 ? error(f(result.fields[0])) : result;
}

function bindOk(f, result) {
  return result.tag === 0 ? f(result.fields[0]) : result;
}