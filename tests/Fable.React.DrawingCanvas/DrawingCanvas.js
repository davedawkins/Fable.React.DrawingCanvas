"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawStyle$reflection = DrawStyle$reflection;
exports.TurtleState$reflection = TurtleState$reflection;
exports.CanvasCommand$reflection = CanvasCommand$reflection;
exports.TurtleCommand$reflection = TurtleCommand$reflection;
exports.DrawCommand$reflection = DrawCommand$reflection;
exports.translateTurtle = translateTurtle;
exports.translate = translate;
exports.runCommands = runCommands;
exports.Redraw$reflection = Redraw$reflection;
exports.DrawingCanvasProps$reflection = DrawingCanvasProps$reflection;
exports.DrawingCanvas$reflection = DrawingCanvas$reflection;
exports.DrawingCanvas$$$$002Ector$$Z7056CB58 = DrawingCanvas$$$$002Ector$$Z7056CB58;
exports.drawingcanvas = drawingcanvas;
exports.Builder$002EBuilderVariant$reflection = Builder$002EBuilderVariant$reflection;
exports.Builder$002EDrawCommandBuilder$reflection = Builder$002EDrawCommandBuilder$reflection;
exports.Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269 = Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269;
exports.Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF = Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF;
exports.Builder$002EDrawCommandBuilder$$Yield$$1505 = Builder$002EDrawCommandBuilder$$Yield$$1505;
exports.Builder$002EDrawCommandBuilder$$Run$$680DD4C9 = Builder$002EDrawCommandBuilder$$Run$$680DD4C9;
exports.Builder$002EDrawCommandBuilder$$Resize$$68E29003 = Builder$002EDrawCommandBuilder$$Resize$$68E29003;
exports.Builder$002EDrawCommandBuilder$$Save$$46E842A3 = Builder$002EDrawCommandBuilder$$Save$$46E842A3;
exports.Builder$002EDrawCommandBuilder$$Restore$$46E842A3 = Builder$002EDrawCommandBuilder$$Restore$$46E842A3;
exports.Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3 = Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3;
exports.Builder$002EDrawCommandBuilder$$Fill$$46E842A3 = Builder$002EDrawCommandBuilder$$Fill$$46E842A3;
exports.Builder$002EDrawCommandBuilder$$Stroke$$46E842A3 = Builder$002EDrawCommandBuilder$$Stroke$$46E842A3;
exports.Builder$002EDrawCommandBuilder$$LineWidth$$7DC89038 = Builder$002EDrawCommandBuilder$$LineWidth$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$LineJoin$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$LineJoin$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$LineCap$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$LineCap$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$LineDashOffset$$7DC89038 = Builder$002EDrawCommandBuilder$$LineDashOffset$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$ShadowBlur$$7DC89038 = Builder$002EDrawCommandBuilder$$ShadowBlur$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$ShadowColor$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$ShadowColor$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$ShadowOffsetX$$7DC89038 = Builder$002EDrawCommandBuilder$$ShadowOffsetX$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$ShadowOffsetY$$7DC89038 = Builder$002EDrawCommandBuilder$$ShadowOffsetY$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$TextAlign$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$TextAlign$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$TextBaseline$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$TextBaseline$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$MiterLimit$$7DC89038 = Builder$002EDrawCommandBuilder$$MiterLimit$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$SetLineDash$$Z1059AE62 = Builder$002EDrawCommandBuilder$$SetLineDash$$Z1059AE62;
exports.Builder$002EDrawCommandBuilder$$FillColor$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$FillColor$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$FillStyle$$Z2708FE86 = Builder$002EDrawCommandBuilder$$FillStyle$$Z2708FE86;
exports.Builder$002EDrawCommandBuilder$$StrokeColor$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$StrokeColor$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$StrokeStyle$$Z2708FE86 = Builder$002EDrawCommandBuilder$$StrokeStyle$$Z2708FE86;
exports.Builder$002EDrawCommandBuilder$$MoveTo$$68E29003 = Builder$002EDrawCommandBuilder$$MoveTo$$68E29003;
exports.Builder$002EDrawCommandBuilder$$LineTo$$68E29003 = Builder$002EDrawCommandBuilder$$LineTo$$68E29003;
exports.Builder$002EDrawCommandBuilder$$ArcTo$$Z165FC908 = Builder$002EDrawCommandBuilder$$ArcTo$$Z165FC908;
exports.Builder$002EDrawCommandBuilder$$Arc$$Z21BD8EE = Builder$002EDrawCommandBuilder$$Arc$$Z21BD8EE;
exports.Builder$002EDrawCommandBuilder$$Rotate$$7DC89038 = Builder$002EDrawCommandBuilder$$Rotate$$7DC89038;
exports.Builder$002EDrawCommandBuilder$$Transform$$439F12C3 = Builder$002EDrawCommandBuilder$$Transform$$439F12C3;
exports.Builder$002EDrawCommandBuilder$$Translate$$68E29003 = Builder$002EDrawCommandBuilder$$Translate$$68E29003;
exports.Builder$002EDrawCommandBuilder$$Scale$$68E29003 = Builder$002EDrawCommandBuilder$$Scale$$68E29003;
exports.Builder$002EDrawCommandBuilder$$Font$$Z51EC14C8 = Builder$002EDrawCommandBuilder$$Font$$Z51EC14C8;
exports.Builder$002EDrawCommandBuilder$$ClearRect$$62A78563 = Builder$002EDrawCommandBuilder$$ClearRect$$62A78563;
exports.Builder$002EDrawCommandBuilder$$Rect$$62A78563 = Builder$002EDrawCommandBuilder$$Rect$$62A78563;
exports.Builder$002EDrawCommandBuilder$$FillRect$$62A78563 = Builder$002EDrawCommandBuilder$$FillRect$$62A78563;
exports.Builder$002EDrawCommandBuilder$$StrokeRect$$62A78563 = Builder$002EDrawCommandBuilder$$StrokeRect$$62A78563;
exports.Builder$002EDrawCommandBuilder$$FillText$$6C85C076 = Builder$002EDrawCommandBuilder$$FillText$$6C85C076;
exports.Builder$002EDrawCommandBuilder$$StrokeText$$6C85C076 = Builder$002EDrawCommandBuilder$$StrokeText$$6C85C076;
exports.Builder$002EDrawCommandBuilder$$Sub$$4BFD43CA = Builder$002EDrawCommandBuilder$$Sub$$4BFD43CA;
exports.Builder$002EDrawCommandBuilder$$Repeat$$Z31CD854B = Builder$002EDrawCommandBuilder$$Repeat$$Z31CD854B;
exports.Builder$002EDrawCommandBuilder$$IfThen$$5225B7C0 = Builder$002EDrawCommandBuilder$$IfThen$$5225B7C0;
exports.Builder$002EDrawCommandBuilder$$IfThenElse$$Z12E84F7 = Builder$002EDrawCommandBuilder$$IfThenElse$$Z12E84F7;
exports.ListHelpers$$$loop = ListHelpers$$$loop;
exports.ListHelpers$$$ifThen = ListHelpers$$$ifThen;
exports.ListHelpers$$$ifThenElse = ListHelpers$$$ifThenElse;
exports.ListHelpers$$$preserve = ListHelpers$$$preserve;
exports.ListHelpers$$$fillpath = ListHelpers$$$fillpath;
exports.ListHelpers$$$strokepath = ListHelpers$$$strokepath;
exports.Turtle$002ETurtleBuilder$reflection = Turtle$002ETurtleBuilder$reflection;
exports.Turtle$002ETurtleBuilder$$$$002Ector = Turtle$002ETurtleBuilder$$$$002Ector;
exports.Turtle$002ETurtleBuilder$$Delay$$FCFD9EF = Turtle$002ETurtleBuilder$$Delay$$FCFD9EF;
exports.Turtle$002ETurtleBuilder$$Yield$$1505 = Turtle$002ETurtleBuilder$$Yield$$1505;
exports.Turtle$002ETurtleBuilder$$Run$$680DD4C9 = Turtle$002ETurtleBuilder$$Run$$680DD4C9;
exports.Turtle$002ETurtleBuilder$$Forward$$7DC89038 = Turtle$002ETurtleBuilder$$Forward$$7DC89038;
exports.Turtle$002ETurtleBuilder$$Turn$$7DC89038 = Turtle$002ETurtleBuilder$$Turn$$7DC89038;
exports.Turtle$002ETurtleBuilder$$PenUp$$46E842A3 = Turtle$002ETurtleBuilder$$PenUp$$46E842A3;
exports.Turtle$002ETurtleBuilder$$PenDown$$46E842A3 = Turtle$002ETurtleBuilder$$PenDown$$46E842A3;
exports.Turtle$002ETurtleBuilder$$PenColor$$Z51EC14C8 = Turtle$002ETurtleBuilder$$PenColor$$Z51EC14C8;
exports.Turtle$002ETurtleBuilder$$Sub$$4BFD43CA = Turtle$002ETurtleBuilder$$Sub$$4BFD43CA;
exports.Turtle$002ETurtleBuilder$$Repeat$$Z31CD854B = Turtle$002ETurtleBuilder$$Repeat$$Z31CD854B;
exports.Turtle$002ETurtleBuilder$$IfThen$$5225B7C0 = Turtle$002ETurtleBuilder$$IfThen$$5225B7C0;
exports.Turtle$002ETurtleBuilder$$IfThenElse$$Z12E84F7 = Turtle$002ETurtleBuilder$$IfThenElse$$Z12E84F7;
exports.Turtle$$$turtle = exports.Turtle$002ETurtleBuilder = exports.Builder$$$preserve = exports.Builder$$$strokepath = exports.Builder$$$fillpath = exports.Builder$$$drawing = exports.Builder$002EDrawCommandBuilder = exports.Builder$002EBuilderVariant = exports.DrawingCanvas = exports.DrawingCanvasProps = exports.Redraw = exports.DrawCommand = exports.TurtleCommand = exports.CanvasCommand = exports.TurtleState = exports.LineJoinMiter = exports.LineJoinRound = exports.LineJoinBevel = exports.LineCapSquare = exports.LineCapRound = exports.LineCapButt = exports.DrawStyle = void 0;

