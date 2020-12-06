module Fable.React.DrawingCanvas

open Fable.Core
open Fable.React
open Fable.React.Props
open Browser.Types
open Fable.Core.JS

type DrawStyle =
    | Color of string
    | Gradient of CanvasGradient
    | Pattern of CanvasPattern

let LineCapButt = "butt"
let LineCapRound = "round"
let LineCapSquare = "square"

let LineJoinBevel = "bevel"
let LineJoinRound = "round"
let LineJoinMiter = "miter"

type TurtleState = {
    mutable IsPenDown : bool
}

//
// Commands that match the Canvas2D almost one to one. There are a few helper aliases
//
type CanvasCommand =
    | Resize of w:float * h:float

    | Save
    | Restore
    | BeginPath
    | Fill
    | Stroke
    | TextAlign of string
    | TextBaseline of string
    | LineWidth of float
    | LineCap of string
    | LineDashOffset of float
    | LineJoin of string
    | ShadowBlur of float
    | ShadowColor of string
    | ShadowOffsetX of float
    | ShadowOffsetY of float
    | MiterLimit of float
    | SetLineDash of float array
    | FillColor of string
    | StrokeColor of string
    | FillStyle of DrawStyle
    | StrokeStyle of DrawStyle
    | MoveTo of x:float * y:float
    | LineTo of x:float * y:float
    | ArcTo of x1:float * y1:float * x2:float * y2:float * radius:float
    | Arc of x:float * y:float * radius:float * startAngle:float * endAngle:float * anticlockwise : bool
    | Rotate of angle:float
    | Translate of x:float * y:float
    | Transform of m11:float * m12:float * m21:float * m22:float * dx:float * dy:float
    | Scale of x:float * y:float
    | Font of string
    | Rect of x:float * y:float * w:float * h:float
    | ClearRect of x:float * y:float * w:float * h:float
    | FillRect of x:float * y:float * w:float * h:float
    | StrokeRect of x:float * y:float * w:float * h:float
    | FillText of text:string * x:float * y:float * maxw:float option
    | StrokeText of text:string * x:float * y:float * maxw:float option

//
// Commands generated from the turtle builder
//
type TurtleCommand =
    | PenUp
    | PenDown
    | PenColor of string
    | Forward of distance:float
    | Turn of angle:float

//
// General draw command. These will need translating (compiling, kind of) into Canvas commands
//
type DrawCommand =
    | Canvas of CanvasCommand
    | Turtle of TurtleCommand
    | Sub of (DrawCommand list)

//
// Side-effect time for canvas commands
//
let rec private runCommand (turtle : TurtleState) (ctx:CanvasRenderingContext2D) (command : CanvasCommand) =
    match command with

    // Helper for resizing
    | Resize (w,h) -> ctx.canvas.width <- w; ctx.canvas.height <- h

    // Canvas2D API, with occasional helper like FillColor and StrokeColor
    | Save -> ctx.save()
    | Restore -> ctx.restore()
    | BeginPath -> ctx.beginPath()
    | Fill -> ctx.fill()
    | Stroke -> ctx.stroke()
    | LineCap style -> ctx.lineCap <- style
    | LineDashOffset offset -> ctx.lineDashOffset <- offset
    | LineJoin style -> ctx.lineJoin <- style
    | LineWidth n -> ctx.lineWidth <- n
    | ShadowBlur amount -> ctx.shadowBlur <- amount
    | ShadowColor color -> ctx.shadowColor <- color
    | ShadowOffsetX offset -> ctx.shadowOffsetX <- offset
    | ShadowOffsetY offset -> ctx.shadowOffsetY <- offset
    | MiterLimit n -> ctx.miterLimit <- n
    | SetLineDash segments -> ctx.setLineDash(segments)
    | FillColor c -> ctx.fillStyle <- U3.Case1(c) // Helper
    | FillStyle (Color s) -> ctx.fillStyle <- U3.Case1(s)
    | FillStyle (Gradient g) -> ctx.fillStyle <- U3.Case2(g)
    | FillStyle (Pattern p) ->  ctx.fillStyle <- U3.Case3(p)
    | StrokeColor c -> ctx.strokeStyle <- U3.Case1(c) // Helper
    | StrokeStyle (Color s) -> ctx.strokeStyle <- U3.Case1(s)
    | StrokeStyle (Gradient g) -> ctx.strokeStyle <- U3.Case2(g)
    | StrokeStyle (Pattern p) -> ctx.strokeStyle <- U3.Case3(p)
    | MoveTo (x,y) -> ctx.moveTo(x,y)
    | LineTo (x,y) -> ctx.lineTo(x,y)
    | ArcTo (x1,y1,x2,y2,r) -> ctx.arcTo(x1,y1,x2,y2,r)
    | Arc (x,y,r,startAngle,endAngle,acw) -> ctx.arc(x,y, r,startAngle,endAngle,acw)
    | Rotate a -> ctx.rotate(a)
    | TextAlign a -> ctx.textAlign <- a
    | TextBaseline a -> ctx.textBaseline <- a
    | Translate (x,y) -> ctx.translate(x,y)
    | Transform (m11,m12,m21,m22,dx,dy) -> ctx.transform(m11,m12,m21,m22,dx,dy)
    | Scale (x,y) -> ctx.scale(x,y)
    | Font name -> ctx.font <- name
    | Rect (x,y,w,h) -> ctx.rect(x,y,w,h)
    | ClearRect (x,y,w,h) -> ctx.clearRect(x,y,w,h)
    | FillRect (x,y,w,h) -> ctx.fillRect(x,y,w,h)
    | StrokeRect (x,y,w,h) -> ctx.strokeRect(x,y,w,h)
    | FillText (text,x,y,maxw) ->
        match maxw with
        | None -> ctx.fillText(text,x,y)
        | Some mw -> ctx.fillText(text,x,y,mw)
    | StrokeText (text,x,y,maxw) ->
        match maxw with
        | None -> ctx.strokeText(text,x,y)
        | Some mw -> ctx.strokeText(text,x,y,mw)

