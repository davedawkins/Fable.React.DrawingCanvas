"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurtleCommand$reflection = TurtleCommand$reflection;
exports.TurtleState$reflection = TurtleState$reflection;
exports.update = update;
exports.makeDrawing = makeDrawing;
exports.TurtleBuilderVariant$reflection = TurtleBuilderVariant$reflection;
exports.TurtleBuilder$reflection = TurtleBuilder$reflection;
exports.TurtleBuilder$$$$002Ector$$Z451E394A = TurtleBuilder$$$$002Ector$$Z451E394A;
exports.TurtleBuilder$$Delay$$FCFD9EF = TurtleBuilder$$Delay$$FCFD9EF;
exports.TurtleBuilder$$Yield$$1505 = TurtleBuilder$$Yield$$1505;
exports.TurtleBuilder$$Run$$Z4B438379 = TurtleBuilder$$Run$$Z4B438379;
exports.TurtleBuilder$$Forward$$59FF94F6 = TurtleBuilder$$Forward$$59FF94F6;
exports.TurtleBuilder$$Turn$$59FF94F6 = TurtleBuilder$$Turn$$59FF94F6;
exports.TurtleBuilder$$PenUp$$460DCE2D = TurtleBuilder$$PenUp$$460DCE2D;
exports.TurtleBuilder$$PenDown$$460DCE2D = TurtleBuilder$$PenDown$$460DCE2D;
exports.TurtleBuilder$$PenColor$$Z75DB100A = TurtleBuilder$$PenColor$$Z75DB100A;
exports.TurtleBuilder$$Insert$$412FD16E = TurtleBuilder$$Insert$$412FD16E;
exports.TurtleBuilder$$Loop$$6E5AC991 = TurtleBuilder$$Loop$$6E5AC991;
exports.TurtleBuilder$$IfThen$$Z4301A9EA = TurtleBuilder$$IfThen$$Z4301A9EA;
exports.TurtleBuilder$$IfThenElse$$382F88C7 = TurtleBuilder$$IfThenElse$$382F88C7;
exports.turtle = exports.TurtleBuilder = exports.TurtleBuilderVariant = exports.TurtleState = exports.TurtleCommand = void 0;

var _Types = require("../fable-library.2.13.0/Types");

var _Reflection = require("../fable-library.2.13.0/Reflection");

var _DrawingCanvas = require("./DrawingCanvas");

var _List = require("../fable-library.2.13.0/List");

var _Seq = require("../fable-library.2.13.0/Seq");

var _Util = require("../fable-library.2.13.0/Util");

