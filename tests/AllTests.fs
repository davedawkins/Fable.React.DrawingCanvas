module Program

open Fable.Mocha
open System

Mocha.runTests  [
        Test.DrawingCanvas.Builder.tests
        //Test.DrawingCanvas.List.tests
        Test.DrawingCanvas.Turtle.tests
        ]
