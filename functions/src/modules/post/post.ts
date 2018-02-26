import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from './../core/defines';



/**
 * POST data to create/update/delete.
 * 
 * @desc You can update more.
 */
export interface POST_DATA {
    post_id: string;
    owner: string;
    timestamp: string;
    body: string;

};


/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class Post extends Document {
    constructor( ) {

        super( COLLECTIONS.POST_DATA );

    }

    
    
}