
// import * as admin from 'firebase-admin';
import { ROUTER_RESPONSE } from '../core/core';
// import { Document } from './../document/document';
import { Category } from './category';



/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class CategoryRouter extends Category {
    constructor() {
        super();
    }

    set(): Promise<ROUTER_RESPONSE> {
        return super.set( this.params, this.param('id') );
    }
}
