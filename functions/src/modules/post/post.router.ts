// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
import { ROUTER_RESPONSE } from '../core/core';
import { Base } from '../core/base';
import { Post, POST_DATA } from './post';

export class PostRouter extends Post {

    /** 
     * Pushes data to firebase
     * 
     * @desc - Checks user if logged in and then calls super.set() tp push data.
     * 
     * @author gem
    */
    async create(): Promise<ROUTER_RESPONSE | boolean>  {
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        if (this.validatePostData(this.params)) return this.validatePostData(this.params);
        
        const re = this.hook('post.create');
        if ( this.isErrorObject( re ) ) return re;

        // new code
        return await super.set(this.sanitizePostData( this.params ), null, this.collectionName);
    }

    /** 
     * Gets data from firebase based on document id.
     * @desc - get() checks if user is logged in and then passed document ID and TokenID( in production ) in super.get() to get data from firebase.
     * 
     * @author gem
     * 
    */
    async get(): Promise<ROUTER_RESPONSE | boolean> {
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        if (this.validatePostRequest(this.params)) return this.validatePostRequest(this.params);
        
        const re = this.hook('post.get');
        if ( this.isErrorObject( re ) ) return re;

        return await super.get( this.params.postId );
        // return 'I am get';
    }

    async edit(){
        return 'i am edit';
    }

    async delete(){
        return 'i am delete';
    }

}
