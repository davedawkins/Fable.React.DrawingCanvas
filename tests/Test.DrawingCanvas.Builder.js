"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tests = void 0;

var _DrawingCanvas = require("./Fable.React.DrawingCanvas/DrawingCanvas");

var _List = require("./fable-library.2.13.0/List");

var _Util = require("./Util");

var _Mocha = require("./Fable.Mocha.1.0.0/Mocha");

var _Seq = require("./fable-library.2.13.0/Seq");

var _Util2 = require("./fable-library.2.13.0/Util");

const tests = (0, _Mocha.Test$$$testList)("DrawingCanvas.Builder", (0, _List.ofArray)([(() => {
  return (0, _Mocha.Test$$$testCase)("Create a drawing", function () {
    let d;
    d = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$FillRect$$62A78563)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$FillColor$$Z51EC14C8)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), "red"), 0, 0, 100, 100));
    }));
    const expected = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(20, "FillStyle", new _DrawingCanvas.DrawStyle(0, "Color", "red")), new _DrawingCanvas.CanvasCommand(33, "FillRect", 0, 0, 100, 100), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected, d);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder ifThen true", function () {
    let d$$1;
    d$$1 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThen$$5225B7C0)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), true, ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      })))));
    }));
    const expected$$1 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(4, "Fill"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$1, d$$1);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThen false", function () {
    let d$$2;
    d$$2 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThen$$5225B7C0)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), false, ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      })))));
    }));
    const expected$$2 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$2, d$$2);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThenElse true", function () {
    let d$$3;
    d$$3 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThenElse$$Z12E84F7)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), true, ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      }))), ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      })))));
    }));
    const expected$$3 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(4, "Fill"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$3, d$$3);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder IfThenElse false", function () {
    let d$$4;
    d$$4 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Restore$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$IfThenElse$$Z12E84F7)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Save$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)), false, ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Fill$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      }))), ((0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing)));
      })))));
    }));
    const expected$$4 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(5, "Stroke"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$4, d$$4);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder preserve", function () {
    let d$$5;
    d$$5 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$preserve, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$preserve, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3)(_DrawingCanvas.Builder$$$preserve, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$preserve, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3)(_DrawingCanvas.Builder$$$preserve, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$preserve)), 0, 10, 20, 30));
    }));
    const expected$$5 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(5, "Stroke"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$5, d$$5);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder strokepath", function () {
    let d$$6;
    d$$6 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$strokepath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$strokepath, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$strokepath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$strokepath), 0, 10, 20, 30);
    }));
    const expected$$6 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$6, d$$6);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder fillPath", function () {
    let d$$7;
    d$$7 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$fillpath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$fillpath, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$fillpath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$fillpath), 0, 10, 20, 30);
    }));
    const expected$$7 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(4, "Fill")]);
    (0, _Util.expectDrawingsEqual)(expected$$7, d$$7);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder sub", function () {
    let d0;
    d0 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing), 0, 10, 20, 30);
    }));
    let d$$8;
    d$$8 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$fillpath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$fillpath, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Sub$$4BFD43CA)(_DrawingCanvas.Builder$$$fillpath, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$fillpath), d0);
    }));
    const expected$$8 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(4, "Fill")]);
    (0, _Util.expectDrawingsEqual)(expected$$8, d$$8);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder loop", function () {
    let d$$9;
    d$$9 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Repeat$$Z31CD854B)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing), (0, _List.ofSeq)((0, _Seq.rangeNumber)(0, 1, 1)), (0, _Util2.uncurry)(2, function (i) {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing), i, 10, 20, 30);
        }));
      }));
    }));
    const expected$$9 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(31, "Rect", 1, 10, 20, 30)]);
    (0, _Util.expectDrawingsEqual)(expected$$9, d$$9);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Builder loop sub", function () {
    let d$$10;
    d$$10 = (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
      return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Repeat$$Z31CD854B)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing), (0, _List.ofSeq)((0, _Seq.rangeNumber)(0, 1, 1)), (0, _Util2.uncurry)(2, function d0$$1(i$$1) {
        return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Run$$680DD4C9)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Builder$$$drawing, function () {
          return (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Rect$$62A78563)(_DrawingCanvas.Builder$$$drawing, (0, _DrawingCanvas.Builder$002EDrawCommandBuilder$$Yield$$1505)(_DrawingCanvas.Builder$$$drawing), i$$1, 10, 20, 30);
        }));
      }));
    }));
    const expected$$10 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(31, "Rect", 0, 10, 20, 30), new _DrawingCanvas.CanvasCommand(31, "Rect", 1, 10, 20, 30)]);
    (0, _Util.expectDrawingsEqual)(expected$$10, d$$10);
  });
})()]));
exports.tests = tests;