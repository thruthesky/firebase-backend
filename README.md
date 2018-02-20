# Firebase Backend
Firebase backend to build CMS



# Developer

## How To Install For Developers.

* First, get source code from git hub and initialize node modules.

````
$ git clone https://github.com/thruthesky/firebase-backend
$ cd firebase-backend/functions
$ npm i
````

* Second, get service account key from Firebase Project Settings and save it as `src/settings/serviceAccountKey.ts`
@Attention: Putting Service Account Key on the project and attach it to Typescript Code is an optional.
You will not need it if you are running the project on Firebase Functions. But you will need it if you are going to run the project on CLI.
@Attention: This is a typescript file. You will need to transform .json file as below.

````
export const serviceAccount = {
    "type": "service_account",
    "project_id": "...base-backend",
    "private_key_id": "3268e5c32e5b15...7a53d23f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...knkvrWTtr\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-admin....com",
    "client_id": "10695965...4",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/r...erviceaccount.com"
};
````

* Third, run `tsc`
````
$ tsc --watch
````

* Forth, open `src/index.ts` and you are good to go.

* Fifth, If you are going to test locally, use Firebase Functions Emulator.


## How to code with Firebase Functions Emulator

````
  $ ./node_modules/.bin/functions --help                ; Help
  $ sudo ./node_modules/.bin/functions start            ; You may( or may not ) need to do `sudo` to start.
                                                        ; Start emulator first, before you are going to deploy your code to emulator.
  $ sudo ./node_modules/.bin/functions stop             ; stop emulator
  $ sudo ./node_modules/.bin/functions kill             ; kill emulator if you fail to stop emulator.
  $ ./node_modules/.bin/functions deploy uploadDoc --trigger-http ; deploy a http function.
````
