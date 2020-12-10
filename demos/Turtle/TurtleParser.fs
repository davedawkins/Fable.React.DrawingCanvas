module TurtleParser

open System
open Fable.React.DrawingCanvas
open Browser.Dom
open System.Collections.Generic
open Fable.React.DrawingCanvas.Builder

type ParseResult<'T> =
    | Success of 'T
    | Error of string

type Parser<'T> = Parser of (string -> ParseResult<'T * string>)

type BinOp =
    | Eq
    | Ne
    | Lt
    | Le
    | Gt
    | Ge
    | Add
    | Mul
    | Subtr
    | Div

type Expr =
    | Num of float
    | Id of string
    | BinOp of (BinOp*Expr*Expr)

type TCommand =
    | TDrawCommand of DrawCommand
    | TNumeric of (Expr * (float->DrawCommand))
    | TBlock of TCommand list
    | TRepeat of (Expr*TCommand list)
    | TLet of (string*Expr)

type Context = {
    Vars : Dictionary<string,float>
}

let run parser input =
    let (Parser fn) = parser
    fn input

let skipWhite (input : string) = input.TrimStart()
let atEnd (input : string) = input = ""
let isChar c1 c2 = c1 = c2

let map f p =
    let inner input =
        let r = run p input
        match r with
        | Error msg -> Error msg
        | Success (v,i) -> Success (v |> f, i)
    Parser inner

