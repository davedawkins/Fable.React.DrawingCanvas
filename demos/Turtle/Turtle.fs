module Turtle

open System
open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle
open Fulma
open Browser.Dom

type LazyDrawing = unit -> Drawing

type TickId = float option

type Model =
    { Color: string
      Tick: TickId
      UserDrawing: LazyDrawing option
      Input: string }

type Msg =
    | SetColor of string
    | Tick
    | SetTickId of TickId
    | Stop
    | Start
    | SetInput of string

module Examples =
    let circleSpiralsSource = """clear "#333333"

forward 250
turn 90
forward 250

penDown

let d = 1
repeat 600 {
       forward d
       turn 49.5
       let d = d + 0.5
       rotateHue 0.0004
       increaseWidth 0.02
       increaseAlpha -0.002
}"""

    let squareSpiralsSource = """clear "#333333"

forward 250
turn 90
forward 250

penDown

let d = 1
repeat 200 {
       forward d
       turn 89.5
       let d = d + 2.5
       rotateHue 0.002
       increaseWidth 0.02
       increaseAlpha -0.005
}"""

let startTick (ms: int) (handler: unit -> unit): TickId = Some <| window.setInterval (handler, ms)

let stopTick (id: TickId) =
    match id with
    | Some n -> window.clearInterval (n)
    | _ -> ()

let startTicking dispatch =
    let tickId = startTick 40 (fun _ -> Tick |> dispatch)
    dispatch (SetTickId tickId)

let stopTicking id dispatch =
    stopTick id
    dispatch (SetTickId None)

let init () =
    { Color = "#00FF00"
      Tick = None
      UserDrawing = None
      Input = Examples.squareSpiralsSource },
    Cmd.ofSub startTicking

let update msg model =
    match msg with
    | SetColor c -> { model with Color = c }, Cmd.ofMsg Stop
    | SetTickId id -> { model with Tick = id }, Cmd.none
    | SetInput s -> { model with Input = s }, Cmd.none
    | Tick ->
        { model with
              Color =
                  model.Color
                  |> ColorShift.hexToHsv
                  |> (ColorShift.rotateHue -0.005)
                  |> ColorShift.hsvToHex },
        Cmd.none
    //| Run s ->
    //    { model with UserDrawing = TurtleParser.generate s model.Color }, Cmd.none
    | Start -> model, Cmd.ofSub startTicking
    | Stop -> model, Cmd.ofSub (stopTicking model.Tick)

(*
// See original version of this demo for Elm here:
// https://github.com/mrdimosthenis/turtle-graphics/blob/master/examples/SquareSpiral.elm

let rec iter n dist =
    turtle {
        turn 89.5
        forward dist
        rotateHue 0.002
        increaseWidth 0.02
        increaseAlpha -0.005
        ifThen (n > 0) (iter (n - 1) (dist + 2.5))
    }

let drawSpirals color =
    turtle {
        forward 250.0
        turn 90.0
        forward 250.0

        penDown
        penColor color

        sub (iter 200 1.0)
    }
*)

open Fable.React.DrawingCanvas.Builder

let drawMessage msg color = drawing {
    fillColor "white"
    fillRect 0. 0. 500. 500.

    font "16px arial"
    fillColor color
    fillText msg 4.0 24.0 9999.0
}
let drawTurtle model color =
    let input = model.Input.Trim()
    match input with
    | "" -> drawMessage "Create your own drawing, or load an example to get started" "black"
    | _ ->
        match (TurtleParser.generate input model.Color) with
        // Error messages from crude parser are currently useless
        | TurtleParser.ParseResult.Error msg -> drawMessage "Oops! Not a turtle" "orange"
        | TurtleParser.ParseResult.Success d -> d

let log e = console.log (e)


let view model dispatch =
    let ifTick a b = if model.Tick.IsSome then a else b
    Container.container [ Container.Props [ Style [ MarginTop "48px" ] ] ] [
        Columns.columns [ Columns.IsCentered ] [
            Column.column [ Column.Width(Screen.All, Column.IsFourFifths) ] [
                Heading.h5 [] [
                    str "Turtle Graphics with DrawingCanvas"
                ]
            ]
        ]
        Columns.columns [ Columns.IsCentered ] [
            Column.column [ Column.Width(Screen.All, Column.IsTwoFifths) ] [
                Textarea.textarea [ Textarea.Props [ Value model.Input
                                                     OnChange(fun e -> e.Value |> SetInput |> dispatch)
                                                     OnKeyDown(fun e ->
                                                         if e.key = "Enter" && e.altKey then (ifTick Stop Start)
                                                                                             |> dispatch)
                                                     Style [ Height 500 ] ] ] []

                Button.button [ Button.Props [ OnClick(fun _ ->
                                                   Examples.squareSpiralsSource
                                                   |> SetInput
                                                   |> dispatch)
                                               Style [ MarginTop 12 ] ] ] [
                    str "Square Spirals"
                ]

                Button.button [ Button.Props [ OnClick(fun _ ->
                                                   Examples.circleSpiralsSource
                                                   |> SetInput
                                                   |> dispatch)
                                               Style [ MarginTop 12 ] ] ] [
                    str "Circular Spirals"
                ]

                Text.p [ Props [ Style [ FontSize "60%"
                                         MarginTop "12px" ] ] ] [
                    pre [] [
                        str "Alt-Enter (Option-Enter) to toggle animation\n\n"
                        str "Commands\n"
                        str "--------\n"
                        str "let <id> = <expr>\n"
                        str "penUp\n"
                        str "penDown\n"
                        str "penColor \"<color>\"\n"
                        str "clear  \"<color>\"\n"
                        str "forward <expr>\n"
                        str "turn <expr>\n"
                        str "increaseAlpha <expr>\n"
                        str "increaseWidth <expr>\n"
                        str "rotateHue <expr>\n"
                        str "repeat <expr> { <command-list> }"
                    ]
                ]
            ]
            Column.column [ Column.Width(Screen.All, Column.IsTwoFifths) ] [
                drawingcanvas
                    { Props =
                          [ Style [ Background "#333333"
                                    Width 500
                                    Height 500 ] ]
                      Redraw = model.Color |> drawTurtle model |> Drawing }
                //Label.label [] [
                //    str "Select base colour"
                //]
                Field.div [ Field.Props [ Style [ MarginTop 12] ]] [
                    Input.color [ Input.Value(model.Color)

                                  Input.Props [
                                      Style [ Width 150 ]
                                      OnChange(fun e -> e.Value |> SetColor |> dispatch)
                                      ] ]
                    Button.button [
                        Button.Props [
                            Style [ MarginLeft 12 ]
                            OnClick(fun _ -> (ifTick Stop Start) |> dispatch)
                             ] ]
                        [ (ifTick "Stop" "Start") |> str
                ]


                ]
                Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
                    str "Built with "
                    a [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas" ] [
                        str "Fable.React.DrawingCanvas"
                    ]
                ]
                Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
                    a [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/demos/Turtle/Turtle.fs" ] [
                        str "Source"
                    ]
                ]
            ]
        ]
    ]

open Elmish.React
open Elmish.HMR

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
