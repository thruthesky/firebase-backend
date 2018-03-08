import * as admin from 'firebase-admin';
import { Base, E } from './../core/core';
import { QuerySnapshot } from '@google-cloud/firestore';


export class Document extends Base {
    
    
    constructor(collectionName: string) {
        super(collectionName);
    }
    
    
    
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
    *          - A Promise<DocumentID> if success. Document ID as string will be returned.
    *          - A Promise<null> if the input data is empty.
    *          - A Promise<ErrorObject> if there is error. note: it is a promise that is being returned.
    
    */
    async set(data, documentID?: string, collectionName?: string): Promise<any> {
        if (!data) return null;
        
        let collectionRef;
        if (collectionName) {
            collectionRef = this.db.collection(this.collectionNameWithPrefix(collectionName));
        }
        else {
            if (this.collectionName) {
                collectionRef = this.collection;
            }
            else {
                return this.error(E.COLLECTION_IS_NOT_SET);
            }
        }
        
        
        // you can change collectionRef
        collectionRef = this.hook('document.set_collectionRef', collectionRef);
        
        data['created'] = this.serverTime();
        
        
        let documentRef: admin.firestore.DocumentReference;
        if (documentID) documentRef = collectionRef.doc(documentID);
        else documentRef = collectionRef.doc();
        
        // you can change documentRef
        documentRef = this.hook('document.set_documentRef', documentRef);
        
        
        // you can chagne data before set.
        data = this.hook('document_set_before', data);
        return await documentRef.set(this.sanitizeData(data))
        .then(writeResult => {
            let id = documentRef.id;
            // you can do something after the document is set.
            id = this.hook('document.set_then', {
                id: id,
                data: data,
                documentRef: documentRef,
                collectionRef: collectionRef
            })
            return id;
        })
        .catch(e => this.error(e));
    }
    
    
    /**
    * This updates a Document.
    * 
    * @desc It works as `firestore.update()`.
    *      - It update only some properties without overwriting the entire Document.
    *      - It does not create `path` automatically so, the document must exist to be updated.
    *      - It adds some extra data like 'updated' stamp
    * 
    * @note Update will fail if the document does not exsits.
    * 
    * @param data data to update
    * @param documentID Document ID to updated on
    *      
    * @return
    *          - A Promise<DocumentID> if success.
    *          - A Promise<null> if the input data is empty.
    *          - A Promise<ErrorObject> if there is error. note: it is a promise that is being returned.
    */
    async update(data, documentID: string): Promise<any> {
        if (!data) return null;
        data['updated'] = this.serverTime();
        data = this.hook('document.update_before', data);
        return await this.collection.doc(documentID).update(this.sanitizeData(data))
        .then(x => {
            let id = documentID;
            id = this.hook('document_update_then', {
                id: id,
                data: data,
                collectionRef: this.collection
            })
            return id;
        })
        .catch(e => this.error(e));
    }
    
    
    /**
    * 
    * Returns a documentation on the currently selected collection
    * 
    * @return A Promise of
    *          - Document data
    *          - null if Documnet ID is empty.
    *
    *          - ErrorObject. note: it is a promise that is being returned.
    *          
    */
    async get(documentID): Promise<any> {
        if (!documentID) return null;
        documentID = this.hook('document.get_before', documentID);
        return await this.collection.doc(documentID).get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                return this.hook('document.get_then', data);
            }
            else return this.error(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET);
        })
        .catch(e => this.error(e));
    }
    
    /**
    * 
    * Returns the document who passed the query.
    * 
    * @param query - firebase query 
    * @return A Promise of
    *          - Document data
    *          - null if Documnet ID is empty.
    *
    *          - ErrorObject. note: it is a promise that is being returned.
    *          
    */
    // async search(field, operation, value): Promise<any> {
    //     // if (!query) return null;
    //     // query = this.hook('document.query_before', query);
    //     return await this.collection.where(field, operation, value).get()
    //     .then(QuerySnapshot => {
    //         return QuerySnapshot
    //     })
    //     .catch(e => this.error(e));
    // }
    
    /**
    * Returns true if the document data for input `documentID` exists.
    * Otherwise, it will return false.
    * 
    * @desc It will return false if there is any error on connecting to `Firestore`.
    * 
    *      - there might be a connection problem, permission problem, and other problems.
    *      - it returns false as long as it cannot get the document.
    * 
    * @desc It costs. It try to get the entire data. so, do not use it when you can avoid.
    * 
    */
    async exists(documentID): Promise<boolean> {
        const re = await this.get( documentID );
        // console.log("EXISTS: re: ", re);
        if ( this.isErrorObject( re ) ) {
            // if ( re['code'] === E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET ) return false;
            return false;
        }
        else{
            return true;
        }
    }
    
    /**
    * 
    * Deletes a document in firebase and returns timestamp of deletion.
    * 
    * @param documentID - Document to delete.
    * 
    * @return A Promise of
    *          - Document ID if successfully deleted.
    *          - null if docuemnt ID is empty.
    *          - ErrorObject. note: it is a promise that is being returned.
    */
    async delete(documentID): Promise<any> {
        if (!documentID) return null;
        
        documentID = this.hook('document.delete_before', documentID);
        return await this.collection.doc(documentID).delete()
        .then(x => {
            documentID = this.hook('document.delete_then', documentID);
            return documentID;
        })
        .catch(e => this.error(e));
    }
    
    
    
    
}
