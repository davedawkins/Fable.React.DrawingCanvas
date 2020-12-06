module Fractal

open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle
open Fable.Core
open Fulma

type Model = { Detail: int }

type Msg = SetDetail of int

let init () = { Detail = 0 }, Cmd.none

let update msg model =
    match msg with
    | SetDetail n -> { model with Detail = max (min n 6) 0 }, Cmd.none

let drawFractal detail =
    let rec fractalLine len d =
        turtle {
            ifThenElse
                (d = 0)
                (lazy (turtle {
                        forward len
                     }))
                (lazy
                    (let s = fractalLine (len / 3.0) (d - 1)
                     turtle {
                         insert s
                         turn -60.0
                         insert s
                         turn 120.0
                         insert s
                         turn -60.0
                         insert s
                     }))
        }

    turtle {
        penUp
        forward 200.0
        turn 90.0
        forward 25.0
        turn -90.0
        penColor "white"
        penDown
        turn 60.0
        insert (fractalLine 300.0 detail)
        turn 120.0
        insert (fractalLine 300.0 detail)
        turn 120.0
        insert (fractalLine 300.0 detail)
    }

let view model dispatch =
    div [ Style [ MarginLeft "Auto"
                  MarginRight "Auto"
                  Width "400px"
                  MarginTop "48px" ] ] [
        Heading.h5 [] [ str "Koch Snowflake" ]
        drawingcanvas
            { Props = [ Style [ Background "black"; Width 400; Height 400 ] ]
              Redraw = Drawing(drawFractal model.Detail) }
        Label.label [] [ str "Detail:" ]
        Field.div [ Field.HasAddonsRight ] [
            Input.text [ Input.Value(sprintf "%d" model.Detail)
                         Input.IsReadOnly true ]
            Button.button [ Button.Props [ OnClick(fun _ -> (model.Detail - 1) |> SetDetail |> dispatch) ] ] [
                str "-"
            ]
            Button.button [ Button.Props [ OnClick(fun _ -> (model.Detail + 1) |> SetDetail |> dispatch) ] ] [
                str "+"
            ]
        ]
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            str "Built with "
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas" ] [str "Fable.React.DrawingCanvas" ]
        ]
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/fractal" ] [str "Source" ]
        ]
    ]

open Elmish.React

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
