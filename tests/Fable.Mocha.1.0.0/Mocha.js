"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestCase$reflection = TestCase$reflection;
exports.TestModule$reflection = TestModule$reflection;
exports.Test$$$testCase = Test$$$testCase;
exports.Test$$$testCaseAsync = Test$$$testCaseAsync;
exports.Test$$$testList = Test$$$testList;
exports.Expect$$$areEqual = Expect$$$areEqual;
exports.Expect$$$isTrue = Expect$$$isTrue;
exports.Expect$$$isFalse = Expect$$$isFalse;
exports.Expect$$$isZero = Expect$$$isZero;
exports.Expect$$$isEmpty = Expect$$$isEmpty;
exports.Expect$$$pass = Expect$$$pass;
exports.Mocha$$$runTests = Mocha$$$runTests;
exports.TestModule = exports.TestCase = void 0;

var _Types = require("../fable-library.2.13.0/Types");

var _Reflection = require("../fable-library.2.13.0/Reflection");

var _Util = require("../fable-library.2.13.0/Util");

var _String = require("../fable-library.2.13.0/String");

var _Seq = require("../fable-library.2.13.0/Seq");

var _Async = require("../fable-library.2.13.0/Async");

var _AsyncBuilder = require("../fable-library.2.13.0/AsyncBuilder");

var _List = require("../fable-library.2.13.0/List");

const TestCase = (0, _Types.declare)(function Fable_Mocha_TestCase(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.TestCase = TestCase;

function TestCase$reflection() {
  return (0, _Reflection.union_type)("Fable.Mocha.TestCase", [], TestCase, () => [["SyncTest", [["Item1", _Reflection.string_type], ["Item2", (0, _Reflection.lambda_type)(_Reflection.unit_type, _Reflection.unit_type)]]], ["AsyncTest", [["Item1", _Reflection.string_type], ["Item2", (0, _Reflection.lambda_type)(_Reflection.unit_type, (0, _Reflection.class_type)("Microsoft.FSharp.Control.FSharpAsync`1", [_Reflection.unit_type]))]]]]);
}

const TestModule = (0, _Types.declare)(function Fable_Mocha_TestModule(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.TestModule = TestModule;

function TestModule$reflection() {
  return (0, _Reflection.union_type)("Fable.Mocha.TestModule", [], TestModule, () => [["TestModule", [["Item1", _Reflection.string_type], ["Item2", (0, _Reflection.list_type)(TestCase$reflection())]]]]);
}

function Test$$$testCase(name, body) {
  return new TestCase(0, "SyncTest", name, body);
}

function Test$$$testCaseAsync(name$$1, body$$1) {
  return new TestCase(1, "AsyncTest", name$$1, body$$1);
}

function Test$$$testList(name$$2, tests) {
  return new TestModule(0, "TestModule", name$$2, tests);
}

function Expect$$$areEqual(expected, actual) {
  if ((0, _Util.equals)(expected, actual)) {
    (0, _Util.assertEqual)(expected, actual);
  } else {
    const clo1 = (0, _String.toFail)((0, _String.printf)("Expected %A but got %A"));
    const clo2 = clo1(expected);
    clo2(actual);
  }
}

function Expect$$$isTrue(cond) {
  Expect$$$areEqual(true, cond);
}

function Expect$$$isFalse(cond$$1) {
  Expect$$$areEqual(false, cond$$1);
}

function Expect$$$isZero(number) {
  Expect$$$areEqual(0, number);
}

function Expect$$$isEmpty(x) {
  Expect$$$areEqual(true, (0, _Seq.isEmpty)(x));
}

function Expect$$$pass() {
  Expect$$$areEqual(true, true);
}

function Mocha$$$runTests(testModules) {
  (0, _Seq.iterate)(function (forLoopVar) {
    describe(forLoopVar.fields[0], function () {
      (0, _List.iterate)(function action(_arg1) {
        if (_arg1.tag === 1) {
          it(_arg1.fields[0], function (finished) {
            let arg00;
            arg00 = _AsyncBuilder.singleton.Delay(function () {
              return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(_arg1.fields[1]()), function (_arg2) {
                if (_arg2.tag === 1) {
                  finished(_arg2.fields[0]);
                  return _AsyncBuilder.singleton.Zero();
                } else {
                  finished();
                  return _AsyncBuilder.singleton.Zero();
                }
              });
            });
            (0, _Async.startImmediate)(arg00);
          });
        } else {
          it(_arg1.fields[0], _arg1.fields[1]);
        }
      }, forLoopVar.fields[1]);
    });
  }, testModules);
}