var _Types = require("../fable-library.2.13.0/Types");

var _Reflection = require("../fable-library.2.13.0/Reflection");

var _Seq = require("../fable-library.2.13.0/Seq");

var react = _interopRequireWildcard(require("react"));

var _FableReact = require("../Fable.React.7.0.1/Fable.React.Props");

var _List = require("../fable-library.2.13.0/List");

var _Util = require("../fable-library.2.13.0/Util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DrawStyle = (0, _Types.declare)(function Fable_React_DrawingCanvas_DrawStyle(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.DrawStyle = DrawStyle;

function DrawStyle$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.DrawStyle", [], DrawStyle, () => [["Color", [["Item", _Reflection.string_type]]], ["Gradient", [["Item", (0, _Reflection.class_type)("Browser.Types.CanvasGradient")]]], ["Pattern", [["Item", (0, _Reflection.class_type)("Browser.Types.CanvasPattern")]]]]);
}

const LineCapButt = "butt";
exports.LineCapButt = LineCapButt;
const LineCapRound = "round";
exports.LineCapRound = LineCapRound;
const LineCapSquare = "square";
exports.LineCapSquare = LineCapSquare;
const LineJoinBevel = "bevel";
exports.LineJoinBevel = LineJoinBevel;
const LineJoinRound = "round";
exports.LineJoinRound = LineJoinRound;
const LineJoinMiter = "miter";
exports.LineJoinMiter = LineJoinMiter;
const TurtleState = (0, _Types.declare)(function Fable_React_DrawingCanvas_TurtleState(IsPenDown) {
  this.IsPenDown = IsPenDown;
}, _Types.Record);
exports.TurtleState = TurtleState;

function TurtleState$reflection() {
  return (0, _Reflection.record_type)("Fable.React.DrawingCanvas.TurtleState", [], TurtleState, () => [["IsPenDown", _Reflection.bool_type]]);
}

