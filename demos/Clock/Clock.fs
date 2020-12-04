module CLock

open System
open Browser

open Elmish
open Fable.React
open Fable.React.Props
open Fulma

open Fable.React.DrawingCanvas

type DrawMethod =
    | Builder
    | List
    | Func

type Model =
    { CurrentTime: DateTime
      DrawMethod: DrawMethod }

type Msg = Tick of DateTime

let timerTick dispatch =
    window.setInterval ((fun _ -> dispatch (Tick DateTime.Now)), 1000)
    |> ignore

let init (): Model * Cmd<Msg> =
    { CurrentTime = DateTime.Now
      DrawMethod = List },
    Cmd.ofSub timerTick

let subscription _ = Cmd.ofSub timerTick

let update msg model: Model * Cmd<Msg> =
    match msg with
    | Tick time -> { model with CurrentTime = time }, Cmd.none

let view model dispatch =
    div [ Style [ Width "500px"
                  MarginLeft "Auto"
                  MarginRight "Auto"
                  MarginTop "24px" ] ] [
        drawingcanvas
            { Props = []
              Redraw =
                  match model.DrawMethod with
                  | Func ->
                      model.CurrentTime
                      |> ClockUsingFunction.clock
                      |> DrawFunction
                  | Builder ->
                      ClockUsingBuilder.clock model.CurrentTime
                      |> Drawing
                  | List -> ClockUsingList.clock model.CurrentTime |> Drawing }
    ]

open Elmish.React

// App
Program.mkProgram init update view
|> Program.withReactSynchronous "elmish-app"
|> Program.run
