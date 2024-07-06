import { FSharpRef, Record, Union } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Types.js";
import { obj_type, lambda_type, unit_type, list_type, option_type, array_type, float64_type, record_type, int32_type, bool_type, union_type, class_type, string_type } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Reflection.js";
import { min, max } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Double.js";
import { printf, toText } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/String.js";
import { toList, collect, empty, singleton, append, delay } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Seq.js";
import { curry2, equals, defaultOf, disposeSafe, getEnumerator } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Util.js";
import { Prop } from "../../demos/Fractal/fable_modules/Fable.React.7.0.1/Fable.React.Props.fs.js";
import { Component } from "react";
import * as react from "react";
import { keyValueList } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/MapUtil.js";
import { map } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/Option.js";
import { collect as collect_1, singleton as singleton_1, cons, append as append_1, empty as empty_1 } from "../../demos/Fractal/fable_modules/fable-library-js.4.19.3/List.js";

export class DrawStyle extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Color", "Gradient", "Pattern"];
    }
}

export function DrawStyle_$reflection() {
    return union_type("Fable.React.DrawingCanvas.DrawStyle", [], DrawStyle, () => [[["Item", string_type]], [["Item", class_type("Browser.Types.CanvasGradient")]], [["Item", class_type("Browser.Types.CanvasPattern")]]]);
}

export const LineCapButt = "butt";

export const LineCapRound = "round";

export const LineCapSquare = "square";

export const LineJoinBevel = "bevel";

export const LineJoinRound = "round";

export const LineJoinMiter = "miter";

export class TurtleState extends Record {
    constructor(IsPenDown, LineCount) {
        super();
        this.IsPenDown = IsPenDown;
        this.LineCount = (LineCount | 0);
    }
}

export function TurtleState_$reflection() {
    return record_type("Fable.React.DrawingCanvas.TurtleState", [], TurtleState, () => [["IsPenDown", bool_type], ["LineCount", int32_type]]);
}

export class CanvasCommand extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Resize", "RotateFillHue", "RotateStrokeHue", "IncreaseLineWidth", "IncreaseStrokeRed", "IncreaseStrokeGreen", "IncreaseStrokeBlue", "IncreaseGlobalAlpha", "Save", "Restore", "BeginPath", "Fill", "Stroke", "TextAlign", "TextBaseline", "LineWidth", "LineCap", "LineDashOffset", "LineJoin", "ShadowBlur", "ShadowColor", "ShadowOffsetX", "ShadowOffsetY", "MiterLimit", "SetLineDash", "FillColor", "StrokeColor", "GlobalAlpha", "FillStyle", "StrokeStyle", "MoveTo", "LineTo", "ArcTo", "Arc", "Rotate", "Translate", "Transform", "Scale", "Font", "Rect", "ClearRect", "FillRect", "StrokeRect", "FillText", "StrokeText"];
    }
}