let andThen first second =
    let inner input =
        match (run first input) with
        | Error msg -> Error msg
        | Success (value1, input') ->
            let result2 = run second input'
            match result2 with
            | Error msg -> Error msg
            | Success (value2, input'')
                -> Success((value1,value2), input'')
    Parser inner

let andThenDiscardFirst first second =
    let inner input =
        match (run first input) with
        | Error msg -> Error msg
        | Success (_, input') ->
            let result2 = run second input'
            match result2 with
            | Error msg -> Error msg
            | Success (value2, input'')
                -> Success(value2, input'')
    Parser inner

let andThenDiscardSecond first second =
    let inner input =
        match (run first input) with
        | Error msg -> Error msg
        | Success (value1, input') ->
            let result2 = run second input'
            match result2 with
            | Error msg -> Error msg
            | Success (_, input'')
                -> Success(value1, input'')
    Parser inner

let ( .>>. ) = andThen
let ( ..>. ) = andThenDiscardFirst
let ( .>.. ) = andThenDiscardSecond

let orElse first second =
    let inner input =
        match (run first input) with
        | Success result -> Success result
        | Error _ -> run second input
    Parser inner

let ( <|> ) = orElse

let parseKeyword keyword=
    let inner (input:string) =
        let input' = skipWhite input
        if input'.StartsWith(keyword) then
            console.log(sprintf "keyword '%s', '%s'" keyword input'.[keyword.Length..])
            Success( keyword, input'.[keyword.Length..])
        else
            Error (sprintf "Keyword not found: %s" keyword)
    Parser inner

let parseSingle keyword turtleCommand =
    (parseKeyword keyword) |> map (fun _ -> turtleCommand)

let parseChar predicate name =
    let inner (input:string) =
        if (input.Length = 0) || not(predicate(input.[0])) then
            Error (sprintf "Not a %s" name)
        else
            console.log(sprintf "char '%c', '%s'" input.[0] input.[1..])
            Success(input.[0],input.[1..])
    Parser inner

let parseDigit =
    parseChar Char.IsDigit "digit"

let parseWhite =
    parseChar Char.IsWhiteSpace "digit"

let eatWhite =
    let inner input =
        Success((), input |> skipWhite )
    Parser inner

let parseEnd =
    let inner input =
        if (atEnd input) then
            Success(char 0,input)
         else
            Error "Not EOF"
    Parser inner

let parseSequence elementParser =
    let rec accum state input =
        let r = run elementParser input
        match r with
        | Error msg ->
            //console.log(sprintf "End of sequence with %s at %s" msg input)
            Success (state, input)
        | Success (cmd,input') ->
            //console.log(sprintf "Parsed sequence element %A" cmd)
            accum (state @ [cmd]) input'

    Parser (accum [])

let optional p =
    let inner input =
        let r = run p input
        match r with
        | Error _ -> Success(None, input)
        | Success (v,remainder) -> Success(Some v, remainder)
    Parser inner

let parseNumber =
    let inner input =
        let p =
            (optional (parseChar (isChar '-') "negate"))
            .>>. (parseSequence parseDigit)
            .>>. (optional (parseChar (isChar '.') "point" .>>. parseSequence parseDigit))
            //.>>. (parseWhite <|> parseEnd)
        let r = run p (skipWhite input)
        match r with
        | Error msg -> Error msg
        | Success (((neg,digits),dec), remainder) ->
            if digits.IsEmpty then
                Error "Not a number"
            else
                let dval c = (int c - int '0')
                let m10 (n: float) (c : char) = n * 10.0 + (dval c |> float)
                let d10 (c : char) (n: float)  = (n  + (dval c |> float)) / 10.0

                let mant =
                    match dec with
                    | None -> 0.0
                    | Some (_,digits) -> List.foldBack d10 digits 0.0

                let n = ((digits |> List.fold m10 0.0) + mant) * (if neg.IsSome then -1.0 else 1.0)
                console.log(sprintf "Number %f, '%s'" n remainder)
                Success( n, remainder)
    Parser inner

let parseString =
    let inner input =
        let q c = isChar c '"'
        let nq c = not (q c)

        let p = (parseChar q "quote") ..>. (parseSequence (parseChar nq "string character")) .>.. (parseChar q "quote")
        let r = run p (skipWhite input)
        match r with
        | Error msg -> Error msg
        | Success (chars, remainder) ->
            Success ( String( List.toArray chars ), remainder )
    Parser inner

let parseIdent =
    let inner input =
        let p = (parseChar Char.IsLetter "letter") .>>. (parseSequence (parseChar Char.IsLetterOrDigit "ident character"))
        let r = run p (skipWhite input)
        match r with
        | Error msg -> Error msg
        | Success ((first,chars) , remainder) ->
            Success (sprintf "%c%s" first (String( List.toArray chars )), remainder)
    Parser inner


let parseNum = eatWhite ..>. parseNumber |> map Num
let parseIdRef = parseIdent |> map Id

let rec parseBinOp =
    let inner keyw op input =
        let p = (parseNum <|> parseIdRef) .>>. parseKeyword keyw .>>. (parseNum <|> parseIdRef)
        let r = run p (skipWhite input)
        match r with
            | Error msg -> Error msg
            | Success (((a,k),b), remainder) ->
                console.log(sprintf "binOp %s: %A %A" k a b)
                Success(BinOp (op,a,b), remainder)
    let binOps = [
        Parser (inner "=" Eq)
        Parser (inner "<>" Ne)
        Parser (inner ">" Gt)
        Parser (inner ">=" Ge)
        Parser (inner "<" Lt)
        Parser (inner "<=" Le)
        Parser (inner "+" Add)
        Parser (inner "-" Subtr)
        Parser (inner "*" Mul)
        Parser (inner "/" Div)
    ]
    binOps |> List.reduce orElse

and parseExpr =
    eatWhite ..>. (parseBinOp <|> parseNum <|> (parseIdent |> map Id))

let parseNumericCommand keyword =
    (andThen (parseKeyword keyword) parseExpr)

let parseStringCommand keyword =
    (andThen (parseKeyword keyword) parseString)

let rec parseCommand =
    [
        (parseKeyword "clear" .>>. (optional parseString))
            |> map (fun (_,bg) ->
                let fillColor = match bg with
                    | None -> "white"
                    | Some s -> s
                Sub [
                    Canvas (FillColor fillColor)
                    Canvas (StrokeColor "Black")
                    Canvas (FillRect (0., 0., 500., 500.))
                ] |> TDrawCommand
            )
        (parseNumericCommand "forward") |> map (fun (_,e) -> TNumeric (e,Forward>>Turtle))
        (parseNumericCommand "turn") |> map (fun (_,e) -> TNumeric (e,Turn>>Turtle))
        (parseStringCommand  "penColor") |> map (fun (_,s) -> PenColor s|> Turtle |> TDrawCommand)
        (parseNumericCommand "rotateHue") |> map (fun (_,e) -> TNumeric (e,RotateHue>>Turtle))
        (parseNumericCommand "increaseWidth") |> map (fun (_,e) -> TNumeric (e,IncreaseWidth>>Turtle))
        (parseNumericCommand "increaseAlpha") |> map (fun (_,e) -> TNumeric (e,IncreaseAlpha>>Turtle))

        (parseBlock |> map TBlock)

        (parseKeyword "let" ..>. parseIdent .>.. parseKeyword "=" .>>. parseExpr)
            |> map (fun (id,e) -> TLet (id,e))

        ((parseNumericCommand "repeat") .>>. parseBlock)
            |> map (fun ((_,n),cmd) -> TRepeat (n,cmd) )

        parseSingle "penUp" (PenUp|> Turtle |> TDrawCommand)
        parseSingle "penDown" (PenDown|> Turtle |> TDrawCommand)

    ] |> List.reduce orElse

and parseCommands =
    let rec accum (state : TCommand list) input =
        let stripped = skipWhite input
        if atEnd stripped then
            Success(state,stripped)
        else
            let r = run parseCommand stripped
            match r with
            | Error msg ->
                if state.IsEmpty then
                    Error msg
                else
                    Success(state,stripped)
            | Success (cmd,input') ->
                accum (state @ [cmd]) input'

    Parser (accum [])

and parseBlock =
    let inner input =
        let p =
            eatWhite
            ..>. parseChar (isChar '{') "left curly"
            .>>. parseCommands
            .>.. eatWhite
            .>>. parseChar (isChar '}') "right curly"
        let r = run p (skipWhite input)
        match r with
        | Error msg -> Error msg
        | Success (((lc, block), rc), remainder) ->
            Success (block, remainder)
    Parser inner

let parse input =
    let r = run parseCommands input
    match r with
    | Error msg ->
        console.log(msg); None
    | Success (cmds,remainder) ->
        if remainder |> skipWhite |> atEnd then
            Some cmds
        else
            console.log(sprintf "Error: %s" remainder)
            None

let rec eval context (expr : Expr) : float =
    let valOf e = eval context e
    let ofBool b = if b then 1.0 else 0.0
    match expr with
    | BinOp (Add,a,b) -> (valOf a) + (valOf b)
    | BinOp (Subtr,a,b) -> (valOf a) - (valOf b)
    | BinOp (Mul,a,b) -> (valOf a) * (valOf b)
    | BinOp (Div,a,b) -> (valOf a) / (valOf b)
    | BinOp (Eq,a,b) -> (valOf a) = (valOf b) |> ofBool
    | BinOp (Ne,a,b) -> (valOf a) <> (valOf b) |> ofBool
    | BinOp (Lt,a,b) -> (valOf a) <= (valOf b) |> ofBool
    | BinOp (Le,a,b) -> (valOf a) >= (valOf b) |> ofBool
    | BinOp (Gt,a,b) -> (valOf a) > (valOf b) |> ofBool
    | BinOp (Ge,a,b) -> (valOf a) >= (valOf b) |> ofBool
    | Num n -> n
    | Id id -> context.Vars.[id]

let evalProgram program =
    let context = { Vars = Dictionary<string,float>() }
//    context.Vars.["t"] <-
    let rec evalCmds cmds =
        cmds |> List.fold (fun list cmd -> list @ [evalCmd cmd]) []
    and evalCmd cmd =
        match cmd with
        | TBlock block -> Sub (evalCmds block)
        | TDrawCommand dc -> dc
        | TNumeric (e,c) -> (c (eval context e))
        | TRepeat (e,block) ->
            let n = (eval context e)
            console.log(sprintf "TRepeat %d" (int n))
            ListHelpers.loop [1..(int n)] (fun _ -> evalCmds block)
        | TLet (id,e) ->
            context.Vars.[id] <- eval context e
            Sub []

    evalCmds program

let generate input =
    parse input |> Option.map evalProgram |> Option.map (fun x -> fun () -> x)

let a = 10