const CanvasCommand = (0, _Types.declare)(function Fable_React_DrawingCanvas_CanvasCommand(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.CanvasCommand = CanvasCommand;

function CanvasCommand$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.CanvasCommand", [], CanvasCommand, () => [["Resize", [["w", _Reflection.float64_type], ["h", _Reflection.float64_type]]], "Save", "Restore", "BeginPath", "Fill", "Stroke", ["TextAlign", [["Item", _Reflection.string_type]]], ["TextBaseline", [["Item", _Reflection.string_type]]], ["LineWidth", [["Item", _Reflection.float64_type]]], ["LineCap", [["Item", _Reflection.string_type]]], ["LineDashOffset", [["Item", _Reflection.float64_type]]], ["LineJoin", [["Item", _Reflection.string_type]]], ["ShadowBlur", [["Item", _Reflection.float64_type]]], ["ShadowColor", [["Item", _Reflection.string_type]]], ["ShadowOffsetX", [["Item", _Reflection.float64_type]]], ["ShadowOffsetY", [["Item", _Reflection.float64_type]]], ["MiterLimit", [["Item", _Reflection.float64_type]]], ["SetLineDash", [["Item", (0, _Reflection.array_type)(_Reflection.float64_type)]]], ["FillColor", [["Item", _Reflection.string_type]]], ["StrokeColor", [["Item", _Reflection.string_type]]], ["FillStyle", [["Item", DrawStyle$reflection()]]], ["StrokeStyle", [["Item", DrawStyle$reflection()]]], ["MoveTo", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type]]], ["LineTo", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type]]], ["ArcTo", [["x1", _Reflection.float64_type], ["y1", _Reflection.float64_type], ["x2", _Reflection.float64_type], ["y2", _Reflection.float64_type], ["radius", _Reflection.float64_type]]], ["Arc", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["radius", _Reflection.float64_type], ["startAngle", _Reflection.float64_type], ["endAngle", _Reflection.float64_type], ["anticlockwise", _Reflection.bool_type]]], ["Rotate", [["angle", _Reflection.float64_type]]], ["Translate", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type]]], ["Transform", [["m11", _Reflection.float64_type], ["m12", _Reflection.float64_type], ["m21", _Reflection.float64_type], ["m22", _Reflection.float64_type], ["dx", _Reflection.float64_type], ["dy", _Reflection.float64_type]]], ["Scale", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type]]], ["Font", [["Item", _Reflection.string_type]]], ["Rect", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["w", _Reflection.float64_type], ["h", _Reflection.float64_type]]], ["ClearRect", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["w", _Reflection.float64_type], ["h", _Reflection.float64_type]]], ["FillRect", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["w", _Reflection.float64_type], ["h", _Reflection.float64_type]]], ["StrokeRect", [["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["w", _Reflection.float64_type], ["h", _Reflection.float64_type]]], ["FillText", [["text", _Reflection.string_type], ["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["maxw", (0, _Reflection.option_type)(_Reflection.float64_type)]]], ["StrokeText", [["text", _Reflection.string_type], ["x", _Reflection.float64_type], ["y", _Reflection.float64_type], ["maxw", (0, _Reflection.option_type)(_Reflection.float64_type)]]]]);
}

const TurtleCommand = (0, _Types.declare)(function Fable_React_DrawingCanvas_TurtleCommand(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.TurtleCommand = TurtleCommand;

function TurtleCommand$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.TurtleCommand", [], TurtleCommand, () => ["PenUp", "PenDown", ["PenColor", [["Item", _Reflection.string_type]]], ["Forward", [["distance", _Reflection.float64_type]]], ["Turn", [["angle", _Reflection.float64_type]]]]);
}

const DrawCommand = (0, _Types.declare)(function Fable_React_DrawingCanvas_DrawCommand(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.DrawCommand = DrawCommand;

function DrawCommand$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.DrawCommand", [], DrawCommand, () => [["Canvas", [["Item", CanvasCommand$reflection()]]], ["Turtle", [["Item", TurtleCommand$reflection()]]], ["Sub", [["Item", (0, _Reflection.list_type)(DrawCommand$reflection())]]]]);
}

function runCommand(turtle, ctx, command) {
  if (command.tag === 1) {
    ctx.save();
  } else if (command.tag === 2) {
    ctx.restore();
  } else if (command.tag === 3) {
    ctx.beginPath();
  } else if (command.tag === 4) {
    ctx.fill();
  } else if (command.tag === 5) {
    ctx.stroke();
  } else if (command.tag === 9) {
    ctx.lineCap = command.fields[0];
  } else if (command.tag === 10) {
    ctx.lineDashOffset = command.fields[0];
  } else if (command.tag === 11) {
    ctx.lineJoin = command.fields[0];
  } else if (command.tag === 8) {
    ctx.lineWidth = command.fields[0];
  } else if (command.tag === 12) {
    ctx.shadowBlur = command.fields[0];
  } else if (command.tag === 13) {
    ctx.shadowColor = command.fields[0];
  } else if (command.tag === 14) {
    ctx.shadowOffsetX = command.fields[0];
  } else if (command.tag === 15) {
    ctx.shadowOffsetY = command.fields[0];
  } else if (command.tag === 16) {
    ctx.miterLimit = command.fields[0];
  } else if (command.tag === 17) {
    ctx.setLineDash(command.fields[0]);
  } else if (command.tag === 18) {
    ctx.fillStyle = command.fields[0];
  } else if (command.tag === 20) {
    if (command.fields[0].tag === 1) {
      ctx.fillStyle = command.fields[0].fields[0];
    } else if (command.fields[0].tag === 2) {
      ctx.fillStyle = command.fields[0].fields[0];
    } else {
      ctx.fillStyle = command.fields[0].fields[0];
    }
  } else if (command.tag === 19) {
    ctx.strokeStyle = command.fields[0];
  } else if (command.tag === 21) {
    if (command.fields[0].tag === 1) {
      ctx.strokeStyle = command.fields[0].fields[0];
    } else if (command.fields[0].tag === 2) {
      ctx.strokeStyle = command.fields[0].fields[0];
    } else {
      ctx.strokeStyle = command.fields[0].fields[0];
    }
  } else if (command.tag === 22) {
    ctx.moveTo(command.fields[0], command.fields[1]);
  } else if (command.tag === 23) {
    ctx.lineTo(command.fields[0], command.fields[1]);
  } else if (command.tag === 24) {
    ctx.arcTo(command.fields[0], command.fields[1], command.fields[2], command.fields[3], command.fields[4]);
  } else if (command.tag === 25) {
    ctx.arc(command.fields[0], command.fields[1], command.fields[2], command.fields[3], command.fields[4], command.fields[5]);
  } else if (command.tag === 26) {
    ctx.rotate(command.fields[0]);
  } else if (command.tag === 6) {
    ctx.textAlign = command.fields[0];
  } else if (command.tag === 7) {
    ctx.textBaseline = command.fields[0];
  } else if (command.tag === 27) {
    ctx.translate(command.fields[0], command.fields[1]);
  } else if (command.tag === 28) {
    ctx.transform(command.fields[0], command.fields[1], command.fields[2], command.fields[3], command.fields[4], command.fields[5]);
  } else if (command.tag === 29) {
    ctx.scale(command.fields[0], command.fields[1]);
  } else if (command.tag === 30) {
    ctx.font = command.fields[0];
  } else if (command.tag === 31) {
    ctx.rect(command.fields[0], command.fields[1], command.fields[2], command.fields[3]);
  } else if (command.tag === 32) {
    ctx.clearRect(command.fields[0], command.fields[1], command.fields[2], command.fields[3]);
  } else if (command.tag === 33) {
    ctx.fillRect(command.fields[0], command.fields[1], command.fields[2], command.fields[3]);
  } else if (command.tag === 34) {
    ctx.strokeRect(command.fields[0], command.fields[1], command.fields[2], command.fields[3]);
  } else if (command.tag === 35) {
    if (command.fields[3] != null) {
      const mw = command.fields[3];
      ctx.fillText(command.fields[0], command.fields[1], command.fields[2], mw);
    } else {
      ctx.fillText(command.fields[0], command.fields[1], command.fields[2]);
    }
  } else if (command.tag === 36) {
    if (command.fields[3] != null) {
      const mw$$1 = command.fields[3];
      ctx.strokeText(command.fields[0], command.fields[1], command.fields[2], mw$$1);
    } else {
      ctx.strokeText(command.fields[0], command.fields[1], command.fields[2]);
    }
  } else {
    ctx.canvas.width = command.fields[0];
    ctx.canvas.height = command.fields[1];
  }
}

function translateTurtle(turtle$$1, cmd) {
  return (0, _Seq.delay)(function () {
    switch (cmd.tag) {
      case 1:
        {
          turtle$$1.IsPenDown = true;
          return (0, _Seq.singleton)(new CanvasCommand(22, "MoveTo", 0, 0));
        }

      case 3:
        {
          return (0, _Seq.append)((0, _Seq.singleton)(turtle$$1.IsPenDown ? new CanvasCommand(23, "LineTo", cmd.fields[0], 0) : new CanvasCommand(22, "MoveTo", cmd.fields[0], 0)), (0, _Seq.delay)(function () {
            return (0, _Seq.singleton)(new CanvasCommand(27, "Translate", cmd.fields[0], 0));
          }));
        }

      case 4:
        {
          return (0, _Seq.singleton)(new CanvasCommand(26, "Rotate", cmd.fields[0] * Math.PI / 180));
        }

      case 2:
        {
          return (0, _Seq.singleton)(new CanvasCommand(19, "StrokeColor", cmd.fields[0]));
        }

      default:
        {
          turtle$$1.IsPenDown = false;
          return (0, _Seq.empty)();
        }
    }
  });
}

function translate(turtle$$2, commands) {
  return (0, _Seq.delay)(function () {
    return (0, _Seq.collect)(function (cmd$$1) {
      return cmd$$1.tag === 2 ? translate(turtle$$2, cmd$$1.fields[0]) : cmd$$1.tag === 1 ? translateTurtle(turtle$$2, cmd$$1.fields[0]) : (0, _Seq.singleton)(cmd$$1.fields[0]);
    }, commands);
  });
}

function runCommands(turtle$$3, ctx$$1, commands$$1) {
  let inputSequence;
  inputSequence = translate(turtle$$3, commands$$1);
  (0, _Seq.iterate)(function (cmd$$2) {
    runCommand(turtle$$3, ctx$$1, cmd$$2);
  }, inputSequence);
}

const Redraw = (0, _Types.declare)(function Fable_React_DrawingCanvas_Redraw(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.Redraw = Redraw;

function Redraw$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.Redraw", [], Redraw, () => [["Drawing", [["Item", (0, _Reflection.lambda_type)(_Reflection.unit_type, (0, _Reflection.list_type)(DrawCommand$reflection()))]]], ["DrawFunction", [["Item", (0, _Reflection.lambda_type)((0, _Reflection.class_type)("Browser.Types.CanvasRenderingContext2D"), _Reflection.unit_type)]]]]);
}

const DrawingCanvasProps = (0, _Types.declare)(function Fable_React_DrawingCanvas_DrawingCanvasProps(Props, Redraw) {
  this.Props = Props;
  this.Redraw = Redraw;
}, _Types.Record);
exports.DrawingCanvasProps = DrawingCanvasProps;

function DrawingCanvasProps$reflection() {
  return (0, _Reflection.record_type)("Fable.React.DrawingCanvas.DrawingCanvasProps", [], DrawingCanvasProps, () => [["Props", (0, _Reflection.class_type)("System.Collections.Generic.IEnumerable`1", [(0, _Reflection.class_type)("Fable.React.Props.IHTMLProp")])], ["Redraw", Redraw$reflection()]]);
}

const DrawingCanvas = (0, _Types.declare)(function Fable_React_DrawingCanvas_DrawingCanvas(initialProps) {
  const $this$$1 = this;
  react.Component.call($this$$1, initialProps);
  $this$$1.self = new _Types.FSharpRef(null);
  $this$$1.self.contents = $this$$1;
  $this$$1.canvasElement = undefined;
  $this$$1["init@197-2"] = 1;
  void null;
}, react.Component);
exports.DrawingCanvas = DrawingCanvas;

function DrawingCanvas$reflection() {
  return (0, _Reflection.class_type)("Fable.React.DrawingCanvas.DrawingCanvas", undefined, DrawingCanvas);
}

function DrawingCanvas$$$$002Ector$$Z7056CB58(initialProps) {
  return this instanceof DrawingCanvas ? DrawingCanvas.call(this, initialProps) : new DrawingCanvas(initialProps);
}

DrawingCanvas.prototype.render = function () {
  const this$ = this;
  const props = (0, _List.ofSeq)((0, _Seq.delay)(function () {
    return (0, _Seq.append)((0, _Seq.singleton)(new _FableReact.Prop(1, "Ref", function (e) {
      DrawingCanvas$$setRef$$Z5966C024(this$, e);
    })), (0, _Seq.delay)(function () {
      return this$.props.Props;
    }));
  }));
  const children = Array.prototype.concat(this$.props.children || []);
  return react.createElement("canvas", (0, _Util.createObj)(props, 1), ...children);
};

DrawingCanvas.prototype.componentDidMount = function () {
  const this$$$1 = this;
  DrawingCanvas$$drawNow(this$$$1);
};

DrawingCanvas.prototype.componentDidUpdate = function (p$$2, s$$2) {
  const this$$$2 = this;
  DrawingCanvas$$drawNow(this$$$2);
};

function DrawingCanvas$$setRef$$Z5966C024(this$$$3, e$$1) {
  this$$$3.canvasElement = (0, _Util.equals)(e$$1, null) ? undefined : e$$1;
}

function DrawingCanvas$$drawNow(this$$$4) {
  const matchValue$$1 = this$$$4.canvasElement;

  if (matchValue$$1 != null) {
    const ce$$1 = matchValue$$1;
    const ctx$$2 = ce$$1.getContext("2d");
    const matchValue$$2 = this$$$4.self.contents.props.Redraw;

    if (matchValue$$2.tag === 1) {
      matchValue$$2.fields[0](ctx$$2);
    } else {
      const turtle$$4 = new TurtleState(false);
      ctx$$2.canvas.width = ce$$1.offsetWidth;
      ctx$$2.canvas.height = ce$$1.offsetHeight;
      const commands$$3 = matchValue$$2.fields[0]();
      runCommands(turtle$$4, ctx$$2, commands$$3);
    }
  } else {
    void null;
  }
}

function drawingcanvas(props$$2) {
  const children$$2 = [];
  let comp;
  comp = DrawingCanvas;
  return react.createElement(comp, props$$2, ...children$$2);
}

const Builder$002EBuilderVariant = (0, _Types.declare)(function Fable_React_DrawingCanvas_Builder_BuilderVariant(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.Builder$002EBuilderVariant = Builder$002EBuilderVariant;

function Builder$002EBuilderVariant$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.Builder.BuilderVariant", [], Builder$002EBuilderVariant, () => ["Regular", "SaveRestore", "FillPath", "StrokePath"]);
}

const Builder$002EDrawCommandBuilder = (0, _Types.declare)(function Fable_React_DrawingCanvas_Builder_DrawCommandBuilder(variant) {
  const $this$$2 = this;
  $this$$2.variant = variant;
  void null;
});
exports.Builder$002EDrawCommandBuilder = Builder$002EDrawCommandBuilder;

function Builder$002EDrawCommandBuilder$reflection() {
  return (0, _Reflection.class_type)("Fable.React.DrawingCanvas.Builder.DrawCommandBuilder", undefined, Builder$002EDrawCommandBuilder);
}

function Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269(variant) {
  return this instanceof Builder$002EDrawCommandBuilder ? Builder$002EDrawCommandBuilder.call(this, variant) : new Builder$002EDrawCommandBuilder(variant);
}

function Builder$002EDrawCommandBuilder$$Delay$$FCFD9EF(_, funcToDelay) {
  return function delayed() {
    return funcToDelay();
  };
}

function Builder$002EDrawCommandBuilder$$Yield$$1505(_$$1, _arg1) {
  return new _Types.List();
}

function Builder$002EDrawCommandBuilder$$Run$$680DD4C9(_$$2, funcToRun) {
  return function () {
    const result = funcToRun();
    return _$$2.variant.tag === 1 ? (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(1, "Save")), result), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(2, "Restore")), new _Types.List())) : _$$2.variant.tag === 2 ? (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")), result), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(4, "Fill")), new _Types.List())) : _$$2.variant.tag === 3 ? (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")), result), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(5, "Stroke")), new _Types.List())) : result;
  };
}

