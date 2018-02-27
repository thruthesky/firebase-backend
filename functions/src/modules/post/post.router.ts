// import * as admin from 'firebase-admin';
// import { Request, Response } from 'express';
import * as E from '../core/error';
import { ROUTER_RESPONSE } from '../core/core';
import { Base } from '../core/base';
import { Post, POST_DATA } from './post';

export class PostRouter extends Post {
    
    async create(){
        return super.set(this.params, this.params.id);
    }

    async get(){
<<<<<<< HEAD
        const id = this.param('id');
        const re = await super.get(id);
        if (!id) return this.error(E.NO_USER_DOCUMENT_ID);
        if (!re || re == void 0) return this.error(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET);
        return re;
=======
        const id = this.param( 'id' );
        return await super.get(id);
        
>>>>>>> bedb2b56ee40da974d4feea3d63fbf4674d71c08
    }

    async edit(){
        return 'i am edit';
    }

    async delete(){
        return 'i am delete';
    }

<<<<<<< HEAD
}

=======
}
>>>>>>> bedb2b56ee40da974d4feea3d63fbf4674d71c08
