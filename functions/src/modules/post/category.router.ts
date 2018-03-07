import { FIREBASE_DO_NOT_ACCEPT_UNDEFINED } from './../core/error';

import { ROUTER_RESPONSE, E, Anonymous } from '../core/core';
import { Category, CATEGORY } from './category';
import * as _ from 'lodash';

/**
* @Attention All the validity, permission check must be done before this class.
*/
export class CategoryRouter extends Category {
    constructor() {
        super();
    }
    
    /** 
    * 
    * 
    * @returns Promise of ROUTER_REPONSE
    */
    async create(): Promise<ROUTER_RESPONSE | boolean> {
        
        /// @todo only admin/subadmin can set categories.
        // if ( !this.isAdmin() ) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY);

        const re = this.sanitizeCategoryData(this.params);

        const validate = this.validateCategoryData(re);
        if ( this.isErrorObject(validate) ) return validate;
        
        return await super.set(re, this.params.id);
        // return re;
    }
    
    async get(): Promise<ROUTER_RESPONSE> {
        return await super.get(this.params.id);
    }
    
    async remove(): Promise<ROUTER_RESPONSE> {
        return await super.delete(this.params.id);
    }
    
    async update(): Promise<ROUTER_RESPONSE> {
        return await super.update(this.params, this.params.id);
    }
    
    
    /**
    * Validates data if applicable to firebase database
    * 
    * @param data Data to validate
    */
    validateCategoryData(data: CATEGORY): ROUTER_RESPONSE | boolean {
        
        if (this.checkDocumentIDFormat(data.id, this.routerName)) return this.error(this.checkDocumentIDFormat(data.id, this.routerName));

        // Number Validation
        if ( ! _.isNumber(data.levelOnList) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnList' });
        if ( ! _.isNumber(data.levelOnWrite) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnWrite' });
        if ( ! _.isNumber(data.levelOnRead) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnRead' });
        if ( ! _.isNumber(data.numberOfComment) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfComments' });
        if ( ! _.isNumber(data.numberOfPosts) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPosts' });
        if ( ! _.isNumber(data.numberOfPagesOnNavigation) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPagesOnNavigation' });
        if ( ! _.isNumber(data.numberOfPostsPerPage) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPostsPerPage' });
        
        // Array Validation
        if ( ! _.isArray(data.moderators) ) return this.error( E.MUST_BE_AN_ARRAY )

        // Check undefined value
        if ( _.findKey(data, o => _.isUndefined(o)) ) return this.error(E.FIREBASE_DO_NOT_ACCEPT_UNDEFINED);


        return false
    }
    
    
    validateModeratorRole(role) {
        const roles = ['read', 'edit', 'delete', 'copy', 'move'];
        
        
    }
    
    
    
}
