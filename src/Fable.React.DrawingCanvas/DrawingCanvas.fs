module DrawingCanvas

open Fable.Core
open Fable.React
open Fable.React.Props
open Browser.Types
open Fable.Core.JS

type DrawCommand =
    | Resize of w:float * h:float
    | Save
    | Restore
    | BeginPath
    | Fill
    | Stroke
    | TextAlign of string
    | TextBaseline of string
    | LineWidth of float
    | MiterLimit of float
    | FillStyle of U3<string,CanvasGradient,CanvasPattern>
    | StrokeStyle of U3<string,CanvasGradient,CanvasPattern>
    | MoveTo of x:float * y:float
    | LineTo of x:float * y:float
    | ArcTo of x1:float * y1:float * x2:float * y2:float * radius:float
    | Arc of x:float * y:float * radius:float * startAngle:float * endAngle:float * anticlockwise : bool
    | Rotate of angle:float
    | Translate of x:float * y:float
    | Scale of x:float * y:float
    | Font of string
    | ClearRect of x:float * y:float * w:float * h:float
    | FillRect of x:float * y:float * w:float * h:float
    | FillText of text:string * x:float * y:float * maxw:float option
    | Insert of (DrawCommand list)

let rec runCommand (ctx:CanvasRenderingContext2D) command =
    match command with
    | Insert cmds ->
        for cmd in cmds do
            runCommand ctx cmd
    | Resize (w,h) -> ctx.canvas.width <- w; ctx.canvas.height <- h
    | Save -> ctx.save()
    | Restore -> ctx.restore()
    | BeginPath -> ctx.beginPath()
    | Fill -> ctx.fill()
    | Stroke -> ctx.stroke()
    | LineWidth n -> ctx.lineWidth <- n
    | MiterLimit n -> ctx.miterLimit <- n
    | FillStyle s -> ctx.fillStyle <- s
    | StrokeStyle s -> ctx.strokeStyle <- s
    | MoveTo (x,y) -> ctx.moveTo(x,y)
    | LineTo (x,y) -> ctx.lineTo(x,y)
    | ArcTo (x1,y1,x2,y2,r) -> ctx.arcTo(x1,y1,x2,y2,r)
    | Arc (x,y,r,startAngle,endAngle,acw) -> ctx.arc(x,y, r,startAngle,endAngle,acw)
    | Rotate a -> ctx.rotate(a)
    | TextAlign a -> ctx.textAlign <- a
    | TextBaseline a -> ctx.textBaseline <- a
    | Translate (x,y) -> ctx.translate(x,y)
    | Scale (x,y) -> ctx.scale(x,y)
    | Font name -> ctx.font <- name
    | ClearRect (x,y,w,h) -> ctx.clearRect(x,y,w,h)
    | FillRect (x,y,w,h) -> ctx.fillRect(x,y,w,h)
    | FillText (text,x,y,maxw) ->
        match maxw with
        | None -> ctx.fillText(text,x,y)
        | Some mw -> ctx.fillText(text,x,y,mw)

let runCommands ctx commands =
    for cmd in commands do
        runCommand ctx cmd

type Drawing = DrawCommand list

type DrawFunction = CanvasRenderingContext2D -> unit

type Redraw =
    | Drawing of Drawing
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
            | Drawing d ->  d |> (ctx |> runCommands)
            | DrawFunction f -> f ctx

    override this.render() =
        canvas
           [ Ref setRef ; yield! this.props.Props ]
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
        let append xs (x : DrawCommand) =
            xs @ [ x ]

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
        member _.Run(funcToRun) =
            console.log("Run")
            let result : DrawCommand list = funcToRun()
            match variant with
                | Regular -> result
                | SaveRestore -> (Save :: result) @ [ Restore ]
                | FillPath -> (BeginPath :: result) @ [ Fill ]
                | StrokePath -> (BeginPath :: result) @ [ Stroke ]


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

        [<CustomOperation "textAlign">]
        member _.TextAlign(state:Drawing, a ) = append state <| TextAlign a

        [<CustomOperation "textBaseline">]
        member _.TextBaseline(state:Drawing, a ) = append state <| TextBaseline a

        [<CustomOperation "miterLimit">]
        member _.MiterLimit(state:Drawing, n ) = append state <| MiterLimit n

        [<CustomOperation "fillStyle">]
        member _.FillStyle(state:Drawing, s ) = append state <| FillStyle s

        [<CustomOperation "strokeStyle">]
        member _.StrokeStyle(state:Drawing, s ) = append state <| StrokeStyle s

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

        [<CustomOperation "translate">]
        member _.Translate(state:Drawing, x,y ) = append state <| Translate (x,y)

        [<CustomOperation "scale">]
        member _.Scale(state:Drawing, x,y ) = append state <| Scale (x,y)

        [<CustomOperation "font">]
        member _.Font(state:Drawing, name ) = append state <| Font name

        [<CustomOperation "clearRect">]
        member _.ClearRect(state:Drawing, x,y,w,h ) = append state <| ClearRect (x,y,w,h)

        [<CustomOperation "fillRect">]
        member _.FillRect(state:Drawing, x,y,w,h ) = append state <| FillRect (x,y,w,h)

        [<CustomOperation "fillText">]
        member _.FillText(state:Drawing, text, x, y, ?maxw ) = append state <| FillText (text,x,y,maxw)

        [<CustomOperation "insert">]
        member _.Insert(state:Drawing, drawing ) = state @ drawing

        [<CustomOperation "loop">]
        member _.Loop<'T>(state:Drawing, col:seq<'T>, f:('T -> Drawing) ) =
            let mutable result = state
            for x in col do
                let d = f x
                result <- result @ d
            result

        [<CustomOperation "ifThen">]
        member _.IfThen(state:Drawing, cond, succ : Lazy<Drawing>) : Drawing =
            if cond then (state @ succ.Value) else state

        [<CustomOperation "ifThenElse">]
        member _.IfThenElse(state:Drawing, cond, succ : Lazy<Drawing>, fail : Lazy<Drawing>) =
            if cond then (state @ succ.Value) else (state @ fail.Value)

    let drawing = DrawCommandBuilder(Regular)
    let fillpath = DrawCommandBuilder(FillPath)
    let strokepath = DrawCommandBuilder(StrokePath)
    let preserve = DrawCommandBuilder(SaveRestore)


module ListHelpers =
    let loop coll fn = coll |> List.collect fn |> Insert

    let ifThen cond (succ : Lazy<DrawCommand list>) =
        Insert (if cond then succ.Value else [])

    let ifThenElse cond (succ : Lazy<DrawCommand list>) (fail:Lazy<DrawCommand list>) =
        Insert (if cond then succ.Value else fail.Value)

    let preserve (drawing : DrawCommand list) =
        (Save :: drawing) @ [ Restore ]

    let fillpath (drawing : DrawCommand list) =
        (BeginPath :: drawing) @ [ Fill ]

    let strokepath (drawing : DrawCommand list) =
        (BeginPath :: drawing) @ [ Stroke ]

