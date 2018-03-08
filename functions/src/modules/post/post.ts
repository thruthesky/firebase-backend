import { UID } from './../core/defines';
// import * as admin from 'firebase-admin';
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
    uid: string;                    // author
    title?: string;
    content?: string;
    categoryId?: string;
    displayName?: string;
    email?: string;
    password?: string;              // Anonymous need to put a password to update/delete.
    phoneNumber?: string;
    country?: string;
    province?: string;
    city?: string;
    address?: string;
    zipCode?: string;
    files?: Array<string>;
    numberOfComments?: number;
    numberOfLikes?: number;
    numberOfDislikes?: number;
    numberOfViews?: number;
    private?: boolean;
    reminder?: number; // higher number will be listed on top.
}



export interface GET_POST {
    uid?: string;               // to see if who is the owner.
    postId?: string;
    category?: string;
}

/**
* @Attention All the validity, permission check must be done before this class.
*/
export class Post extends Document {
    constructor() {

        super(COLLECTIONS.POSTS);

    }


    get defaultPostData() : POST_DATA {
        return {
            uid: '',
            title: '',
            content: '',
            categoryId: '',
            displayName: '',
            email: '',
            phoneNumber: '',
            country: '',
            province: '',
            city: '',
            address: '',
            zipCode: '',
            files: [''],
            numberOfComments: 0,
            numberOfLikes: 0,
            numberOfDislikes: 0,
            numberOfViews: 0,
            private: false,
            reminder: 0
        };
    }



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
    sanitizePostData(data: POST_DATA): POST_DATA {
        data = Object.assign(this.defaultPostData, data);
        data.uid = this.loginUid;
        // console.log('----this.loginUser', this.loginUser);
        data.displayName = this.loginUser.displayName;
        data.email = this.loginUser.email;
        return this.hook('post.sanitizePostData', data);
    }






}