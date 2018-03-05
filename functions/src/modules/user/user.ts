// import { E } from '../core/core';
// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';





export interface USER_COMMON_FIELDS {
    name?: string;
    displayName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthday?: string;
    gender?: string;
    photoURL?: string;
    phoneNumber?: string;
    landline?: string;
    address?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
}


/**
 * User data to create/update.
 * 
 * @desc You can update more.
 * 
 * @desc The Document ID is actually `uid`.
 */
export interface USER_DATA extends USER_COMMON_FIELDS {
    uid?: string;               /// `uid` is needed only for unit test. `uid` should not be saved in document.
    email?: string;
}
export interface USER_REGISTER extends USER_COMMON_FIELDS {
    uid: string;
    email: string;
    password: string;
}


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
     * @param data User data 
     */
    sanitizeUserData(data: USER_DATA) {
        return this.hook( 'user.router.sanitizeUserData', data );
    }

    
    
}