function Builder$002EDrawCommandBuilder$$Resize$$68E29003(_$$3, state, w$$5, h$$5) {
  const x$$11 = new CanvasCommand(0, "Resize", w$$5, h$$5);
  return Builder$002EDrawCommandBuilder$$append(_$$3, state, x$$11);
}

function Builder$002EDrawCommandBuilder$$Save$$46E842A3(_$$4, state$$1) {
  const x$$12 = new CanvasCommand(1, "Save");
  return Builder$002EDrawCommandBuilder$$append(_$$4, state$$1, x$$12);
}

function Builder$002EDrawCommandBuilder$$Restore$$46E842A3(_$$5, state$$2) {
  const x$$13 = new CanvasCommand(2, "Restore");
  return Builder$002EDrawCommandBuilder$$append(_$$5, state$$2, x$$13);
}

function Builder$002EDrawCommandBuilder$$BeginPath$$46E842A3(_$$6, state$$3) {
  const x$$14 = new CanvasCommand(3, "BeginPath");
  return Builder$002EDrawCommandBuilder$$append(_$$6, state$$3, x$$14);
}

function Builder$002EDrawCommandBuilder$$Fill$$46E842A3(_$$7, state$$4) {
  const x$$15 = new CanvasCommand(4, "Fill");
  return Builder$002EDrawCommandBuilder$$append(_$$7, state$$4, x$$15);
}

