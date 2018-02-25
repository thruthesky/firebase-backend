import { Response } from 'express';
import * as admin from 'firebase-admin';
import { Base, E } from './../core/core';

import { Hooks } from './../../hooks';




export class Document extends Base {


    constructor(collectionName: string) {

        super(collectionName);

    }


    /**
     * Calls hook
     */
    hook(name, data?) {
        const hook = new Hooks(this.collectionName);
        return hook.run(name, data);
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
     * Sets data on Document and Returns a Promise.
     * 
     * @desc When you set on a Document, you MUST use this method. You must NOT set Documents in other way.
     * 
     * @param data - data to be set.
     * @param documentID - Document ID. If not set, automatically generated.
     * @param collectionName -Collection name. If not set, it will use the collection name that is set on the object.
     * 
     * 
     * @since 2018-02-25. It accepts third parameter as collection name.
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
     * 
     * @return
     *          - A Promise<WriteResult> if success.
     *          - A Promise<null> if the input data is empty.
     *          - A Promise<ErrorObject> if there is error. note: it is a promise that is being returned.

     */
    async set(data, documentID?: string, collectionName?: string): Promise<any> {
        if (!data) return null;

        let collection;
        if (collectionName) {
            collection = this.db.collection(this.collectionNameWithPrefix(collectionName));
        }
        else {
            if (this.collectionName) {
                collection = this.collection;
            }
            else {
                return this.error(E.COLLECTION_IS_NOT_SET);
            }
        }


        data['created'] = this.serverTime();

        let documentRef;
        if (documentID) documentRef = collection.doc(documentID);
        else documentRef = collection.doc();
        return await documentRef.set(this.sanitizeData(data))
            .catch(e => this.error(e));
    }


    /**
     * This updates a Document.
     * 
     * @desc It works as `firestore.update()`. It update only some properties without overwriting the entire Document.
     *      - It add some extra data like 'updated' stamp
     * 
     * @note Update will fail if the document does not exsits.
     * 
     * @param data data to update
     * @param documentID Document ID to updated on
     *      
     * @return
     *          - A Promise<WriteResult> if success.
     *          - A Promise<null> if the input data is empty.
     *          - A Promise<ErrorObject> if there is error. note: it is a promise that is being returned.
     */
    async update(data, documentID: string): Promise<any> {
        if (!data) return null;
        data['updated'] = this.serverTime();
        return await this.collection.doc(documentID).update(this.sanitizeData(data))
            .catch(e => this.error(e));
    }


    /**
     * 
     * Returns a documentation on the currently selected collection
     * 
     * @return A Promise of
     *          - Document data
     *          - null if docuemnt doe not exsits.
     *          - ErrorObject. note: it is a promise that is being returned.
     */
    async get(documentID): Promise<any> {
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



    // async read(collection) {
    //     const data = [];
    //     const obj = {};
    //     await this.db.collection(collection).get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 data.push(obj[doc.id] = doc.data());
    //             });

    //         });
    //     // return data;
    //     return JSON.stringify(data);
    // }

    delete() {
        return;
    }

}