export function CanvasCommand_$reflection() {
    return union_type("Fable.React.DrawingCanvas.CanvasCommand", [], CanvasCommand, () => [[["w", float64_type], ["h", float64_type]], [["x", float64_type]], [["x", float64_type]], [["x", float64_type]], [["x", float64_type]], [["x", float64_type]], [["x", float64_type]], [["x", float64_type]], [], [], [], [], [], [["Item", string_type]], [["Item", string_type]], [["Item", float64_type]], [["Item", string_type]], [["Item", float64_type]], [["Item", string_type]], [["Item", float64_type]], [["Item", string_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", array_type(float64_type)]], [["Item", string_type]], [["Item", string_type]], [["Item", float64_type]], [["Item", DrawStyle_$reflection()]], [["Item", DrawStyle_$reflection()]], [["x", float64_type], ["y", float64_type]], [["x", float64_type], ["y", float64_type]], [["x1", float64_type], ["y1", float64_type], ["x2", float64_type], ["y2", float64_type], ["radius", float64_type]], [["x", float64_type], ["y", float64_type], ["radius", float64_type], ["startAngle", float64_type], ["endAngle", float64_type], ["anticlockwise", bool_type]], [["angle", float64_type]], [["x", float64_type], ["y", float64_type]], [["m11", float64_type], ["m12", float64_type], ["m21", float64_type], ["m22", float64_type], ["dx", float64_type], ["dy", float64_type]], [["x", float64_type], ["y", float64_type]], [["Item", string_type]], [["x", float64_type], ["y", float64_type], ["w", float64_type], ["h", float64_type]], [["x", float64_type], ["y", float64_type], ["w", float64_type], ["h", float64_type]], [["x", float64_type], ["y", float64_type], ["w", float64_type], ["h", float64_type]], [["x", float64_type], ["y", float64_type], ["w", float64_type], ["h", float64_type]], [["text", string_type], ["x", float64_type], ["y", float64_type], ["maxw", option_type(float64_type)]], [["text", string_type], ["x", float64_type], ["y", float64_type], ["maxw", option_type(float64_type)]]]);
}

export class TurtleCommand extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PenUp", "PenDown", "Push", "Pop", "PenColor", "RotateHue", "IncreaseWidth", "IncreaseAlpha", "IncreaseRed", "IncreaseGreen", "IncreaseBlue", "Forward", "Turn"];
    }
}

export function TurtleCommand_$reflection() {
    return union_type("Fable.React.DrawingCanvas.TurtleCommand", [], TurtleCommand, () => [[], [], [], [], [["Item", string_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", float64_type]], [["Item", float64_type]], [["distance", float64_type]], [["angle", float64_type]]]);
}

export class DrawCommand extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Canvas", "Turtle", "Sub"];
    }
}

export function DrawCommand_$reflection() {
    return union_type("Fable.React.DrawingCanvas.DrawCommand", [], DrawCommand, () => [[["Item", CanvasCommand_$reflection()]], [["Item", TurtleCommand_$reflection()]], [["Item", list_type(DrawCommand_$reflection())]]]);
}

export function ColorShift_rotate(x) {
    let x_1, x_2;
    if ((x_1 = x, x_1 > 1)) {
        const x_3 = x;
        return x_3 - 1;
    }
    else if ((x_2 = x, x_2 < 0)) {
        const x_4 = x;
        return x_4 + 1;
    }
    else {
        return x;
    }
}

export function ColorShift_bound(x) {
    let x_1, x_2;
    if ((x_1 = x, x_1 > 1)) {
        const x_3 = x;
        return 1;
    }
    else if ((x_2 = x, x_2 < 0)) {
        const x_4 = x;
        return 0;
    }
    else {
        return x;
    }
}

export function ColorShift_bound255(x) {
    let x_1, x_2;
    if ((x_1 = x, x_1 > 255)) {
        const x_3 = x;
        return 255;
    }
    else if ((x_2 = x, x_2 < 0)) {
        const x_4 = x;
        return 0;
    }
    else {
        return x;
    }
}

export function ColorShift_fromHexDigit(c) {
    if ((c >= "0") && (c <= "9")) {
        return (~~c.charCodeAt(0) - ~~"0".charCodeAt(0)) | 0;
    }
    else if ((c >= "A") && (c <= "F")) {
        return ((~~c.charCodeAt(0) - ~~"A".charCodeAt(0)) + 10) | 0;
    }
    else if ((c >= "a") && (c <= "f")) {
        return ((~~c.charCodeAt(0) - ~~"a".charCodeAt(0)) + 10) | 0;
    }
    else {
        throw new Error("Not a hex character");
    }
}

export function ColorShift_fromHexByteString(ff) {
    return (ColorShift_fromHexDigit(ff[0]) * 16) + ColorShift_fromHexDigit(ff[1]);
}

export function ColorShift_hexToRgb(text) {
    let text_1;
    if ((text_1 = text, (text_1.length === 7) && (text_1[0] === "#"))) {
        const text_2 = text;
        return [ColorShift_fromHexByteString(text_2.slice(1, 2 + 1)), ColorShift_fromHexByteString(text_2.slice(3, 4 + 1)), ColorShift_fromHexByteString(text_2.slice(5, 6 + 1))];
    }
    else {
        throw new Error("Expected RGB hex format \'#RRGGBB\'");
    }
}

export function ColorShift_rgbToHsv(r, g, b) {
    let x, x_1, x_2, x_3;
    const mx = max(r, max(g, b));
    const mn = min(r, min(g, b));
    const d = mx - mn;
    const s = (mx === 0) ? 0 : (d / mx);
    const v = mx / 255;
    let h;
    if ((x = mx, x === mn)) {
        const x_4 = mx;
        h = 0;
    }
    else if ((x_1 = mx, x_1 === r)) {
        const x_5 = mx;
        h = (((g - b) + (d * ((g < b) ? 6 : 0))) / (6 * d));
    }
    else if ((x_2 = mx, x_2 === g)) {
        const x_6 = mx;
        h = (((b - r) + (d * 2)) / (6 * d));
    }
    else if ((x_3 = mx, x_3 === b)) {
        const x_7 = mx;
        h = (((r - g) + (d * 4)) / (6 * d));
    }
    else {
        throw new Error("not possible");
    }
    return [h, s, v];
}

export function ColorShift_rotateHue(x, h, s, v) {
    return [ColorShift_rotate(h + x), s, v];
}

export function ColorShift_increaseRed(x, r, g, b) {
    return [ColorShift_bound255(r + (x * 255)), g, b];
}

export function ColorShift_increaseGreen(x, r, g, b) {
    return [r, ColorShift_bound255(g + (x * 255)), b];
}

export function ColorShift_increaseBlue(x, r, g, b) {
    return [r, g, ColorShift_bound255(b + (x * 255))];
}

export function ColorShift_rgbToHex(r, g, b) {
    const arg = ~~r | 0;
    const arg_1 = ~~g | 0;
    const arg_2 = ~~b | 0;
    return toText(printf("#%02X%02X%02X"))(arg)(arg_1)(arg_2);
}

export function ColorShift_hsvToRgb(h, s, v) {
    const i = Math.floor(h * 6);
    const f = (h * 6) - i;
    const p = v * (1 - s);
    const q = v * (1 - (f * s));
    const t = v * (1 - ((1 - f) * s));
    let patternInput;
    const matchValue = (~~i % 6) | 0;
    switch (matchValue) {
        case 0: {
            patternInput = [v, t, p];
            break;
        }
        case 1: {
            patternInput = [q, v, p];
            break;
        }
        case 2: {
            patternInput = [p, v, t];
            break;
        }
        case 3: {
            patternInput = [p, q, v];
            break;
        }
        case 4: {
            patternInput = [t, p, v];
            break;
        }
        case 5: {
            patternInput = [v, p, q];
            break;
        }
        default:
            throw new Error("Stop compiler warning for incomplete matches");
    }
    const r = patternInput[0];
    const g = patternInput[1];
    const b = patternInput[2];
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const ColorShift_hsvToHex = (arg) => {
    let tupledArg_1;
    const tupledArg = arg;
    tupledArg_1 = ColorShift_hsvToRgb(tupledArg[0], tupledArg[1], tupledArg[2]);
    return ColorShift_rgbToHex(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
};

export const ColorShift_hexToHsv = (arg) => {
    const tupledArg = ColorShift_hexToRgb(arg);
    return ColorShift_rgbToHsv(tupledArg[0], tupledArg[1], tupledArg[2]);
};

export function rotateHueFromStyle(style, amount) {
    let tupledArg;
    let rgbHex;
    if (typeof style === "string") {
        const c = style;
        rgbHex = c;
    }
    else {
        rgbHex = "#000000";
    }
    return ColorShift_hsvToHex((tupledArg = ColorShift_hexToHsv(rgbHex), ColorShift_rotateHue(amount, tupledArg[0], tupledArg[1], tupledArg[2])));
}

export function increaseRedFromStyle(style, amount) {
    let rgbHex;
    if (typeof style === "string") {
        const c = style;
        rgbHex = c;
    }
    else {
        rgbHex = "#000000";
    }
    let tupledArg_1;
    const tupledArg = ColorShift_hexToRgb(rgbHex);
    tupledArg_1 = ColorShift_increaseRed(amount, tupledArg[0], tupledArg[1], tupledArg[2]);
    return ColorShift_rgbToHex(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
}

export function increaseGreenFromStyle(style, amount) {
    let rgbHex;
    if (typeof style === "string") {
        const c = style;
        rgbHex = c;
    }
    else {
        rgbHex = "#000000";
    }
    let tupledArg_1;
    const tupledArg = ColorShift_hexToRgb(rgbHex);
    tupledArg_1 = ColorShift_increaseGreen(amount, tupledArg[0], tupledArg[1], tupledArg[2]);
    return ColorShift_rgbToHex(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
}

export function increaseBlueFromStyle(style, amount) {
    let rgbHex;
    if (typeof style === "string") {
        const c = style;
        rgbHex = c;
    }
    else {
        rgbHex = "#000000";
    }
    let tupledArg_1;
    const tupledArg = ColorShift_hexToRgb(rgbHex);
    tupledArg_1 = ColorShift_increaseBlue(amount, tupledArg[0], tupledArg[1], tupledArg[2]);
    return ColorShift_rgbToHex(tupledArg_1[0], tupledArg_1[1], tupledArg_1[2]);
}

function runCommand(turtle, ctx, command) {
    switch (command.tag) {
        case 2: {
            const x = command.fields[0];
            ctx.strokeStyle = rotateHueFromStyle(ctx.strokeStyle, x);
            break;
        }
        case 1: {
            const x_1 = command.fields[0];
            ctx.fillStyle = rotateHueFromStyle(ctx.fillStyle, x_1);
            break;
        }
        case 3: {
            const x_2 = command.fields[0];
            ctx.lineWidth = (ctx.lineWidth + x_2);
            break;
        }
        case 7: {
            const x_3 = command.fields[0];
            ctx.globalAlpha = max(0, min(ctx.globalAlpha + x_3, 1));
            break;
        }
        case 4: {
            const x_4 = command.fields[0];
            ctx.strokeStyle = increaseRedFromStyle(ctx.strokeStyle, x_4);
            break;
        }
        case 5: {
            const x_5 = command.fields[0];
            ctx.strokeStyle = increaseGreenFromStyle(ctx.strokeStyle, x_5);
            break;
        }
        case 6: {
            const x_6 = command.fields[0];
            ctx.strokeStyle = increaseBlueFromStyle(ctx.strokeStyle, x_6);
            break;
        }
        case 8: {
            ctx.save();
            break;
        }
        case 9: {
            ctx.restore();
            break;
        }
        case 10: {
            ctx.beginPath();
            break;
        }
        case 11: {
            ctx.fill();
            break;
        }
        case 12: {
            ctx.stroke();
            break;
        }
        case 16: {
            const style = command.fields[0];
            ctx.lineCap = style;
            break;
        }
        case 17: {
            const offset = command.fields[0];
            ctx.lineDashOffset = offset;
            break;
        }
        case 18: {
            const style_1 = command.fields[0];
            ctx.lineJoin = style_1;
            break;
        }
        case 15: {
            const n = command.fields[0];
            ctx.lineWidth = n;
            break;
        }
        case 19: {
            const amount = command.fields[0];
            ctx.shadowBlur = amount;
            break;
        }
        case 20: {
            const color = command.fields[0];
            ctx.shadowColor = color;
            break;
        }
        case 21: {
            const offset_1 = command.fields[0];
            ctx.shadowOffsetX = offset_1;
            break;
        }
        case 22: {
            const offset_2 = command.fields[0];
            ctx.shadowOffsetY = offset_2;
            break;
        }
        case 23: {
            const n_1 = command.fields[0];
            ctx.miterLimit = n_1;
            break;
        }
        case 24: {
            const segments = command.fields[0];
            ctx.setLineDash(segments);
            break;
        }
        case 25: {
            const c = command.fields[0];
            ctx.fillStyle = c;
            break;
        }
        case 28: {
            switch (command.fields[0].tag) {
                case 1: {
                    const g = command.fields[0].fields[0];
                    ctx.fillStyle = g;
                    break;
                }
                case 2: {
                    const p = command.fields[0].fields[0];
                    ctx.fillStyle = p;
                    break;
                }
                default: {
                    const s = command.fields[0].fields[0];
                    ctx.fillStyle = s;
                }
            }
            break;
        }
        case 26: {
            const c_1 = command.fields[0];
            ctx.strokeStyle = c_1;
            break;
        }
        case 27: {
            const a = command.fields[0];
            ctx.globalAlpha = max(0, min(a, 1));
            break;
        }
        case 29: {
            switch (command.fields[0].tag) {
                case 1: {
                    const g_1 = command.fields[0].fields[0];
                    ctx.strokeStyle = g_1;
                    break;
                }
                case 2: {
                    const p_1 = command.fields[0].fields[0];
                    ctx.strokeStyle = p_1;
                    break;
                }
                default: {
                    const s_1 = command.fields[0].fields[0];
                    ctx.strokeStyle = s_1;
                }
            }
            break;
        }
        case 30: {
            const x_7 = command.fields[0];
            const y = command.fields[1];
            ctx.moveTo(x_7, y);
            break;
        }
        case 31: {
            const x_8 = command.fields[0];
            const y_1 = command.fields[1];
            ctx.lineTo(x_8, y_1);
            break;
        }
        case 32: {
            const r = command.fields[4];
            const x1 = command.fields[0];
            const x2 = command.fields[2];
            const y1 = command.fields[1];
            const y2 = command.fields[3];
            ctx.arcTo(x1, y1, x2, y2, r);
            break;
        }
        case 33: {
            const acw = command.fields[5];
            const endAngle = command.fields[4];
            const r_1 = command.fields[2];
            const startAngle = command.fields[3];
            const x_9 = command.fields[0];
            const y_2 = command.fields[1];
            ctx.arc(x_9, y_2, r_1, startAngle, endAngle, acw);
            break;
        }
        case 34: {
            const a_1 = command.fields[0];
            ctx.rotate(a_1);
            break;
        }
        case 13: {
            const a_2 = command.fields[0];
            ctx.textAlign = a_2;
            break;
        }
        case 14: {
            const a_3 = command.fields[0];
            ctx.textBaseline = a_3;
            break;
        }
        case 35: {
            const x_10 = command.fields[0];
            const y_3 = command.fields[1];
            ctx.translate(x_10, y_3);
            break;
        }
        case 36: {
            const dx = command.fields[4];
            const dy = command.fields[5];
            const m11 = command.fields[0];
            const m12 = command.fields[1];
            const m21 = command.fields[2];
            const m22 = command.fields[3];
            ctx.transform(m11, m12, m21, m22, dx, dy);
            break;
        }
        case 37: {
            const x_11 = command.fields[0];
            const y_4 = command.fields[1];
            ctx.scale(x_11, y_4);
            break;
        }
        case 38: {
            const name = command.fields[0];
            ctx.font = name;
            break;
        }
        case 39: {
            const h_1 = command.fields[3];
            const w_1 = command.fields[2];
            const x_12 = command.fields[0];
            const y_5 = command.fields[1];
            ctx.rect(x_12, y_5, w_1, h_1);
            break;
        }
        case 40: {
            const h_2 = command.fields[3];
            const w_2 = command.fields[2];
            const x_13 = command.fields[0];
            const y_6 = command.fields[1];
            ctx.clearRect(x_13, y_6, w_2, h_2);
            break;
        }
        case 41: {
            const h_3 = command.fields[3];
            const w_3 = command.fields[2];
            const x_14 = command.fields[0];
            const y_7 = command.fields[1];
            ctx.fillRect(x_14, y_7, w_3, h_3);
            break;
        }
        case 42: {
            const h_4 = command.fields[3];
            const w_4 = command.fields[2];
            const x_15 = command.fields[0];
            const y_8 = command.fields[1];
            ctx.strokeRect(x_15, y_8, w_4, h_4);
            break;
        }
        case 43: {
            const maxw = command.fields[3];
            const text = command.fields[0];
            const x_16 = command.fields[1];
            const y_9 = command.fields[2];
            if (maxw != null) {
                const mw = maxw;
                ctx.fillText(text, x_16, y_9, mw);
            }
            else {
                ctx.fillText(text, x_16, y_9);
            }
            break;
        }
        case 44: {
            const maxw_1 = command.fields[3];
            const text_1 = command.fields[0];
            const x_17 = command.fields[1];
            const y_10 = command.fields[2];
            if (maxw_1 != null) {
                const mw_1 = maxw_1;
                ctx.strokeText(text_1, x_17, y_10, mw_1);
            }
            else {
                ctx.strokeText(text_1, x_17, y_10);
            }
            break;
        }
        default: {
            const h = command.fields[1];
            const w = command.fields[0];
            ctx.canvas.width = w;
            ctx.canvas.height = h;
        }
    }
}

export function translateTurtle(turtle, cmd) {
    const strokePathFirst = (cmd_1) => delay(() => append((turtle.LineCount > 0) ? append(singleton(new CanvasCommand(12, [])), delay(() => {
        turtle.LineCount = 0;
        return empty();
    })) : empty(), delay(() => singleton(cmd_1))));
    return delay(() => {
        switch (cmd.tag) {
            case 1: {
                turtle.IsPenDown = true;
                return empty();
            }
            case 2:
                return singleton(new CanvasCommand(8, []));
            case 3:
                return strokePathFirst(new CanvasCommand(9, []));
            case 11: {
                const n = cmd.fields[0];
                return append(((turtle.LineCount === 0) && turtle.IsPenDown) ? append(singleton(new CanvasCommand(10, [])), delay(() => singleton(new CanvasCommand(30, [0, 0])))) : empty(), delay(() => append(singleton(turtle.IsPenDown ? (new CanvasCommand(31, [n, 0])) : (new CanvasCommand(30, [n, 0]))), delay(() => append(singleton(new CanvasCommand(35, [n, 0])), delay(() => {
                    if (turtle.IsPenDown) {
                        turtle.LineCount = ((turtle.LineCount + 1) | 0);
                        return empty();
                    }
                    else {
                        return empty();
                    }
                }))))));
            }
            case 12: {
                const a = cmd.fields[0];
                return singleton(new CanvasCommand(34, [(a * Math.PI) / 180]));
            }
            case 4: {
                const c = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(26, [c]));
            }
            case 5: {
                const x = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(2, [x]));
            }
            case 6: {
                const x_1 = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(3, [x_1]));
            }
            case 7: {
                const x_2 = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(7, [x_2]));
            }
            case 8: {
                const x_3 = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(4, [x_3]));
            }
            case 9: {
                const x_4 = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(5, [x_4]));
            }
            case 10: {
                const x_5 = cmd.fields[0];
                return strokePathFirst(new CanvasCommand(6, [x_5]));
            }
            default: {
                turtle.IsPenDown = false;
                return empty();
            }
        }
    });
}

export function translate(turtle, commands) {
    const tr = (turtle_1, commands_1) => delay(() => collect((cmd) => {
        const matchValue = cmd;
        switch (matchValue.tag) {
            case 2: {
                const cmds = matchValue.fields[0];
                return tr(turtle_1, cmds);
            }
            case 1: {
                const t = matchValue.fields[0];
                return translateTurtle(turtle_1, t);
            }
            default: {
                const c = matchValue.fields[0];
                return singleton(c);
            }
        }
    }, commands_1));
    return delay(() => append(tr(turtle, commands), delay(() => ((turtle.LineCount > 0) ? singleton(new CanvasCommand(12, [])) : empty()))));
}

export function runCommands(turtle, ctx, commands) {
    const enumerator = getEnumerator(translate(turtle, commands));
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const cmd = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            runCommand(turtle, ctx, cmd);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

export class Redraw extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Drawing", "DrawFunction"];
    }
}

export function Redraw_$reflection() {
    return union_type("Fable.React.DrawingCanvas.Redraw", [], Redraw, () => [[["Item", lambda_type(unit_type, list_type(DrawCommand_$reflection()))]], [["Item", lambda_type(class_type("Browser.Types.CanvasRenderingContext2D"), unit_type)]]]);
}

export class DrawingCanvasProps extends Record {
    constructor(Props, Redraw) {
        super();
        this.Props = Props;
        this.Redraw = Redraw;
    }
}

export function DrawingCanvasProps_$reflection() {
    return record_type("Fable.React.DrawingCanvas.DrawingCanvasProps", [], DrawingCanvasProps, () => [["Props", class_type("System.Collections.Generic.IEnumerable`1", [class_type("Fable.React.Props.IHTMLProp")])], ["Redraw", Redraw_$reflection()]]);
}

export function makeTurtle() {
    return new TurtleState(false, 0);
}

export function resize(ctx) {
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;
}

export function runDrawing(ctx, drawing) {
    resize(ctx);
    const commands = drawing();
    runCommands(makeTurtle(), ctx, commands);
}

export class DrawingCanvas extends Component {
    constructor(initialProps) {
        super(initialProps);
        this.self = (new FSharpRef(defaultOf()));
        this.self.contents = this;
        this.canvasElement = undefined;
        this["init@432"] = 1;
    }
    render() {
        const this$ = this;
        const props = toList(delay(() => append(singleton(new Prop(1, [(e) => {
            DrawingCanvas__setRef_Z5966C024(this$, e);
        }])), delay(() => (this$.props).Props))));
        const children = Array.prototype.concat(this$.props.children || []);
        return react.createElement("canvas", keyValueList(props, 1), ...children);
    }
    componentDidMount() {
        const this$ = this;
        DrawingCanvas__drawNow(this$);
    }
    componentDidUpdate(p, s) {
        const this$ = this;
        DrawingCanvas__drawNow(this$);
    }
}

export function DrawingCanvas_$reflection() {
    return class_type("Fable.React.DrawingCanvas.DrawingCanvas", undefined, DrawingCanvas, class_type("Fable.React.Component`2", [DrawingCanvasProps_$reflection(), obj_type], Component));
}

export function DrawingCanvas_$ctor_Z7056CB58(initialProps) {
    return new DrawingCanvas(initialProps);
}

export function DrawingCanvas__setRef_Z5966C024(this$, e) {
    let matchValue, ce;
    this$.canvasElement = ((matchValue = e, equals(matchValue, defaultOf()) ? undefined : ((ce = matchValue, ce))));
}

export function DrawingCanvas__drawNow(this$) {
    map((ce) => {
        const ctx = ce.getContext('2d');
        const matchValue = (this$.self.contents.props).Redraw;
        if (matchValue.tag === 1) {
            const f = matchValue.fields[0];
            f(ctx);
        }
        else {
            const d = matchValue.fields[0];
            runDrawing(ctx, d);
        }
    }, this$.canvasElement);
}

export function drawingcanvas(props) {
    return react.createElement(DrawingCanvas, props);
}

export class Builder_BuilderVariant extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Regular", "SaveRestore", "FillPath", "StrokePath"];
    }
}

