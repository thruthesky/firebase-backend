/**
* @author Gem
*/
import * as E from '../core/error';
import { ROUTER_RESPONSE, COLLECTIONS } from '../core/core';
// import { Base } from '../core/base';
import { Post, POST_DATA } from './post';
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

        const data: POST_DATA = this.hook('post.create', this.params);
        const validate = this.validatePostData(data);
        if ( validate ) {
            // console.log("---- validate: ", validate);
            return validate;
        }

        console.log('---------- data:', data);
        if ( await this.exists( data.categoryId, COLLECTIONS.CATEGORIES ) ) {
            return await super.set(this.sanitizePostData(data));
        }
        else {
            return this.error( E.POST_CATEGORY_DOES_NOT_EXIST, { categoryId: data.categoryId} );
        }
    }

    /** 
    * Gets data from firebase based on document id.
    * @desc - get() checks if user is logged in and then passed document ID and TokenID( in production ) in super.get() to get data from firebase.
    * 
    * 
    */
    async get(): Promise<ROUTER_RESPONSE | boolean> {
        if (!this.loginUid) return this.error(E.USER_NOT_LOGIN); // On Unit Test, it will be set with `uid`
        if (this.validatePostRequest(this.params)) return this.validatePostRequest(this.params);

        const re = this.hook('post.get');
        if (this.isErrorObject(re)) return re;

        return await super.get(this.params.postId);
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

        // console.log("------ validatePostData", data);
        if ( _.isEmpty(data.categoryId) ) return this.error(E.NO_CATEGORY_ID); //
        
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

        if (data.uid !== void 0 || data.postId !== void 0) {
            if (this.checkUIDFormat(data.uid)) return this.error(this.checkUIDFormat(data.uid));
            if (this.checkDocumentIDFormat(data.postId)) return this.error(this.checkDocumentIDFormat(data.postId));
        }

        return <any>false;
    }


}
