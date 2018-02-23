// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
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
        const p: USER_REGISTER = <USER_REGISTER>this.params;
        if (p.id === void 0) return this.error(E.NO_UID);
        if (p.name === void 0) return this.error(E.NO_NAME);
        const data = {
            id: p.id,
            name: p.name,
            gender: p.gender,
            birthday: p.birthday,
            mobile: p.mobile,
            landline: p.landline
        };
        return await this.set(data, data.id );
    }


    async get() {
        const id = this.param('id');
        if ( ! id ) return this.error( E.NO_USER_DOCUMENT_ID );
        return super.get( this.param('id') );
    }


    // async list() {
    //     return await this.getUserList();
    // }

}