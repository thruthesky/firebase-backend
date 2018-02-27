// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
import { ROUTER_RESPONSE } from '../core/core';
import { Base } from '../core/base';
import { Post, POST_DATA } from './post';

export class PostRouter extends Post {

    async create(){
        if ( ! this.loginUid ) return this.error( E.USER_NOT_LOGIN ); // On Unit Test, it will be set with `uid`
        if (this.validatePostData(this.params)) return this.validatePostData(this.params);
        
        const re = this.hook('post.create');
        if ( this.isErrorObject( re ) ) return re;

        // new code
        return await super.set(this.sanitizePostData( this.params ), null, this.collectionName);
    }

    async get(){
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
