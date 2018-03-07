// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS, E} from '../core/core';
import * as _ from 'lodash';



export interface MODERATOR_ROLES {
    read?: boolean;
    edit?: boolean;
    delete?: boolean;
    copy?: boolean;
    move?: boolean;
    reminder?: boolean; // moderator can change the remdiner or stick posts.
}

export interface CATEGORY {
    id: string;
    name?: string; // to display.
    description?: string; // to display as long description.
    header?: string;
    footer?: string;
    numberOfPostsPerPage?: number;
    numberOfPagesOnNavigation?: number;
    moderators?: Array<string>;
    moderatorRoles?: MODERATOR_ROLES;
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
    numberOfPosts?: number;
    numberOfComment?: number;
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
    * 
    * @param data Data to sanitize.
    * @return sanitized data with hook.
    * 
    * @author gem
    */
    sanitizeCategoryData( data ): CATEGORY { 
        let obj : CATEGORY = {
            id: data.id,
            name: data.name || data.id, // to display. @additional if no name passed. ID becomes the name.
            description: data.description || 'description', // to display as long description.
            header: data.header || 'Header',
            footer: data.footer || 'Footer',
            numberOfPostsPerPage: data.postPerPage || 5, // @suggest by gem must put default value in settings
            numberOfPagesOnNavigation: data.pageOnNavigation || 5, // @suggest by gem must put default value in settings
            moderators: data.moderators || [],
            moderatorRoles: data.moderatorRoles || <MODERATOR_ROLES>{ read: true, write: true, edit: true, move: true }, // @suggest by gem must put default value in settings
            allowAttachment: data.allowAttachment || true, // boolean // @suggest by gem must put default value in settings
            levelOnList: data.levelOnList || 0, // @suggest by gem must put default value in settings
            levelOnWrite: data.levelOnWrite || 0, // @suggest by gem must put default value in settings
            levelOnRead:  data.levelOnRead || 0, // @suggest by gem must put default value in settings
            headerOnList: data.headerOnList || '',
            footerOnList: data.footerOnList || '',
            headerOnWrite: data.headerOnWrite || '',
            footerOnWriter: data.footerOnWriter || '',
            headerOnView: data.headerOnView || '',
            footerOnView: data.footerOnView || '',
            numberOfPosts: data.numberOfPosts || 0,
            numberOfComment: data.numberOfComment || 0
        }
        
        return this.hook( 'category.router.sanitizeCategoryData', obj ); // Why not hooked as boolean?

    }


}
