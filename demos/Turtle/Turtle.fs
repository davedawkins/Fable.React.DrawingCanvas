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
(*

https://github.com/mrdimosthenis/turtle-graphics/blob/master/examples/SquareSpiral.elm
https://github.com/mrdimosthenis/turtle-graphics


iter : Int -> Float -> List Command
iter n dist =
    case n of
        0 ->
            []

        _ ->
            iter (n - 1) (dist + 2.5)
                |> List.append
                    [ turn 89.5
                    , move dist
                    , rotateHue 0.002
                    , increaseAlpha -0.005
                    , increaseWidth 0.02
                    ]


main : Html.Html msg
main =
    iter 200 1.0
        |> branch
        |> List.singleton
        |> List.append
            [ increaseRed -1
            , increaseGreen 1
            , increaseBlue -1
            ]
        |> branch
        |> render Color.darkCharcoal

*)

let rec iter n dist = turtle {
    ifThen (n > 0) (turtle {
        turn 89.5
        forward dist
        rotateHue 0.002
        increaseWidth 0.02
        increaseAlpha -0.005
        sub (iter (n-1)(dist + 2.5))
    })
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