export function Builder_BuilderVariant_$reflection() {
    return union_type("Fable.React.DrawingCanvas.Builder.BuilderVariant", [], Builder_BuilderVariant, () => [[], [], [], []]);
}

export class Builder_DrawCommandBuilder {
    constructor(variant) {
        this.variant = variant;
    }
}

export function Builder_DrawCommandBuilder_$reflection() {
    return class_type("Fable.React.DrawingCanvas.Builder.DrawCommandBuilder", undefined, Builder_DrawCommandBuilder);
}

export function Builder_DrawCommandBuilder_$ctor_Z1F77D269(variant) {
    return new Builder_DrawCommandBuilder(variant);
}

export function Builder_DrawCommandBuilder__Delay_FCFD9EF(_, funcToDelay) {
    const delayed = funcToDelay;
    return delayed;
}

export function Builder_DrawCommandBuilder__Yield_1505(_, _arg) {
    return empty_1();
}

export function Builder_DrawCommandBuilder__Run_3A967661(_, funcToRun) {
    return () => {
        const result = funcToRun();
        const matchValue = _.variant;
        return (matchValue.tag === 1) ? append_1(cons(new DrawCommand(0, [new CanvasCommand(8, [])]), result), singleton_1(new DrawCommand(0, [new CanvasCommand(9, [])]))) : ((matchValue.tag === 2) ? append_1(cons(new DrawCommand(0, [new CanvasCommand(10, [])]), result), singleton_1(new DrawCommand(0, [new CanvasCommand(11, [])]))) : ((matchValue.tag === 3) ? append_1(cons(new DrawCommand(0, [new CanvasCommand(10, [])]), result), singleton_1(new DrawCommand(0, [new CanvasCommand(12, [])]))) : result));
    };
}

