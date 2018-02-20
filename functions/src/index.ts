import * as corsOptions from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { serviceAccount } from './settings/serviceAccountKey';

import { Router } from './modules/router/router';


const cors = corsOptions({ origin: true });

// admin.initializeApp( functions.config().firebase );
admin.initializeApp({
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});


const db = admin.firestore();


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const updateDoc = functions.https.onRequest(async (request, response) => {
//     await db.collection('col-1').doc('doc-1').set({ a: 'Apple', time: new Date() });
//     response.send("Hello Firebase! We are withcenter team... 10");
// });


export const api = functions.https.onRequest( (request, response ) => {
    cors(request, response, () => {
        const res = (new Router(db, request, response)).run();
        response.send( { route: request.body['route'], data: res } );
    });
});