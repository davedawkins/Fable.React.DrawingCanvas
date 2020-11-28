module ClockUsingList

open Util
open System
open DrawingCanvas
open Fable.Core

// Helpers for loop/if constructs

let loop coll fn = coll |> List.collect fn |> Insert

let ifThen cond (succ : Lazy<DrawCommand list>) =
    Insert (if cond then succ.Value else [])

let ifThenElse cond (succ : Lazy<DrawCommand list>) (fail:Lazy<DrawCommand list>) =
    Insert (if cond then succ.Value else fail.Value)

let ornateHand r a = [
    Rotate a
    BeginPath
    StrokeStyle (U3.Case1  "#440000") // "#454545"
    MiterLimit 100.0
    LineWidth 4.0
    MoveTo(0.0, 0.0)
    LineTo(0.0, -(r - 70.0))
    MoveTo(0.0, -(r - 0.0))
    ArcTo(15.0, -(r - 70.0), 0.0, -(r - 70.0), 15.0)
    MoveTo(0.0, -(r - 0.0))
    ArcTo(-15.0, -(r - 70.0), 0.0, -(r - 70.0), 15.0)
    Stroke
]

let clock (time : DateTime) =
    let radius = 250.
    let size = radius + 10.0
    let pi = System.Math.PI
    let pi2 = 2.0 * pi
    let angle n = n * pi2
    let fontScale = 2.75

    let numeral i = [
        Rotate (pi / 6.0)
        Save
        Scale (1.0, fontScale)
        FillText ( (i+1) |> roman, 0., -(radius - 24.) / fontScale, Some 999.0)
        Restore
    ]

    let marker i = [
        Save
        Rotate( float i * pi / 30.0 )
        Translate( 0., -radius + 12. )
        BeginPath
        ifThenElse (i % 5 = 0)
            (lazy [
                MoveTo(0., 6.)
                LineTo(4.0, 0.0)
                LineTo(0.0, -6.0)
                LineTo(-4.0, 0.0)
                LineTo(0.0, 6.0)
            ])
            (lazy [ Arc( 0., 0., 3., 0., 2. * pi, None ) ])
        Fill
        Restore
    ]

    // Clock
    [
        Resize (2.0 * size, 2.0 * size)
        Translate (size, size)
        Font "32px Times Roman"
        TextAlign "center"
        TextBaseline "top"
        StrokeStyle (U3.Case1 "#555555")
        FillStyle (U3.Case1 "#555555")

        // Outside border
        Insert [
            LineWidth 6.0
            BeginPath
            Arc ( 0., 0., radius, 0., angle 1.0, Some true )
            Stroke
        ]

        // Numbers
        loop [0 .. 11] numeral

        // Markers
        loop [0 .. 59] marker

        // Second hand
        Insert [
            Rotate( pi * 2.0 * float time.Second / 60.0)
            BeginPath
            MoveTo(0.0, 0.0)
            LineTo(0.0, -(radius - 30.0))
            Stroke
        ]

        // Minute hand
        Insert
            (ornateHand (radius-30.0)
                (angle (
                    float time.Minute / 60.0 +
                    float time.Second / 3600.0 )))

        // Hour hand
        Insert
            (ornateHand (radius-100.0)
                (angle (
                    float time.Hour / 12.0 +
                    float time.Minute / (12.0 * 60.0) +
                    float time.Second / (12.0 * 60.0 * 60.0))))

        // Centers
        Insert [
            Save
            BeginPath
            FillStyle (U3.Case1 "#440000")
            Arc( 0.0, 0.0, 10.0, 0.0, 2.0 * pi, None)
            Fill
            BeginPath
            FillStyle (U3.Case1 "#FFFF44")
            Arc( 0.0, 0.0, 4.0, 0.0, 2.0 * pi, None)
            Fill
            Restore
        ]
   ]
