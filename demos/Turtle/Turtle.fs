module Turtle

open System
open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle
open Fulma
open SelectForCustomTypes

type Model = {
    Color: string
}

type Msg =
    | SetColor of string

let init () = { Color = "#00FF00" }, Cmd.none

let update msg model =
    match msg with
    | SetColor c -> { model with Color = c }, Cmd.none


// See original version of this demo for Elm here:
// https://github.com/mrdimosthenis/turtle-graphics/blob/master/examples/SquareSpiral.elm

let rec iter n dist =
    turtle {
        turn 89.5
        forward dist
        rotateHue 0.002
        increaseWidth 0.02
        increaseAlpha -0.005
        ifThen (n > 0)
            (iter (n-1) (dist + 2.5))
    }

let drawTurtle color =
    turtle {
        forward 250.0
        turn 90.0
        forward 250.0

        penDown
        penColor color

        sub (iter 200 1.0)
    }

let view model dispatch =
    div [ Style [ MarginLeft "Auto"
                  MarginRight "Auto"
                  Width "500px"
                  MarginTop "48px" ] ] [
        Heading.h5 [] [
            str "Turtle Graphics with DrawingCanvas"
            ]
        drawingcanvas
            { Props = [ Style [ Background "#333333"; Width 500; Height 500 ] ]
              Redraw = model.Color |> drawTurtle |> Drawing }
        Label.label [] [ str "Select base colour" ]
        Field.div [ ] [
            Input.color [
                Input.Value (model.Color)
                Input.Props [ OnChange (fun e -> e.Value |> SetColor |> dispatch) ]
            ]
        ]
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            str "Built with "
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas" ] [str "Fable.React.DrawingCanvas" ]
        ]
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/demos/Turtle/Turtle.fs" ] [str "Source" ]
        ]
    ]

open Elmish.React
open Elmish.HMR

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
