// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as error from '../core/error';
import { User, USER_REGISTER } from './user';

export class UserRouter extends User {
    constructor() {
        super();
        return;
    }
    version() {
        return '0.1';
    }

    count() {
        return 10;
    }

    /**
     * Creates a doc under users collection.
     * 
     * @note All the users must register with `Firebase Authentication`.
     *          So, we do not need to do authencation, nor login information on `Firestore`.
     *          But we need to add/manage extra user information on `Firestore`.
     * 
     * @note no email. no password.
     */
    async register() {
        const p: USER_REGISTER = <USER_REGISTER> this.params;
        if (p.uid === void 0) return error.obj(error.NO_UID);
        if (p.name === void 0) return error.obj(error.NO_NAME);
        const data = {
            uid: p.uid,
            name: p.name,
            gender: p.gender,
            birthday: p.birthday,
            mobile: p.mobile,
            landline: p.landline
        };
        return await this.collection.doc(p.uid).set( data )
            .catch( e => error.obj( e['code'], e['message'] ) );
    }

    async list() {
        return await this.getUserList();
    }

}