import { Response } from 'express';
import * as admin from 'firebase-admin';
import { Base } from './../core/base';



export class Document extends Base {


    constructor(collectionName: string) {

        super(collectionName);

    }


    /**
     * 
     * Sometimes, somehow, you cannot set an Object into firestore `document`.
     * In that case, It needs to be `JSON.stringify` and `JSON.parse` again.
     * 
     * @param obj Object to be set into `firestore`.
     */
    sanitizeData(obj) {
        if (!obj) return null;
        if (typeof obj !== 'object') return null;
        Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
        return obj;
    }

    /**
     * Sets a data to a document.
     *
     * @attention Must use this when you set a document. You cannot use any other method to set data into firestore.
     * @param data Data to set.
     * @desc `Collection name` comes from the taxonomy.
     * @desc  Document ID is made of `data.uid`. If `data.uid` is not set, Document ID will be automatically generated.
     */
    // async set(data) {
    //     if (!data) return null;
    //     const collectionRef = this.db.collection(this.collection);
    //     let documentRef;
    //     if (data.uid === void 0) documentRef = collectionRef.doc();
    //     else documentRef = collectionRef.doc(data.uid);

    //     const obj = this.sanitizeData(data);
    //     obj['created'] = this.serverTime();

    //     const re = await documentRef.set(obj).catch(e => {
    //         return { code: e['code'], message: e['message'] }
    //     });

    // }


    /**
     * 
     * 
     * @param documentID - Document ID. If not set, automatically generated.
     * 
     * 
     * @code
     *      const re = await this.set( { a: 'b' }, 'doc-1' ); // Set { a: 'b' } into 'doc-1' Docuemnt.
     *        
     *  const data = {
            uid: p.uid,
            name: p.name,
            gender: p.gender,
            birthday: p.birthday
        };
        return await this.set(data);



     * @return
     *  
     *          - A Promise<ErrorObject> if there is error. note: it is a promise that is being returned.

     */
    async set(data, documentID?) {
        if (!data) return null;
        data['created'] = this.serverTime();

        let documentRef;
        if (documentID === void 0) documentRef = this.collection.doc();
        else documentRef = this.collection.doc(documentID);
        return await documentRef.set(this.sanitizeData(data))
            .catch(e => this.error(e));
    }


    /**
     * 
     * @return A Promise of
     *          - Document data
     *          - null if docuemnt doe not exsits.
     *          - ErrorObject. note: it is a promise that is being returned.
     */
    async get(documentID) {
        return this.collection.doc(documentID).get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data();
                }
                else return null;
            })
            .catch(e => this.error(e));
    }

    /**
     * It creates a Document.
     * @param data Object to set to Firestore
     * 
     * @desc If `data.uid` is set, then it is considered as `uinique id` and used for the document ID.
     * 
     * @return If there is an error, it returns `Error Object` or it returns a Promise.
     */
    // async create(data) {
    //     return await this.set(data).catch(e => e);
    // }



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