export function Builder_DrawCommandBuilder__Resize_CA00DEB(_, state, w, h) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(0, [w, h]));
}

export function Builder_DrawCommandBuilder__RotateStrokeHue_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(2, [x]));
}

export function Builder_DrawCommandBuilder__RotateFillHue_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(1, [x]));
}

export function Builder_DrawCommandBuilder__IncreaseLineWidth_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(3, [x]));
}

export function Builder_DrawCommandBuilder__IncreaseStrokeRed_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(4, [x]));
}

export function Builder_DrawCommandBuilder__IncreaseStrokeBlue_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(6, [x]));
}

export function Builder_DrawCommandBuilder__IncreaseStrokeGreen_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(5, [x]));
}

export function Builder_DrawCommandBuilder__GlobalAlpha_6759F0D0(_, state, x) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(27, [x]));
}

export function Builder_DrawCommandBuilder__Save_1BD268B(_, state) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(8, []));
}

export function Builder_DrawCommandBuilder__Restore_1BD268B(_, state) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(9, []));
}

export function Builder_DrawCommandBuilder__BeginPath_1BD268B(_, state) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(10, []));
}

export function Builder_DrawCommandBuilder__Fill_1BD268B(_, state) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(11, []));
}

export function Builder_DrawCommandBuilder__Stroke_1BD268B(_, state) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(12, []));
}

