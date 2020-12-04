module Test.DrawingCanvas.List

open Fable.Mocha
open Fable.React.DrawingCanvas
open Fable.React.DrawingCanvas.ListHelpers

let expectListEqual (expected:List<'T>) (value: List<'T>) =
    Expect.areEqual expected.Length value.Length
    for p in List.zip expected value do
        Expect.areEqual (fst p) (snd p)


let tests = testList "DrawingCanvas.List" [

    testCase "List ifThen true" <| fun () ->
        let d = [
            Save
            ifThen true (lazy [ BeginPath; Fill ])
            Restore
        ]

        let expected = [
            Save
            Insert [ BeginPath; Fill ]
            Restore
        ]

        expectListEqual expected d

    testCase "List IfThen false" <| fun () ->
        let d = [
            Save
            ifThen false (lazy [ Fill ])
            Restore
        ]

        let expected = [
            Save
            Insert []
            Restore
        ]

        expectListEqual expected d

    testCase "Builder IfThenElse true" <| fun () ->
        let d = [
            Save
            ifThenElse true (lazy [ BeginPath; Fill ]) (lazy [ BeginPath; Stroke ])
            Restore
        ]

        let expected = [
            Save
            Insert [ BeginPath; Fill ]
            Restore
        ]

        expectListEqual expected d

    testCase "List IfThenElse false" <| fun () ->
        let d = [
            Save
            ifThenElse false (lazy [ BeginPath; Fill ]) (lazy [ BeginPath; Stroke ])
            Restore
        ]

        let expected = [
            Save
            Insert [ BeginPath; Stroke ]
            Restore
        ]

        expectListEqual expected d

]
