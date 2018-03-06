
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
    // private categoryID
    async set(): Promise<ROUTER_RESPONSE | boolean> {

        /// @todo only admin/subadmin can set categories.
        if ( this.isAnonymous() ) return this.error(E.ANONYMOUS_CANNOT_SET_CATEGORY);
        


        const validate = this.validateCategoryData(this.params);
        if ( this.isErrorObject(validate) ) return validate;

        const re = this.sanitizeCategoryData(this.params);

        return await super.set(re, this.params.id);
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
    validateCategoryData(data): ROUTER_RESPONSE | boolean {

        if ( ! _.isNumber(data.levelOnList) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnList' });
        if ( ! _.isNumber(data.levelOnWrite) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnWrite' });
        if ( ! _.isNumber(data.levelOnRead) ) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnRead' });

        if (this.checkDocumentIDFormat(data.id, this.routerName)) return this.error(this.checkDocumentIDFormat(data.id, this.routerName));
        return false
    }


    validateModeratorRole(role) {
        const roles = ['read', 'edit', 'delete', 'copy', 'move'];


    }

    

}