export function Builder_DrawCommandBuilder__LineWidth_6759F0D0(_, state, w) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(15, [w]));
}

export function Builder_DrawCommandBuilder__LineJoin_Z4B7D7430(_, state, style) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(18, [style]));
}

export function Builder_DrawCommandBuilder__LineCap_Z4B7D7430(_, state, style) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(16, [style]));
}

export function Builder_DrawCommandBuilder__LineDashOffset_6759F0D0(_, state, offset) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(17, [offset]));
}

export function Builder_DrawCommandBuilder__ShadowBlur_6759F0D0(_, state, amount) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(19, [amount]));
}

export function Builder_DrawCommandBuilder__ShadowColor_Z4B7D7430(_, state, color) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(20, [color]));
}

export function Builder_DrawCommandBuilder__ShadowOffsetX_6759F0D0(_, state, offset) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(21, [offset]));
}

export function Builder_DrawCommandBuilder__ShadowOffsetY_6759F0D0(_, state, offset) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(22, [offset]));
}

export function Builder_DrawCommandBuilder__TextAlign_Z4B7D7430(_, state, a) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(13, [a]));
}

export function Builder_DrawCommandBuilder__TextBaseline_Z4B7D7430(_, state, a) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(14, [a]));
}

export function Builder_DrawCommandBuilder__MiterLimit_6759F0D0(_, state, n) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(23, [n]));
}

