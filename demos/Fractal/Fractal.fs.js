import { Record, Union } from "./fable_modules/fable-library-js.4.19.3/Types.js";
import { record_type, list_type, unit_type, int32_type, lambda_type, char_type, string_type, union_type } from "./fable_modules/fable-library-js.4.19.3/Reflection.js";
import { DrawingCanvasProps, Redraw, drawingcanvas, Turtle_TurtleBuilder__Sub_3F7818A, Turtle_TurtleBuilder__PenUp_1BD268B, Turtle_TurtleBuilder__PenColor_Z4B7D7430, Turtle_TurtleBuilder__PenDown_1BD268B, Turtle_TurtleBuilder__Repeat_6FB13E75, Turtle_TurtleBuilder__Turn_6759F0D0, Turtle_turtle, Turtle_TurtleBuilder__Yield_1505, Turtle_TurtleBuilder__Forward_6759F0D0, Turtle_TurtleBuilder__Delay_FCFD9EF, Turtle_TurtleBuilder__Run_3A967661, DrawCommand_$reflection } from "../../src/Fable.React.DrawingCanvas/DrawingCanvas.fs.js";
import { curry4, uncurry2, uncurry4 } from "./fable_modules/fable-library-js.4.19.3/Util.js";
import { printf, toText } from "./fable_modules/fable-library-js.4.19.3/String.js";
import { singleton, empty, ofArray } from "./fable_modules/fable-library-js.4.19.3/List.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { min, max } from "./fable_modules/fable-library-js.4.19.3/Double.js";
import { toList } from "./fable_modules/fable-library-js.4.19.3/Seq.js";
import { rangeDouble } from "./fable_modules/fable-library-js.4.19.3/Range.js";
import { h5 } from "./fable_modules/Fulma.2.10.0/Elements/Heading.fs.js";
import { SelectForCustomTypes_Render_Z40BCBCC6 } from "./Select.fs.js";
import { label } from "./fable_modules/Fulma.2.10.0/Elements/Form/Label.fs.js";
import { Option, div } from "./fable_modules/Fulma.2.10.0/Elements/Form/Field.fs.js";
import { input } from "./fable_modules/Fulma.2.10.0/Elements/Form/./Input.fs.js";
import { Option as Option_1, IInputType } from "./fable_modules/Fulma.2.10.0/Elements/Form/Input.fs.js";
import { Option as Option_2, button } from "./fable_modules/Fulma.2.10.0/Elements/Button.fs.js";
import { DOMAttr } from "./fable_modules/Fable.React.7.0.1/Fable.React.Props.fs.js";
import { Common_GenericOption, Text_p } from "./fable_modules/Fulma.2.10.0/Common.fs.js";
import * as react from "react";
import { keyValueList } from "./fable_modules/fable-library-js.4.19.3/MapUtil.js";
import { Program_Internal_withReactSynchronousUsing } from "./fable_modules/Fable.Elmish.HMR.4.0.1/../Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "./fable_modules/Fable.Elmish.HMR.4.0.1/./common.fs.js";
import { ProgramModule_mkProgram } from "./fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { defaultOf } from "./fable_modules/Fable.Elmish.HMR.4.0.1/../.././fable_modules/fable-library-js.4.19.3/Util.js";
import { Internal_saveState, Internal_tryRestoreState } from "./fable_modules/Fable.Elmish.HMR.4.0.1/./hmr.fs.js";
import { value as value_1 } from "./fable_modules/fable-library-js.4.19.3/Option.js";
import { Cmd_batch, Cmd_none as Cmd_none_1, Cmd_map } from "./fable_modules/Fable.Elmish.HMR.4.0.1/../Fable.Elmish.3.1.0/cmd.fs.js";
import { Model$1, Msg$1 } from "./fable_modules/Fable.Elmish.HMR.4.0.1/hmr.fs.js";
import { ProgramModule_map, ProgramModule_runWith } from "./fable_modules/Fable.Elmish.HMR.4.0.1/../Fable.Elmish.3.1.0/program.fs.js";

