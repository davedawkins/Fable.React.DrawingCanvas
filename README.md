# Fable React DrawingCanvas

[Demo](https://davedawkins.github.io/Fable.React.DrawingCanvas/)

This is a Fable React wrapper for `canvas` that allows you to declare a drawing like this:

```
    div [] [
        drawingcanvas {
            Redraw = Drawing drawing {
                resize 400.00 400.0
                translate 200.0 200.0
                lineWidth 6.0
                beginPath
                arc 0.0 0.0 195.0 0.0 (2.0 * Math.PI) true
                stroke
            }
        }
    ]
```

If you wish, you can supply a list of `DrawCommand` instead:

```
    div [] [
        drawingcanvas {
            Redraw = Drawing [
                Resize (400.0, 400.0)
                Translate (200.0, 200.0)
                LineWidth 6.0
                BeginPath
                Arc (0.0, 0.0, 195.0, 0.0, (2.0 * Math.PI), Some true)
                Stroke
            ]
        }
    ]
```

This demonstrates that `drawing { ... }` is just a builder that generates a `DrawCommand list`. Both approaches present their
challenges when it comes to control structures such as loops and conditionals.

One more option is to pass redraw function from which you may launch missiles if you wish (this is what all presentations about pure functions fear the most):

```
    div [] [
        drawingcanvas {
            Redraw = DrawFunction (fun ctx ->
                ctx.canvas.width <- 400.0
                ctx.canvas.height <- 400.0
                ctx.translate(200.0, 200.0)
                ctx.lineWidth <- 6.0
                ctx.beginPath()
                ctx.arc (0.0, 0.0, 195.0, 0.0, (2.0 * Math.PI), true)
                ctx.stroke()
            )
        }
    ]
```

The demo linked at the top of this page includes code to draw the clock in all three ways. See these files for comparison:

- ./app/ClockUsingBuilder.fs
- ./app/ClockUsingFunction.fs
- ./app/ClockUsingList.fs




