// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
import { User, USER_DATA } from './user';
import { ROUTER_RESPONSE } from '../core/core';


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

    sanitizeUserData(p: USER_DATA) {
        const data = {
            id: p.id,
            name: p.name,
            gender: p.gender,
            birthday: p.birthday,
            mobile: p.mobile,
            landline: p.landline
        };
        return data;
    }

    /**
     * Returns false if there is no error.
     * Otherwise ErrorObject will be returned.
     * 
     * @todo validate more on user data.
     */
    validateUserData(p: USER_DATA): ROUTER_RESPONSE | boolean {
        if (p.id === void 0 || !p.id) return this.error(E.NO_UID);
        // if (p.name === void 0 || !p.name) return this.error(E.NO_NAME);

        if ( p.gender !== void 0 && p.gender ) {
            if ( p.gender !== 'M' && p.gender !== 'F' ) return this.error( E.WRONG_GENDER );
        }

        return false;
    }

    /**
     * Creates a doc under users collection.
     * 
     * @desc When a user sets his profile data, it is more likely the user is registering.
     *      - `set()` will erase all the data in the document and set it.
     * 
     * @note All the users must register with `Firebase Authentication`.
     *          So, we do not need to do authencation, nor login information on `Firestore`.
     *          But we need to add/manage extra user information on `Firestore`.
     * 
     * @note no email. no password.
     */
    async set() {
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        return await super.set(this.sanitizeUserData(this.params), (<USER_DATA>this.params).id);
    }

    /**
     * Update user document. It will only update with the properties of input.
     * 
     * @desc You have option to set or update user data.
     *      - If you are going to update, the user data previously set will be updated and unchanged properties will be remain as they are.
     *      - If you want to reset the document, then use `set()`
     */
    async update() {
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        return await super.update(this.sanitizeUserData(this.params), (<USER_DATA>this.params).id);
    }


    async get() {
        const id = this.param('id');
        if (!id) return this.error(E.NO_USER_DOCUMENT_ID);
        return super.get(this.param('id'));
    }



    // async list() {
    //     return await this.getUserList();
    // }

}