//
// Turn Turtle commands into CanvasCommands
//
let translateTurtle turtle cmd =
    seq {
        match cmd with

        // State-dependent turtle commands
        | PenUp ->
            turtle.IsPenDown <- false
        | PenDown ->
            turtle.IsPenDown <- true
            yield MoveTo (0.0,0.0)
        | Forward n ->
            yield if (turtle.IsPenDown) then LineTo(n,0.0) else MoveTo(n,0.0)
            yield Translate(n,0.0)

        // These could have been emitted directly in the builder, since they don't have
        // a dependency on turtle state
        | Turn a ->
            yield Rotate( a * Math.PI / 180.0 )
        | PenColor c ->
            yield StrokeColor c
    }

//
// Turn a list of DrawCommand into pure CanvasCommands
//
let rec translate turtle commands =
    seq {
        for cmd in commands do
            match cmd with
            | Canvas c -> yield c
            | Sub cmds -> yield! (translate turtle cmds)
            | Turtle t -> yield! (translateTurtle turtle t)
    }

let runCommands turtle ctx commands =
    for cmd in commands |> translate turtle do
        runCommand turtle ctx cmd

type Drawing = DrawCommand list

type DrawFunction = CanvasRenderingContext2D -> unit

type Redraw =
    | Drawing of (unit -> Drawing)
    | DrawFunction of DrawFunction

type DrawingCanvasProps =
    { Props: seq<IHTMLProp>
      Redraw: Redraw }

type DrawingCanvas(initialProps) as self =
    inherit Component<DrawingCanvasProps, obj>(initialProps)

    let mutable canvasElement: HTMLCanvasElement option = None

    let setRef (e: Element) =
        canvasElement <-
            match e :?> HTMLCanvasElement with
                | null -> None
                | ce -> Some ce

    let drawNow () =
        match canvasElement with
        | None -> ()
        | Some ce ->
            let ctx = ce.getContext_2d ()
            match self.props.Redraw with
            | Drawing d ->
                let turtle = { IsPenDown = false }
                ctx.canvas.width <- ce.offsetWidth
                ctx.canvas.height <- ce.offsetHeight
                d() |> (ctx |> runCommands turtle)
            | DrawFunction f -> f ctx

    override this.render() =
        canvas
           [
                Ref setRef
                yield! this.props.Props
           ]
           this.children

    override this.componentDidMount() = drawNow ()

    override this.componentDidUpdate(p, s) = drawNow ()

let drawingcanvas props = ofType<DrawingCanvas, _, _> props []


