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


    /**
     * It sanitize user data to set/update.
     * 
     * @param p User data 
     */
    sanitizeUserData(p: USER_DATA) {

        const data = {
            id: p.uid,
            name: p.name,
            gender: p.gender,
            birthday: p.birthday,
            mobile: p.mobile,
            landline: p.landline
        };

        return this.hook( 'user.router.sanitizeUserData', data );

    }


    /**
     * Returns false if there is no error.
     * Otherwise ErrorObject will be returned.
     * 
     * @todo validate more on user data.
     */
    validateUserData(p: USER_DATA): ROUTER_RESPONSE | boolean {
        if (p.uid === void 0 || !p.uid) return this.error(E.NO_UID);
        if ( p.uid.length > 128 ) return this.error(E.UID_TOO_LONG);
        if ( p.uid.indexOf('/') !== -1 ) return this.error(E.UID_CANNOT_CONTAIN_SLASH);
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
     * 
     * 
     * 
     */
    async set()  : Promise<ROUTER_RESPONSE | boolean> {
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        
        const re = this.hook('user.set');
        if ( this.isErrorObject( re ) ) return re;

        console.log("Goint to set with UID:" + (<USER_DATA>this.params).uid);
        console.log("Data: ", this.params);
        return await super.set(this.sanitizeUserData(this.params), (<USER_DATA>this.params).uid);
    }

    /**
     * Update user document. It will only update with the properties of input.
     * 
     * @desc You have option to set or update user data.
     *      - If you are going to update, the user data previously set will be updated and unchanged properties will be remain as they are.
     *      - If you want to reset the document, then use `set()`
     */
    async update() : Promise<ROUTER_RESPONSE | boolean> {
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        return await super.update(this.sanitizeUserData(this.params), (<USER_DATA>this.params).uid);
    }


    async get() {
        const id = this.param('uid');
        if (!id) return this.error(E.NO_USER_DOCUMENT_ID);
        return super.get(this.param('uid'));
    }

    /** 
     * Deletes a user document.
     * 
     * @desc doc.delete() returns deletion timestamp even if the document is not existing.
    */
    async delete() : Promise<ROUTER_RESPONSE> {
        const id = this.param('id');
        const del = await super.delete(id);
        if( id === null || !id ) return this.error(E.NO_USER_DOCUMENT_ID);
        return del;
    }

    

}

