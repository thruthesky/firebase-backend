/**
* @author Gem
*/
import * as E from '../core/error';
import { COLLECTIONS, POST, POST_PERMISSION } from '../core/core';
// import { Base } from '../core/base';
import { Post } from './post';
import { Library as _ } from './../library/library';



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
    async create(): Promise<any> {
        const data: POST = this.hook('post.router.create', this.sanitizePostData(this.params));
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
    async get(): Promise<any> {
        return await super.get(this.hook('post.router.get', this.param('id')));
    }


    /**
     * 
     * Edits a post.
     * 
     */
    async edit(): Promise<any> {
        const params: POST = this.hook('post.router.edit', this.params);
        const id = params.id;

        const post: POST = await super.get(id); // get post
        if ( this.isErrorObject(post) ) return post;

        delete params.id; // delete id. no need to save.

        const permission = this.permission(params, post);
        if (permission) return permission;

        return await super.update(params, id);
    }

    /**
     * 
     * Deletes a post.
     * 
     */
    async delete(): Promise<any> {
        
        const params: POST_PERMISSION = this.params;
        // if (_.isEmpty(params.id)) return this.error(E.NO_DOCUMENT_ID);
        const post: POST = await super.get(params.id);
        if ( this.isErrorObject(post) ) return post;
        
        const permission = this.permission(params, post);
        if (permission) return permission;

        const re = await super.delete( params.id ); // delete
        if (this.isErrorObject(re)) return re; // if error on delete?


        const increase = await this.increase(COLLECTIONS.CATEGORIES, post.categoryId, 'numberOfPosts', -1); // decrease no of posts.
        if (this.isErrorObject(increase)) return increase; // if error on decrease?

        return re;
    }


    
    

}
