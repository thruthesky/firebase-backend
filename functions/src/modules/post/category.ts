// import * as admin from 'firebase-admin';
import { Document } from './../document/document';
import { COLLECTIONS } from '../core/core';




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

    
}