function Builder$002EDrawCommandBuilder$$Stroke$$46E842A3(_$$8, state$$5) {
  const x$$16 = new CanvasCommand(5, "Stroke");
  return Builder$002EDrawCommandBuilder$$append(_$$8, state$$5, x$$16);
}

function Builder$002EDrawCommandBuilder$$LineWidth$$7DC89038(_$$9, state$$6, w$$6) {
  const x$$17 = new CanvasCommand(8, "LineWidth", w$$6);
  return Builder$002EDrawCommandBuilder$$append(_$$9, state$$6, x$$17);
}

function Builder$002EDrawCommandBuilder$$LineJoin$$Z51EC14C8(_$$10, state$$7, style$$2) {
  const x$$18 = new CanvasCommand(11, "LineJoin", style$$2);
  return Builder$002EDrawCommandBuilder$$append(_$$10, state$$7, x$$18);
}

function Builder$002EDrawCommandBuilder$$LineCap$$Z51EC14C8(_$$11, state$$8, style$$3) {
  const x$$19 = new CanvasCommand(9, "LineCap", style$$3);
  return Builder$002EDrawCommandBuilder$$append(_$$11, state$$8, x$$19);
}

function Builder$002EDrawCommandBuilder$$LineDashOffset$$7DC89038(_$$12, state$$9, offset$$3) {
  const x$$20 = new CanvasCommand(10, "LineDashOffset", offset$$3);
  return Builder$002EDrawCommandBuilder$$append(_$$12, state$$9, x$$20);
}

