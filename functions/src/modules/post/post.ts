﻿import { Anonymous, ROUTER_RESPONSE } from './../core/defines';
// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS, E, POST, POST_PERMISSION } from '../core/core';

import { Library as _ } from './../library/library';



/**
* @Attention All the validity, permission check must be done before this class.
*/
export class Post extends Document {
    constructor() {

        super(COLLECTIONS.POSTS);

    }


    // get defaultPostData() : POST_DATA {
    //     return {
    //         uid: '',
    //         title: '',
    //         content: '',
    //         categoryId: '',
    //         displayName: '',
    //         email: '',
    //         phoneNumber: '',
    //         country: '',
    //         province: '',
    //         city: '',
    //         address: '',
    //         zipCode: '',
    //         files: [''],
    //         numberOfComments: 0,
    //         numberOfLikes: 0,
    //         numberOfDislikes: 0,
    //         numberOfViews: 0,
    //         private: false,
    //         reminder: 0
    //     };
    // }



    /**
    * Sanitizes data before pushing to firebase.
    * 
    * 
    * 
    * 
    * @param data Data to sanitize.
    * 
    * @return sanitized data with hook.
    * @author gem
    * 
    */
    sanitizePostData(data: POST): POST {
        // data = Object.assign(this.defaultPostData, data);
        
        if ( data.id !== void 0 ) delete data.id; // delete `id` if ever there exists.

        data.uid = this.loginUid;
        // console.log('----this.loginUser', this.loginUser);
        data.displayName = this.loginUser.displayName;
        data.email = this.loginUser.email;
        return this.hook('post.sanitizePostData', data);
    }





    /**
     * 
     * Return null if there is no problem.
     * 
     * @param params is the input from HTTP. It needs properties like below.
     *      params.password - Anonymous password if the user logged in as anonymous.
     * 
     * @param post is the post data. It needs poroperties like below.
     *      post.password
     *      post.uid
     * 
     * @returns
     *      - `ROUTE_RESPONSE` object if there is error.
     *      - null if there is no error.
     */
    permission( params: POST_PERMISSION, post: POST ): ROUTER_RESPONSE {

        if ( this.isAnonymous() ) { // Logged in as anonymous.
            if ( post.uid !== Anonymous.uid ) { // Owned by a user. Not anonymous.
                return this.error( E.NOT_OWNED_BY_ANONYMOUS );
            }
            if ( _.isEmpty(params.password) ) { // No password
                return this.error( E.ANONYMOUS_PASSWORD_IS_EMPTY );
            }
            if ( post.password !== params.password ) { // Wrong password
                return this.error( E.ANONYMOUS_WRONG_PASSWORD );
            }
            // Okay.
            // The post is owned by anonymous and correct password was given.

        }
        else if ( this.isAdmin() ) {
            // Okay.
            // Admin can edit.
        }
        else if ( post.uid === this.loginUid ) {
            // Okay.
            // The post is owned by user and the user is editing.
        }
        else {
            // Wrong.
            // This is an error. Failed to verify.
            return this.error( E.NOT_YOUR_POST );
        }

        return null;
    }


}