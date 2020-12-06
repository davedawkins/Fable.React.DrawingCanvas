"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abs = abs;
exports.fromInteger = fromInteger;
exports.parse = parse;
exports.tryParse = tryParse;
exports.unixEpochMillisecondsToTicks = unixEpochMillisecondsToTicks;
exports.ticksToUnixEpochMilliseconds = ticksToUnixEpochMilliseconds;
exports.makeRangeStepFunction = makeRangeStepFunction;
exports.getHighBitsUnsigned = exports.getLowBitsUnsigned = exports.getHighBits = exports.getLowBits = exports.toString = exports.toNumber = exports.toBytes = exports.toInt = exports.fromValue = exports.fromString = exports.fromNumber = exports.fromBytes = exports.fromBits = exports.fromInt = exports.compare = exports.equals = exports.op_Inequality = exports.op_Equality = exports.op_GreaterThanOrEqual = exports.op_GreaterThan = exports.op_LessThanOrEqual = exports.op_LessThan = exports.op_LogicalNot = exports.op_ExclusiveOr = exports.op_BitwiseOr = exports.op_BitwiseAnd = exports.op_RightShiftUnsigned = exports.op_RightShift = exports.op_LeftShift = exports.op_UnaryNegation = exports.op_Modulus = exports.op_Division = exports.op_Multiply = exports.op_Subtraction = exports.op_Addition = exports.get_One = exports.get_Zero = exports.default = void 0;

var _Int = require("./Int32");

