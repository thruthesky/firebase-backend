import * as admin from 'firebase-admin';
import { COLLECTION_PREFIX } from './../../settings/settings';

import * as E from './../core/error';


import { ROUTER_RESPONSE, Anonymous } from './../core/defines';






export class Base {
    collectionName: string = null;

    static admin;
    static params: any = null;
    static uid: string = null; // User `uid` if the user is logged in. The user may be Anonymous.
    // static request: Request = null;
    // static response: Response = null;


    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    get params(): any {
        return Base.params;
    }
    get db(): admin.firestore.Firestore {
        return Base.admin.firestore();
    }
    get auth(): admin.auth.Auth {
        return Base.admin.auth();
    }
    // set db(db: admin.firestore.Firestore) {
    //     Base.db = db;
    // }
    get collection() {
        return this.db.collection(this.collectionNameWithPrefix(this.collectionName));
    }

    /**
     * Returns collection name with prefix.
     * 
     * @desc if input is 'users' then, return would be 'x-users'.
     * @desc Must use this method to reference any collection.
     * 
     * @param name collection name
     * 
     * 
     * @return perfixed collection name
     */
    collectionNameWithPrefix(name): string {
        return COLLECTION_PREFIX + name;
    }


    // get request() {
    //     return Base.request;
    // }
    // set request(request: Request) {
    //     Base.request = request;
    // }
    // get response() {
    //     return Base.response;
    // }
    // set response(response: Response) {
    //     Base.response = response;
    // }



    error(code): ROUTER_RESPONSE {
        const obj = <ROUTER_RESPONSE>E.obj(code);
        if (obj) {
            obj['route'] = this.param('route');
        }
        return obj;
    }

    /**
     * Returns true if the input `obj` is an ERROR_OBJECT.
     */
    isErrorObject(obj): boolean {
        return obj && obj['code'] !== void 0 && obj['code'] !== 0;
    }



    /**
     * Returns the value of HTTP input.
     * @param key Parameter name
     * @return the value or undefined.
     * 
     * @desc Use `this.params` to access all the HTTP parameters.
     */
    param(key) {
        if (this.params) return this.params[key];
    }

    get routeClassName() {
        if (this.param('route')) {
            const re = this.param('route').split('.');
            return re[0];
        }
    }
    get routeMethodName() {
        if (this.param('route')) {
            const re = this.param('route').split('.');
            return re[1];
        }
    }

    /**
     * Returns server timestmap
     */
    serverTime(): admin.firestore.FieldValue {
        return admin.firestore.FieldValue.serverTimestamp();
    }

    /**
     * Returns true if the user is properly verified.
     * 
     * @desc it sets 'null' on `Base.uid` at first.
     * @desc it saves the user's uid at `Base.uid`. It many be Anonymous uid.
     * @desc If no `idToken` was given by HTTP request, then Anonymous uid will be used.
     * @desc If wrong `idToken` was give, then ErrorObject will be returned.
     * 
     * 
     * @return
     *      - TRUE on success.
     *      - ErrorObject on error.
     * 
     */
    async verifyUser() {
        this.loginUid = null; // reset before verify.
        const idToken = this.param('idToken');
        if (idToken) { // token was given
            return await this.auth.verifyIdToken(idToken)
                .then( decodedToken => {
                    this.loginUid = decodedToken.uid;
                    return true;
                })
                .catch(e => this.error(e));
        }
        else { // no token was given
            this.loginUid = Anonymous.uid;
            return true;
        }
    }

    /**
     * Sets login user's `uid`
     */
    set loginUid(uid) {
        Base.uid = uid;
    }
    /**
     * Gets login user's `uid`
     */
    get loginUid() {
        return Base.uid
    }
}