module App

open System
open Browser

open Elmish
open Fable.React
open Fable.React.Props
open Fulma

open DrawingCanvas

type Model = { CurrentTime : DateTime }

type Msg =
    | Tick of DateTime

let timerTick dispatch =
    window.setInterval(fun _ ->
        dispatch (Tick DateTime.Now)
    , 1000) |> ignore

let init () : Model * Cmd<Msg> =
  { CurrentTime = DateTime.Now }, Cmd.ofSub timerTick

let subscription _ = Cmd.ofSub timerTick

let update msg model : Model * Cmd<Msg> =
    match msg with
    | Tick time ->
        {model with CurrentTime = time}, Cmd.none

let view model dispatch =
    div [ Style [ Width "500px"; MarginLeft "Auto"; MarginRight "Auto"; MarginTop "24px" ]] [
        drawingcanvas
            {
                Props = [
                    //Style [ Border "solid #dedede 1px" ]
                ]
                //Redraw = model.CurrentTime |> ClockUsingFunction.clock |> DrawFunction
                //Redraw = ClockUsingBuilder.clock model.CurrentTime |> Drawing
                Redraw = ClockUsingList.clock model.CurrentTime |> Drawing
            }
    ]

open Elmish.React


// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
