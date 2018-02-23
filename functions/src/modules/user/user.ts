import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';



interface USER_CREATE {
    uid: string;
    name: string;
    birthday?: string;
    gender?: string;
    mobile?: string;
    landline?: string;
};


/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class User extends Document {
    constructor( public db: admin.firestore.Firestore, public request, public response ) {

        super( COLLECTIONS.USERS, db, request, response );

    }

    /**
     * @attention all the permission and data validity must be checked before this method. 
     */
    async create(data: USER_CREATE) {
        return await super.create(data);
    }
    async getUserList() {
        const userList = await super.read(this.request.body.collection);
        return userList;
        // return userList;
    }
    update() {
        return;
    }
    delete() {
        return;
    }
}