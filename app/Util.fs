module Util

let rec roman (n : int) =
    match n with
    | i when i <= 3 ->
        String.replicate i "I"
    | 4 -> "IV"
    | i when i >= 5 && i <= 8 ->
        (i - 5) |> roman |> sprintf "V%s"
    | 9 -> "IX"
    | i when i >= 10 && i <= 12 ->
        (i - 10) |> roman |> sprintf "X%s"
    | _ -> "?"