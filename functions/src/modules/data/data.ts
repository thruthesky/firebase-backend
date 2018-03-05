// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from '../core/core';



/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class Data extends Document {
    constructor( ) {

        super( COLLECTIONS.POSTS );

    }
}
