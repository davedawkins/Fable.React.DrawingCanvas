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
            ifThen true (lazy drawing { beginPath; fill })
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
            ifThen false (lazy drawing { beginPath; fill })
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
            ifThenElse true (lazy drawing { beginPath; fill }) (lazy drawing { beginPath; stroke })
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
            ifThenElse false (lazy drawing { beginPath; fill }) (lazy drawing { beginPath; stroke })
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

]
