module App

open Browser.Dom
open Fable.React

type AnimalProps = { sound: string }

// Functional components
let Dog (props: AnimalProps) =
    h1 [] [ str "I'm a dog! I do "; str props.sound ]

let inline dog sound = ofFunction Dog { sound = sound } []

let Cat = FunctionComponent.Of(fun (props: AnimalProps) ->
   h1 [] [ str "I'm a cat! Your message is: "; str props.sound ]
, "Cat")

let inline cat sound = Cat { sound = sound }

// Class components
type Horse (props) =
    inherit Component<AnimalProps, obj>(props)
    
    override this.render() = h1 [] [ str "I'm a horse! I do "; str props.sound ]

let inline horse sound = ofType<Horse,_,_> { sound = sound } []

type Cow(props) =
    inherit PureStatelessComponent<AnimalProps>(props)
   
    override this.render() = h1 [] [ str "I'm a Cow! I do "; str props.sound ]

let inline cow sound = ofType<Cow,_,_> { sound = sound } []

let view =
    div [ ] [
        dog "Woof!"
        cat "Meow!"
        horse "Neigh!"
        cow "Moo!"
    ]

ReactDom.render (view, document.getElementById("react-app"))