module TurtleParser

open System
open Fable.React.DrawingCanvas
open Browser.Dom
open System.Collections.Generic
open Fable.React.DrawingCanvas.Builder

module Parser =

    type ParseResult<'T> =
        | Success of 'T
        | Error of string

    module ParseResult =
        [<CompiledName("Map")>]
        let map f self =
            match self with
            | Error s -> Error s
            | Success t -> t |> f |> Success

        [<CompiledName("MapFst")>]
        let mapFst f self =
            self |> map (fun (a,b) -> (a|>f, b))

        [<CompiledName("MapSnd")>]
        let mapSnd f self =
            self |> map (fun (a,b) -> (a, b|>f))

    type Parser<'T> = Parser of (string -> ParseResult<'T * string>)

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
                //console.log(sprintf "keyword '%s', '%s'" keyword input'.[keyword.Length..])
                Success( keyword, input'.[keyword.Length..])
            else
                Error (sprintf "Keyword not found: %s" keyword)
        Parser inner

    let parseChar predicate name =
        let inner (input:string) =
            if (input.Length = 0) || not(predicate(input.[0])) then
                Error (sprintf "Not a %s" name)
            else
                //console.log(sprintf "char '%c', '%s'" input.[0] input.[1..])
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

    let lookahead p =
        let inner input =
            run p input |> ParseResult.mapSnd (fun _ -> input)
        Parser inner

    let choose parsers =
        parsers |> List.reduce (<|>)

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
                    //console.log(sprintf "Number %f, '%s'" n remainder)
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

open Parser

let parseSingle keyword turtleCommand =
    (parseKeyword keyword) |> map (fun _ -> turtleCommand)

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
    | Mod

type Expr =
    | Num of float
    | Id of string
    | Bin of (BinOp*Expr*Expr)

type TCommand =
    | TDrawCommand of DrawCommand
    | TNumeric of (Expr * (float->DrawCommand))
    | TBlock of TCommand list
    | TRepeat of (Expr*TCommand list)
    | TLet of (string*Expr)

type Context = {
    Vars : Dictionary<string,float>
}

let parseNum = eatWhite ..>. parseNumber |> map Num
let parseIdRef = parseIdent |> map Id

// Turn "+" -> BinOp.Add
let parseOp (token:string,op:BinOp) =
    let inner input =
        input |> run (parseKeyword token) |> ParseResult.mapFst (fun k -> op)
    Parser inner

let parseOps ops =
    ops |> List.map parseOp |> choose

let parseMulOp =
    [
        ("*",Mul)
        ("/",Div)
        ("%",Mod)
    ] |> parseOps

let parseAddOp =
    [
        ("+",Add)
        ("-",Subtr)
    ] |> parseOps

let parseRelOp =
    [
        ("=",Eq)
        ("<>",Ne)
        ("<",Lt)
        ("<=",Le)
        (">",Gt)
        (">=",Ge)
    ] |> parseOps

let buildBinTree =
    ParseResult.mapFst <| // Map result, let remainder go through unchanged
        fun (f,optTail) ->
            match optTail with
                | None -> f // Was just factor like 1.0 or x
                | Some tail -> tail |> (List.fold (fun a (op,b) -> Bin(op,a,b)) f)

let rec parseFactor =
    (parseNum <|> parseIdRef <|> parseSubExpr)
and parseSubExpr =
    parseKeyword "(" ..>. parseExpr .>.. parseKeyword ")"
and parseMulExpr =
    let inner input =
        let p = parseFactor
                    .>>. ((parseMulOp .>>. parseFactor) |> parseSequence |> optional)
        run p input |> buildBinTree
    Parser inner
and parseAddExpr =
    let inner input =
        let p = parseMulExpr
                    .>>. ((parseAddOp .>>. parseMulExpr) |> parseSequence |> optional)
        run p input |> buildBinTree
    Parser inner
and parseExpr =
    eatWhite ..>. parseAddExpr

let parseNumericCommand keyword =
    (andThen (parseKeyword keyword) parseExpr)

let parseStringCommand keyword =
    (andThen (parseKeyword keyword) parseString)

let rec parseCommand =
    [
        (parseKeyword "clear" .>>. (optional parseString))
            |> map (fun (_,bg) ->
                let fillColor =
                    match bg with
                        | None -> "white"
                        | Some s -> s
                Sub [
                    Canvas (FillColor fillColor)
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
        parseSingle "push" (Push |> Turtle |> TDrawCommand)
        parseSingle "pop" (Pop |> Turtle |> TDrawCommand)

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

//  factor: id | number | string | '(' expr ')'
//  unop:
//  mul:    factor  [ ('*'|'/'|'%') factor ]
//  add:    mul [ ('+'|'-')  mul ]
//  expr:   add

let parse input =
    let r = run parseCommands input
    match r with
    | Error msg ->
        Error msg
    | Success (cmds,remainder) ->
        if remainder |> skipWhite |> atEnd then
            Success cmds
        else
            Error (sprintf "Syntax error at: %s" remainder)

let rec eval context (expr : Expr) : float =
    let valOf e = eval context e
    let ofBool b = if b then 1.0 else 0.0
    match expr with
    | Bin (Add,a,b) -> (valOf a) + (valOf b)
    | Bin (Subtr,a,b) -> (valOf a) - (valOf b)
    | Bin (Mul,a,b) -> (valOf a) * (valOf b)
    | Bin (Div,a,b) -> (valOf a) / (valOf b)
    | Bin (Mod,a,b) -> (valOf a) % (valOf b)
    | Bin (Eq,a,b) -> (valOf a) = (valOf b) |> ofBool
    | Bin (Ne,a,b) -> (valOf a) <> (valOf b) |> ofBool
    | Bin (Lt,a,b) -> (valOf a) <= (valOf b) |> ofBool
    | Bin (Le,a,b) -> (valOf a) >= (valOf b) |> ofBool
    | Bin (Gt,a,b) -> (valOf a) > (valOf b) |> ofBool
    | Bin (Ge,a,b) -> (valOf a) >= (valOf b) |> ofBool
    | Num n -> n
    | Id id ->
        try
            context.Vars.[id]
        with
        | _ -> 0.0

// Build a Drawing from a parse tree, evaluating Exprs
let evalProgram program =
    let context = { Vars = Dictionary<string,float>() }

    context.Vars.["t"] <- float(DateTime.Now.Ticks / int64 10000)
    //console.log( context.Vars.["t"] )

    let rec evalCmds cmds =
        cmds |> List.fold (fun list cmd -> list @ [evalCmd cmd]) []
    and evalCmd cmd =
        match cmd with
        | TBlock block -> Sub (evalCmds block)
        | TDrawCommand dc -> dc
        | TNumeric (e,c) -> (c (eval context e))
        | TRepeat (e,block) ->
            let n = (eval context e)
            //console.log(sprintf "TRepeat %d" (int n))
            ListHelpers.loop [1..(int n)] (fun _ -> evalCmds block)
        | TLet (id,e) ->
            context.Vars.[id] <- eval context e
            Sub []

    evalCmds program

let makeLazy x = fun () -> x

// Parse a user drawing into a LazyDrawing
let generate input color =
    parse input
        |> ParseResult.map evalProgram
        |> ParseResult.map (fun d -> (PenColor color |> Turtle) :: d)
        |> ParseResult.map makeLazy

