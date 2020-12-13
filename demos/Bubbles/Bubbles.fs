module Bubbles

open System
open Elmish
open Fable.React
open Fable.React.Props
open Fable.React.DrawingCanvas
open Fulma
open Browser.Types
open Fable.Core
open Browser.Dom

// https://davidwalsh.name/canvas-demos
// https://codepen.io/eltonkamami/pen/ECrKd

let particlesNum = 400
let            w = 500.0
let            h = 500.0
let       colors = ["#f35d4f"; "#f36849"; "#c0d988"; "#6ddaf1"; "#f1e85b"]

let rnd = System.Random()
let random() = rnd.NextDouble()

type Bubble = {
    mutable x : float
    mutable y : float
    rad : float
    rgba : string
    vx : float
    vy : float
}

let makeBubble() = {
    x  = round( random() * w)
    y  = round(  random() * h)
    rad = round( random() * 1.0) + 1.0
    rgba = colors.[  int (round( random() * 4.0)) ]
    vx = round(  random() * 3.0) - 1.5
    vy = round( random() * 3.0) - 1.5
}


let allBubbles = [ 1..particlesNum ] |> List.map (fun _ -> makeBubble())

// We only need to collide bubbles of the same color, so create list-per-color
let bubblesByColor = colors |> List.map (fun c -> allBubbles |> List.filter (fun b -> b.rgba = c))

// Avoid taking the sqrt
let sq x = x * x
let findDistanceSq (p1 : Bubble) (p2:Bubble) =
    ( sq(p2.x - p1.x)  + sq(p2.y - p1.y) )

let draw (ctx : CanvasRenderingContext2D) =
    ctx.canvas.width <- ctx.canvas.offsetWidth
    ctx.canvas.height <- ctx.canvas.offsetHeight
    ctx.clearRect(0.0, 0.0, w, h)
    ctx.globalCompositeOperation <- "lighter"
    ctx.lineWidth <- 0.5

    for bubbles in bubblesByColor do
        // Only collide bubbles of the same color
        for b1 in bubbles do
            let mutable factor = 1.0

            for b2 in bubbles do
               if ((findDistanceSq b1 b2) < 2500.0) then
                  ctx.strokeStyle <- U3.Case1 b1.rgba
                  ctx.beginPath()
                  ctx.moveTo(b1.x, b1.y)
                  ctx.lineTo(b2.x, b2.y)
                  ctx.stroke()
                  factor <- factor + 1.0

            ctx.fillStyle <- U3.Case1 b1.rgba
            ctx.strokeStyle <- U3.Case1 b1.rgba

            ctx.beginPath()
            ctx.arc(b1.x, b1.y, b1.rad*factor, 0.0, Math.PI*2.0, true)
            ctx.fill()
            ctx.closePath()

            ctx.beginPath();
            ctx.arc(b1.x, b1.y, (b1.rad+5.0)*factor, 0.0, Math.PI*2.0, true)
            ctx.stroke();
            ctx.closePath();

            b1.x <- ((b1.x + b1.vx) + w) % w
            b1.y <- ((b1.y + b1.vy) + h) % h

type Model = {
    Time : float
}

type Msg =
    | SetDetail of int
    | Tick

let TickIntervalMs = 1000. / 60.

let timerTick dispatch =
    window.setInterval ((fun _ -> dispatch Tick), int TickIntervalMs)
    |> ignore

let init () = { Time = 0.0 }, Cmd.ofSub timerTick

let update msg model =
    match msg with
    | SetDetail n -> { model with Time = 0.0 }, Cmd.none
    | Tick -> { model with Time = model.Time + TickIntervalMs }, Cmd.none

let view model dispatch =
    div [ Style [ MarginLeft "Auto"
                  MarginRight "Auto"
                  Width "500px"
                  MarginTop "48px" ] ] [
        Heading.h5 [] [
            str "Bubbles"
            ]
        drawingcanvas
            { Props = [ Style [ Background "black"; Width 500; Height 500 ] ]
              Redraw = DrawFunction draw }
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            p [] [
                str "Source: "
                a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas/tree/main/demos/Bubbles/Bubbles.fs" ] [str "Bubbles.fs" ] ]
        ]
        Text.p [ Props [ Style [ FontSize "60%" ] ] ] [
            str "Built with "
            a  [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas" ] [str "Fable.React.DrawingCanvas" ]
        ]
        Text.p [ Props [ Style [ FontSize "60%"; MarginTop 4 ] ] ] [
            a  [ Href "https://codepen.io/eltonkamami/pen/ECrKd" ] [str "Original by Elton Kamami" ]
        ]
    ]

open Elmish.React
open Elmish.HMR

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
