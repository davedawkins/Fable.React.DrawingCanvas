"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGenerics = getGenerics;
exports.equals = equals;
exports.compare = compare;
exports.class_type = class_type;
exports.record_type = record_type;
exports.anonRecord_type = anonRecord_type;
exports.union_type = union_type;
exports.tuple_type = tuple_type;
exports.delegate_type = delegate_type;
exports.lambda_type = lambda_type;
exports.option_type = option_type;
exports.list_type = list_type;
exports.array_type = array_type;
exports.enum_type = enum_type;
exports.name = name;
exports.fullName = fullName;
exports.namespace = namespace;
exports.isArray = isArray;
exports.getElementType = getElementType;
exports.isGenericType = isGenericType;
exports.isEnum = isEnum;
exports.getGenericTypeDefinition = getGenericTypeDefinition;
exports.getEnumUnderlyingType = getEnumUnderlyingType;
exports.getEnumValues = getEnumValues;
exports.getEnumNames = getEnumNames;
exports.parseEnum = parseEnum;
exports.tryParseEnum = tryParseEnum;
exports.getEnumName = getEnumName;
exports.isEnumDefined = isEnumDefined;
exports.getUnionCases = getUnionCases;
exports.getRecordElements = getRecordElements;
exports.getTupleElements = getTupleElements;
exports.getFunctionElements = getFunctionElements;
exports.isUnion = isUnion;
exports.isRecord = isRecord;
exports.isTuple = isTuple;
exports.isFunction = isFunction;
exports.getUnionFields = getUnionFields;
exports.getUnionCaseFields = getUnionCaseFields;
exports.getRecordFields = getRecordFields;
exports.getRecordField = getRecordField;
exports.getTupleFields = getTupleFields;
exports.getTupleField = getTupleField;
exports.makeUnion = makeUnion;
exports.makeRecord = makeRecord;
exports.makeTuple = makeTuple;
exports.makeGenericType = makeGenericType;
exports.createInstance = createInstance;
exports.getValue = getValue;
exports.getCaseTag = getCaseTag;
exports.getCaseName = getCaseName;
exports.getCaseFields = getCaseFields;
exports.decimal_type = exports.float64_type = exports.float32_type = exports.uint32_type = exports.int32_type = exports.uint16_type = exports.int16_type = exports.uint8_type = exports.int8_type = exports.bool_type = exports.string_type = exports.char_type = exports.unit_type = exports.obj_type = exports.TypeInfo = exports.CaseInfo = void 0;

var _Types = require("./Types");

var _Util = require("./Util");

class CaseInfo {
  constructor(declaringType, tag, name, fields) {
    this.declaringType = declaringType;
    this.tag = tag;
    this.name = name;
    this.fields = fields;
  }

}

exports.CaseInfo = CaseInfo;

class TypeInfo {
  constructor(fullname, generics, construct, fields, cases, enumCases) {
    this.fullname = fullname;
    this.generics = generics;
    this.construct = construct;
    this.fields = fields;
    this.cases = cases;
    this.enumCases = enumCases;
  }

  toString() {
    return fullName(this);
  }

  Equals(other) {
    return equals(this, other);
  }

  CompareTo(other) {
    return compare(this, other);
  }

}

exports.TypeInfo = TypeInfo;

function getGenerics(t) {
  return t.generics != null ? t.generics : [];
}

function equals(t1, t2) {
  if (t1.fullname === "") {
    // Anonymous records
    return t2.fullname === "" && (0, _Util.equalArraysWith)(getRecordElements(t1), getRecordElements(t2), ([k1, v1], [k2, v2]) => k1 === k2 && equals(v1, v2));
  } else {
    return t1.fullname === t2.fullname && (0, _Util.equalArraysWith)(getGenerics(t1), getGenerics(t2), equals);
  }
} // System.Type is not comparable in .NET, but let's implement this
// in case users want to create a dictionary with types as keys


function compare(t1, t2) {
  if (t1.fullname !== t2.fullname) {
    return t1.fullname < t2.fullname ? -1 : 1;
  } else {
    return (0, _Util.compareArraysWith)(getGenerics(t1), getGenerics(t2), compare);
  }
}

function class_type(fullname, generics, construct) {
  return new TypeInfo(fullname, generics, construct);
}

function record_type(fullname, generics, construct, fields) {
  return new TypeInfo(fullname, generics, construct, fields);
}

function anonRecord_type(...fields) {
  return new TypeInfo("", undefined, undefined, () => fields);
}

