import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';



export interface USER_REGISTER {
    id: string;
    name: string;
    birthday?: string;
    gender?: string;
    mobile?: string;
    landline?: string;
};


/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class User extends Document {
    constructor( ) {

        super( COLLECTIONS.USERS );

    }

    
    
}