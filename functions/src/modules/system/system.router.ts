// import * as admin from 'firebase-admin';
import { Anonymous, E } from '../core/core';
// import { User } from '../user/user';
import { Document } from './../document/document';




export class SystemRouter extends Document {
    constructor() {
        super('');
        return;
    }


    /**
     * 
     * 
     * @todo see todo list in readme.md
     */
    async install() {

        // Create Anonymous account.
        const user = await this.auth.createUser({
            uid: Anonymous.uid,
            email: Anonymous.email,
            password: Anonymous.password,
            displayName: Anonymous.displayName
        })
            .catch(e => this.error(e));

        // If Anonymous account is already exists, then it is considered to be installed already.
        // Or any error, just return the error.
        if (this.isErrorObject(user)) {
            if ( user['code'] === E.FIREBASE_AUTH_UID_ALREADY_EXISTS ) return this.error( E.SYSTEM_ALREADY_INSTALLED );
            else return user;
        }

        // Anonymouse created.
        const setResult = await this.set({name: Anonymous.displayName}, Anonymous.uid, 'users');
        // console.log('collectionName: ', this.collectionName, setResult);
        if ( this.isErrorObject( setResult ) ) {
            return setResult;
        }



        return Anonymous.uid;

    }

    /**
     * 
     */
    async uninstall() {

        // Delete anonymous user
        const re = await this.auth.deleteUser(Anonymous.uid)
            .catch(e => this.error(e));

        return re;
    }
}