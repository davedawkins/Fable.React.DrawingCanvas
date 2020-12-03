module ClockUsingBuilder

open Util
open DrawingCanvas
open DrawingCanvas.Builder

open Fable.Core

let ornateHand r a =
    preserve {
        rotate a
        beginPath
        strokeColor "#440000"  // "#454545"
        miterLimit 100.0
        lineWidth 4.0

        moveTo 0.0 0.0
        lineTo 0.0 -(r - 70.0)
        moveTo 0.0 -(r - 0.0)
        arcTo 15.0 -(r - 70.0) 0.0 -(r - 70.0) 15.0

        moveTo  0.0 -(r - 0.0)
        arcTo -15.0 -(r - 70.0) 0.0 -(r - 70.0) 15.0

        stroke
    }

let clock (time : System.DateTime) =
    let radius = 250.
    let size = radius + 10.0
    let pi = System.Math.PI
    let pi2 = 2.0 * pi
    let angle n = n * pi2
    let fontScale = 2.75

    let outerBorder = preserve {
        lineWidth 6.
        beginPath
        arc 0. 0. radius 0. (angle 1.0) true
        stroke
    }

    let center = drawing {
        beginPath
        fillColor "#440000"
        arc  0.0  0.0  10.0  0.0  (2.0 * pi) true
        fill
        beginPath
        fillColor "#FFFF44"
        arc  0.0  0.0   4.0  0.0  (2.0 * pi) true
        fill
    }

    drawing {
        resize (2. * size) (2. * size)
        translate size size
        font "32px Times-Roman"
        textAlign "center"
        textBaseline "top"
        strokeColor "#555555"
        fillColor "#555555"

        insert outerBorder

        // Dot markings
        loop [ 0 .. 59 ] (fun i ->
            preserve {
                rotate (float i * pi / 30.0)
                translate 0. (-radius + 12.)
                beginPath

                ifThenElse (i % 5 = 0)
                    (lazy drawing {
                            moveTo  0.   6.
                            lineTo  4.0  0.0
                            lineTo  0.0 -6.0
                            lineTo -4.0  0.0
                            lineTo  0.0  6.0
                        }
                    )
                    (lazy drawing { arc 0. 0. 3. 0. (2. * pi) false })
                fill
            })

        // Numbers
        insert (preserve {
            loop [ 0 .. 11 ] (fun i ->
                drawing {
                    rotate (pi / 6.0)
                    save
                    scale 1.0 fontScale
                    fillText ((i+1) |> roman)  0.0 (-(radius - 24.) / fontScale) 999.0
                    restore
                }
            )
        })

        // Second hand
        insert (preserve {
            rotate (pi * 2.0 * float time.Second / 60.0)
            beginPath
            moveTo 0.0 0.0
            lineTo 0.0 -(radius - 30.0)
            stroke
        })

        // Minute hand
        insert (
            ornateHand
                (radius-30.0)
                (angle (
                    float time.Minute / 60.0 +
                    float time.Second / 3600.0 )))

        // Hour hand
        insert (
            ornateHand
                (radius-100.0)
                (angle (
                    float time.Hour / 12.0 +
                    float time.Minute / (12.0 * 60.0) +
                    float time.Second / (12.0 * 60.0 * 60.0) )))

        insert center
    }