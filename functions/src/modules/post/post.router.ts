/**
* @author Gem
*/
import * as E from '../core/error';
import { ROUTER_RESPONSE, COLLECTIONS } from '../core/core';
// import { Base } from '../core/base';
import { Post, POST_DATA, POST_PERMISSION } from './post';
import * as _ from 'lodash';


export class PostRouter extends Post {

    /** 
    * Pushes data to firebase
    * 
    * @desc - Checks user if logged in and then calls super.set() tp push data.
    * 
    * @desc Empty data is allowed to create a post.
    * 
    * @author gem
    */
    async create(): Promise<ROUTER_RESPONSE> {
        const data: POST_DATA = this.hook('post.router.create', this.sanitizePostData(this.params));
        if (_.isEmpty(data.categoryId)) return this.error(E.NO_CATEGORY_ID);
        if (await this.exists(data.categoryId, COLLECTIONS.CATEGORIES)) {
            const re = await super.set(data);
            if (this.isErrorObject(re)) return re;
            const increase = await this.increase(COLLECTIONS.CATEGORIES, data.categoryId, 'numberOfPosts', 1);
            if (this.isErrorObject(increase)) return increase;
            return re;
        }
        else {
            return this.error(E.POST_CATEGORY_DOES_NOT_EXIST, { categoryId: data.categoryId });
        }
    }

    /** 
    * Gets data from firebase based on document id.
    * @desc - get() checks if user is logged in and then passed document ID and TokenID( in production ) in super.get() to get data from firebase.
    * 
    * 
    */
    async get(): Promise<ROUTER_RESPONSE> {
        // console.log("----------- This shouldn't come here!");
        // if (!this.loginUid) return this.error(E.USER_NOT_LOGIN); // On Unit Test, it will be set with `uid`
        if (this.validatePostRequest(this.params)) return this.validatePostRequest(this.params);

        let id = this.param('id');
        if (_.isEmpty(id)) return this.error(E.NO_DOCUMENT_ID);
        id = this.hook('post.get', id);
        if (this.isErrorObject(id)) return id;

        return await super.get(id);
        // return 'I am get';
    }


    /**
     * 
     * Edits a post.
     * 
     */
    async edit() {
        const params: POST_DATA = this.hook('post.router.edit', this.params);
        if (_.isEmpty(params.id)) return this.error(E.NO_DOCUMENT_ID);
        const post: POST_DATA = await super.get(params.id);

        const permission = this.permission(params, post);
        if (permission) return permission;

        Object.assign( post, params );  // added by gem, merge post and params. sanitizePostData might return default values merged with incomplete param fields. 
        let id = post.id;             // post is already merged in param.
        return await super.update(post, id);

        // const id = params.id;
        // return await super.update(this.sanitizePostData(params), id);
    }

    /**
     * 
     * Deletes a post.
     * 
     */
    async delete() {
        
        const params: POST_PERMISSION = this.params;
        if (_.isEmpty(params.id)) return this.error(E.NO_DOCUMENT_ID);
        const post: POST_DATA = await super.get(params.id);
        
        const permission = this.permission(params, post);
        if (permission) return permission;

        const re = await super.delete( params.id ); // delete
        if (this.isErrorObject(re)) return re; // if error on delete?


        const increase = await this.increase(COLLECTIONS.CATEGORIES, post.categoryId, 'numberOfPosts', -1); // decrease no of posts.
        if (this.isErrorObject(increase)) return increase; // if error on decrease?

        return re;
    }



    // /**
    //  * Returns null if there is no problem.
    //  *
    //  * Validates data if applicable to firebase database
    //  * 
    //  * @param data Data to validate
    //  */
    // validatePostData(data: POST_DATA): ROUTER_RESPONSE {

    //     if (_.isEmpty(data.categoryId)) return this.error(E.NO_CATEGORY_ID);

    //     // const typeCheck = this.typeChecker( data, this.defaultPostData );
    //     // if ( typeCheck ) return typeCheck;
        
    //     // console.log( data );


    //     // if (this.checkDocumentIDFormat(data.id)) return this.error(this.checkDocumentIDFormat(data.id)); 

    //     /** @todo Make shorter code for field type checking. */
    //     // Type checking -> Must be string
    //     // if (! _.isString( data.id ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post ID' } );
    //     // if (! _.isString( data.uid ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post UID' } );
    //     // if (! _.isString( data.title ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post title' } );
    //     // if (! _.isString( data.content ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post content' } );
    //     // if (! _.isString( data.categoryId ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post categoryID' } );
    //     // if (! _.isString( data.displayName ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post displayName' } );
    //     // if (! _.isString( data.email ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post email' } );
    //     // if (! _.isString( data.phoneNumber ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post phone number' } );
    //     // if (! _.isString( data.country ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post country' } );
    //     // if (! _.isString( data.province ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post province' } );
    //     // if (! _.isString( data.city ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post city' } );
    //     // if (! _.isString( data.address ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post address' } );
    //     // if (! _.isString( data.zipCode ) ) return this.error( E.MUST_BE_A_STRING, { value: 'Post zip code' } );

    //     // Type Checking -> Must be number
    //     // if (! _.isNumber( data.noOfComments ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfComments' } );        
    //     // if (! _.isNumber( data.noOfLikes ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfLikes' } );        
    //     // if (! _.isNumber( data.noOfDislikes ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfDislikes'} );        
    //     // if (! _.isNumber( data.noOfViews ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post noOfViews' } );        
    //     // if (! _.isNumber( data.reminder ) ) return this.error( E.MUST_BE_A_NUMBER, { value: 'Post reminder' } );        

    //     // if (! _.isBoolean(data.private)) return this.error( E.MUST_BE_A_BOOLEAN, { value: 'Post data private' } );

    //     return null;
    // }

    /**
     * 
     * 
     * Validates request information of complete
     * 
     * @param data data to validate
     * 
     * @returns null if there is no problem. Otherwise `Router Response Error Object`
     * 
     * 
     * 
     */
    validatePostRequest(data): ROUTER_RESPONSE {
        
        if (data.uid !== void 0 || data.postId !== void 0) {
            if (this.checkUIDFormat(data.uid)) return this.error(this.checkUIDFormat(data.uid));
            if (this.checkDocumentIDFormat(data.postId)) return this.error(this.checkDocumentIDFormat(data.postId));
        }

        return null;
    }


}