var LongLib = _interopRequireWildcard(require("../lib/long"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = LongLib.Long;
exports.default = _default;
const get_Zero = LongLib.ZERO;
exports.get_Zero = get_Zero;
const get_One = LongLib.ONE;
exports.get_One = get_One;
const op_Addition = LongLib.add;
exports.op_Addition = op_Addition;
const op_Subtraction = LongLib.subtract;
exports.op_Subtraction = op_Subtraction;
const op_Multiply = LongLib.multiply;
exports.op_Multiply = op_Multiply;
const op_Division = LongLib.divide;
exports.op_Division = op_Division;
const op_Modulus = LongLib.modulo;
exports.op_Modulus = op_Modulus;
const op_UnaryNegation = LongLib.negate;
exports.op_UnaryNegation = op_UnaryNegation;
const op_LeftShift = LongLib.shiftLeft;
exports.op_LeftShift = op_LeftShift;
const op_RightShift = LongLib.shiftRight;
exports.op_RightShift = op_RightShift;
const op_RightShiftUnsigned = LongLib.shiftRightUnsigned;
exports.op_RightShiftUnsigned = op_RightShiftUnsigned;
const op_BitwiseAnd = LongLib.and;
exports.op_BitwiseAnd = op_BitwiseAnd;
const op_BitwiseOr = LongLib.or;
exports.op_BitwiseOr = op_BitwiseOr;
const op_ExclusiveOr = LongLib.xor;
exports.op_ExclusiveOr = op_ExclusiveOr;
const op_LogicalNot = LongLib.not;
exports.op_LogicalNot = op_LogicalNot;
const op_LessThan = LongLib.lessThan;
exports.op_LessThan = op_LessThan;
const op_LessThanOrEqual = LongLib.lessThanOrEqual;
exports.op_LessThanOrEqual = op_LessThanOrEqual;
const op_GreaterThan = LongLib.greaterThan;
exports.op_GreaterThan = op_GreaterThan;
const op_GreaterThanOrEqual = LongLib.greaterThanOrEqual;
exports.op_GreaterThanOrEqual = op_GreaterThanOrEqual;
const op_Equality = LongLib.equals;
exports.op_Equality = op_Equality;
const op_Inequality = LongLib.notEquals;
exports.op_Inequality = op_Inequality;
const equals = LongLib.equals;
exports.equals = equals;
const compare = LongLib.compare;
exports.compare = compare;
const fromInt = LongLib.fromInt;
exports.fromInt = fromInt;
const fromBits = LongLib.fromBits;
exports.fromBits = fromBits;
const fromBytes = LongLib.fromBytes;
exports.fromBytes = fromBytes;
const fromNumber = LongLib.fromNumber;
exports.fromNumber = fromNumber;
const fromString = LongLib.fromString;
exports.fromString = fromString;
const fromValue = LongLib.fromValue;
exports.fromValue = fromValue;
const toInt = LongLib.toInt;
exports.toInt = toInt;
const toBytes = LongLib.toBytes;
exports.toBytes = toBytes;
const toNumber = LongLib.toNumber;
exports.toNumber = toNumber;
const toString = LongLib.toString;
exports.toString = toString;
const getLowBits = LongLib.getLowBits;
exports.getLowBits = getLowBits;
const getHighBits = LongLib.getHighBits;
exports.getHighBits = getHighBits;
const getLowBitsUnsigned = LongLib.getLowBitsUnsigned;
exports.getLowBitsUnsigned = getLowBitsUnsigned;
const getHighBitsUnsigned = LongLib.getHighBitsUnsigned;
exports.getHighBitsUnsigned = getHighBitsUnsigned;

function getMaxValue(unsigned, radix, isNegative) {
  switch (radix) {
    case 2:
      return unsigned ? "1111111111111111111111111111111111111111111111111111111111111111" : isNegative ? "1000000000000000000000000000000000000000000000000000000000000000" : "111111111111111111111111111111111111111111111111111111111111111";

    case 8:
      return unsigned ? "1777777777777777777777" : isNegative ? "1000000000000000000000" : "777777777777777777777";

    case 10:
      return unsigned ? "18446744073709551615" : isNegative ? "9223372036854775808" : "9223372036854775807";

    case 16:
      return unsigned ? "FFFFFFFFFFFFFFFF" : isNegative ? "8000000000000000" : "7FFFFFFFFFFFFFFF";

    default:
      throw new Error("Invalid radix.");
  }
}

function abs(x) {
  if (!x.unsigned && LongLib.isNegative(x)) {
    return op_UnaryNegation(x);
  } else {
    return x;
  }
}

function fromInteger(value, unsigned, kind) {
  let x = value;
  let xh = 0;

  switch (kind) {
    case 0:
      x = value << 24 >> 24;
      xh = x;
      break;

    case 4:
      x = value << 24 >>> 24;
      break;

    case 1:
      x = value << 16 >> 16;
      xh = x;
      break;

    case 5:
      x = value << 16 >>> 16;
      break;

    case 2:
      x = value >> 0;
      xh = x;
      break;

    case 6:
      x = value >>> 0;
      break;
  }

  return LongLib.fromBits(x, xh >> 31, unsigned);
}

function parse(str, style, unsigned, _bitsize, radix) {
  const res = (0, _Int.isValid)(str, style, radix);

  if (res != null) {
    const lessOrEqual = (x, y) => {
      const len = Math.max(x.length, y.length);
      return x.padStart(len, "0") <= y.padStart(len, "0");
    };

    const isNegative = res.sign === "-";
    const maxValue = getMaxValue(unsigned || res.radix !== 10, res.radix, isNegative);

    if (lessOrEqual(res.digits.toUpperCase(), maxValue)) {
      str = isNegative ? res.sign + res.digits : res.digits;
      return LongLib.fromString(str, unsigned, res.radix);
    }
  }

  throw new Error("Input string was not in a correct format.");
}

function tryParse(str, style, unsigned, bitsize) {
  try {
    const v = parse(str, style, unsigned, bitsize);
    return [true, v];
  } catch (_a) {// supress error
  }

  return [false, LongLib.ZERO];
}

function unixEpochMillisecondsToTicks(ms, offset) {
  return op_Multiply(op_Addition(op_Addition(LongLib.fromNumber(ms), 62135596800000), offset), 10000);
}

function ticksToUnixEpochMilliseconds(ticks) {
  return LongLib.toNumber(op_Subtraction(op_Division(ticks, 10000), 62135596800000));
}

function makeRangeStepFunction(step, last, unsigned) {
  const stepComparedWithZero = LongLib.compare(step, unsigned ? LongLib.UZERO : LongLib.ZERO);

  if (stepComparedWithZero === 0) {
    throw new Error("The step of a range cannot be zero");
  }

  const stepGreaterThanZero = stepComparedWithZero > 0;
  return x => {
    const comparedWithLast = LongLib.compare(x, last);

    if (stepGreaterThanZero && comparedWithLast <= 0 || !stepGreaterThanZero && comparedWithLast >= 0) {
      return [x, op_Addition(x, step)];
    } else {
      return undefined;
    }
  };
}