const TurtleCommand = (0, _Types.declare)(function Fable_React_DrawingCanvas_Turtle_TurtleCommand(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.TurtleCommand = TurtleCommand;

function TurtleCommand$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.Turtle.TurtleCommand", [], TurtleCommand, () => ["PenUp", "PenDown", ["PenColor", [["Item", _Reflection.string_type]]], ["Forward", [["distance", _Reflection.float64_type]]], ["Turn", [["angle", _Reflection.float64_type]]], ["Insert", [["Item", (0, _Reflection.list_type)((0, _DrawingCanvas.DrawCommand$reflection)())]]]]);
}

const TurtleState = (0, _Types.declare)(function Fable_React_DrawingCanvas_Turtle_TurtleState(PenIsDown, Drawing) {
  this.PenIsDown = PenIsDown;
  this.Drawing = Drawing;
}, _Types.Record);
exports.TurtleState = TurtleState;

function TurtleState$reflection() {
  return (0, _Reflection.record_type)("Fable.React.DrawingCanvas.Turtle.TurtleState", [], TurtleState, () => [["PenIsDown", _Reflection.bool_type], ["Drawing", (0, _Reflection.list_type)((0, _DrawingCanvas.DrawCommand$reflection)())]]);
}

function update(cmd, state) {
  switch (cmd.tag) {
    case 1:
      {
        return new TurtleState(true, state.Drawing);
      }

    case 2:
      {
        const Drawing = (0, _List.append)(state.Drawing, new _Types.List(new _DrawingCanvas.DrawCommand(19, "StrokeColor", cmd.fields[0]), new _Types.List()));
        return new TurtleState(state.PenIsDown, Drawing);
      }

    case 3:
      {
        const fragment = (0, _List.ofSeq)((0, _Seq.delay)(function () {
          return (0, _Seq.append)(state.PenIsDown ? (0, _Seq.singleton)(new _DrawingCanvas.DrawCommand(23, "LineTo", cmd.fields[0], 0)) : (0, _Seq.singleton)(new _DrawingCanvas.DrawCommand(22, "MoveTo", cmd.fields[0], 0)), (0, _Seq.delay)(function () {
            return (0, _Seq.singleton)(new _DrawingCanvas.DrawCommand(27, "Translate", cmd.fields[0], 0));
          }));
        }));
        const Drawing$$1 = (0, _List.append)(state.Drawing, fragment);
        return new TurtleState(state.PenIsDown, Drawing$$1);
      }

    case 4:
      {
        const Drawing$$2 = (0, _List.append)(state.Drawing, new _Types.List(new _DrawingCanvas.DrawCommand(26, "Rotate", 3.141592653589793 * cmd.fields[0] / 180), new _Types.List()));
        return new TurtleState(state.PenIsDown, Drawing$$2);
      }

    case 5:
      {
        const Drawing$$3 = (0, _List.append)(state.Drawing, ((0, _List.filter)(function predicate(c$$1) {
          if (!(0, _Util.equals)(c$$1, new _DrawingCanvas.DrawCommand(3, "BeginPath"))) {
            return !(0, _Util.equals)(c$$1, new _DrawingCanvas.DrawCommand(5, "Stroke"));
          } else {
            return false;
          }
        }, cmd.fields[0])));
        return new TurtleState(state.PenIsDown, Drawing$$3);
      }

    default:
      {
        return new TurtleState(false, state.Drawing);
      }
  }
}

function makeDrawing(cmds$$1) {
  const state$$1 = new TurtleState(false, new _Types.List());
  return ((0, _List.fold)(function folder(s, cmd$$1) {
    return update(cmd$$1, s);
  }, state$$1, cmds$$1)).Drawing;
}

const TurtleBuilderVariant = (0, _Types.declare)(function Fable_React_DrawingCanvas_Turtle_TurtleBuilderVariant(tag, name, ...fields) {
  this.tag = tag | 0;
  this.name = name;
  this.fields = fields;
}, _Types.Union);
exports.TurtleBuilderVariant = TurtleBuilderVariant;

function TurtleBuilderVariant$reflection() {
  return (0, _Reflection.union_type)("Fable.React.DrawingCanvas.Turtle.TurtleBuilderVariant", [], TurtleBuilderVariant, () => ["MainDrawing", "SubDrawing"]);
}

const TurtleBuilder = (0, _Types.declare)(function Fable_React_DrawingCanvas_Turtle_TurtleBuilder(variant) {
  const $this$$1 = this;
  $this$$1.variant = variant;
  void null;
});
exports.TurtleBuilder = TurtleBuilder;

function TurtleBuilder$reflection() {
  return (0, _Reflection.class_type)("Fable.React.DrawingCanvas.Turtle.TurtleBuilder", undefined, TurtleBuilder);
}

function TurtleBuilder$$$$002Ector$$Z451E394A(variant) {
  return this instanceof TurtleBuilder ? TurtleBuilder.call(this, variant) : new TurtleBuilder(variant);
}

function TurtleBuilder$$Delay$$FCFD9EF(_, funcToDelay) {
  return function delayed() {
    return funcToDelay();
  };
}

function TurtleBuilder$$Yield$$1505(_$$1, _arg1) {
  return new _Types.List();
}

function TurtleBuilder$$Run$$Z4B438379(_$$2, funcToRun) {
  let drawing;
  const cmds$$2 = funcToRun();
  drawing = makeDrawing(cmds$$2);

  if (_$$2.variant.tag === 1) {
    return drawing;
  } else {
    return (0, _List.append)(new _Types.List(new _DrawingCanvas.DrawCommand(3, "BeginPath"), drawing), new _Types.List(new _DrawingCanvas.DrawCommand(5, "Stroke"), new _Types.List()));
  }
}

function TurtleBuilder$$Forward$$59FF94F6(_$$3, state$$2, d$$1) {
  const x = new TurtleCommand(3, "Forward", d$$1);
  return TurtleBuilder$$append(_$$3, state$$2, x);
}

function TurtleBuilder$$Turn$$59FF94F6(_$$4, state$$3, a$$1) {
  const x$$1 = new TurtleCommand(4, "Turn", a$$1);
  return TurtleBuilder$$append(_$$4, state$$3, x$$1);
}

function TurtleBuilder$$PenUp$$460DCE2D(_$$5, state$$4) {
  const x$$2 = new TurtleCommand(0, "PenUp");
  return TurtleBuilder$$append(_$$5, state$$4, x$$2);
}

function TurtleBuilder$$PenDown$$460DCE2D(_$$6, state$$5) {
  const x$$3 = new TurtleCommand(1, "PenDown");
  return TurtleBuilder$$append(_$$6, state$$5, x$$3);
}

function TurtleBuilder$$PenColor$$Z75DB100A(_$$7, state$$6, c$$2) {
  const x$$4 = new TurtleCommand(2, "PenColor", c$$2);
  return TurtleBuilder$$append(_$$7, state$$6, x$$4);
}

function TurtleBuilder$$Insert$$412FD16E(_$$8, state$$7, drawing$$1) {
  return TurtleBuilder$$appendSub(_$$8, state$$7, drawing$$1);
}

function TurtleBuilder$$Loop$$6E5AC991(_$$9, state$$8, col, f) {
  let result = state$$8;
  (0, _Seq.iterate)(function (x$$5) {
    const d$$2 = f(x$$5);
    result = TurtleBuilder$$appendSub(_$$9, result, d$$2);
  }, col);
  return result;
}

function TurtleBuilder$$IfThen$$Z4301A9EA(_$$10, state$$9, cond, succ) {
  if (cond) {
    const x$$6 = succ.Value;
    return TurtleBuilder$$appendSub(_$$10, state$$9, x$$6);
  } else {
    return state$$9;
  }
}

function TurtleBuilder$$IfThenElse$$382F88C7(_$$11, state$$10, cond$$1, succ$$1, fail) {
  if (cond$$1) {
    const x$$7 = succ$$1.Value;
    return TurtleBuilder$$appendSub(_$$11, state$$10, x$$7);
  } else {
    const x$$8 = fail.Value;
    return TurtleBuilder$$appendSub(_$$11, state$$10, x$$8);
  }
}

function TurtleBuilder$$append(this$, xs, x$$9) {
  return (0, _List.append)(xs, new _Types.List(x$$9, new _Types.List()));
}

function TurtleBuilder$$appendSub(this$$$1, xs$$1, x$$10) {
  return (0, _List.append)(xs$$1, new _Types.List(new TurtleCommand(5, "Insert", x$$10), new _Types.List()));
}

const turtle = TurtleBuilder$$$$002Ector$$Z451E394A(new TurtleBuilderVariant(0, "MainDrawing"));
exports.turtle = turtle;