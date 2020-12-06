module Test.DrawingCanvas.Builder

open Util
open Fable.Mocha
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.Builder

let tests = testList "DrawingCanvas.Builder" [

    testCase "Create a drawing" <| fun () ->

        let d = drawing {
            save
            fillColor "red"
            fillRect 0.0 0.0 100.0 100.0
            restore
        }

        let expected = [
            Save
            FillStyle (Color "red")
            FillRect (0.0, 0.0, 100.0, 100.0)
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder ifThen true" <| fun () ->
        let d = drawing {
            save
            ifThen
                true
                (drawing { beginPath; fill })
            restore
        }

        let expected = [
            Save
            BeginPath
            Fill
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder IfThen false" <| fun () ->
        let d = drawing {
            save
            ifThen
                false
                (drawing { beginPath; fill })
            restore
        }

        let expected = [
            Save
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder IfThenElse true" <| fun () ->
        let d = drawing {
            save
            ifThenElse
                true
                (drawing { beginPath; fill })
                (drawing { beginPath; stroke })
            restore
        }

        let expected = [
            Save
            BeginPath
            Fill
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder IfThenElse false" <| fun () ->
        let d = drawing {
            save
            ifThenElse false (drawing { beginPath; fill }) (drawing { beginPath; stroke })
            restore
        }

        let expected = [
            Save
            BeginPath
            Stroke
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder preserve" <| fun () ->

        let d = preserve {
            beginPath
            rect 0.0 10.0 20.0 30.0
            stroke
        }

        let expected = [
            Save
            BeginPath
            Rect (0.0, 10.0, 20.0, 30.0)
            Stroke
            Restore
        ]

        expectDrawingsEqual expected d

    testCase "Builder strokepath" <| fun () ->

        let d = strokepath {
                rect 0.0 10.0 20.0 30.0
            }

        let expected = [
            BeginPath
            Rect (0.0, 10.0, 20.0, 30.0)
            Stroke
        ]

        expectDrawingsEqual expected d

    testCase "Builder fillPath" <| fun () ->

        let d = fillpath {
                rect 0.0 10.0 20.0 30.0
            }

        let expected = [
            BeginPath
            Rect (0.0, 10.0, 20.0, 30.0)
            Fill
        ]

        expectDrawingsEqual expected d

    testCase "Builder sub" <| fun () ->

        let d0 = drawing {
            rect 0. 10. 20. 30.
        }

        let d = fillpath {
                sub d0
            }

        let expected = [
            BeginPath
            Rect (0.0, 10.0, 20.0, 30.0)
            Fill
        ]

        expectDrawingsEqual expected d

    testCase "Builder loop" <| fun () ->

        let d = drawing {
                repeat [0 .. 1] (fun i -> drawing {
                    rect (float i) 10. 20. 30.
                })
            }

        let expected = [
            Rect (0.0, 10.0, 20.0, 30.0)
            Rect (1.0, 10.0, 20.0, 30.0)
        ]

        expectDrawingsEqual expected d

    testCase "Builder loop sub" <| fun () ->

        let d0 i = drawing {
            rect (float i) 10. 20. 30.
        }

        let d = drawing {
                repeat [0 .. 1] d0
            }

        let expected = [
            Rect (0.0, 10.0, 20.0, 30.0)
            Rect (1.0, 10.0, 20.0, 30.0)
        ]

        expectDrawingsEqual expected d

]
