import * as corsOptions from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { serviceAccount } from './settings/serviceAccountKey';

import { Router } from './modules/router/router';


const cors = corsOptions({ origin: true });

// admin.initializeApp( functions.config().firebase ); // Enable on production.

admin.initializeApp({ // Enable on development.
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});


const db = admin.firestore();


export const api = functions.https.onRequest( (request, response ) => {
    cors(request, response, async  () => {
        const res = await  (new Router(db, request, response)).run();
        response.send( { route: request.body['route'], data: res } );
    });
});