import * as corsOptions from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Router } from './modules/router/router';
import { Base } from './modules/core/base';




const cors = corsOptions({ origin: true });

/**
 * Production Initialization code.
 */
admin.initializeApp(functions.config().firebase);

/**
 * Development Intialization code.
 */
// import { serviceAccount } from './settings/serviceAccountKey';
// admin.initializeApp({ // Enable on development.
//     credential: admin.credential.cert(<any>serviceAccount)
// });

Base.admin = admin.app();


export const api = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const queries = Object.assign({}, request.query, request.body);
        const res = await (new Router(queries)).run();
        response.send(res);
    });
});


