
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
        if (!this.loginUid) return this.error(E.USER_NOT_LOGIN); // On Unit Test, it will be set with `uid`
        if ( this.loginUid === Anonymous.uid ) return this.error( E.ANONYMOUS_CANNOT_SET_CATEGORY );
        if ( this.validateCategoryData( this.params ) ) return this.validateCategoryData( this.params );
        const re = this.sanitizeCategoryData(this.params);
        
        return await super.set( re, this.params.id );
    }
    
    async get(): Promise<ROUTER_RESPONSE> {
        return await super.get( this.params.id);
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
    validateCategoryData( data ): ROUTER_RESPONSE | boolean {
        if ( this.numberValidation( data.levelOnList, 'LEVEL_ON_LIST' )) return this.numberValidation( data.levelOnList, 'LEVEL_ON_LIST'); 
        if ( this.numberValidation( data.levelOnWrite, 'LEVEL_ON_WRITE' )) return this.numberValidation( data.levelOnList, 'LEVEL_ON_WRITE');
        if (this.numberValidation( data.levelOnRead, 'LEVEL_ON_READ' )) return this.numberValidation( data.levelOnRead, 'LEVEL_ON_READ' );
        
        if ( this.checkDocumentIDFormat( data.id, this.routerName ) ) return this.error( this.checkDocumentIDFormat( data.id, this.routerName ) );
        
        return false
    }
    
    
    validateModeratorRole( role ) {
        const roles = ['read', 'edit', 'delete', 'copy', 'move'];

        
    }
    
    /**
    * @desc Ensures data passed in a field is a number.
    * 
    * @param data 
    * @param field
    * 
    * @author gem 
    */
    numberValidation( data, field: string ){
        if ( !data ) return false;
        if ( !this.isErrorObject( E.obj( E[`CATEGORY_${field}_MUST_CONTAIN_NUMBER`] ) ) ) {
            return this.unhandledError(`CATEGORY_${field}_MUST_CONTAIN_NUMBER`)
        }
        
        if ( !_.isNumber( data ) ) return this.error( E[`CATEGORY_${field}_MUST_CONTAIN_NUMBER`] );
        
        return false;
    }
    
}
