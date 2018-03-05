// import { E } from '../core/core';
// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';



/**
 * User data to create/update.
 * 
 * @desc You can update more.
 * 
 * @desc The Document ID is actually `uid`.
 */
export interface USER_DATA {
    uid?: string;               /// `uid` is needed only for unit test. `uid` should not be saved in document.
    name?: string;
    nickname?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    birthday?: string;
    gender?: string;
    mobile?: string;
    landline?: string;
    address?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
    role?: string; /** @author Gem @desc user role/permissions i.e. admin, etc. @desc Can only update by admin */
};


/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class User extends Document {
    constructor( ) {

        super( COLLECTIONS.USERS );

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
            name: p.name,
            gender: p.gender,
            birthday: p.birthday,
            mobile: p.mobile,
            landline: p.landline
        };

        return this.hook( 'user.router.sanitizeUserData', data );

    }

    
    
}