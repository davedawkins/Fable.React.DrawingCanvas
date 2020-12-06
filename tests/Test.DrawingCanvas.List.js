"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tests = void 0;

var _DrawingCanvas = require("./Fable.React.DrawingCanvas/DrawingCanvas");

var _List = require("./fable-library.2.13.0/List");

var _Util = require("./Util");

var _Mocha = require("./Fable.Mocha.1.0.0/Mocha");

const tests = (0, _Mocha.Test$$$testList)("DrawingCanvas.List", (0, _List.ofArray)([(() => {
  return (0, _Mocha.Test$$$testCase)("List ifThen true", function () {
    const d = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), (() => {
      throw 1;
    })(), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    const expected = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(4, "Fill"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected, (() => {
      throw 1;
    })());
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("List IfThen false", function () {
    const d$$1 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), (() => {
      throw 1;
    })(), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    const expected$$1 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$1, (() => {
      throw 1;
    })());
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("List IfThenElse true", function () {
    const d$$2 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), (() => {
      throw 1;
    })(), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    const expected$$2 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(4, "Fill"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$2, (() => {
      throw 1;
    })());
  });
})(), (() => {
  return (0, _Mocha.Test$$$testCase)("List IfThenElse false", function () {
    const d$$3 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), (() => {
      throw 1;
    })(), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    const expected$$3 = (0, _List.ofArray)([new _DrawingCanvas.CanvasCommand(1, "Save"), new _DrawingCanvas.CanvasCommand(3, "BeginPath"), new _DrawingCanvas.CanvasCommand(5, "Stroke"), new _DrawingCanvas.CanvasCommand(2, "Restore")]);
    (0, _Util.expectDrawingsEqual)(expected$$3, (() => {
      throw 1;
    })());
  });
})()]));
exports.tests = tests;