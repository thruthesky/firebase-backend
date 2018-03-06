
// import * as admin from 'firebase-admin';
import { ROUTER_RESPONSE, E } from '../core/core';
import { Document } from './../document/document';
import { Category } from './category';



/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class CategoryRouter extends Category {
    constructor() {
        super();
    }
    // private categoryID
    async set(): Promise<ROUTER_RESPONSE> {
        if (!this.params('id')) return this.error(E.NO_CATEGORY_ID);
        if (!this.params('name')) this.params['name'] = this.params('id');

        return await super.set( this.params, this.params('id') );
    }

    async get(): Promise<ROUTER_RESPONSE> {
        return await super.get( this.params('id') );
    }
    
    async remove(): Promise<ROUTER_RESPONSE> {
        return await super.delete(this.params('id'));
    }

    async update(): Promise<ROUTER_RESPONSE> {
        return await super.update(this.params, this.params('id'));
    }

}
