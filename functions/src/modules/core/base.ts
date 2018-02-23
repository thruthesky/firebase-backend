import { Response } from 'express';
import * as admin from 'firebase-admin';
import { COLLECTION_PREFIX } from './../../settings/settings';

export class Base {
    constructor(
        public collection: string,
        public db: admin.firestore.Firestore,
        public query,
        public response: Response) {


        this.collection = COLLECTION_PREFIX + this.collection;

    }



    /**
     * Returns server timestmap
     */
    serverTime(): admin.firestore.FieldValue {
        return admin.firestore.FieldValue.serverTimestamp();
    }

}