module Builder =
    // https://stackoverflow.com/questions/23122639/how-do-i-write-a-computation-expression-builder-that-accumulates-a-value-and-als

    type BuilderVariant =
        | Regular
        | SaveRestore
        | FillPath
        | StrokePath

    type DrawCommandBuilder( variant : BuilderVariant ) =
        let append xs (x : CanvasCommand) =
            xs @ [ Canvas x ]

        // With Delay/Run:
        //     Run( Delay ( fun () -> (Yield |> Resize |> Arc) ))
        // Without
        //     Yield |> Resize |> Arc

        // Defers execution of the CE until the Run().
        member _.Delay(funcToDelay) =
            let delayed = fun () -> funcToDelay()
            delayed // return the new function. This will be unwrapped with Run, where we can apply variant

        // Initialises the expression
        member _.Yield _ =
            []

        // Unwraps the function created by Delay. This allows us to apply the variant wrapping, if needed
        member _.Run(funcToRun) : (unit -> DrawCommand list)=
            fun () ->
                let result : DrawCommand list = funcToRun()
                match variant with
                    | Regular -> result
                    | SaveRestore -> (Canvas Save :: result) @ [ Canvas Restore ]
                    | FillPath -> (Canvas BeginPath :: result) @ [ Canvas Fill ]
                    | StrokePath -> (Canvas BeginPath :: result) @ [ Canvas Stroke ]

        [<CustomOperation "resize">]
        member _.Resize(state:Drawing, w, h) = append state <| Resize (w,h)

        [<CustomOperation "save">]
        member _.Save(state:Drawing ) = append state Save

        [<CustomOperation "restore">]
        member _.Restore(state:Drawing ) = append state Restore

        [<CustomOperation "beginPath">]
        member _.BeginPath(state:Drawing ) = append state BeginPath

        [<CustomOperation "fill">]
        member _.Fill(state:Drawing ) = append state Fill

        [<CustomOperation "stroke">]
        member _.Stroke(state:Drawing ) = append state Stroke

        [<CustomOperation "lineWidth">]
        member _.LineWidth(state:Drawing, w ) = append state <| LineWidth w

        [<CustomOperation "lineJoin">]
        member _.LineJoin(state:Drawing, style ) = append state <| LineJoin style

        [<CustomOperation "lineCap">]
        member _.LineCap(state:Drawing, style ) = append state <| LineCap style

        [<CustomOperation "lineDashOffset">]
        member _.LineDashOffset(state:Drawing, offset ) = append state <| LineDashOffset offset

        [<CustomOperation "shadowBlur">]
        member _.ShadowBlur(state:Drawing, amount ) = append state <| ShadowBlur amount

        [<CustomOperation "shadowColor">]
        member _.ShadowColor(state:Drawing, color ) = append state <| ShadowColor color

        [<CustomOperation "shadowOffsetX">]
        member _.ShadowOffsetX(state:Drawing, offset ) = append state <| ShadowOffsetX offset

        [<CustomOperation "shadowOffsetY">]
        member _.ShadowOffsetY(state:Drawing, offset ) = append state <| ShadowOffsetY offset

        [<CustomOperation "textAlign">]
        member _.TextAlign(state:Drawing, a ) = append state <| TextAlign a

        [<CustomOperation "textBaseline">]
        member _.TextBaseline(state:Drawing, a ) = append state <| TextBaseline a

        [<CustomOperation "miterLimit">]
        member _.MiterLimit(state:Drawing, n ) = append state <| MiterLimit n

        [<CustomOperation "setLineDash">]
        member _.SetLineDash(state:Drawing, segments ) = append state <| SetLineDash segments

        [<CustomOperation "fillColor">]
        member _.FillColor(state:Drawing, (color:string) ) = append state <| FillStyle (Color color)

        [<CustomOperation "fillStyle">]
        member _.FillStyle(state:Drawing, (style:DrawStyle) ) = append state <| FillStyle style

        [<CustomOperation "strokeColor">]
        member _.StrokeColor(state:Drawing, (color:string) ) = append state <| StrokeStyle (Color color)

        [<CustomOperation "strokeStyle">]
        member _.StrokeStyle(state:Drawing, (style:DrawStyle) ) = append state <| StrokeStyle style

        [<CustomOperation "moveTo">]
        member _.MoveTo(state:Drawing, x, y ) = append state <| MoveTo (x,y)

        [<CustomOperation "lineTo">]
        member _.LineTo(state:Drawing, x, y ) = append state <| LineTo (x,y)

        [<CustomOperation "arcTo">]
        member _.ArcTo(state:Drawing, x1, y1, x2, y2, r ) = append state <| ArcTo (x1, y1, x2, y2, r)

        [<CustomOperation "arc">]
        member _.Arc(state:Drawing, x,y,r,startAngle,endAngle, acw : bool ) = append state <| Arc (x,y,r,startAngle,endAngle,acw)

        [<CustomOperation "rotate">]
        member _.Rotate(state:Drawing, a ) = append state <| Rotate a

        [<CustomOperation "transform">]
        member _.Transform(state:Drawing, m11,m12,m21,m22,dx,dy) = append state <| Transform (m11,m12,m21,m22,dx,dy)

        [<CustomOperation "translate">]
        member _.Translate(state:Drawing, x,y ) = append state <| Translate (x,y)

        [<CustomOperation "scale">]
        member _.Scale(state:Drawing, x,y ) = append state <| Scale (x,y)

        [<CustomOperation "font">]
        member _.Font(state:Drawing, name ) = append state <| Font name

        [<CustomOperation "clearRect">]
        member _.ClearRect(state:Drawing, x,y,w,h ) = append state <| ClearRect (x,y,w,h)

        [<CustomOperation "rect">]
        member _.Rect(state:Drawing, x,y,w,h ) = append state <| Rect (x,y,w,h)

        [<CustomOperation "fillRect">]
        member _.FillRect(state:Drawing, x,y,w,h ) = append state <| FillRect (x,y,w,h)

        [<CustomOperation "strokeRect">]
        member _.StrokeRect(state:Drawing, x,y,w,h ) = append state <| StrokeRect (x,y,w,h)

        [<CustomOperation "fillText">]
        member _.FillText(state:Drawing, text, x, y, ?maxw ) = append state <| FillText (text,x,y,maxw)

        [<CustomOperation "strokeText">]
        member _.StrokeText(state:Drawing, text, x, y, ?maxw ) = append state <| StrokeText (text,x,y,maxw)

        [<CustomOperation "sub">]
        member _.Sub(state:Drawing, drawing : unit -> Drawing) = state @ drawing()

        [<CustomOperation "repeat">]
        member _.Repeat<'T>(state:Drawing, col:seq<'T>, f:('T -> (unit ->Drawing)) ) =
            let mutable result = state
            for x in col do
                let d = f x
                result <- result @ d()
            result

        [<CustomOperation "ifThen">]
        member _.IfThen(state:Drawing, cond, succ : unit -> Drawing) : Drawing =
            if cond then (state @ succ()) else state

        [<CustomOperation "ifThenElse">]
        member _.IfThenElse(state:Drawing, cond, succ : unit -> Drawing, fail : unit -> Drawing) =
            if cond then (state @ succ()) else (state @ fail())

    let drawing = DrawCommandBuilder(Regular)
    let fillpath = DrawCommandBuilder(FillPath)
    let strokepath = DrawCommandBuilder(StrokePath)
    let preserve = DrawCommandBuilder(SaveRestore)


module ListHelpers =
    let loop coll fn = coll |> List.collect fn |> Sub

    let ifThen cond (succ : Lazy<DrawCommand list>) =
        Sub (if cond then succ.Value else [])

    let ifThenElse cond (succ : Lazy<DrawCommand list>) (fail:Lazy<DrawCommand list>) =
        Sub (if cond then succ.Value else fail.Value)

    let preserve (drawing : DrawCommand list) =
        (Canvas Save :: drawing) @ [ Canvas Restore ]

    let fillpath (drawing : DrawCommand list) =
        (Canvas BeginPath :: drawing) @ [ Canvas Fill ]

    let strokepath (drawing : DrawCommand list) =
        (Canvas BeginPath :: drawing) @ [ Canvas Stroke ]

module Turtle =

    open System

    type TurtleBuilder() =
        let append xs (x : TurtleCommand) =
            xs @ [ Turtle x ]

        let appendSub xs (x : DrawCommand list) =
            xs @ [ x |> List.filter (fun c -> c <> Canvas BeginPath && c <> Canvas Stroke) |> Sub ]

        // Defers execution of the CE until the Run().
        member _.Delay(funcToDelay) =
            let delayed = fun () -> funcToDelay()
            delayed // return the new function. This will be unwrapped with Run, where we can apply variant

        // Initialises the expression
        member _.Yield _ : DrawCommand list =
            []

        // Unwraps the function created by Delay. This allows us to apply the variant wrapping, if needed
        member _.Run( funcToRun ) : (unit -> DrawCommand list) =
            fun () ->
               let drawing = funcToRun()
               (Canvas BeginPath :: drawing) @ [ Canvas Stroke ]

        [<CustomOperation "forward">]
        member _.Forward(state:Drawing, d) = append state <| Forward d

        [<CustomOperation "turn">]
        member _.Turn(state:Drawing, a) = append state <| Turn a

        [<CustomOperation "penUp">]
        member _.PenUp(state:Drawing) = append state <| PenUp

        [<CustomOperation "penDown">]
        member _.PenDown(state:Drawing) = append state <| PenDown

        [<CustomOperation "penColor">]
        member _.PenColor(state:Drawing, c) = append state <| PenColor c

        [<CustomOperation "sub">]
        member _.Sub(state:Drawing, drawing : unit -> Drawing ) = appendSub state <| drawing()

        [<CustomOperation "repeat">]
        member _.Repeat<'T>(state:Drawing, col:seq<'T>, f:('T -> (unit ->Drawing)) ) =
            let mutable result = state
            for x in col do
                let d = f x
                result <- appendSub result (d())
            result

        [<CustomOperation "ifThen">]
        member _.IfThen(state:Drawing, cond, succ : unit -> Drawing) : Drawing =
            if cond then appendSub state (succ()) else state

        [<CustomOperation "ifThenElse">]
        member _.IfThenElse(state:Drawing, cond, succ : unit -> Drawing, fail : unit -> Drawing) =
            if cond then (appendSub state (succ())) else (appendSub state (fail()))

    let turtle = TurtleBuilder()