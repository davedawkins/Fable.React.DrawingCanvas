#r "paket: groupref build //"
#load "./.fake/build.fsx/intellisense.fsx"
#r "netstandard"

open Fake.Core
open Fake.DotNet
open Fake.IO
open System
open System.IO
//open Fake

let app = "./app"

let platformTool tool winTool =
  let tool = if isUnix then tool else winTool
  tool
  |> ProcessHelper.tryFindFileOnPath
  |> function Some t -> t | _ -> failwithf "%s not found" tool

let mutable dotnetCli = "dotnet"
let mutable npmCli = "npm"

let run fileName args workingDir  =
    printfn "CWD: %s" workingDir
    let fileName, args =
        if EnvironmentHelper.isUnix
        then fileName, args else "cmd", ("/C " + fileName + " " + args)
    let ok =
        execProcess (fun info ->
            info.FileName <- fileName
            info.WorkingDirectory <- workingDir
            info.Arguments <- args) TimeSpan.MaxValue
    if not ok then failwith (sprintf "'%s> %s %s' task failed" workingDir fileName args)

let delete file =
    if File.Exists(file)
    then DeleteFile file
    else ()

let cleanBundles() =
    Path.Combine("dist", "bundle.js")
        |> Path.GetFullPath
        |> delete
    Path.Combine("dist", "bundle.js.map")
        |> Path.GetFullPath
        |> delete

let cleanCacheDirs() =
    // clean libraries
    [ "Fable.React.Autocomplete" ]
    |> List.map (fun lib -> "src" </> lib)
    |> List.collect (fun lib -> [ lib </> "bin"; lib </> "obj" ])
    |> List.append [ app </> "bin"; app </> "obj" ]
    |> List.iter CleanDir

Target "Clean" <| fun _ ->
    cleanCacheDirs()
    cleanBundles()

Target "InstallNpmPackages" (fun _ ->
  run "npm" "--version" __SOURCE_DIRECTORY__
  run "yarn" "install" __SOURCE_DIRECTORY__
)

Target "Restore" <| fun _ ->
  run dotnetCli "restore" app

Target "Watch" <| fun _ ->
    run npmCli "run start" app

let publish projectPath = fun () ->
    [ projectPath </> "bin"
      projectPath </> "obj" ] |> CleanDirs
    run dotnetCli "restore --no-cache" projectPath
    run dotnetCli "pack -c Release" projectPath
    let nugetKey =
        match environVarOrNone "NUGET_KEY" with
        | Some nugetKey -> nugetKey
        | None -> failwith "The Nuget API key must be set in a NUGET_KEY environmental variable"
    let nupkg =
        Directory.GetFiles(projectPath </> "bin" </> "Release")
        |> Seq.head
        |> Path.GetFullPath

    let pushCmd = sprintf "nuget push %s -s nuget.org -k %s" nupkg nugetKey
    run dotnetCli pushCmd projectPath

Target "PublishPkg" (publish ("src" </> "Fable.React.DrawingCanvas"))

Target "Compile" <| fun _ ->
    run npmCli "run build" app

Target "PublishApp" <| fun _ ->
    run "npm" "run publish" "."

"Clean"
  ==> "InstallNpmPackages"
  ==> "Restore"
  ==> "Watch"

"Clean"
  ==> "InstallNpmPackages"
  ==> "Restore"
  ==> "Compile"

"Clean"
  ==> "InstallNpmPackages"
  ==> "Restore"
  ==> "Compile"
  ==> "PublishApp"

RunTargetOrDefault "Compile"
