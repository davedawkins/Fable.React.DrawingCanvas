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

const tests = (0, _Mocha.Test$$$testList)("DrawingCanvas.Turtle", (0, _List.ofArray)([(() => {
  return (0, _Mocha.Test$$$testCase)("Turtle basic", function () {
    let d;
    d = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), 1);
    }));
    const expected = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(23, "LineTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected, d);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle nested", function () {
    let d$$1;
    d$$1 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Sub$$4BFD43CA)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), ((0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
        return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Turn$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), 180);
      })))), 1);
    }));
    const expected$$1 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793), new _DrawingCanvas.CanvasCommand(23, "LineTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$1, d$$1);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle repeat", function () {
    let d$$2;
    d$$2 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Repeat$$Z31CD854B)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 2)), (0, _Util2.uncurry)(2, function (i) {
        return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
          return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Turn$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), i * 180);
        }));
      })), 1);
    }));
    const expected$$2 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793 * 2), new _DrawingCanvas.CanvasCommand(23, "LineTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$2, d$$2);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle repeat sub", function () {
    let d$$3;
    d$$3 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Repeat$$Z31CD854B)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), (0, _List.ofSeq)((0, _Seq.rangeNumber)(1, 1, 2)), (0, _Util2.uncurry)(2, function d0(i$$1) {
        return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
          return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Turn$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), i$$1 * 180);
        }));
      })), 1);
    }));
    const expected$$3 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793 * 2), new _DrawingCanvas.CanvasCommand(23, "LineTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$3, d$$3);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle ifThen", function () {
    let d$$4;
    d$$4 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$IfThen$$5225B7C0)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), true, ((0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
        return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Turn$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), 180);
      }))));
    }));
    const expected$$4 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$4, d$$4);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle ifThenFn", function () {
    let d$$5;
    d$$5 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Sub$$4BFD43CA)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), ((0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
        return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$IfThen$$5225B7C0)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), true, ((0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
          return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Turn$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), 180);
        }))));
      }))));
    }));
    const expected$$5 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(26, "Rotate", 3.141592653589793), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$5, d$$5);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle pen Up Down", function () {
    let d$$6;
    d$$6 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenUp$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenUp$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), 1)), 2)), 3);
    }));
    const expected$$6 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(23, "LineTo", 2, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 2, 0), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 3, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 3, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$6, d$$6);
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("Turtle pen Up Down Fn", function () {
    let f;
    f = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle), 2);
    }));
    let d$$7;
    d$$7 = (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Run$$680DD4C9)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF)(_DrawingCanvas.Turtle$$$turtle, function () {
      return (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenUp$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Sub$$4BFD43CA)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenDown$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Forward$$7DC89038)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$PenUp$$46E842A3)(_DrawingCanvas.Turtle$$$turtle, (0, _DrawingCanvas.Turtle$002ETurtleBuilder$$Yield$$1505)(_DrawingCanvas.Turtle$$$turtle)), 1)), f)), 3);
    }));
    const expected$$7 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 1, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 1, 0), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 0, 0), new _DrawingCanvas.CanvasCommand(23, "LineTo", 2, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 2, 0), new _DrawingCanvas.CanvasCommand(22, "MoveTo", 3, 0), new _DrawingCanvas.CanvasCommand(27, "Translate", 3, 0), new _DrawingCanvas.CanvasCommand(5, "Stroke")]);
    (0, _Util.expectDrawingsEqual)(expected$$7, d$$7);
  });
})()]));
exports.tests = tests;