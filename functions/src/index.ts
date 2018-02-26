import * as corsOptions from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { serviceAccount } from './settings/serviceAccountKey';

import { Router } from './modules/router/router';
import { Library as lib } from './modules/library/library';
import { Base } from './modules/core/base';





const cors = corsOptions({ origin: true });

// admin.initializeApp( functions.config().firebase ); // Enable on production.

admin.initializeApp({ // Enable on development.
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});


const db = admin.firestore();
Base.db = db;


// db.collection('x-users').doc().set({"uid":"abc","name":"nameabc","created":"2018-02-21T17:19:15.212Z"}).then (x => x);



export const api = functions.https.onRequest( (request, response ) => {
    cors(request, response, async  () => {
        const queries = Object.assign( {}, request.query, request.body );
        const res = await (new Router( queries )).run();
        response.send( res );
    });
});


function hook( name ) {
    console.log("Hook name: ", name);
}