function Builder$002EDrawCommandBuilder$$ShadowBlur$$7DC89038(_$$13, state$$10, amount$$1) {
  const x$$21 = new CanvasCommand(12, "ShadowBlur", amount$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$13, state$$10, x$$21);
}

function Builder$002EDrawCommandBuilder$$ShadowColor$$Z51EC14C8(_$$14, state$$11, color$$1) {
  const x$$22 = new CanvasCommand(13, "ShadowColor", color$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$14, state$$11, x$$22);
}

function Builder$002EDrawCommandBuilder$$ShadowOffsetX$$7DC89038(_$$15, state$$12, offset$$4) {
  const x$$23 = new CanvasCommand(14, "ShadowOffsetX", offset$$4);
  return Builder$002EDrawCommandBuilder$$append(_$$15, state$$12, x$$23);
}

function Builder$002EDrawCommandBuilder$$ShadowOffsetY$$7DC89038(_$$16, state$$13, offset$$5) {
  const x$$24 = new CanvasCommand(15, "ShadowOffsetY", offset$$5);
  return Builder$002EDrawCommandBuilder$$append(_$$16, state$$13, x$$24);
}

function Builder$002EDrawCommandBuilder$$TextAlign$$Z51EC14C8(_$$17, state$$14, a$$4) {
  const x$$25 = new CanvasCommand(6, "TextAlign", a$$4);
  return Builder$002EDrawCommandBuilder$$append(_$$17, state$$14, x$$25);
}

function Builder$002EDrawCommandBuilder$$TextBaseline$$Z51EC14C8(_$$18, state$$15, a$$5) {
  const x$$26 = new CanvasCommand(7, "TextBaseline", a$$5);
  return Builder$002EDrawCommandBuilder$$append(_$$18, state$$15, x$$26);
}

function Builder$002EDrawCommandBuilder$$MiterLimit$$7DC89038(_$$19, state$$16, n$$3) {
  const x$$27 = new CanvasCommand(16, "MiterLimit", n$$3);
  return Builder$002EDrawCommandBuilder$$append(_$$19, state$$16, x$$27);
}

function Builder$002EDrawCommandBuilder$$SetLineDash$$Z1059AE62(_$$20, state$$17, segments$$1) {
  const x$$28 = new CanvasCommand(17, "SetLineDash", segments$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$20, state$$17, x$$28);
}

function Builder$002EDrawCommandBuilder$$FillColor$$Z51EC14C8(_$$21, state$$18, color$$2) {
  const x$$29 = new CanvasCommand(20, "FillStyle", new DrawStyle(0, "Color", color$$2));
  return Builder$002EDrawCommandBuilder$$append(_$$21, state$$18, x$$29);
}

function Builder$002EDrawCommandBuilder$$FillStyle$$Z2708FE86(_$$22, state$$19, style$$4) {
  const x$$30 = new CanvasCommand(20, "FillStyle", style$$4);
  return Builder$002EDrawCommandBuilder$$append(_$$22, state$$19, x$$30);
}

function Builder$002EDrawCommandBuilder$$StrokeColor$$Z51EC14C8(_$$23, state$$20, color$$3) {
  const x$$31 = new CanvasCommand(21, "StrokeStyle", new DrawStyle(0, "Color", color$$3));
  return Builder$002EDrawCommandBuilder$$append(_$$23, state$$20, x$$31);
}

function Builder$002EDrawCommandBuilder$$StrokeStyle$$Z2708FE86(_$$24, state$$21, style$$5) {
  const x$$32 = new CanvasCommand(21, "StrokeStyle", style$$5);
  return Builder$002EDrawCommandBuilder$$append(_$$24, state$$21, x$$32);
}

function Builder$002EDrawCommandBuilder$$MoveTo$$68E29003(_$$25, state$$22, x$$33, y$$11) {
  const x$$34 = new CanvasCommand(22, "MoveTo", x$$33, y$$11);
  return Builder$002EDrawCommandBuilder$$append(_$$25, state$$22, x$$34);
}

function Builder$002EDrawCommandBuilder$$LineTo$$68E29003(_$$26, state$$23, x$$35, y$$12) {
  const x$$36 = new CanvasCommand(23, "LineTo", x$$35, y$$12);
  return Builder$002EDrawCommandBuilder$$append(_$$26, state$$23, x$$36);
}

function Builder$002EDrawCommandBuilder$$ArcTo$$Z165FC908(_$$27, state$$24, x1$$1, y1$$1, x2$$1, y2$$1, r$$2) {
  const x$$37 = new CanvasCommand(24, "ArcTo", x1$$1, y1$$1, x2$$1, y2$$1, r$$2);
  return Builder$002EDrawCommandBuilder$$append(_$$27, state$$24, x$$37);
}

function Builder$002EDrawCommandBuilder$$Arc$$Z21BD8EE(_$$28, state$$25, x$$38, y$$13, r$$3, startAngle$$1, endAngle$$1, acw$$1) {
  const x$$39 = new CanvasCommand(25, "Arc", x$$38, y$$13, r$$3, startAngle$$1, endAngle$$1, acw$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$28, state$$25, x$$39);
}

