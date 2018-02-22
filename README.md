# Firebase Backend
Firebase backend to build CMS


# Developer

## Run

* Run `tsc`, Unit Test, deploy to functions-emulator.
````
$ tsc --watch
$ ./node_modules/.bin/mocha lib/test/test.js --watch -t 100000 // Unit Testing...
$ ./node_modules/.bin/functions-emulator deploy api --trigger-http
````

* Get Resource URL from functions-emulator after deploy and put it in `test.ts`

## Documents & References

* [Developer's Programming Guide](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#)



## How To Install For Developers.

* short
````
$ npm i
$ tsc --watch
````

* [Work Environment Installation For Developers](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.lh0k5q34a24s)

### How to code with Firebase Functions Emulator

* In short,
````
$ ./node_modules/.bin/functions --help                ; Help
$ sudo ./node_modules/.bin/functions start            ; You may( or may not ) need to do `sudo` to start.
                                                    ; Start emulator first, before you are going to deploy your code to emulator.
$ sudo ./node_modules/.bin/functions stop             ; stop emulator
$ sudo ./node_modules/.bin/functions kill             ; kill emulator if you fail to stop emulator.
$ ./node_modules/.bin/functions deploy Api --trigger-http ; deploy a http function.
````

* [Using Firebase Functions Emulator](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.anlypegtz2yg)


