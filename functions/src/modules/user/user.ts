import * as admin from 'firebase-admin';

export class User {
    constructor( public db: admin.firestore.Firestore, public request ) {

    }
    async create() {
        await this.db.collection('x-users').doc().set( this.request.body );
        return true;
    }
    read() {
        return;
    }
    update() {
        return;
    }
    delete() {
        return;
    }
}