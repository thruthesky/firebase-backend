# Firebase Backend

This is a serverless and headless backend to build a cms with client end javascript.
And yet, we didn't decide it what to call.


# Documentation

* [ Developers Documentation ](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.998hdpy23ci9)

## Security
* [Security - Rules - Permission](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.h0e4dxtluyww)

## Resources

* See [Firebase CMS Sample App](https://github.com/thruthesky/firebase-cms-app) to know how it works.
* See [Firebase CMS Client SDK](https://github.com/thruthesky/firebase-cms) to use `Firebase Backend`.



# TODO List

* Remove lodash on backend and froendend.

* when email exists ( google login ), firebase error message is not converted.
* When user registers with email/password, the user's displayName should be updated into `Authentication`.



* Options to use `Firebase Authentication Default UID` as uid instead of email for security reason.
 * email as uid is good to develop but not good for security.
 @see `user.router.ts::register`

* Unit test on post edit.

    * member can edit his own post.
    * admin can edit all the post.
    * Anonymous can edit if they know password of the post.

    * Don't do moderator permission at this time.

* Unit test for category.
 * Category crud test.
 * Category crud with some fields test.
  * moderator is an array, so needs to be tested.
  * moderator roles. roles apply to all moderators.

* Test creating posts.
 * Creat a post with the relation of category and user.



* test more on register. like with wrong email format.

* Buy domain `FIREBASEBACKEND.COM`.


* Get ID Token from client without UID and do whatever.
    ** After user registration, get ID Token with other information and update it on `x-users`.

    ** For unit-test, put a setting in `x-settings` with test=true. if it is set to true, it can test with user uid instead of ID token. After test, it should be false and by default it is false.
    request will be { idToken: test, uid: user-uid }

* Installation.
    - Web based intsallation build with `capacitor`.
    - get admin email address and put it /x-settings/admins as an array.


* Do moderator permission functionality.


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




## Run

* Run `tsc --watch`, and run mocha to do Unit Test.






## Unit Testing

* [Unit Testing](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.tdpnuuowlpnt)


### Api Testing

* `Api Testing` is testing the `api` code with Firebase without connecting to `Firebase Functions`.

    This means, you can build the backend without `Firebase Functions` which would lead a great difficulty in development.

    It initiates `Firebase Admin SDK` and test the project directly `api` that connect to `Firebase`

````
$ mocha --watch --compilers ts:ts-node/register -t 99999 src/unit-tests/api/others/*
$ mocha --watch --compilers ts:ts-node/register -t 99999 src/unit-tests/api/with-id-token/user-verify-with-id-token.ts
````

#### Firebase Functions Test

* Testing real `Firebase Functions`. Tests under `unit-test/server` will not use `Firebase Admin SDK`. That means, it will directly connection to `Firebase Functions HTTP Triggers`.


* You can run test all scripts with `*`.


````
$ mocha --compilers ts:ts-node/register --watch -t 100000  src/unit-tests/server/* // All tests
$ mocha src/unit-tests/server/user-register-update.ts --compilers ts:ts-node/register --watch -t 100000 // Use TypeScript to test.
$ mocha lib/unit-test/server/router.js --watch -t 100000
$ mocha lib/unit-test/server/user-register-update.js --watch -t 100000
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




## No validator() and sanitizer() accessories.

* It may be a good way to put a `validator` and `sanitizer` class or method for each `router`.
 In this way, we can make more structured and clean code.

* But we decided not to separate them from the router class/method itself.

 * The code may look dirty but it is more easy to understand since everything is in one class method.

 * And we are using `NoSQL`. Developers can expand the document fields freely. We will put a less restriction on sanitizing. This is one reason why we do not make a separate sanitizing funtion.



## Loading System Settings


* System loading is loaded from `settings` collection in `Firestore` on `router.ts` and saves the settings statically. So, it does not need to load twice.

 * If you need to use the system settings before it loads or if you are on unit test, then call `loadSystemSettings()` by yourself.

* example
````
await (new Base).loadSystemSettings();
console.log('adminEmail:', (new Base).getAdminEmail());
````


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



# Installation


# User Roles and Level

* [User privileges - Roles and Levels](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.gl3iv6nc39rc)


# Protocols

## Installation

* `system.install`
    * @return if `code` is set to 0, then it is installed successfully.
    `installed` may be `false` on response but it is installed as long as `code` is 0.
* `system.uninstall`
* `system.checkInstall`
    * @return returned `data` should be `true` if the system is installed. Otherwise `false`.


## User Registration

* We do not use `Firebase Authentication` for email/password registration since `Firebase Authentication UID` is really meanning less. We will create an Authentication with `api` so we can have understandable `Firebase Authentication UID`.
* But for other logins like google, facebook, etc, we simply don't change the UID.




## User Identification

* `ID Token` must be delivered as `idToken` on request which will be verified and server will fetch user's `uid` from it.

* You may use `uid` as `Verified User UID` instead of `ID Token` if you do the unit testing.

* If you do not set proper Unit-Test settings, and you do not provide `idToken`, then the user will be anonymous.

## Category and Post, Comment

* `category.create`
* `category.update`
* `category.get`
* `category.gets`
 * Gets all categories at once.
 * You can give option to load only a few properties.
 
````
await route({ route: 'category.gets', properties: [ 'id', 'name', 'description', 'created', 'wrong-properties' ] });
````
 * `properties` is an array of string. The propertis that don't exist in db will be `undefined`.



 * No need to do `observable` or `realtime update` on client side.
    Get all the categories at once and save it on a list variable.
    If you want update/delete a category, do it and update only that category from the list variable.
* `category.delete`
* `post.create`
* `post.edit`
 * Anonymous can create/edit a post with password. If Anonymous forgets the password, he can no longer edit/delete the post.
 * User can create/edit without password.
 * Admin can edit any post.
 * @see unit test files. `post-create.ts`, `post-edit.ts`.
* `post.list`
* `post.view`
* `post.delete`
* `post.report`
* `post.block` - Block the user with `WebbrowserID`, `IP`
* `post.hide` - It does not block the user but don't show the post to the public.
* `post.like`
* `post.dislike`
* `post.reminder`
* `post.move`
* `post.copy`
* ...


### For Unit testing.

Backend needs User's `uid` to verify who the user is.
For unit testing,


* You can send user's `uid` instead of `ID Token` to the backend if `Base.useUid` in base.ts is set to true.
    Then, the backend will assume the `uid` as a verified user.


* `Base.useUid` must be false when it is deployed. Do not touch in base.ts. Instead, set it true on unit testing code.


* @see more information on [Unit Testing](https://docs.google.com/document/d/1ncYWftCEXJBJkATExfGM2S4dzerrI_7PA_DjWjNdEmQ/edit#heading=h.tdpnuuowlpnt)



## Case study

### User get/update own document

When user get/update his document, There might be error of `Document ID was not found` meaning,

He already registered with `Google Authentication` but somehow he was not able to create his own document on `user collection`. This may happen when his phone/compuer reboot suddenly out of control. All offline data will be gone if the device is rebooted. There might be many other reason.

So we do not consider it as a critial error.
When there is no document of a user in `user collection`, the backend create one silently.

In this case, the document will have `createdOnGet` property.
