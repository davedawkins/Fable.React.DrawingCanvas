"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectListEqual = expectListEqual;
exports.expectDrawingsEqual = expectDrawingsEqual;

var _List = require("./fable-library.2.13.0/List");

var _Mocha = require("./Fable.Mocha.1.0.0/Mocha");

var _Seq = require("./fable-library.2.13.0/Seq");

var _DrawingCanvas = require("./Fable.React.DrawingCanvas/DrawingCanvas");

function expectListEqual(expected, value) {
  (0, _Mocha.Expect$$$areEqual)((0, _List.length)(expected), (0, _List.length)(value));
  const inputSequence = (0, _List.zip)(expected, value);
  (0, _Seq.iterate)(function (p) {
    (0, _Mocha.Expect$$$areEqual)(p[0], p[1]);
  }, inputSequence);
}

function expectDrawingsEqual(expected$$1, value$$1) {
  var source, commands;
  const turtle = new _DrawingCanvas.TurtleState(false);
  expectListEqual(expected$$1, (source = (commands = value$$1(), ((0, _DrawingCanvas.translate)(turtle, commands))), ((0, _List.ofSeq)(source))));
}