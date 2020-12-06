module Util

open System
open Fable.Mocha
open Fable.React.DrawingCanvas

let expectListEqual (expected:List<'T>) (value: List<'T>) =
    Expect.areEqual expected.Length value.Length
    for p in List.zip expected value do
        Expect.areEqual (fst p) (snd p)

let expectDrawingsEqual (expected:CanvasCommand list) (value:DrawCommand list) =
    let turtle = { IsPenDown = false }
    expectListEqual expected (value |> translate turtle |> Seq.toList)
