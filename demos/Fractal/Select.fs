module SelectForCustomTypes

open Fable.React
open Fable.React.Props
open Fulma

//
// Alfonso's code as posted into a github issue
// https://github.com/Fulma/Fulma/issues/215
//
module private SelectHelpers =
    let toStringWithOptional toString x =
        match x, toString with
        | None, _ -> "Not selected"
        | Some x, Some f -> f x
        | Some x, None -> x.ToString()

    let renderSelect fulmaOptions toString options value dispatch =
        let findIndex value =
            options
            |> List.tryFindIndex ((=) value)
            |> Option.defaultValue 0

        let optionEls =
            options
            |> List.mapi (fun i x -> option [Value (string i)] [toString x |> str])

        Select.select (defaultArg fulmaOptions [])
            [ select [ Value(findIndex value)
                       OnChange (fun ev ->
                        let i = int ev.Value
                        List.item i options |> dispatch) ]
                     optionEls ]

open SelectHelpers

type SelectForCustomTypes =
    static member Render(options : 'T list, value : 'T, dispatch : 'T -> unit,
                         ?toString : 'T -> string, ?fulmaOptions) =
        let toString = defaultArg toString (fun x -> x.ToString())
        renderSelect fulmaOptions toString options value dispatch

    static member RenderOptional(options : 'T list, value : 'T option, dispatch : 'T option -> unit,
                                 ?toString: 'T -> string, ?fulmaOptions) =
        let options = None::(options |> List.map Some)
        renderSelect fulmaOptions (toStringWithOptional toString) options value dispatch
