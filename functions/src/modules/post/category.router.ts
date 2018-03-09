// import { FIREBASE_DO_NOT_ACCEPT_UNDEFINED } from './../core/error';

import { ROUTER_RESPONSE, E } from '../core/core';
import { Category, CATEGORY } from './category';
import * as _ from 'lodash';
// import { POST_DATA } from './post';

/**
* @Attention All the validity, permission check must be done before this class.
*/
export class CategoryRouter extends Category {
    constructor() {
        super();
    }

    /**
     * 
     * Creates a category.
     * 
     * @desc only admin can create.
     *  
     * @returns Promise of ROUTER_REPONSE which contains same as `Document.set()`
     *   
     *       - Category ID will be returned on success.
     *  
     */
    async create(): Promise<ROUTER_RESPONSE> {

        if (!this.isAdmin()) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY);

        // console.log("params: ", this.params);
        const re: CATEGORY = this.sanitizeCategoryData(this.params);

        const validate = this.validateCategoryData(re);
        if ( validate ) return validate;


        // console.log("re: ", re);

        if (await this.exists( re.id )) return this.error(E.CATEGORY_ALREADY_EXISTS, { id: re.id });

        return await super.set(re, this.params.id);
    }

    /**
     * 
     * 
     * @desc Users cannot read Category on `Functions`.
     * Admin will read for users. So, no rules are needed on `Firestore` and its very much safe in many ways.
     * 
     * 
     */
    async get(): Promise<ROUTER_RESPONSE> {
        return await super.get(this.params.id);
    }

    // async delete(): Promise<ROUTER_RESPONSE> {
    //     return await super.delete(this.params.id);
    // }

    /**
     * @return Same as `Document.update()`
     * 
     *      - Document ID( Category ID ) will be returned on success.
     * 
     */
    async update(): Promise<ROUTER_RESPONSE> {
        if (!this.isAdmin()) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY);
        const re = this.sanitizeCategoryData(this.params);
        const validate = this.validateCategoryData(re);
        if (validate) return validate;
        return await super.update(this.params, this.params.id);
    }


    /**
     * 
    * Validates data if applicable to firebase database
    * 
    * @param data Data to validate
    * 
     * @returns null if there is no problem. Otherwise `Router Response Error Object`
    */
    validateCategoryData(data: CATEGORY): ROUTER_RESPONSE {

        if (_.isEmpty(data.id)) return this.error(E.NO_CATEGORY_ID);

        if (this.checkDocumentIDFormat(data.id)) return this.error(this.checkDocumentIDFormat(data.id));

        // Number Validation
        if (!_.isNumber(data.levelOnList)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnList' });
        if (!_.isNumber(data.levelOnWrite)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnWrite' });
        if (!_.isNumber(data.levelOnRead)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnRead' });

        if (!_.isNumber(data.numberOfComment)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfComments' });
        if (!_.isNumber(data.numberOfPosts)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPosts' });
        if (!_.isNumber(data.numberOfPagesOnNavigation)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPagesOnNavigation' });
        if (!_.isNumber(data.numberOfPostsPerPage)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPostsPerPage' });

        // Array Validation
        if (!_.isArray(data.moderators)) return this.error(E.MUST_BE_AN_ARRAY);

        return null;
    }




}