export class Shape extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Triangle", "Square"];
    }
}

export function Shape_$reflection() {
    return union_type("Fractal.Shape", [], Shape, () => [[], []]);
}

export class LindenmayerRule extends Record {
    constructor(Shape, Vars, Start, Production, Draw) {
        super();
        this.Shape = Shape;
        this.Vars = Vars;
        this.Start = Start;
        this.Production = Production;
        this.Draw = Draw;
    }
}

export function LindenmayerRule_$reflection() {
    return record_type("Fractal.LindenmayerRule", [], LindenmayerRule, () => [["Shape", Shape_$reflection()], ["Vars", string_type], ["Start", string_type], ["Production", lambda_type(char_type, string_type)], ["Draw", lambda_type(int32_type, lambda_type(int32_type, lambda_type(char_type, lambda_type(unit_type, list_type(DrawCommand_$reflection())))))]]);
}

export function sierpinksi(len) {
    const angle = 120;
    return new LindenmayerRule(new Shape(0, []), "FG", "F-G-G", (ch) => {
        switch (ch) {
            case "F":
                return "F-G+F+G-F";
            case "G":
                return "GG";
            default:
                throw new Error("Invalid variable");
        }
    }, uncurry4((depth) => ((maxDepth) => ((cmd) => {
        let x;
        if ((x = cmd, (x === "F") ? true : (x === "G"))) {
            const x_1 = cmd;
            return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), len / Math.pow(2, depth))));
        }
        else {
            switch (cmd) {
                case "+":
                    return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), -angle)));
                case "-":
                    return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), angle)));
                default:
                    throw new Error(toText(printf("Invalid command: \'%c\'"))(cmd));
            }
        }
    }))));
}

export function koch(len, angle, shape, fproduction) {
    return new LindenmayerRule(shape, "F", "F", (_arg) => fproduction, uncurry4((depth) => ((maxDepth) => ((cmd) => {
        switch (cmd) {
            case "+":
                return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), -angle)));
            case "-":
                return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), angle)));
            case "F":
                return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), len / Math.pow(3, depth))));
            default:
                throw new Error("Invalid command");
        }
    }))));
}

export function drawRule(rule, maxDepth) {
    const drawSequence = (sequence) => ((depth) => Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Repeat_6FB13E75(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), sequence.split(""), uncurry2((ch) => (((rule.Vars.indexOf(ch) < 0) ? true : (depth === maxDepth)) ? curry4(rule.Draw)(depth)(maxDepth)(ch) : drawSequence(rule.Production(ch))(depth + 1)))))));
    return drawSequence(rule.Start)(0);
}

export class Fractal extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["KochSnowflake", "KochAntiSnowflake", "Koch90", "Sierpinski"];
    }
}

export function Fractal_$reflection() {
    return union_type("Fractal.Fractal", [], Fractal, () => [[], [], [], []]);
}

export function Fractal_get_All() {
    return ofArray([new Fractal(0, []), new Fractal(1, []), new Fractal(2, []), new Fractal(3, [])]);
}

export function Fractal__Rule(this$) {
    switch (this$.tag) {
        case 1:
            return koch(400, 60, new Shape(0, []), "F-F++F-F");
        case 2:
            return koch(200, 90, new Shape(1, []), "F+F-F-F+F");
        case 3:
            return sierpinksi(400);
        default:
            return koch(300, 60, new Shape(0, []), "F+F--F+F");
    }
}

export class Model extends Record {
    constructor(Detail, Fractal) {
        super();
        this.Detail = (Detail | 0);
        this.Fractal = Fractal;
    }
}

