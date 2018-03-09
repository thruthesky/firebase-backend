// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
import * as _ from 'lodash';
import { Base } from './../core/base';
import { User, USER_DATA, USER_REGISTER } from './user';
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
        if (p.uid !== void 0) {
            if (this.checkUIDFormat(p.uid)) return this.error(this.checkUIDFormat(p.uid));
        }

        /**
         * Check gender format.
         */
        if (p.gender !== void 0 && p.gender) {
            if (p.gender !== 'M' && p.gender !== 'F') return this.error(E.WRONG_GENDER);
        }

        return false;
    }


    /**
     * 
     * This registers(creates) a user authenticatoin whose `uid` is same as email address. 
     * 
     * 
     * @return ROUTER_RESPONSE
     * 
     *      - On success, `uid` that is same as the user's email will be returned in `data` field of the response.
     */
    async register(): Promise<any> {

        // @todo check email, password, name, etc.

        const user = this.sanitizeData( this.params );
        if ( _.isEmpty(user.email) ) return this.error( E.NO_EMAIL );
        if ( _.isEmpty(user.password) ) return this.error( E.NO_PASSWORD );


        const data: USER_REGISTER = {
            uid: user.email,                        // No good for security. Make it optinal.
            email: user.email,
            password: user.password
        };

        if ( user.displayName !== void 0 ) data.displayName = user.displayName;
        if ( user.phoneNumber !== void 0 ) data.phoneNumber = user.phoneNumber;
        if ( user.photoURL !== void 0 ) data.photoURL = user.photoURL;
        


        return await this.auth.createUser(this.sanitizeData(data))
            .then( newUser => {
                delete user.password;
                this.loginUid = newUser.uid;
                Base.params = user;
                return this.set();
            })
            .catch(e => this.error(e));

    }

    /**
     * Creates a doc under users collection.
     * 
     * @desc When a user sets his profile data, it is more likely the user is registering.
     *      - `set()` will erase all the data in the document and set it.
     * 
     * @desc All the users must register with `Firebase Authentication` and login before this method.
     *          So, we do not need to do check the user's authencation or login here.
     * 
     * @desc Anonymous users may enter this method.
     * 
     * 
     * 
     * @desc This is an interface. It shouldn't have parameters. If you are sure what you are doing, you can call like below.
     * @code
     *          this.loginUid = newUser.uid;
                Base.params = user;
                return this.set();
     * 
     */
    async set(): Promise<ROUTER_RESPONSE | boolean> {


        // console.log("UserRouter::set() collection name: ", this.collectionName );

        if (this.isAnonymous()) return this.error(E.ANONYMOUS_CANNOT_EDIT_PROFILE);

        //
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);

        const params = this.hook('user.router.set', this.params);
        if (this.isErrorObject(params)) return params;

        // console.log("Goint to set with UID: " + this.loginUid);
        // console.log("Data: ", this.params);

        // new code
        return await super.set( params, this.loginUid);
    }

    /**
     * Update user document. It will only update with the properties of input.
     * 
     * @desc User authentication must be done before this method. ( It is done in verifiyUser() )
     * @desc You have option to set or update user data.
     *      - If you are going to update, the user data previously set will be updated and unchanged properties will be remain as they are.
     *      - If you want to reset the document, then use `set()`
     * 
     * @return this.loginUid
     */
    async update(): Promise<ROUTER_RESPONSE | boolean> {

        // console.log("UserRouter::update() collection name: ", this.collectionName );
        if (this.isAnonymous()) return this.error(E.ANONYMOUS_CANNOT_EDIT_PROFILE);
        if (this.validateUserData(this.params)) return this.validateUserData(this.params);
        return await super.update(this.hook('user.router.update', this.params), this.loginUid);
    }


    /**
     * Returns user data.
     * 
     * @desc Anonymous may enter this method and get the anonymous data. We allow Anonymous to get data for the basic functionality and activities.
     * 
     * @desc One important notice is that if the document for that `this.loginUid` does not exists,
     *          whether it is a `wrong uid` or `correct uid` is given,
     *          it will create a new user documentation for that wrong uid.
     *          This is because somehow it may happens that user has a record in 'Authentication' but not in 'users' collection.
     *          There may be an Internet interruption or system rebooting.
     * 
     */
    async get() {
        return await super.get();
    }

    /** 
     * Deletes a user document/data in users collection.
     * 
     * @desc doc.delete() returns deletion timestamp even if the document is not existing.
     * 
     * 
    */
    async delete(): Promise<ROUTER_RESPONSE> {
        if (this.isAnonymous()) return this.error(E.ANONYMOUS_CANNOT_EDIT_PROFILE);
        // if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`

        // return await super.delete(this.loginUid); // this will delete the current user 
        return await super.delete(this.params.uid); // deletes selected user. They can pass their current ID if they want to delete current account.
    }

}

