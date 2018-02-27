﻿import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { E, COLLECTIONS, ROUTER_RESPONSE } from '../core/core';



/**
 * POST data to create/update/delete.
 * 
 * @desc You can update more.
 */
export interface POST_DATA {
    postId?: string; // can be automatically generated
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
     * Validates data if applicable to firebase database
     * 
     * @param data Data to validate
     */
    validatePostData( data ): ROUTER_RESPONSE | boolean {
        
        if ( data.uid !== void 0 ) {
            if ( this.checkUIDFormat( data.uid ) ) return this.error( this.checkUIDFormat( data.uid ) );
        }
        if ( !data.body ) return this.error( E.EMPTY_POST_BODY );
        if ( !data.category ) return this.error( E.POST_HAS_NO_CATEGORY ); // Or put default value "General"?

        return false
    }

    /**
     * Validates request information of complete
     * 
     * @param data data to validate
     */
    validatePostRequest( data ): ROUTER_RESPONSE | boolean {
        
        if ( data.uid !== void 0 || data.postId !== void 0  ) {
            if ( this.checkUIDFormat( data.uid ) ) return this.error( this.checkUIDFormat( data.uid ) );
            if ( this.checkPostIDFormat( data.postId ) ) return this.error( this.checkPostIDFormat( data.postId ) );
        }
        
        return false
    }

    /**
     * Sanitizes data before pushing to firebase.
     * 
     * @param data Data to sanitize.
     * 
     * @return sanitized data with hook.
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