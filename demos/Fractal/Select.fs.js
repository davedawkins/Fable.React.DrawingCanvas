import { some, defaultArg, value as value_3 } from "./fable_modules/fable-library-js.4.19.3/Option.js";
import { toString as toString_2 } from "./fable_modules/fable-library-js.4.19.3/Types.js";
import { cons, map, singleton, item, empty, mapIndexed, tryFindIndex } from "./fable_modules/fable-library-js.4.19.3/List.js";
import { int32ToString, equals } from "./fable_modules/fable-library-js.4.19.3/Util.js";
import { DOMAttr, HTMLAttr } from "./fable_modules/Fable.React.7.0.1/Fable.React.Props.fs.js";
import * as react from "react";
import { keyValueList } from "./fable_modules/fable-library-js.4.19.3/MapUtil.js";
import { select } from "./fable_modules/Fulma.2.10.0/Elements/Form/Select.fs.js";
import { parse } from "./fable_modules/fable-library-js.4.19.3/Int32.js";
import { Browser_Types_Event__Event_get_Value } from "./fable_modules/Fable.React.7.0.1/Fable.React.Extensions.fs.js";
import { class_type } from "./fable_modules/fable-library-js.4.19.3/Reflection.js";

function SelectHelpers_toStringWithOptional(toString, x) {
    if (x != null) {
        if (toString == null) {
            const x_2 = value_3(x);
            let copyOfStruct = x_2;
            return toString_2(copyOfStruct);
        }
        else {
            const f = toString;
            const x_1 = value_3(x);
            return f(x_1);
        }
    }
    else {
        return "Not selected";
    }
}

function SelectHelpers_renderSelect(fulmaOptions, toString, options, value, dispatch) {
    let props_2;
    const findIndex = (value_1) => defaultArg(tryFindIndex((y) => equals(value_1, y), options), 0);
    const optionEls = mapIndexed((i, x) => {
        const props = [new HTMLAttr(161, [int32ToString(i)])];
        const children = [toString(x)];
        return react.createElement("option", keyValueList(props, 1), ...children);
    }, options);
    return select(defaultArg(fulmaOptions, empty()), singleton((props_2 = [new HTMLAttr(161, [findIndex(value)]), new DOMAttr(9, [(ev) => {
        const i_1 = parse(Browser_Types_Event__Event_get_Value(ev), 511, false, 32) | 0;
        dispatch(item(i_1, options));
    }])], react.createElement("select", keyValueList(props_2, 1), ...optionEls))));
}

export class SelectForCustomTypes {
    constructor() {
    }
}

export function SelectForCustomTypes_$reflection() {
    return class_type("SelectForCustomTypes.SelectForCustomTypes", undefined, SelectForCustomTypes);
}

export function SelectForCustomTypes_Render_Z40BCBCC6(options, value, dispatch, toString, fulmaOptions) {
    const toString_1 = defaultArg(toString, (x) => {
        let copyOfStruct = x;
        return toString_2(copyOfStruct);
    });
    return SelectHelpers_renderSelect(fulmaOptions, toString_1, options, value, dispatch);
}

export function SelectForCustomTypes_RenderOptional_Z188B9F26(options, value, dispatch, toString, fulmaOptions) {
    const options_1 = cons(undefined, map(some, options));
    return SelectHelpers_renderSelect(fulmaOptions, (x) => SelectHelpers_toStringWithOptional(toString, x), options_1, value, dispatch);
}

