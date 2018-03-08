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
    author?: string;
    email?: string;
    phoneNumber?: string;
    country?: string;
    province?: string;
    city?: string;
    address?: string;
    zipCode?: string;
    files?: Array<string>;
    noOfComments?: number;
    noOfLikes?: number;
    noOfDislikes?: number;
    noOfViews?: number;
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
            author: '',
            email: '',
            phoneNumber: '',
            country: '',
            province: '',
            city: '',
            address: '',
            zipCode: '',
            files: [''],
            noOfComments: 0,
            noOfLikes: 0,
            noOfDislikes: 0,
            noOfViews: 0,
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
        return this.hook('post.sanitizePostData', data);
    }






}