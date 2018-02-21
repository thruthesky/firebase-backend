import { Response } from 'express';
import * as admin from 'firebase-admin';

export class Document {


    constructor(public db: admin.firestore.Firestore, public query, public response: Response ) {

    }

    /**
     * Sometimes, you cannot set 'Object' data into firestore. It needs to be `JSON.stringify` and `JSON.parse` again.
     */
    trimData( obj ) {
        if ( ! obj ) return undefined;
        try {
            const str = JSON.stringify( obj );
            return JSON.parse( str );
        }
        catch ( e ) {
            return undefined;
        }
    }

    /**
     * Sets a data to a document.
     * @attention Must use this when you set a document. You cannot use any other method to set data into firestore.
     * @param data Data to set
     * @param col Collection
     * @param doc Document ID
     */
    async set( data, col, doc? ) {
        
        const collection = this.db.collection( col );
        let document;
        if ( doc ) document = collection.doc ( doc );
        else document = collection.doc();

        const re = await document.set( this.trimData( data ) );
    }

    /**
     * It creates a doc.
     * @param obj Object to set to Firestore
     */
    async create(obj) {
        obj['created'] = new Date();
        const re = await this.set( obj, 'x-users' );
        // @todo error check.
        return 0;
    }



    async read(collection) {
        const data = [];
        const obj = {};
        await this.db.collection(collection).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    data.push(obj[doc.id] = doc.data());
                });

            });
        // return data;
        return JSON.stringify(data);
    }
    update() {
        return;
    }
    delete() {
        return;
    }

}
