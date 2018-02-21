import * as corsOptions from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { serviceAccount } from './settings/serviceAccountKey';

import { Router } from './modules/router/router';
import { Library as lib } from './modules/library/library';




const cors = corsOptions({ origin: true });

// admin.initializeApp( functions.config().firebase ); // Enable on production.

admin.initializeApp({ // Enable on development.
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});


const db = admin.firestore();



// db.collection('x-users').doc().set({"uid":"abc","name":"nameabc","created":"2018-02-21T17:19:15.212Z"}).then (x => x);
        


export const api = functions.https.onRequest( (request, response ) => {
    cors(request, response, async  () => {
        const res = await  (new Router(db, request, response)).run();
        
        
        response.send( res );
    });
});