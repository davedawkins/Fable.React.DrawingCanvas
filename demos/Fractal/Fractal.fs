module Fractal

open System
open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle
open Fulma
open SelectForCustomTypes

// Host shape for various fractals
type Shape =
    | Triangle
    | Square


// https://en.wikipedia.org/wiki/L-system
//
type LindenmayerRule = {
    Shape: Shape
    Vars : string
    Start: string
    Production: (char -> string)
    Draw: (int -> int -> char -> (unit -> Drawing))
}

let sierpinksi len =
    let angle = 120.0
    {
    Shape = Triangle
    Vars = "FG"
    Start = "F-G-G"
    Production = (fun ch ->
        match ch with
            | 'F' -> "F-G+F+G-F"
            | 'G' -> "GG"
            | _ -> invalidOp "Invalid variable"
    )
    Draw =
        (fun depth maxDepth cmd ->
            match cmd with
                | x when x = 'F' || x = 'G' -> turtle { forward (len / (Math.Pow( 2.0, float depth))) }
                | '+' -> turtle { turn -angle}
                | '-' -> turtle { turn angle }
                | _ -> invalidOp (sprintf "Invalid command: '%c'" cmd)
        )
}

let koch len angle shape fproduction = {
    Shape = shape
    Vars = "F"
    Start = "F"
    Production = (fun _ -> fproduction)
    Draw =
        (fun depth maxDepth cmd ->
            match cmd with
                | 'F' -> turtle { forward (len / (Math.Pow( 3.0, float depth))) }
                | '+' -> turtle { turn -angle}
                | '-' -> turtle { turn angle }
                | _ -> invalidOp "Invalid command"
        )
}

let drawRule (rule : LindenmayerRule) maxDepth =
    let rec drawSequence (sequence:string) depth =
        turtle {
            repeat (sequence.ToCharArray()) (fun ch ->
                if (rule.Vars.IndexOf(ch) < 0 || depth = maxDepth) then
                    rule.Draw depth maxDepth ch // Not a var or we're at maxDepth
                else
                    drawSequence (rule.Production ch) (depth + 1)
            )
        }

    drawSequence rule.Start 0

type Fractal =
    | KochSnowflake
    | KochAntiSnowflake
    | Koch90
    | Sierpinski
    static member All = [KochSnowflake; KochAntiSnowflake; Koch90; Sierpinski ]
    member this.Rule() =
        match this with
        | KochSnowflake -> koch 300.0 60.0 Triangle "F+F--F+F"
        | KochAntiSnowflake -> koch 400.0 60.0 Triangle "F-F++F-F"
        | Koch90 -> koch 200.0 90.0 Square "F+F-F-F+F"
        | Sierpinski -> sierpinksi 400.0

type Model = {
    Detail: int
    Fractal: Fractal
}

type Msg =
    | SetDetail of int
    | UpdateFractal of Fractal

let init () = { Detail = 1; Fractal = KochSnowflake }, Cmd.none

let update msg model =
    match msg with
    | SetDetail n -> { model with Detail = max (min n 6) 0 }, Cmd.none
    | UpdateFractal f -> { model with Fractal = f }, Cmd.none

let drawTriangle rule detail =

    turtle {

        // Move to top of triangle
        penUp
        forward 250.0
        turn 90.0
        forward 75.0
        turn -30.0 // Pointing from top of triangle along right side

        penColor "white"
        penDown

        // Triangle
        repeat [1..3] (fun _ -> turtle {
            sub (drawRule rule detail)
            turn 120.0
        })
    }

let drawSquare rule detail =

    turtle {
        penUp
        forward 150.0
        turn 90.0
        forward 150.0
        turn -90.0

        penColor "white"
        penDown

        repeat [1..4] (fun _ -> turtle {
            sub (drawRule rule detail)
            turn 90.0
        })
    }

let drawFractal rule detail =
    match rule.Shape with
    | Triangle -> drawTriangle rule detail
    | Square -> drawSquare rule detail

let view model dispatch =
    div [ Style [ MarginLeft "Auto"
                  MarginRight "Auto"
                  Width "500px"
                  MarginTop "48px" ] ] [
        Heading.h5 [] [
            SelectForCustomTypes.Render(Fractal.All, model.Fractal, (UpdateFractal >> dispatch))
            ]
        drawingcanvas
            { Props = [ Style [ Background "black"; Width 500; Height 500 ] ]
              Redraw = Drawing(drawFractal (model.Fractal.Rule()) model.Detail) }
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
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/demos/Fractal/Fractal.fs" ] [str "Source" ]
        ]
    ]

open Elmish.React
open Elmish.HMR

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
