# Firebase Backend
Firebase backend to build CMS


# TODO List

* Do not nest too much methods. It is extreamly difficult to debug.

* User Management
With IDTokens https://firebase.google.com/docs/auth/admin/verify-id-tokens

* Post Management
Based on Post Management Module
Forum Plugin
Task( TODO LIST ) Management Plugin
Blog Plugin
Shopping Mall Plugin




# Developer

## Run

* Run `tsc --watch`, and run mocha to do Unit Test.



## Unit Testing

* [Unit Testing](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.tdpnuuowlpnt)


### Library Testing

* `Library Testing` is testing by instantiating `new Router()`.

    This means, It does not connect to `Firebase Functions`.

    It initiates `Firebase Admin SDK` and test directly on `Firestore`.

* Mocha does not seem to release the connection of `Firebase Admin SDK` so, when mocha runs next time, there will be initializeApp() problems.

    In this case, you can use ` nodemon `


````
$ tsc --watch
$ nodemon --watch lib ./node_modules/.bin/mocha src/unit-test/user-register-update.ts --compilers ts:ts-node/register -t 99999 // Typescript Test
$ nodemon --watch lib ./node_modules/.bin/mocha lib/unit-test/user-register-update.js --watch -t 100000 // Javascript test.
````
##### In Windows
You need to point into mocha js file.
````
$ nodemon .\node_modules\mocha\bin\_mocha .\lib\unit-test\server\router.js --watch .\lib\  -t 10000
````

#### Firebase Functions Test

* Testing real `Firebase Functions`. Tests under `unit-test/server` will not use `Firebase Admin SDK`. That means, it will directly connection to `Firebase Functions HTTP Triggers`.

````
$ ./node_modules/.bin/mocha src/unit-test/server/user-register-update.ts --compilers ts:ts-node/register --watch -t 100000 // Use TypeScript to test.
$ /node_modules/.bin/mocha lib/unit-test/server/router.js --watch -t 100000
$ ./node_modules/.bin/mocha lib/unit-test/server/user-register-update.js --watch -t 100000
````
##### In Windows
You need to point into mocha js file.
````
$ nodemon .\node_modules\mocha\bin\_mocha .\lib\unit-test\server\router.js --watch .\lib\  -t 10000
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




## Return value from `Router()`

* Returns value from `Router()` must be an ERROR_OBJECT object.




## Hook system

* Adding a hook.
Simple call
````
this.hook('hook name', 'data');
````

* How to code with hook.

Simple add ` if ( hook_name === 'your_hook' )` in `hooks.ts`


````
export function hook(name, data) {
    console.log('Hook name: ', name);
    console.log('Hook data: ', data);
    if (name === 'user.router.sanitizeUserData') {
        return data['hooked'] = 'yes';
    }
    return data;
}
````
