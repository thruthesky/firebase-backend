// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from '../core/core';
// import * as _ from 'lodash';



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
    levelOnList?: number; // if set to 0, Anonymous can list
    levelOnRead?: number; // if set to 0, Anonymous can read
    levelOnWrite?: number;  // if set to 1, Only member can create/edit/delete. Anonymous cannot.
    disableDeleteWithDependant?: boolean; // if set to true, author cannot edit/delete when there is any comments.
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


    // get defaultCategory(): CATEGORY {
    //     return {
    //         id: '',
    //         name: '', // to display. @additional if no name passed. ID becomes the name.
    //         description: '', // to display as long description.
    //         header: '',
    //         footer: '',
    //         numberOfPostsPerPage: 5, // @suggest by gem must put default value in settings
    //         numberOfPagesOnNavigation: 5, // @suggest by gem must put default value in settings
    //         moderators: [],
    //         moderatorRoles: { read: true, edit: false, delete: false, copy: true, move: true, reminder: true }, // @suggest by gem must put default value in settings
    //         allowAttachment: true, // boolean // @suggest by gem must put default value in settings
    //         levelOnList: 0, // @suggest by gem must put default value in settings
    //         levelOnWrite: 0, // @suggest by gem must put default value in settings
    //         levelOnRead:  0, // @suggest by gem must put default value in settings
    //         headerOnList: '',
    //         footerOnList: '',
    //         headerOnWrite: '',
    //         footerOnWriter: '',
    //         headerOnView: '',
    //         footerOnView: '',
    //         numberOfPosts: 0,
    //         numberOfComment: 0
    //     };
    // }
    
    
    // /**
    // * Sanitizes data before pushing to firebase.
    // * 
    // * 
    // * @param data Data to sanitize.
    // * @return sanitized data with hook.
    // * 
    // * @author gem
    // */
    // sanitizeCategoryData( data: CATEGORY ): CATEGORY { 
    //     data = Object.assign( this.defaultCategory, data );
    //     return this.hook( 'category.sanitizeCategoryData', data );
    // }


}