function Builder$002EDrawCommandBuilder$$Rotate$$7DC89038(_$$29, state$$26, a$$6) {
  const x$$40 = new CanvasCommand(26, "Rotate", a$$6);
  return Builder$002EDrawCommandBuilder$$append(_$$29, state$$26, x$$40);
}

function Builder$002EDrawCommandBuilder$$Transform$$439F12C3(_$$30, state$$27, m11$$1, m12$$1, m21$$1, m22$$1, dx$$1, dy$$1) {
  const x$$41 = new CanvasCommand(28, "Transform", m11$$1, m12$$1, m21$$1, m22$$1, dx$$1, dy$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$30, state$$27, x$$41);
}

function Builder$002EDrawCommandBuilder$$Translate$$68E29003(_$$31, state$$28, x$$42, y$$14) {
  const x$$43 = new CanvasCommand(27, "Translate", x$$42, y$$14);
  return Builder$002EDrawCommandBuilder$$append(_$$31, state$$28, x$$43);
}

function Builder$002EDrawCommandBuilder$$Scale$$68E29003(_$$32, state$$29, x$$44, y$$15) {
  const x$$45 = new CanvasCommand(29, "Scale", x$$44, y$$15);
  return Builder$002EDrawCommandBuilder$$append(_$$32, state$$29, x$$45);
}

function Builder$002EDrawCommandBuilder$$Font$$Z51EC14C8(_$$33, state$$30, name$$1) {
  const x$$46 = new CanvasCommand(30, "Font", name$$1);
  return Builder$002EDrawCommandBuilder$$append(_$$33, state$$30, x$$46);
}

function Builder$002EDrawCommandBuilder$$ClearRect$$62A78563(_$$34, state$$31, x$$47, y$$16, w$$7, h$$6) {
  const x$$48 = new CanvasCommand(32, "ClearRect", x$$47, y$$16, w$$7, h$$6);
  return Builder$002EDrawCommandBuilder$$append(_$$34, state$$31, x$$48);
}

function Builder$002EDrawCommandBuilder$$Rect$$62A78563(_$$35, state$$32, x$$49, y$$17, w$$8, h$$7) {
  const x$$50 = new CanvasCommand(31, "Rect", x$$49, y$$17, w$$8, h$$7);
  return Builder$002EDrawCommandBuilder$$append(_$$35, state$$32, x$$50);
}

function Builder$002EDrawCommandBuilder$$FillRect$$62A78563(_$$36, state$$33, x$$51, y$$18, w$$9, h$$8) {
  const x$$52 = new CanvasCommand(33, "FillRect", x$$51, y$$18, w$$9, h$$8);
  return Builder$002EDrawCommandBuilder$$append(_$$36, state$$33, x$$52);
}

function Builder$002EDrawCommandBuilder$$StrokeRect$$62A78563(_$$37, state$$34, x$$53, y$$19, w$$10, h$$9) {
  const x$$54 = new CanvasCommand(34, "StrokeRect", x$$53, y$$19, w$$10, h$$9);
  return Builder$002EDrawCommandBuilder$$append(_$$37, state$$34, x$$54);
}

function Builder$002EDrawCommandBuilder$$FillText$$6C85C076(_$$38, state$$35, text$$2, x$$55, y$$20, maxw$$2) {
  const x$$56 = new CanvasCommand(35, "FillText", text$$2, x$$55, y$$20, maxw$$2);
  return Builder$002EDrawCommandBuilder$$append(_$$38, state$$35, x$$56);
}

function Builder$002EDrawCommandBuilder$$StrokeText$$6C85C076(_$$39, state$$36, text$$3, x$$57, y$$21, maxw$$3) {
  const x$$58 = new CanvasCommand(36, "StrokeText", text$$3, x$$57, y$$21, maxw$$3);
  return Builder$002EDrawCommandBuilder$$append(_$$39, state$$36, x$$58);
}

function Builder$002EDrawCommandBuilder$$Sub$$4BFD43CA(_$$40, state$$37, drawing) {
  return (0, _List.append)(state$$37, drawing());
}

function Builder$002EDrawCommandBuilder$$Repeat$$Z31CD854B(_$$41, state$$38, col, f$$1) {
  let result$$1 = state$$38;
  (0, _Seq.iterate)(function (x$$59) {
    const d$$1 = (0, _Util.partialApply)(1, f$$1, [x$$59]);
    result$$1 = (0, _List.append)(result$$1, d$$1());
  }, col);
  return result$$1;
}

function Builder$002EDrawCommandBuilder$$IfThen$$5225B7C0(_$$42, state$$39, cond, succ) {
  if (cond) {
    return (0, _List.append)(state$$39, succ());
  } else {
    return state$$39;
  }
}

function Builder$002EDrawCommandBuilder$$IfThenElse$$Z12E84F7(_$$43, state$$40, cond$$1, succ$$1, fail) {
  if (cond$$1) {
    return (0, _List.append)(state$$40, succ$$1());
  } else {
    return (0, _List.append)(state$$40, fail());
  }
}

function Builder$002EDrawCommandBuilder$$append(this$$$5, xs, x$$60) {
  return (0, _List.append)(xs, new _Types.List(new DrawCommand(0, "Canvas", x$$60), new _Types.List()));
}

const Builder$$$drawing = Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269(new Builder$002EBuilderVariant(0, "Regular"));
exports.Builder$$$drawing = Builder$$$drawing;
const Builder$$$fillpath = Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269(new Builder$002EBuilderVariant(2, "FillPath"));
exports.Builder$$$fillpath = Builder$$$fillpath;
const Builder$$$strokepath = Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269(new Builder$002EBuilderVariant(3, "StrokePath"));
exports.Builder$$$strokepath = Builder$$$strokepath;
const Builder$$$preserve = Builder$002EDrawCommandBuilder$$$$002Ector$$Z1F77D269(new Builder$002EBuilderVariant(1, "SaveRestore"));
exports.Builder$$$preserve = Builder$$$preserve;

function ListHelpers$$$loop(coll, fn) {
  let arg0;
  arg0 = (0, _List.collect)(fn, coll);
  return new DrawCommand(2, "Sub", arg0);
}

function ListHelpers$$$ifThen(cond$$2, succ$$2) {
  return new DrawCommand(2, "Sub", cond$$2 ? succ$$2.Value : new _Types.List());
}

