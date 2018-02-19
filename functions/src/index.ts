import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { serviceAccount } from './settings/serviceAccountKey';


// admin.initializeApp( functions.config().firebase );
admin.initializeApp({
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});


const db = admin.firestore();


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(async (request, response) => {
    await db.collection('col-1').doc('doc-1').set({ a: 'Apple', time: new Date() });
    response.send("Hello Firebase! We are withcenter team... 7");
});