export function Builder_DrawCommandBuilder__SetLineDash_6BCE73DB(_, state, segments) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(24, [segments]));
}

export function Builder_DrawCommandBuilder__FillColor_Z4B7D7430(_, state, color) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(28, [new DrawStyle(0, [color])]));
}

export function Builder_DrawCommandBuilder__FillStyle_Z3D999E6E(_, state, style) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(28, [style]));
}

export function Builder_DrawCommandBuilder__StrokeColor_Z4B7D7430(_, state, color) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(29, [new DrawStyle(0, [color])]));
}

export function Builder_DrawCommandBuilder__StrokeStyle_Z3D999E6E(_, state, style) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(29, [style]));
}

export function Builder_DrawCommandBuilder__MoveTo_CA00DEB(_, state, x, y) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(30, [x, y]));
}

export function Builder_DrawCommandBuilder__LineTo_CA00DEB(_, state, x, y) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(31, [x, y]));
}

export function Builder_DrawCommandBuilder__ArcTo_Z2C90FE70(_, state, x1, y1, x2, y2, r) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(32, [x1, y1, x2, y2, r]));
}

export function Builder_DrawCommandBuilder__Arc_Z5EF3FE86(_, state, x, y, r, startAngle, endAngle, acw) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(33, [x, y, r, startAngle, endAngle, acw]));
}

