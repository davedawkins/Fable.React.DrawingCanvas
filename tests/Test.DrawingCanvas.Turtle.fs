module Test.DrawingCanvas.Turtle

open Util
open Fable.Mocha
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Turtle

let tests = testList "DrawingCanvas.Turtle" [

    testCase "Turtle basic" <| fun () ->
        let d = turtle {
            penDown
            forward 1.0
        }

        let expected = [
            BeginPath
            MoveTo (0.0,0.0)
            LineTo (1.0,0.0)
            Translate (1.0,0.0)
            Stroke
        ]
        expectDrawingsEqual expected d

    testCase "Turtle nested" <| fun () ->
        let d = turtle {
            penDown
            insert (turtle {
                turn 180.0
            })
            forward 1.0
        }

        let expected = [
            BeginPath
            MoveTo (0.0,0.0)
            Rotate (System.Math.PI)
            LineTo (1.0,0.0)
            Translate (1.0,0.0)
            Stroke
        ]
        expectDrawingsEqual expected d

    testCase "Turtle ifThen" <| fun () ->
        let d = turtle {
            penDown
            ifThen true (lazy turtle { turn 180. })
        }

        let expected = [
            BeginPath
            MoveTo (0.,0.)
            Rotate (System.Math.PI)
            Stroke
        ]

        expectDrawingsEqual expected d


    testCase "Turtle ifThenFn" <| fun () ->
        let tfn() = turtle {
            ifThen true (lazy turtle { turn 180. })
        }

        let d = turtle {
            penDown
            insert (tfn())
        }

        let expected = [
            BeginPath
            MoveTo (0.,0.)
            Rotate (System.Math.PI)
            Stroke
        ]

        expectDrawingsEqual expected d

    testCase "Turtle pen Up Down" <| fun () ->
        let d = turtle {
            penUp
            forward 1.
            penDown
            forward 2.
            penUp
            forward 3.
        }

        let expected = [
            BeginPath

            MoveTo (1.,0.)
            Translate (1.,0.)

            MoveTo (0.,0.)

            LineTo (2.,0.)
            Translate (2.,0.)

            MoveTo (3.,0.)
            Translate (3.,0.)

            Stroke
        ]

        expectDrawingsEqual expected d

    testCase "Turtle pen Up Down Fn" <| fun () ->
        let f = turtle {
            forward 2.
        }
        let d = turtle {

            penUp
            forward 1.
            penDown
            insert f
            penUp
            forward 3.
        }

        let expected = [
            BeginPath

            MoveTo (1.,0.)
            Translate (1.,0.)

            MoveTo (0.,0.)

            LineTo (2.,0.)
            Translate (2.,0.)

            MoveTo (3.,0.)
            Translate (3.,0.)

            Stroke
        ]

        expectDrawingsEqual expected d

]
