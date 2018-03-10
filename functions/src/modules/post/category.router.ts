// import { FIREBASE_DO_NOT_ACCEPT_UNDEFINED } from './../core/error';

import { ROUTER_RESPONSE, E, CATEGORY } from '../core/core';
import { Category } from './category';
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
    async create(): Promise<any> {

        if (!this.isAdmin()) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY);


        const category: CATEGORY = this.hook('category.router.create', this.params);

        if (_.isEmpty(category.id)) return this.error(E.NO_CATEGORY_ID);

        // const validate = this.validateCategoryData(re);
        // if ( validate ) return validate;


        // console.log("re: ", re);

        if (await this.exists(category.id)) return this.error(E.CATEGORY_ALREADY_EXISTS, { id: category.id });

        return await super.set(category, this.params.id);
    }

    /**
     * 
     * 
     * @desc Users cannot read Category on `Functions`.
     * Admin will read for users. So, no rules are needed on `Firestore` and its very much safe in many ways.
     * 
     * 
     */
    async get(): Promise<any> {
        return await super.get(this.params.id);
    }

    /**
     * 
     * 
     * 
     */
    async gets(): Promise<any> {


        /// Get all the categories.
        const re: any = await this.collection.get()
            .then(snapshot => {
                const _cats = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    _cats.push(data);
                });
                return _cats;
            })
            .catch(e => this.error(e));

        /// If any error
        if (this.isErrorObject(re)) return re;


        /// If the request wants selected properties only.
        if (this.param('properties')) {
            const properties = this.param('properties');
            const returnData: any = [];
            for (const category of re) {
                const docData = {};
                for (const property of properties) {
                    docData[property] = category[property];
                }
                returnData.push(docData);
            }
            return returnData;
        }
        /// Or return whole categories.
        else return re;

    }

    async delete(): Promise<any> {
        if (!this.isAdmin()) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY, {loginUid: this.loginUid});
        const category: CATEGORY = await super.get(this.params.id);
        if ( this.isErrorObject(category) ) {
            if ( category['code'] === E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET ) category['code'] = E.WRONG_CATEGORY_ID; // change to proper error code.
            return category;
        }
        if ( category.numberOfPosts === 0 ) return await super.delete(this.params.id);
        else return this.error( E.CATEGORY_CANNOT_BE_DELETED_SINCE_IT_HAS_POST, { categoryId: category.id} );
    }

    /**
     * @return Same as `Document.update()`
     * 
     *      - Document ID( Category ID ) will be returned on success.
     * 
     */
    async update(): Promise<any> {
        if (!this.isAdmin()) return this.error(E.PERMISSION_DENIED_ADMIN_ONLY);
        const category = this.hook('category.router.update', this.params);
        return await super.update(category, category.id);
    }


    // /**
    //  * 
    // * Validates data if applicable to firebase database
    // * 
    // * @param data Data to validate
    // * 
    //  * @returns null if there is no problem. Otherwise `Router Response Error Object`
    // */
    // validateCategoryData(data: CATEGORY): ROUTER_RESPONSE {

    //     if (_.isEmpty(data.id)) return this.error(E.NO_CATEGORY_ID);

    //     if (this.checkDocumentIDFormat(data.id)) return this.error(this.checkDocumentIDFormat(data.id));

    //     // Number Validation
    //     if (!_.isNumber(data.levelOnList)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnList' });
    //     if (!_.isNumber(data.levelOnWrite)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnWrite' });
    //     if (!_.isNumber(data.levelOnRead)) return this.error(E.MUST_BE_A_NUMBER, { name: 'levelOnRead' });

    //     if (!_.isNumber(data.numberOfComment)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfComments' });
    //     if (!_.isNumber(data.numberOfPosts)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPosts' });
    //     if (!_.isNumber(data.numberOfPagesOnNavigation)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPagesOnNavigation' });
    //     if (!_.isNumber(data.numberOfPostsPerPage)) return this.error(E.MUST_BE_A_NUMBER, { name: 'numberOfPostsPerPage' });

    //     // Array Validation
    //     if (!_.isArray(data.moderators)) return this.error(E.MUST_BE_AN_ARRAY);

    //     return null;
    // }




}