export function Builder_DrawCommandBuilder__Rotate_6759F0D0(_, state, a) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(34, [a]));
}

export function Builder_DrawCommandBuilder__Transform_1F7734AB(_, state, m11, m12, m21, m22, dx, dy) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(36, [m11, m12, m21, m22, dx, dy]));
}

export function Builder_DrawCommandBuilder__Translate_CA00DEB(_, state, x, y) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(35, [x, y]));
}

export function Builder_DrawCommandBuilder__Scale_CA00DEB(_, state, x, y) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(37, [x, y]));
}

export function Builder_DrawCommandBuilder__Font_Z4B7D7430(_, state, name) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(38, [name]));
}

export function Builder_DrawCommandBuilder__ClearRect_Z7014A2B5(_, state, x, y, w, h) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(40, [x, y, w, h]));
}

export function Builder_DrawCommandBuilder__Rect_Z7014A2B5(_, state, x, y, w, h) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(39, [x, y, w, h]));
}

export function Builder_DrawCommandBuilder__FillRect_Z7014A2B5(_, state, x, y, w, h) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(41, [x, y, w, h]));
}

export function Builder_DrawCommandBuilder__StrokeRect_Z7014A2B5(_, state, x, y, w, h) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(42, [x, y, w, h]));
}

export function Builder_DrawCommandBuilder__FillText_26895408(_, state, text, x, y, maxw) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(43, [text, x, y, maxw]));
}

export function Builder_DrawCommandBuilder__StrokeText_26895408(_, state, text, x, y, maxw) {
    return Builder_DrawCommandBuilder__append(_, state, new CanvasCommand(44, [text, x, y, maxw]));
}

export function Builder_DrawCommandBuilder__Sub_3F7818A(_, state, drawing) {
    return append_1(state, drawing());
}

export function Builder_DrawCommandBuilder__Repeat_6FB13E75(_, state, col, f) {
    let result = state;
    const enumerator = getEnumerator(col);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const d = curry2(f)(x);
            result = append_1(result, d());
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return result;
}

export function Builder_DrawCommandBuilder__IfThen_Z3812ECC0(_, state, cond, succ) {
    if (cond) {
        return append_1(state, succ());
    }
    else {
        return state;
    }
}

export function Builder_DrawCommandBuilder__IfThenElse_ZE6F2DF(_, state, cond, succ, fail) {
    if (cond) {
        return append_1(state, succ());
    }
    else {
        return append_1(state, fail());
    }
}

export function Builder_DrawCommandBuilder__append(this$, xs, x) {
    return append_1(xs, singleton_1(new DrawCommand(0, [x])));
}

