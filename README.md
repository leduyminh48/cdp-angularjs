# Web UI for OSM project

## Knowledge base and resources

Please see [KB](https://kb.epam.com/display/~Yevhen_Yefremov/Web+UI+Documentation)
to find all the docs related to environment and stack on the project

## npm scripts

1. ```npm install``` installs all packages.
2. ```npm start``` runs dev environment
2. ```npm dev:minified``` runs dev environment with minified version of an app
3. ```compile:dev``` compiles dev (notminified with source maps) version into build/ folder. The folder is cleaned up before compiling
4. ```compile:prod``` compiles prod (minified without source maps) version into distrib/ folder. The folder is cleaned up before compiling
5. ```compile:prod:win``` the same as above but for Windows OS.
6. ```build``` runs ```compile:prod``` script (for CI)
7. ```run:dev``` starts static server on localhost:8080 to build/ folder
8. ```run:prod``` starts static server on localhost:8080 to build/ folder
9. ```lint``` starts static code analysis
10. ```lint:out``` starts static code analysis and reports to a file
11. ```test``` runs tests
11. ```ci:*``` scripts for ci. Described in KB


## Installing the environment

Run ```npm i``` command in the console.
Windows terminal can fail with some commands - please do use **git bash** on Windows
