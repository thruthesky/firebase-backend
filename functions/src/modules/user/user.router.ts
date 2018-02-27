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
  


    /**
     * Returns false if there is no error.
     * Otherwise ErrorObject will be returned.
     * 
     * @todo validate more on user data.
     */
    validateUserData(p: USER_DATA): ROUTER_RESPONSE | boolean {


        /// User's UID is not acceptable for real production site.
        /// It is only available with unit-test.
        if ( p.uid !== void 0 ) {
            if ( this.checkUIDFormat( p.uid ) ) return this.error( this.checkUIDFormat( p.uid ) );
        }

        /**
         * Check gender format.
         */
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
    async set() : Promise<ROUTER_RESPONSE | boolean> {

        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        
        const re = this.hook('user.set');
        if ( this.isErrorObject( re ) ) return re;

        // console.log("Goint to set with UID: " + this.loginUid);
        // console.log("Data: ", this.params);

        // new code
        return await super.set(this.sanitizeUserData(this.params), this.loginUid);
    }

    /**
     * Update user document. It will only update with the properties of input.
     * 
     * @desc You have option to set or update user data.
     *      - If you are going to update, the user data previously set will be updated and unchanged properties will be remain as they are.
     *      - If you want to reset the document, then use `set()`
     */
    async update() : Promise<ROUTER_RESPONSE | boolean> {
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        return await super.update(this.sanitizeUserData(this.params), this.loginUid);
    }


    /**
     * Returns user data.
     */
    async get() {
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`

        // console.log("user.router::get() with " + this.loginUid);
        return super.get( this.loginUid );
    }

    /** 
     * Deletes a user document.
     * 
     * @desc doc.delete() returns deletion timestamp even if the document is not existing.
    */
    async delete() : Promise<ROUTER_RESPONSE> {
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        return await super.delete(this.loginUid);
    }

}

