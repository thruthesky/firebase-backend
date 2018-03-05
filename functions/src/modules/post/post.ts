﻿// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from '../core/core';



/**
* POST data to create/update/delete.
* 
* @desc You can update more.
* 
* 
*/
export interface POST_DATA {
    postId?: string; // can be automatically generated by firebase
    category: string;
    author: string;
    body: string;
};

export interface GET_POST{
    uid: string;
    postId: string;
}


/**
* @Attention All the validity, permission check must be done before this class.
*/
export class Post extends Document {
    constructor( ) {
        
        super( COLLECTIONS.POSTS );
        
    }
    
    /**
    * Sanitizes data before pushing to firebase.
    * 
    * @param data Data to sanitize.
    * 
    * @return sanitized data with hook.
    * @author gem
    * 
    */
    sanitizePostData( data ): POST_DATA { 
        const re = {
            category : data.category,
            body : data.body,
            author : data.uid
        }
        
        return this.hook( 'post.router.sanitizePostData', re ); // Why not hooked as boolean?
    }
    
}