"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectListEqual = expectListEqual;
exports.tests = void 0;

var _List = require("./fable-library.2.13.0/List");

var _Mocha = require("./Fable.Mocha.1.0.0/Mocha");

var _Seq = require("./fable-library.2.13.0/Seq");

var _DrawingCanvas = require("./Fable.React.DrawingCanvas/DrawingCanvas");

var _Util = require("./fable-library.2.13.0/Util");

function expectListEqual(value, expected) {
  (0, _Mocha.Expect$$$areEqual)((0, _List.length)(value), (0, _List.length)(expected));
  const inputSequence = (0, _List.zip)(value, expected);
  (0, _Seq.iterate)(function (p) {
    (0, _Mocha.Expect$$$areEqual)(p[0], p[1]);
  }, inputSequence);
}

const tests = (0, _Mocha.Test$$$testList)("DrawingCanvas", (0, _List.ofArray)([(() => {
  return (0, _Mocha.Test$$$testCase)("Create a drawing", function () {
    let d;
    d = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$FillRect$$62A78563)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$FillColor$$Z51EC14C8)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), "red"), 0, 0, 100, 100));
    }));
    const expected$$1 = (0, _List.ofArray)([new _DrawingCanvas.DrawCommand(1, "Save"), new _DrawingCanvas.DrawCommand(20, "FillStyle", new _DrawingCanvas.DrawStyle(0, "Color", "red")), new _DrawingCanvas.DrawCommand(33, "FillRect", 0, 0, 100, 100), new _DrawingCanvas.DrawCommand(2, "Restore")]);
    expectListEqual(d, expected$$1);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder ifThen true", function () {
    let d$$1;
    d$$1 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThen$$5ECEF318)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), true, new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      })));
    }));
    const expected$$2 = (0, _List.ofArray)([new _DrawingCanvas.DrawCommand(1, "Save"), new _DrawingCanvas.DrawCommand(4, "Fill"), new _DrawingCanvas.DrawCommand(2, "Restore")]);
    expectListEqual(d$$1, expected$$2);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThen false", function () {
    let d$$2;
    d$$2 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThen$$5ECEF318)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), false, new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      })));
    }));
    const expected$$3 = (0, _List.ofArray)([new _DrawingCanvas.DrawCommand(1, "Save"), new _DrawingCanvas.DrawCommand(2, "Restore")]);
    expectListEqual(d$$2, expected$$3);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThenElse true", function () {
    let d$$3;
    d$$3 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThenElse$$5C4BC609)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), true, new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      }), new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      })));
    }));
    const expected$$4 = (0, _List.ofArray)([new _DrawingCanvas.DrawCommand(1, "Save"), new _DrawingCanvas.DrawCommand(4, "Fill"), new _DrawingCanvas.DrawCommand(2, "Restore")]);
    expectListEqual(d$$3, expected$$4);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThenElse false", function () {
    let d$$4;
    d$$4 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThenElse$$5C4BC609)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), false, new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      }), new _Util.Lazy(function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing));
        }));
      })));
    }));
    const expected$$5 = (0, _List.ofArray)([new _DrawingCanvas.DrawCommand(1, "Save"), new _DrawingCanvas.DrawCommand(5, "Stroke"), new _DrawingCanvas.DrawCommand(2, "Restore")]);
    expectListEqual(d$$4, expected$$5);
  });
})()]));
exports.tests = tests;