function union_type(fullname, generics, construct, cases) {
  const t = new TypeInfo(fullname, generics, construct, undefined, () => cases().map((x, i) => typeof x === "string" ? new CaseInfo(t, i, x) : new CaseInfo(t, i, x[0], x[1])));
  return t;
}

function tuple_type(...generics) {
  return new TypeInfo("System.Tuple`" + generics.length, generics);
}

function delegate_type(...generics) {
  return new TypeInfo("System.Func`" + generics.length, generics);
}

function lambda_type(argType, returnType) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpFunc`2", [argType, returnType]);
}

function option_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Core.FSharpOption`1", [generic]);
}

function list_type(generic) {
  return new TypeInfo("Microsoft.FSharp.Collections.FSharpList`1", [generic]);
}

function array_type(generic) {
  return new TypeInfo(generic.fullname + "[]", [generic]);
}

function enum_type(fullname, underlyingType, enumCases) {
  return new TypeInfo(fullname, [underlyingType], undefined, undefined, undefined, enumCases);
}

const obj_type = new TypeInfo("System.Object");
exports.obj_type = obj_type;
const unit_type = new TypeInfo("Microsoft.FSharp.Core.Unit");
exports.unit_type = unit_type;
const char_type = new TypeInfo("System.Char");
exports.char_type = char_type;
const string_type = new TypeInfo("System.String");
exports.string_type = string_type;
const bool_type = new TypeInfo("System.Boolean");
exports.bool_type = bool_type;
const int8_type = new TypeInfo("System.SByte");
exports.int8_type = int8_type;
const uint8_type = new TypeInfo("System.Byte");
exports.uint8_type = uint8_type;
const int16_type = new TypeInfo("System.Int16");
exports.int16_type = int16_type;
const uint16_type = new TypeInfo("System.UInt16");
exports.uint16_type = uint16_type;
const int32_type = new TypeInfo("System.Int32");
exports.int32_type = int32_type;
const uint32_type = new TypeInfo("System.UInt32");
exports.uint32_type = uint32_type;
const float32_type = new TypeInfo("System.Single");
exports.float32_type = float32_type;
const float64_type = new TypeInfo("System.Double");
exports.float64_type = float64_type;
const decimal_type = new TypeInfo("System.Decimal");
exports.decimal_type = decimal_type;

function name(info) {
  if (Array.isArray(info)) {
    return info[0];
  } else if (info instanceof CaseInfo) {
    return info.name;
  } else {
    const i = info.fullname.lastIndexOf(".");
    return i === -1 ? info.fullname : info.fullname.substr(i + 1);
  }
}

function fullName(t) {
  const gen = t.generics != null && !isArray(t) ? t.generics : [];

  if (gen.length > 0) {
    return t.fullname + "[" + gen.map(x => fullName(x)).join(",") + "]";
  } else {
    return t.fullname;
  }
}

function namespace(t) {
  const i = t.fullname.lastIndexOf(".");
  return i === -1 ? "" : t.fullname.substr(0, i);
}

function isArray(t) {
  return t.fullname.endsWith("[]");
}

function getElementType(t) {
  var _a;

  return isArray(t) ? (_a = t.generics) === null || _a === void 0 ? void 0 : _a[0] : undefined;
}

function isGenericType(t) {
  return t.generics != null && t.generics.length > 0;
}

function isEnum(t) {
  return t.enumCases != null && t.enumCases.length > 0;
}
/**
 * This doesn't replace types for fields (records) or cases (unions)
 * but it should be enough for type comparison purposes
 */


function getGenericTypeDefinition(t) {
  return t.generics == null ? t : new TypeInfo(t.fullname, t.generics.map(() => obj_type));
}

function getEnumUnderlyingType(t) {
  var _a;

  return (_a = t.generics) === null || _a === void 0 ? void 0 : _a[0];
}

function getEnumValues(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[1]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}

