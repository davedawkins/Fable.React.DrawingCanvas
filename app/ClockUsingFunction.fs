module ClockUsingFunction

open System
open Browser.Types
open Util
open Fable.Core

let ornateHand (ctx: CanvasRenderingContext2D) r a =
    ctx.save()
    ctx.rotate( a )
    ctx.beginPath();
    ctx.strokeStyle <- U3.Case1  "#440000"  // "#454545"
    ctx.miterLimit <- 100.0
    ctx.lineWidth <- 4.0

    ctx.moveTo(0.0, 0.0)
    ctx.lineTo(0.0, -(r - 70.0))
    ctx.moveTo(0.0, -(r - 0.0))
    ctx.arcTo(15.0, -(r - 70.0), 0.0, -(r - 70.0), 15.0)

    ctx.moveTo(0.0, -(r - 0.0))
    ctx.arcTo(-15.0, -(r - 70.0), 0.0, -(r - 70.0), 15.0)

    //ctx.arcTo( 15.0, 0.0, 0.0, 0.0, 15.0)
    ctx.stroke()
    ctx.restore()

let clock (time:DateTime) (ctx: CanvasRenderingContext2D) =
    let radius = 250.
    let size = radius + 10.0
    let pi = System.Math.PI
    let pi2 = 2.0 * pi
    let angle n = n * pi2
    let fontScale = 2.75

    ctx.canvas.width <- 2. * size
    ctx.canvas.height <- 2. * size
    ctx.translate( size, size )
    ctx.font <- "32px Times-Roman"
    ctx.textAlign <- "center"
    ctx.textBaseline <- "top"
    ctx.strokeStyle <- U3.Case1 "#555555"
    ctx.fillStyle <- U3.Case1 "#555555"

    // Outside border
    ctx.save()
    ctx.lineWidth <- 6.
    ctx.beginPath()
    ctx.arc( 0., 0., radius, 0., angle 1.0, true )
    ctx.stroke()
    ctx.restore();

    // Numbers
    ctx.save()
    for i in [ 0 .. 11 ] do
        ctx.rotate( pi / 6.0 )
        ctx.save()
        ctx.scale(1.0, fontScale)
        ctx.fillText( (i+1) |> roman, 0., -(radius - 24.) / fontScale)
        ctx.restore()

    ctx.restore()

    // Dot markings
    for i in [ 0 .. 59 ] do
        ctx.save()
        ctx.rotate( float i * pi / 30.0 )
        ctx.translate( 0., -radius + 12. )
        ctx.beginPath()
        if i % 5 = 0 then
            ctx.moveTo(0., 6.)
            ctx.lineTo(4.0, 0.0)
            ctx.lineTo(0.0, -6.0)
            ctx.lineTo(-4.0, 0.0)
            ctx.lineTo(0.0, 6.0)
        else
            ctx.arc( 0., 0., 3., 0., 2. * pi )
        ctx.fill()
        ctx.restore()

    // Second hand
    ctx.save()
    ctx.rotate( pi * 2.0 * float time.Second / 60.0)
    ctx.beginPath()
    ctx.moveTo(0.0, 0.0)
    ctx.lineTo(0.0, -(radius - 30.0))
    ctx.stroke()
    ctx.restore()

    // Minute hand
    ornateHand  ctx (radius-30.0)
        (angle (
            float time.Minute / 60.0 +
            float time.Second / 3600.0
        ))

    // Hour hand
    ornateHand ctx (radius-100.0)
        (angle (
            float time.Hour / 12.0 +
            float time.Minute / (12.0 * 60.0) +
            float time.Second / (12.0 * 60.0 * 60.0)
        ))

    // Center
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle <- U3.Case1 "#440000"
    ctx.arc( 0.0, 0.0, 10.0, 0.0, 2.0 * pi)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle <- U3.Case1 "#FFFF44"
    ctx.arc( 0.0, 0.0, 4.0, 0.0, 2.0 * pi)
    ctx.fill()
    ctx.restore()