export const Builder_drawing = Builder_DrawCommandBuilder_$ctor_Z1F77D269(new Builder_BuilderVariant(0, []));

export const Builder_fillpath = Builder_DrawCommandBuilder_$ctor_Z1F77D269(new Builder_BuilderVariant(2, []));

export const Builder_strokepath = Builder_DrawCommandBuilder_$ctor_Z1F77D269(new Builder_BuilderVariant(3, []));

export const Builder_preserve = Builder_DrawCommandBuilder_$ctor_Z1F77D269(new Builder_BuilderVariant(1, []));

export function ListHelpers_loop(coll, fn) {
    return new DrawCommand(2, [collect_1(fn, coll)]);
}

export function ListHelpers_ifThen(cond, succ) {
    return new DrawCommand(2, [cond ? succ.Value : empty_1()]);
}

export function ListHelpers_ifThenElse(cond, succ, fail) {
    return new DrawCommand(2, [cond ? succ.Value : fail.Value]);
}

export function ListHelpers_preserve(drawing) {
    return append_1(cons(new DrawCommand(0, [new CanvasCommand(8, [])]), drawing), singleton_1(new DrawCommand(0, [new CanvasCommand(9, [])])));
}

export function ListHelpers_fillpath(drawing) {
    return append_1(cons(new DrawCommand(0, [new CanvasCommand(10, [])]), drawing), singleton_1(new DrawCommand(0, [new CanvasCommand(11, [])])));
}

export function ListHelpers_strokepath(drawing) {
    return append_1(cons(new DrawCommand(0, [new CanvasCommand(10, [])]), drawing), singleton_1(new DrawCommand(0, [new CanvasCommand(12, [])])));
}

export class Turtle_TurtleBuilder {
    constructor() {
    }
}

export function Turtle_TurtleBuilder_$reflection() {
    return class_type("Fable.React.DrawingCanvas.Turtle.TurtleBuilder", undefined, Turtle_TurtleBuilder);
}

export function Turtle_TurtleBuilder_$ctor() {
    return new Turtle_TurtleBuilder();
}

export function Turtle_TurtleBuilder__Delay_FCFD9EF(_, funcToDelay) {
    const delayed = funcToDelay;
    return delayed;
}

export function Turtle_TurtleBuilder__Yield_1505(_, _arg) {
    return empty_1();
}

export function Turtle_TurtleBuilder__Run_3A967661(_, funcToRun) {
    return () => {
        const drawing = funcToRun();
        return drawing;
    };
}

export function Turtle_TurtleBuilder__Forward_6759F0D0(_, state, d) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(11, [d]));
}

export function Turtle_TurtleBuilder__Turn_6759F0D0(_, state, a) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(12, [a]));
}

export function Turtle_TurtleBuilder__PenUp_1BD268B(_, state) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(0, []));
}

export function Turtle_TurtleBuilder__PenDown_1BD268B(_, state) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(1, []));
}

export function Turtle_TurtleBuilder__PenColor_Z4B7D7430(_, state, c) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(4, [c]));
}

export function Turtle_TurtleBuilder__RotateHue_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(5, [x]));
}

export function Turtle_TurtleBuilder__IncreaseWidth_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(6, [x]));
}

export function Turtle_TurtleBuilder__IncreaseAlpha_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(7, [x]));
}

export function Turtle_TurtleBuilder__IncreaseRed_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(8, [x]));
}

export function Turtle_TurtleBuilder__IncreaseGreen_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(9, [x]));
}

export function Turtle_TurtleBuilder__IncreaseBlue_6759F0D0(_, state, x) {
    return Turtle_TurtleBuilder__append(_, state, new TurtleCommand(10, [x]));
}

export function Turtle_TurtleBuilder__Sub_3F7818A(_, state, drawing) {
    return Turtle_TurtleBuilder__appendSub(_, state, drawing());
}

export function Turtle_TurtleBuilder__Repeat_6FB13E75(_, state, col, f) {
    let x_1;
    let result = state;
    const enumerator = getEnumerator(col);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            const d = curry2(f)(x);
            result = ((x_1 = d(), Turtle_TurtleBuilder__appendSub(_, result, x_1)));
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    return result;
}

export function Turtle_TurtleBuilder__IfThen_Z3812ECC0(_, state, cond, succ) {
    if (cond) {
        return Turtle_TurtleBuilder__appendSub(_, state, succ());
    }
    else {
        return state;
    }
}

export function Turtle_TurtleBuilder__IfThenElse_ZE6F2DF(_, state, cond, succ, fail) {
    if (cond) {
        return Turtle_TurtleBuilder__appendSub(_, state, succ());
    }
    else {
        return Turtle_TurtleBuilder__appendSub(_, state, fail());
    }
}

export function Turtle_TurtleBuilder__append(this$, xs, x) {
    return append_1(xs, singleton_1(new DrawCommand(1, [x])));
}

export function Turtle_TurtleBuilder__appendSub(this$, xs, x) {
    return append_1(xs, singleton_1(new DrawCommand(2, [x])));
}

export const Turtle_turtle = Turtle_TurtleBuilder_$ctor();

