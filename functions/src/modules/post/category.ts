// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS, E } from '../core/core';
import * as _ from 'lodash';




export interface CATEGORY {
    id: string;
    name?: string; // to display.
    description?: string; // to display as long description.
    header?: string;
    footer?: string;
    numberOfPostsPerPage?: number;
    numberOfPagesOnNavigation?: number;
    moderators?: Array<string>;
    moderatorRoles?: 'read' | 'edit' | 'delete' | 'copy' | 'move';
    allowAttachment?: boolean;
    levelOnList?: number;
    levelOnWrite?: number;
    levelOnRead?: number;
    headerOnList?: string;
    footerOnList?: string;
    headerOnWrite?: string;
    footerOnWriter?: string;
    headerOnView?: string;
    footerOnView?: string;
}

/**
* @Attention All the validity, permission check must be done before this class.
*/
export class Category extends Document {
    constructor( ) {
        super( COLLECTIONS.CATEGORIES );
    }
    
    routerName = 'CATEGORY'
    
    /**
    * Sanitizes data before pushing to firebase.
    * 
    * @param data Data to sanitize.
    * 
    * @return sanitized data with hook.
    * @author gem
    * 
    */
    protected sanitizeCategoryData( data ): any { 
        let obj = {
            id: data.id,
            name: data.name || data.id, // to display.
            description: data.description, // to display as long description.
            header: data.header,
            footer: data.footer,
            numberOfPostsPerPage: data.postPerPage,
            numberOfPagesOnNavigation: data.pageOnNavigation,
            moderators: data.moderators,
            moderatorRoles: data.moderatorRoles,
            allowAttachment: data.allowAttachment, // boolean
            levelOnList: data.levelOnList,
            levelOnWrite:  data.levelOnWrite,
            levelOnRead: data.levelOnWrite,
            headerOnList: data.headerOnList,
            footerOnList: data.footerOnList,
            headerOnWrite: data.headerOnWrite,
            footerOnWriter: data.footerOnWriter,
            headerOnView: data.headerOnView,
            footerOnView: data.footerOnView
        }
        
        return this.hook( 'post.router.sanitizePostData', obj ); // Why not hooked as boolean?
    }


}
