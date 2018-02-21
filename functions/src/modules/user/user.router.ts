import * as e from '../core/error';
import { User } from './user';

export class UserRouter extends User {
    constructor( db, public query, public response ) {
        
        super( db, query, response );
        return;
    }
    version() {
        return '0.1';
    }

    count() {
        return 10;
    }

    /**
     * Creates a doc under users collection.
     * 
     * @note All the users must register with `Firebase Authentication`.
     *          So, we do not need to do authencation, nor login information on `Firestore`.
     *          But we need to add/manage extra user information on `Firestore`.
     * 
     * @note no email. no password.
     */
    async register() {
        if ( this.query.uid === void 0 ) return e.obj( e.NO_UID );
        if ( this.query.name === void 0 ) return e.obj( e.NO_NAME );
        return await this.create({
            uid: this.query.uid,
            name: this.query.name,
            gender: this.query.gender,
            birthday: this.query.birthday,
            mobile: this.query.mobile,
            landline: this.query.landline
        });
    }

    async list(){
        return await this.getUserList();
    }

}