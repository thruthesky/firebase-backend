import * as admin from 'firebase-admin';
import { Document } from './../document/document';


export class User extends Document {
    constructor( public db: admin.firestore.Firestore, public request ) {
        super( db, request );
    }
    async create() {
        const re = await super.create({
            email: this.request.body.email,
            name: this.request.body.name,
            password: this.request.body.password
        });

        return true;
    }
    async getUserList() {
        const userList = await super.read(this.request.body.collection);
        return userList;
        // return userList;
    }
    update() {
        return;
    }
    delete() {
        return;
    }
}