﻿/**
* @author Gem
*/
import * as E from '../core/error';
import * as _ from 'lodash';
import { ROUTER_RESPONSE } from '../core/core';
// import { Base } from '../core/base';
import { Post, POST_DATA } from './post';

export class PostRouter extends Post {
    
    /** 
    * Pushes data to firebase
    * 
    * @desc - Checks user if logged in and then calls super.set() tp push data.
    * 
    * @author gem
    */
    async create(): Promise<ROUTER_RESPONSE | boolean> {
        if (this.isAnonymous()) return this.error(E.USER_NOT_LOGIN); // On Unit Test, it will be set with `uid`
        if (this.validatePostData(this.params)) return this.validatePostData(this.params);

        if (await this.exists(this.param('id'))) return this.error(E.POST_ALREADY_EXISTS, { id: this.param('id') });
        
        const re = this.hook('post.create');
        if (this.isErrorObject(re)) return re;
        
        const post = this.sanitizePostData(this.params)

        // new code
        return await super.set( post, post.id, this.collectionName);
        
    }
    
    /** 
    * Gets data from firebase based on document id.
    * @desc - get() checks if user is logged in and then passed document ID and TokenID( in production ) in super.get() to get data from firebase.
    * 
    * 
    */
    async get(): Promise<ROUTER_RESPONSE | boolean> {
        if (this.validatePostRequest(this.params)) return this.validatePostRequest(this.params);
        
        const re = this.hook('post.get');
        if (this.isErrorObject(re)) return re;
        
        return await super.get(this.param('id'));
        // return 'I am get';
    }
    
    async edit() {
        return 'i am edit';
    }
    
    // async delete() {
    //     return 'i am delete';
    // }
    
    // async search_category() {    
    
    // }
    
    
    
    /**
    * Validates data if applicable to firebase database
    * 
    * @param data Data to validate
    */
    validatePostData(data: POST_DATA): ROUTER_RESPONSE {
        
        if (_.isEmpty( data.id )) return this.error(E.NO_POST_ID);
        
        /**@desc Do code below if post is allowed without ID */
        // if (! _.isEmpty(data.id) ){
        // if (this.checkDocumentIDFormat(data.id)) return this.error(this.checkDocumentIDFormat(data.id)); 
        // if (! _.isString( data.id ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post ID' } );
        // }
        
        if (this.checkDocumentIDFormat(data.id)) return this.error(this.checkDocumentIDFormat(data.id)); 
        
        /** @todo Make shorter code for field type checking. */
        // Type checking -> Must be string
        if (! _.isString( data.id ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post ID' } );
        if (! _.isString( data.uid ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post UID' } );
        if (! _.isString( data.title ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post title' } );
        if (! _.isString( data.content ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post content' } );
        if (! _.isString( data.categoryId ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post categoryID' } );
        if (! _.isString( data.author ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post author' } );
        if (! _.isString( data.email ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post email' } );
        if (! _.isString( data.phoneNumber ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post phone number' } );
        if (! _.isString( data.country ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post country' } );
        if (! _.isString( data.province ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post province' } );
        if (! _.isString( data.city ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post city' } );
        if (! _.isString( data.address ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post address' } );
        if (! _.isString( data.zipCode ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post zip code' } );
        
        // Type Checking -> Must be number
        if (! _.isNumber( data.noOfComments ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfComments' } );        
        if (! _.isNumber( data.noOfLikes ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfLikes' } );        
        if (! _.isNumber( data.noOfDislikes ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfDislikes'} );        
        if (! _.isNumber( data.noOfViews ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfViews' } );        
        if (! _.isNumber( data.reminder ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post reminder' } );        
        
        if (! _.isBoolean(data.private)) return this.error( E.MUST_BE_A_BOOLEAN, { value: 'Post data private' } )
        
        return <any>false;
    }
    
    /**
    * Validates request information of complete
    * 
    * @param data data to validate
    * 
    * 
    */
    validatePostRequest(data): ROUTER_RESPONSE {
        
        if (data.postId !== void 0) {
            if (this.checkDocumentIDFormat(data.postId)) return this.error(this.checkDocumentIDFormat(data.postId ));
        }
        
        return <any>false;
    }
    
    
}
