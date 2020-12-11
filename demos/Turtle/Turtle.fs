module Turtle

open System
open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle
open Fulma
open SelectForCustomTypes
open Browser.Dom
open System.Collections.Generic

type LazyDrawing = unit -> Drawing

type TickId = float option

type Model = {
    Color: string;
    Tick: TickId
    UserDrawing : LazyDrawing option
    Input : string
    }

type Msg =
    | SetColor of string
    | Tick
    | SetTickId of TickId
    | Run of string
    | SetInput of string


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
    { Color = "#00FF00"; Tick = None; UserDrawing = None; Input = "" }, Cmd.ofSub startTicking

let update msg model =
    match msg with
    | SetColor c -> { model with Color = c }, Cmd.ofSub (stopTicking model.Tick)
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
    | Run s ->
        { model with UserDrawing = TurtleParser.generate s model.Color }, Cmd.none

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

let drawTurtle model color =
    match model.Input with
    | "" -> drawSpirals color
    | source ->
        match (TurtleParser.generate source model.Color) with
        | None -> drawSpirals color
        | Some d -> d

let log e =
    console.log(e)

let example = """clear "#333333"

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
}
"""

let example2 = """clear "#333333"

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
}
"""

let view model dispatch =
    Container.container [ Container.Props [ Style [MarginTop "48px" ]] ]
        [
            Columns.columns [ Columns.IsCentered ] [
                Column.column [  Column.Width (Screen.All, Column.IsFourFifths) ] [
                    Heading.h5 [] [
                        str "Turtle Graphics with DrawingCanvas"
                    ]
                ]
            ]
            Columns.columns [ Columns.IsCentered ] [
                Column.column [  Column.Width (Screen.All, Column.IsTwoFifths) ] [
                    Textarea.textarea [
                        Textarea.Props [
                            Value model.Input
                            OnChange (fun e -> e.Value |> SetInput |> dispatch )
                            OnKeyDown (fun e -> if e.key = "Enter" && e.altKey then model.Input |> Run |> dispatch)
                            Style [Height 500]
                        ] ] []

                    Button.button [ Button.Props [
                        OnClick (fun _ -> model.Input |> Run |> dispatch)
                        Style [ MarginTop 12 ]]]
                        [ str "Run" ]

                    Button.button [ Button.Props [
                        OnClick (fun _ ->
                            example2 |> SetInput |> dispatch;
                            example2 |> Run |> dispatch
                            )
                        Style [ MarginTop 12 ]]]
                        [ str "Square Spirals" ]

                    Button.button [ Button.Props [
                        OnClick (fun _ ->
                            example |> SetInput |> dispatch;
                            example |> Run |> dispatch
                            )
                        Style [ MarginTop 12 ]]]
                        [ str "Circular Spirals" ]

                    Text.p [ Props [ Style [ FontSize "60%"; MarginTop "12px" ] ] ] [
                        pre [] [
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
                Column.column [ Column.Width (Screen.All, Column.IsTwoFifths) ] [
                    drawingcanvas
                        { Props =
                              [ Style [ Background "#333333"
                                        Width 500
                                        Height 500 ] ]
                          Redraw = model.Color |> drawTurtle model |> Drawing }
                    Label.label [] [
                        str "Select base colour"
                    ]
                    Field.div [] [
                        Input.color [ Input.Value(model.Color)
                                      Input.Props [ OnChange(fun e -> e.Value |> SetColor |> dispatch) ] ]
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
