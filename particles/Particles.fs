module Particles

open Elmish
open Fable.React
open System
open Fable.React.Props
open DrawingCanvas
open DrawingCanvas.Builder
open Fable.Core
open Fulma
open Browser.Dom
open Browser.Types

type Particle =
    { mutable Vx: float
      mutable Vy: float
      mutable Ox: float
      mutable Oy: float
      mutable X: float
      mutable Y: float }

let Spacing = 3.
let Margin = 100.
let Color = uint8 220
let Thickness = Math.Pow(40., 2.)
let Ease = 0.25
let Drag = 0.95
let TickIntervalMs = 1000. / 60.
let InitRows = 100
let InitCols = 200

// Rogues Gallery
let mutable containerE: Element = null

type Model =
    { NumRows: int
      NumCols: int
      Particles: Particle array
      IsRecalcPass: bool
      NeedsResize: bool
      MouseXy: float * float
      Time: float
      UsingMouse: bool }

type Message =
    | SetSize of rows: int * cols: int
    | Tick
    | Mouse of float * float

let timerTick dispatch =
    window.setInterval ((fun _ -> dispatch Tick), int TickIntervalMs)
    |> ignore

let toClientXY (e: MouseEvent) =
    let r = containerE.getBoundingClientRect ()
    (e.clientX - r.left, e.clientY - r.top)

let makeParticles (rows: int) (cols: int) =
    ([| 0 .. (rows * cols - 1) |]
     |> Array.map (fun i ->
         let x =
             Margin + (Spacing * (float i % float cols))

         let y =
             Margin
             + (Spacing * Math.Floor(float i / float cols))

         { X = x
           Ox = x
           Y = y
           Oy = y
           Vx = 0.
           Vy = 0. }))

let swirly model =
    let t = model.Time * 0.001

    let w =
        float model.NumCols * Spacing + Margin * 2.

    let h =
        float model.NumRows * Spacing + Margin * 2.

    let mx =
        w
        * 0.5
        + (Math.Cos(t * 2.1) * Math.Cos(t * 0.9) * w * 0.45)

    let my =
        h
        * 0.5
        + (Math.Sin(t * 3.2)
           * Math.Tan(Math.Sin(t * 0.8))
           * h
           * 0.45)

    (mx, my)

let updateParticles model (mx, my) =
    let n = model.NumRows * model.NumCols
    let p = model.Particles
    for i in [ 0 .. (n - 1) ] do
        let p = p.[i]
        let dx = mx - p.X
        let dy = my - p.Y
        let d = dx * dx + dy * dy

        if (d < Thickness) then
            let f = -Thickness / d
            let t = Math.Atan2(dy, dx)
            p.Vx <- p.Vx + f * Math.Cos(t)
            p.Vy <- p.Vy + f * Math.Sin(t)

        p.Vy <- p.Vy * Drag
        p.Vx <- p.Vx * Drag
        p.X <- p.X + p.Vx + (p.Ox - p.X) * Ease
        p.Y <- p.Y + p.Vy + (p.Oy - p.Y) * Ease


let drawParticles model (ctx: CanvasRenderingContext2D) =
    let rows = model.NumRows
    let cols = model.NumCols
    let w = float cols * Spacing + Margin * 2.
    let h = float rows * Spacing + Margin * 2.

    let numParticles = rows * cols

    if model.NeedsResize then
        ctx.canvas.width <- w
        ctx.canvas.height <- h

    let a = ctx.createImageData (float w, float h)
    let b = a.data
    let particles = model.Particles

    for i in [ 0 .. (numParticles - 1) ] do
        let p = particles.[i]

        let n =
            int (Math.Floor(p.X) + Math.Floor(p.Y) * w) * 4

        b.[n] <- Color
        b.[n + 1] <- Color
        b.[n + 2] <- Color
        b.[n + 3] <- uint8 255

    ctx.putImageData (a, 0., 0.)

let initP rows cols =
    { NumRows = rows
      NumCols = cols
      Particles = (makeParticles rows cols)
      IsRecalcPass = false
      MouseXy = (0., 0.)
      Time = 0.
      UsingMouse = false
      NeedsResize = true }

let init () = initP InitRows InitCols, Cmd.ofSub timerTick

let update (msg: Message) (model: Model) =
    match msg with

    | SetSize (rows, cols) ->
        { model with
              NumRows = rows
              NumCols = cols },
        Cmd.none

    | Mouse (x, y) ->
        { model with
              MouseXy = (x, y)
              UsingMouse = true },
        Cmd.none

    | Tick ->
        { model with
              Time = model.Time + TickIntervalMs
              IsRecalcPass = not model.IsRecalcPass },
        Cmd.none

let view model dispatch =
    let w =
        float model.NumCols * Spacing + Margin * 2.

    let h =
        float model.NumRows * Spacing + Margin * 2.

    let ml =
        sprintf "%dpx" (int (Math.Round(w * -0.5)))

    let mt =
        sprintf "%dpx" (int (Math.Round(h * -0.5)))

    div [] [
        div [ Ref(fun e -> containerE <- e)
              Id "container"
              Style [ MarginLeft ml; MarginTop mt ] ] [
            drawingcanvas
                { Props = [ OnMouseMove(fun e -> toClientXY (e) |> Mouse |> dispatch) ]
                  Redraw =

                      // The original code alternates between recalculation
                      // and redrawing the canvas on each timer triggered redraw
                      // Elmish view will be called for *any* model update, so this implementation
                      // starts behaving slightly differently when we start handling mouse events etc
                      // It shouldn't matter too much, but this isn't quite like a regular game loop

                      if model.IsRecalcPass then
                          DrawFunction(fun ctx ->
                              updateParticles model (if model.UsingMouse then model.MouseXy else (swirly model)))
                      else
                          drawParticles model |> DrawFunction }
        ]
        div [ Class "info" ] [
            hgroup [ Class "about" ] [
                h1 [] [
                    str (sprintf "%d Particles" (model.NumCols * model.NumRows))
                ]
                h2 [] [
                    str "A study creating performant particles with Canvas 2D"
                ]
                h3 [] [ str "Use your mouse" ]
                p [] [
                    str "Made with "
                    a [ Href "https://github.com/davedawkins/Fable.React.DrawingCanvas" ] [
                        str "Fable.React.DrawingCanvas"
                    ]
                ]
                p [] [
                    str "Ported from Javascript. Original by "
                    a [ Href "https://codepen.io/soulwire/pen/Ffvlo" ] [
                        str "Justin Windle"
                    ]
                ]
            ]
        ]
    ]

open Elmish.React

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
