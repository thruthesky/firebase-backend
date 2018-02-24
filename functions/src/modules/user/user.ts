import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';



/**
 * User data to create/update.
 * 
 * @desc You can update more.
 */
export interface USER_DATA {
    id: string;
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

    
    
}