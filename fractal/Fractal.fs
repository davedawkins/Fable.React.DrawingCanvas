module Fractal

open Elmish
open Fable.React
open Fable.React.Props
open DrawingCanvas
open Fable.Core
open Fulma

type Model = { Detail : int }

type Msg =
    | SetDetail of int

let init() = { Detail = 0 }, Cmd.none

let update msg model =
    match msg with
    | SetDetail n -> { model with Detail = max (min n 6) 0 }, Cmd.none

let drawFractal detail =
    let deg n = System.Math.PI * n / 180.0

    let rec fractalLine len d =
        drawing {
            ifThenElse (d = 0)
                (lazy drawing {
                    lineTo len 0.0
                    translate len 0.0
                })
                (lazy
                    let s = fractalLine (len / 3.0) (d-1)
                    drawing {
                     sub s
                     rotate (deg -60.0)
                     sub s
                     rotate (deg 120.0)
                     sub s
                     rotate (deg -60.0)
                     sub s
                })
        }
    drawing {
        resize 400.0 400.0
        fillRect 0.0 0.0 400.0 400.0
        translate 200.0 25.0
        scale 1.0 1.0
        strokeStyle (U3.Case1 "white")
        fillStyle   (U3.Case1 "black")

        beginPath
        moveTo 0.0 0.0

        rotate (deg 60.0)
        sub (fractalLine 300.0 detail)
        rotate (deg 120.0)
        sub (fractalLine 300.0 detail)
        rotate (deg 120.0)
        sub (fractalLine 300.0 detail)
        stroke
    }

let view model dispatch =
    div [ Style [ MarginLeft "Auto"; MarginRight "Auto"; Width "400px"; MarginTop "48px"] ] [
        Heading.h5 [] [ str "Koch Snowflake" ]
        drawingcanvas {
            Props = [ ]
            Redraw = Drawing (drawFractal model.Detail)
        }
        Label.label [] [ str "Detail:" ]
        Field.div [ Field.HasAddonsRight ] [
                Input.text [ Input.Value (sprintf "%d" model.Detail); Input.IsReadOnly true]
                Button.button [ Button.Props [ OnClick (fun _ -> (model.Detail - 1) |> SetDetail |> dispatch) ] ] [str "-"]
                Button.button [ Button.Props [ OnClick (fun _ -> (model.Detail + 1) |> SetDetail |> dispatch) ] ] [str "+"]
        ]
    ]

open Elmish.React

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
