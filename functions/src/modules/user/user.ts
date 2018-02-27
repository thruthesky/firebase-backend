import { E } from '../core/core';
// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS,  ROUTER_RESPONSE } from './../core/defines';



/**
 * User data to create/update.
 * 
 * @desc You can update more.
 */
export interface USER_DATA {
    uid: string;
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


        /// User's UID is not acceptable for real production site.
        /// It is only available when USE_UID is set to true.
        if ( p.uid !== void 0 ) {
            if ( this.checkUIDFormat( p.uid ) ) return this.error( this.checkUIDFormat( p.uid ) );
        }



        // if (p.name === void 0 || !p.name) return this.error(E.NO_NAME);

        if ( p.gender !== void 0 && p.gender ) {
            if ( p.gender !== 'M' && p.gender !== 'F' ) return this.error( E.WRONG_GENDER );
        }

        return false;
    }

    
    
}