function getEnumNames(t) {
  if (isEnum(t) && t.enumCases != null) {
    return t.enumCases.map(kv => kv[0]);
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}

function getEnumCase(t, v) {
  if (t.enumCases != null) {
    if (typeof v === "string") {
      for (const kv of t.enumCases) {
        if (kv[0] === v) {
          return kv;
        }
      }

      throw new Error(`'${v}' was not found in ${t.fullname}`);
    } else {
      for (const kv of t.enumCases) {
        if (kv[1] === v) {
          return kv;
        }
      } // .NET returns the number even if it doesn't match any of the cases


      return ["", v];
    }
  } else {
    throw new Error(`${t.fullname} is not an enum type`);
  }
}

function parseEnum(t, str) {
  // TODO: better int parsing here, parseInt ceils floats: "4.8" -> 4
  const value = parseInt(str, 10);
  return getEnumCase(t, isNaN(value) ? str : value)[1];
}

function tryParseEnum(t, str) {
  try {
    const v = parseEnum(t, str);
    return [true, v];
  } catch (_a) {// supress error
  }

  return [false, NaN];
}

function getEnumName(t, v) {
  return getEnumCase(t, v)[0];
}

function isEnumDefined(t, v) {
  try {
    const kv = getEnumCase(t, v);
    return kv[0] != null && kv[0] !== "";
  } catch (_a) {// supress error
  }

  return false;
} // FSharpType


function getUnionCases(t) {
  if (t.cases != null) {
    return t.cases();
  } else {
    throw new Error(`${t.fullname} is not an F# union type`);
  }
}

function getRecordElements(t) {
  if (t.fields != null) {
    return t.fields();
  } else {
    throw new Error(`${t.fullname} is not an F# record type`);
  }
}

function getTupleElements(t) {
  if (isTuple(t) && t.generics != null) {
    return t.generics;
  } else {
    throw new Error(`${t.fullname} is not a tuple type`);
  }
}

function getFunctionElements(t) {
  if (isFunction(t) && t.generics != null) {
    const gen = t.generics;
    return [gen[0], gen[1]];
  } else {
    throw new Error(`${t.fullname} is not an F# function type`);
  }
}

function isUnion(t) {
  return t instanceof TypeInfo ? t.cases != null : t instanceof _Types.Union;
}

function isRecord(t) {
  return t instanceof TypeInfo ? t.fields != null : t instanceof _Types.Record;
}

function isTuple(t) {
  return t.fullname.startsWith("System.Tuple");
} // In .NET this is false for delegates


function isFunction(t) {
  return t.fullname === "Microsoft.FSharp.Core.FSharpFunc`2";
} // FSharpValue


function getUnionFields(v, t) {
  const cases = getUnionCases(t);
  const case_ = cases[v.tag];

  if (case_ == null) {
    throw new Error(`Cannot find case ${v.name} in union type`);
  }

  return [case_, v.fields];
}

function getUnionCaseFields(uci) {
  return uci.fields == null ? [] : uci.fields;
}

function getRecordFields(v) {
  return Object.keys(v).map(k => v[k]);
}

function getRecordField(v, field) {
  return v[field[0]];
}

function getTupleFields(v) {
  return v;
}

function getTupleField(v, i) {
  return v[i];
}

function makeUnion(uci, values) {
  const expectedLength = (uci.fields || []).length;

  if (values.length !== expectedLength) {
    throw new Error(`Expected an array of length ${expectedLength} but got ${values.length}`);
  }

  return uci.declaringType.construct != null ? new uci.declaringType.construct(uci.tag, uci.name, ...values) : {};
}

function makeRecord(t, values) {
  const fields = getRecordElements(t);

  if (fields.length !== values.length) {
    throw new Error(`Expected an array of length ${fields.length} but got ${values.length}`);
  }

  return t.construct != null ? new t.construct(...values) : (0, _Types.anonRecord)(fields.reduce((obj, [key, _t], i) => {
    obj[key] = values[i];
    return obj;
  }, {}));
}

function makeTuple(values, _t) {
  return values;
}

function makeGenericType(t, generics) {
  return new TypeInfo(t.fullname, generics, t.construct, t.fields, t.cases);
}

function createInstance(t, consArgs) {
  // TODO: Check if consArgs length is same as t.construct?
  // (Arg types can still be different)
  if (typeof t.construct === "function") {
    return new t.construct(...(consArgs !== null && consArgs !== void 0 ? consArgs : []));
  } else {
    throw new Error(`Cannot access constructor of ${t.fullname}`);
  }
}

function getValue(propertyInfo, v) {
  return v[propertyInfo[0]];
} // Fable.Core.Reflection


function assertUnion(x) {
  if (!(x instanceof _Types.Union)) {
    throw new Error(`Value is not an F# union type`);
  }
}

function getCaseTag(x) {
  assertUnion(x);
  return x.tag;
}

function getCaseName(x) {
  assertUnion(x);
  return x.name;
}

function getCaseFields(x) {
  assertUnion(x);
  return x.fields;
}