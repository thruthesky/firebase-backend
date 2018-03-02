# Firebase Backend
Firebase backend to build CMS


# TODO List

* Install on web.

* Get ID Token from client without UID and do whatever.
    ** After user registration, get ID Token with other information and update it on `x-users`.

    ** For unit-test, put a setting in `x-settings` with test=true. if it is set to true, it can test with user uid instead of ID token. After test, it should be false and by default it is false.
    request will be { idToken: test, uid: user-uid }

* Installation.
    - Web based intsallation build with `capacitor`.
    - get admin email address and put it /x-settings/admins as an array.



* Do not nest too much methods. It is extreamly difficult to debug.

* Test on every methods. Even if there are a simple method like `validateUserData()`.

* User Management
With IDTokens https://firebase.google.com/docs/auth/admin/verify-id-tokens

* Post Management
Based on Post Management Module
Forum Plugin
Task( TODO LIST ) Management Plugin
Blog Plugin
Shopping Mall Plugin




# Developer

## Resources

### Javascript Library, Frames.

* [Lodash](https://lodash.com/) is installed. Use lodash whenever possible.


## Run

* Run `tsc --watch`, and run mocha to do Unit Test.



## Unit Testing

* [Unit Testing](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.tdpnuuowlpnt)


### Library Testing

* `Library Testing` is testing by instantiating `new Router()`.

    This means, It does not connect to `Firebase Functions`.

    It initiates `Firebase Admin SDK` and test the project directly without connecting to `Firebase Functions`
    

````
$ node_modules/.bin/mocha --watch --compilers ts:ts-node/register -t 99999 src/unit-tests/library/*
$ node_modules/.bin/mocha --watch --compilers ts:ts-node/register -t 99999 src/unit-tests/library/user-verify-with-id-token.ts
````

#### Firebase Functions Test

* Testing real `Firebase Functions`. Tests under `unit-test/server` will not use `Firebase Admin SDK`. That means, it will directly connection to `Firebase Functions HTTP Triggers`.


* You can run test all scripts with `*`.


````
$ ./node_modules/.bin/mocha src/unit-tests/server/* --compilers ts:ts-node/register --watch -t 100000 // All tests
$ ./node_modules/.bin/mocha src/unit-tests/server/user-register-update.ts --compilers ts:ts-node/register --watch -t 100000 // Use TypeScript to test.
$ /node_modules/.bin/mocha lib/unit-test/server/router.js --watch -t 100000
$ ./node_modules/.bin/mocha lib/unit-test/server/user-register-update.js --watch -t 100000
````
##### In Windows
You need to point into mocha js file.
````
$ nodemon .\node_modules\mocha\bin\_mocha .\lib\unit-test\server\router.js --watch .\lib\  -t 10000
````

* Get Resource URL from functions-emulator after deploy and put it in `test.ts`

## Client SDK

* You can install client SDK for `firebase-backend` as `npm i firebase-cms`.
* If you would like to get document of `firebase-cms`, please follow the instruction on [Github Firebase CMS Project](https://github.com/thruthesky/firebase-cms)




## Documents & References

* [Developer's Programming Guide](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#)


* [Database Design](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.t870v2webv2r)


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

* Returns value from `Router()` must be an BACKEND_ERROR_OBJECT object.




## Hook system


* All the comments and information are in `hooks.ts`. So, read carefully comments in `hooks.ts`.

* Hooks must return an `BACKEND_ERROR_OBJECT` to cancel the originated work and return the Error Object.



* Adding a hook.

Simple call like below anywhere.

````
return this.hook( 'ClassName.Method', data );
````

* Example
````
export class UserRouter extends ... {
    sanitizeUserData( v ) {
        return this.hook( 'user.router.sanitizeUserData', v );
    }
}
````

* `this.hook()` is in `document.ts` and it sets the `collectionName` and call `Hooks::run()` in `hooks.ts`.

* Then, `Hooks::run()` will change `dot(.)` in ClassName/MethodName to `underbar(_)` and call the method.

For instance, `user.router.sanitizerUseData` is used as name, then `user_router_sanitizeUserData()` will be called.





* How to code with hook.

Simply create a method of the hook name and that method of hook name will be called.

You can use, `db`, `collection`, `params` and all other code.

````
    user_router_sanitizeUserData(data) {

        console.log("db: ", this.db);
        console.log("collection: ", this.collection);
        console.log("params: ", this.params);
        
        data['hooked'] = 'yes';
        return data;
    }
````


## User Authentication

* see [User Authentication](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.p5joalt8chem).



## Error Handling

* `Firebase Firestore` produces error code as number that is bigger than 0 or sometimes a string. Some times it is a number. and sometimes it is a string.

* We cannot show the error message from `Firestore` since it is fixed in English. We may need to translate it in different language.

* So, we decide that all `ErrorObject` that backend responds to client MUST have a number less than 0.




# Protocols

## User Identification

* `ID Token` must be delivered as `idToken` on request which will be verified and server will fetch user's `uid` from it.

* You may use `uid` as `Verified User UID` instead of `ID Token` if you do the unit testing.

* If you do not set proper Unit-Test settings, and you do not provide `idToken`, then the user will be anonymous.



### For Unit testing.

Backend needs User's `uid` to verify who the user is.
For unit testing,


* You can send user's `uid` instead of `ID Token` to the backend if `Base.useUid` in base.ts is set to true.
    Then, the backend will assume the `uid` as a verified user.


* `Base.useUid` must be false when it is deployed. Do not touch in base.ts. Instead, set it true on unit testing code.


* @see more information on [Unit Testing](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.tdpnuuowlpnt)


..g
