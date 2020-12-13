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

let particlesNum = 300
let            w = 500.0
let            h = 500.0
let       colors = ["#f35d4f"; "#f36849"; "#c0d988"; "#6ddaf1"; "#f1e85b"]

let rnd = System.Random()
let random() = rnd.NextDouble()

type Factory = {
    mutable x : float
    mutable y : float
    rad : float
    rgba : string
    vx : float
    vy : float
}

let makeFactory() = {
    x  = round( random() * w)
    y  = round(  random() * h)
    rad = round( random() * 1.0) + 1.0
    rgba = colors.[  int (round( random() * 4.0)) ]
    vx = round(  random() * 3.0) - 1.5
    vy = round( random() * 3.0) - 1.5
}

let particles = [| 1..particlesNum |] |> Array.map (fun _ -> makeFactory())

let sq x = x * x
let findDistanceSq (p1 : Factory) (p2:Factory) =
    ( sq(p2.x - p1.x)  + sq(p2.y - p1.y) )

let draw (ctx : CanvasRenderingContext2D) =
    ctx.canvas.width <- ctx.canvas.offsetWidth
    ctx.canvas.height <- ctx.canvas.offsetHeight
    ctx.clearRect(0.0, 0.0, w, h)
    ctx.globalCompositeOperation <- "lighter"

    for i in [0..(particlesNum-1)] do
        let temp = particles.[i]
        let mutable factor = 1.0

        for j in [0..(particlesNum-1)] do

           let temp2 = particles.[j]
           ctx.lineWidth <- 0.5

           if (temp.rgba = temp2.rgba && (findDistanceSq temp temp2) < 2500.0) then
              ctx.strokeStyle <- U3.Case1 temp.rgba
              ctx.beginPath()
              ctx.moveTo(temp.x, temp.y)
              ctx.lineTo(temp2.x, temp2.y)
              ctx.stroke()
              factor <- factor + 1.0

        ctx.fillStyle <- U3.Case1 temp.rgba
        ctx.strokeStyle <- U3.Case1 temp.rgba

        ctx.beginPath()
        ctx.arc(temp.x, temp.y, temp.rad*factor, 0.0, Math.PI*2.0, true)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath();
        ctx.arc(temp.x, temp.y, (temp.rad+5.0)*factor, 0.0, Math.PI*2.0, true)
        ctx.stroke();
        ctx.closePath();

        temp.x <- temp.x + temp.vx
        temp.y <- temp.y + temp.vy

        if (temp.x > w) then temp.x <- 0.0
        if (temp.x < 0.0) then temp.x <- w
        if (temp.y > h) then temp.y <- 0.0
        if (temp.y < 0.0) then temp.y <- h


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
            str "More Particles"
            ]
        drawingcanvas
            { Props = [ Style [ Background "black"; Width 500; Height 500 ] ]
              Redraw = DrawFunction draw }
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
