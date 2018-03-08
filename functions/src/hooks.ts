// import { Base } from './modules/core/base';
import * as admin from 'firebase-admin';


/**
 * Hook data inteface for document_set
 */
interface HOOK_DOCUMENT_SET {
    id: string;
    collectionRef: any;
    documentRef: admin.firestore.DocumentReference;
    data: any;
}

/**
 * 
 * 
 * 
 * @desc This is being initialized and called on Base
 * 
 * 
 * 
 */

export class Hooks {

    collectionName;



    /**
     * 
     * Retruns hook data after processing the hook.
     * 
     * 
     * @param name Hook name.
     * @param data Hook data. `data` may be passed by refereced. But must be returned.
     */
    run(name, data) {
        // console.log("Hooks::run with : ", this.collectionName );
        const hookName = name.replace(/\./g, '_');      // Translate `.` into `_` to call the method.
        if (this[hookName]) {                  // If method exists
            return this[hookName](data);
        }
        else return data;
    }


    /**
     * Returns user data after sanitizing.
     * @param data user data
     * @return data to be used after sanitizing
     */
    user_router_sanitizeUserData(data) {

        // Uncomment below if you want to accept all the input from the user.
        // But becareful on what you are doing. You should be some validation.

        // const newData = this.params;
        // newData['hooked'] = 'yes';
        // return newData;

        return data;

    }

    /**
     * 
     * If it returns `BACKEND_ERROR_OBJECT`, then the `UserRoute::set()` will return this `BACKEND_ERROR_OBJECT`
     *          without setting data.
     *          Otherwise (If it returns other than Error Object),
     *          `UserRouter::set()` will set data normally.
     * 
     */
    user_set() {
        return false;
        // return this.error( E.TEST );
    }

    post_router_sanitizePostData(data) {

        // console.log("db: ", this.db);
        // console.log("collection: ", this.collection);
        // console.log("params: ", this.params);

        data['hooked'] = 'yes';
        return data;
    }


    /**
     * 
     * 
     * 
     */
    post_create(params) {
        return params;
    }


    // CATEGORY HOOKS

    /**
     * Returns Category data after sanitizing
     * 
     * @desc - You can add your own fields and sanitation here.
     * 
     * @param data - data or set of fields to be push or update in the database
     *             - Or the content of the document to be pushed.
     * 
     * @returns satinzed data to be pushed in the database
     * 
     * @author gem
     */
    category_router_sanitizeCategoryData(data) {

        /**
         * Sanitation on top of default sanitation here.
         * @code `data['field'] = 'new field'` => Good
         *        data['illegal'] = undefined => Not accepted
         * 
         * @desc any value except undefined is accepted.
         */


        return data;
    }

    /**
     * Returns the data after sanitizing.
     * 
     * @param obj data to be set/update on Documents.
     * 
     * @return data to be set on document.
     * 
     */
    sanitizeData(obj) {
        return obj;
    }


    /**
     * You can chage collection of the document.
     * @param collectionRef Collection Reference
     * 
     * @return (new or unchanged) collectionRef must be returned.
     */
    document_set_collectionRef(collectionRef) {
        return collectionRef;
    }
    /**
     * You can change the docuemnt.
     * 
     * @param documentRef Document Reference
     * @return (new or unchanged) documentRef must be returned.
     */
    document_set_documentRef(documentRef) {
        return documentRef;
    }

    /**
     * This hook is invoked right before `document.set()`.
     * You can change the data based `this.collectionName`.
     * It can be a user collection or post collection or any collection.
     * @param data data to be set on a Document
     */
    document_set_before(data) {
        return data;
    }

    /**
     * You can do anything after set a document.
     * @param obj Object of document.set() properties.
     * 
     * @return the Document ID must be returned.
     */
    document_set_then(obj: HOOK_DOCUMENT_SET): string {

        return obj.id;
    }


    /**
     * You can change data right before `Document.update()`.
     * 
     * @desc This method is invoked right before `doc().update( data )`.
     *          You can update the data based on `this.collectionName`
     * 
     *          `this.collectionName` would be 'usrs', etc.
     * 
     * @param data Data to be updated on a Document.
     */
    document_update_before(data) {
        // console.log('document_update_before. collectionName: ', this.collectionName);
        return data;
    }
    /**
     * 
     * You can do anything after a document has updated.
     * 
     * 
     * @param obj Object of doucment.update() properties.
     * @return Documnet ID must be returned.
     */
    document_update_then(obj: { id: string, data: any, collectionRef: any }) {
        return obj.id;
    }

    /**
     * 
     * Can change Document ID to get the data.
     * 
     * @desc This is invoked right before `document.get()`
     * 
     * @param documentID Document ID to retrieve data from that Docuemnt
     */
    document_get_before(documentID) {
        return documentID;
    }
    /**
     * Can do data manipulation after data is retrieved from Document.
     * @desc This method is invoked from the inside of `.then()`
     * @param data Data retrieved from a Docuemnt
     */
    document_get_then(data) {
        return data;
    }


    /**
     * 
     * Can change Document ID to delete the document.
     * 
     * @desc This is invoked right before `document.delete()`
     * 
     * @param documentID Document ID to delete that Docuemnt
     */
    document_delete_before(documentID) {
        return documentID;
    }
    /**
     * Can do something after deleting a Document.
     * @desc This method is invoked from the inside of `.then()`
     * @param DocumentID that was deleted just a while ago.
     */
    document_delete_then(documentID) {
        return documentID;
    }


}