export function Model_$reflection() {
    return record_type("Fractal.Model", [], Model, () => [["Detail", int32_type], ["Fractal", Fractal_$reflection()]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetDetail", "UpdateFractal"];
    }
}

export function Msg_$reflection() {
    return union_type("Fractal.Msg", [], Msg, () => [[["Item", int32_type]], [["Item", Fractal_$reflection()]]]);
}

export function init() {
    return [new Model(1, new Fractal(0, [])), Cmd_none()];
}

export function update(msg, model) {
    if (msg.tag === 1) {
        const f = msg.fields[0];
        return [new Model(model.Detail, f), Cmd_none()];
    }
    else {
        const n = msg.fields[0] | 0;
        return [new Model(max(min(n, 6), 0), model.Fractal), Cmd_none()];
    }
}

export function drawTriangle(rule, detail) {
    return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Repeat_6FB13E75(Turtle_turtle, Turtle_TurtleBuilder__PenDown_1BD268B(Turtle_turtle, Turtle_TurtleBuilder__PenColor_Z4B7D7430(Turtle_turtle, Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__PenUp_1BD268B(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined)), 250), 90), 75), -30), "white")), toList(rangeDouble(1, 1, 3)), uncurry2((_arg) => Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Sub_3F7818A(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), drawRule(rule, detail)), 120)))))));
}

export function drawSquare(rule, detail) {
    return Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Repeat_6FB13E75(Turtle_turtle, Turtle_TurtleBuilder__PenDown_1BD268B(Turtle_turtle, Turtle_TurtleBuilder__PenColor_Z4B7D7430(Turtle_turtle, Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Forward_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__PenUp_1BD268B(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined)), 150), 90), 150), -90), "white")), toList(rangeDouble(1, 1, 4)), uncurry2((_arg) => Turtle_TurtleBuilder__Run_3A967661(Turtle_turtle, Turtle_TurtleBuilder__Delay_FCFD9EF(Turtle_turtle, () => Turtle_TurtleBuilder__Turn_6759F0D0(Turtle_turtle, Turtle_TurtleBuilder__Sub_3F7818A(Turtle_turtle, Turtle_TurtleBuilder__Yield_1505(Turtle_turtle, undefined), drawRule(rule, detail)), 90)))))));
}

export function drawFractal(rule, detail) {
    if (rule.Shape.tag === 1) {
        return drawSquare(rule, detail);
    }
    else {
        return drawTriangle(rule, detail);
    }
}

export function view(model, dispatch) {
    const props_4 = [["style", {
        marginLeft: "Auto",
        marginRight: "Auto",
        width: "500px",
        marginTop: "48px",
    }]];
    const children_4 = [h5(empty())(singleton(SelectForCustomTypes_Render_Z40BCBCC6(Fractal_get_All(), model.Fractal, (arg) => {
        dispatch(new Msg(1, [arg]));
    }))), drawingcanvas(new DrawingCanvasProps([["style", {
        background: "black",
        width: 500,
        height: 500,
    }]], new Redraw(0, [drawFractal(Fractal__Rule(model.Fractal), model.Detail)]))), label(empty(), singleton("Detail:")), div(singleton(new Option(2, [])), ofArray([input(ofArray([new Option_1(1, [new IInputType(0, [])]), new Option_1(8, [toText(printf("%d"))(model.Detail)]), new Option_1(5, [true])])), button(singleton(new Option_2(16, [singleton(new DOMAttr(40, [(_arg) => {
        dispatch(new Msg(0, [model.Detail - 1]));
    }]))])), singleton("-")), button(singleton(new Option_2(16, [singleton(new DOMAttr(40, [(_arg_1) => {
        dispatch(new Msg(0, [model.Detail + 1]));
    }]))])), singleton("+"))])), Text_p(singleton(new Common_GenericOption(1, [singleton(["style", {
        fontSize: "60%",
    }])])), ofArray(["Built with ", react.createElement("a", {
        href: "https://github.com/davedawkins/Fable.React.DrawingCanvas",
    }, "Fable.React.DrawingCanvas")])), Text_p(singleton(new Common_GenericOption(1, [singleton(["style", {
        fontSize: "60%",
    }])])), singleton(react.createElement("a", {
        href: "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/demos/Fractal/Fractal.fs",
    }, "Source")))];
    return react.createElement("div", keyValueList(props_4, 1), ...children_4);
}