function ListHelpers$$$ifThenElse(cond$$3, succ$$3, fail$$1) {
  return new DrawCommand(2, "Sub", cond$$3 ? succ$$3.Value : fail$$1.Value);
}

function ListHelpers$$$preserve(drawing$$1) {
  return (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(1, "Save")), drawing$$1), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(2, "Restore")), new _Types.List()));
}

function ListHelpers$$$fillpath(drawing$$2) {
  return (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")), drawing$$2), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(4, "Fill")), new _Types.List()));
}

function ListHelpers$$$strokepath(drawing$$3) {
  return (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")), drawing$$3), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(5, "Stroke")), new _Types.List()));
}

const Turtle$002ETurtleBuilder = (0, _Types.declare)(function Fable_React_DrawingCanvas_Turtle_TurtleBuilder() {
  void null;
});
exports.Turtle$002ETurtleBuilder = Turtle$002ETurtleBuilder;

function Turtle$002ETurtleBuilder$reflection() {
  return (0, _Reflection.class_type)("Fable.React.DrawingCanvas.Turtle.TurtleBuilder", undefined, Turtle$002ETurtleBuilder);
}

function Turtle$002ETurtleBuilder$$$$002Ector() {
  return this instanceof Turtle$002ETurtleBuilder ? Turtle$002ETurtleBuilder.call(this) : new Turtle$002ETurtleBuilder();
}

function Turtle$002ETurtleBuilder$$Delay$$FCFD9EF(_$$44, funcToDelay$$1) {
  return function delayed$$1() {
    return funcToDelay$$1();
  };
}

function Turtle$002ETurtleBuilder$$Yield$$1505(_$$45, _arg1$$1) {
  return new _Types.List();
}

function Turtle$002ETurtleBuilder$$Run$$680DD4C9(_$$46, funcToRun$$1) {
  return function () {
    const drawing$$4 = funcToRun$$1();
    return (0, _List.append)(new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")), drawing$$4), new _Types.List(new DrawCommand(0, "Canvas", new CanvasCommand(5, "Stroke")), new _Types.List()));
  };
}

function Turtle$002ETurtleBuilder$$Forward$$7DC89038(_$$47, state$$41, d$$2) {
  const x$$61 = new TurtleCommand(3, "Forward", d$$2);
  return Turtle$002ETurtleBuilder$$append(_$$47, state$$41, x$$61);
}

function Turtle$002ETurtleBuilder$$Turn$$7DC89038(_$$48, state$$42, a$$7) {
  const x$$62 = new TurtleCommand(4, "Turn", a$$7);
  return Turtle$002ETurtleBuilder$$append(_$$48, state$$42, x$$62);
}

function Turtle$002ETurtleBuilder$$PenUp$$46E842A3(_$$49, state$$43) {
  const x$$63 = new TurtleCommand(0, "PenUp");
  return Turtle$002ETurtleBuilder$$append(_$$49, state$$43, x$$63);
}

function Turtle$002ETurtleBuilder$$PenDown$$46E842A3(_$$50, state$$44) {
  const x$$64 = new TurtleCommand(1, "PenDown");
  return Turtle$002ETurtleBuilder$$append(_$$50, state$$44, x$$64);
}

function Turtle$002ETurtleBuilder$$PenColor$$Z51EC14C8(_$$51, state$$45, c$$4) {
  const x$$65 = new TurtleCommand(2, "PenColor", c$$4);
  return Turtle$002ETurtleBuilder$$append(_$$51, state$$45, x$$65);
}

function Turtle$002ETurtleBuilder$$Sub$$4BFD43CA(_$$52, state$$46, drawing$$5) {
  const x$$66 = drawing$$5();
  return Turtle$002ETurtleBuilder$$appendSub(_$$52, state$$46, x$$66);
}

function Turtle$002ETurtleBuilder$$Repeat$$Z31CD854B(_$$53, state$$47, col$$1, f$$2) {
  let result$$2 = state$$47;
  (0, _Seq.iterate)(function (x$$67) {
    const d$$3 = (0, _Util.partialApply)(1, f$$2, [x$$67]);
    const x$$68 = d$$3();
    result$$2 = Turtle$002ETurtleBuilder$$appendSub(_$$53, result$$2, x$$68);
  }, col$$1);
  return result$$2;
}

function Turtle$002ETurtleBuilder$$IfThen$$5225B7C0(_$$54, state$$48, cond$$4, succ$$4) {
  if (cond$$4) {
    const x$$69 = succ$$4();
    return Turtle$002ETurtleBuilder$$appendSub(_$$54, state$$48, x$$69);
  } else {
    return state$$48;
  }
}

function Turtle$002ETurtleBuilder$$IfThenElse$$Z12E84F7(_$$55, state$$49, cond$$5, succ$$5, fail$$2) {
  if (cond$$5) {
    const x$$70 = succ$$5();
    return Turtle$002ETurtleBuilder$$appendSub(_$$55, state$$49, x$$70);
  } else {
    const x$$71 = fail$$2();
    return Turtle$002ETurtleBuilder$$appendSub(_$$55, state$$49, x$$71);
  }
}

function Turtle$002ETurtleBuilder$$append(this$$$6, xs$$1, x$$72) {
  return (0, _List.append)(xs$$1, new _Types.List(new DrawCommand(1, "Turtle", x$$72), new _Types.List()));
}

function Turtle$002ETurtleBuilder$$appendSub(this$$$7, xs$$2, x$$73) {
  var arg0$$1;
  return (0, _List.append)(xs$$2, new _Types.List((arg0$$1 = ((0, _List.filter)(function predicate(c$$5) {
    if (!(0, _Util.equals)(c$$5, new DrawCommand(0, "Canvas", new CanvasCommand(3, "BeginPath")))) {
      return !(0, _Util.equals)(c$$5, new DrawCommand(0, "Canvas", new CanvasCommand(5, "Stroke")));
    } else {
      return false;
    }
  }, x$$73)), (new DrawCommand(2, "Sub", arg0$$1))), new _Types.List()));
}

const Turtle$$$turtle = Turtle$002ETurtleBuilder$$$$002Ector();
exports.Turtle$$$turtle = Turtle$$$turtle;