(function () {
    const program_2 = Program_Internal_withReactSynchronousUsing((equal, view_1, state, dispatch_1) => lazyView2With(uncurry2(equal), uncurry2(view_1), state, dispatch_1), "elmish-app", ProgramModule_mkProgram(init, update, view));
    let hmrState = defaultOf();
    const hot = module.hot;
    if (!(hot == null)) {
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        const value = hot.accept();
        const matchValue = Internal_tryRestoreState(hot);
        if (matchValue == null) {
        }
        else {
            const previousState = value_1(matchValue);
            hmrState = previousState;
        }
    }
    const map = (tupledArg) => {
        const model_2 = tupledArg[0];
        const cmd = tupledArg[1];
        return [model_2, Cmd_map((Item) => (new Msg$1(0, [Item])), cmd)];
    };
    const mapUpdate = (update_1, msg_1, model_1_1) => {
        let msg_1_1, userModel, patternInput, newModel, cmd_2;
        const patternInput_1 = map((msg_1.tag === 1) ? [new Model$1(0, []), Cmd_none_1()] : ((msg_1_1 = msg_1.fields[0], (model_1_1.tag === 1) ? ((userModel = model_1_1.fields[0], (patternInput = update_1(msg_1_1)(userModel), (newModel = patternInput[0], (cmd_2 = patternInput[1], [new Model$1(1, [newModel]), cmd_2]))))) : [model_1_1, Cmd_none_1()])));
        const newModel_1 = patternInput_1[0];
        const cmd_3 = patternInput_1[1];
        hmrState = newModel_1;
        return [newModel_1, cmd_3];
    };
    const createModel = (tupledArg_1) => {
        const model_2_1 = tupledArg_1[0];
        const cmd_4 = tupledArg_1[1];
        return [new Model$1(1, [model_2_1]), cmd_4];
    };
    const mapInit = (init_1) => {
        if (hmrState == null) {
            return (arg_2) => createModel(map(init_1(arg_2)));
        }
        else {
            return (_arg) => [hmrState, Cmd_none_1()];
        }
    };
    const mapSetState = (setState, model_3, dispatch_2) => {
        if (model_3.tag === 1) {
            const userModel_1 = model_3.fields[0];
            setState(userModel_1)((arg_3) => dispatch_2(new Msg$1(0, [arg_3])));
        }
    };
    let hmrSubscription;
    const handler = (dispatch_1_1) => {
        if (!(hot == null)) {
            hot.dispose((data) => {
                Internal_saveState(data, hmrState);
                return dispatch_1_1(new Msg$1(1, []));
            });
        }
    };
    hmrSubscription = singleton(handler);
    const mapSubscribe = (subscribe, model_4) => {
        if (model_4.tag === 1) {
            const userModel_2 = model_4.fields[0];
            return Cmd_batch(ofArray([Cmd_map((Item_2) => (new Msg$1(0, [Item_2])), subscribe(userModel_2)), hmrSubscription]));
        }
        else {
            return Cmd_none_1();
        }
    };
    const mapView = (view_2, model_5, dispatch_2_1) => {
        if (model_5.tag === 1) {
            const userModel_3 = model_5.fields[0];
            return view_2(userModel_3)((arg_4) => dispatch_2_1(new Msg$1(0, [arg_4])));
        }
        else {
            const message = "\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    ";
            throw new Error(message);
        }
    };
    ProgramModule_runWith(undefined, ProgramModule_map(uncurry2(mapInit), mapUpdate, mapView, mapSetState, mapSubscribe, program_2));
})();

