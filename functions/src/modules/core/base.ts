import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { COLLECTION_PREFIX } from './../../settings/settings';

import * as E from './../core/error';


import { RouterResponse } from './../core/defines';






export class Base {
    collectionName: string = null;
    static db: admin.firestore.Firestore = null;
    static params: any = null;
    // static request: Request = null;
    // static response: Response = null;


    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    get params() {
        return Base.params;
    }
    get db() {
        return Base.db;
    }
    set db(db: admin.firestore.Firestore) {
        Base.db = db;
    }
    get collection() {
        return this.db.collection( COLLECTION_PREFIX + this.collectionName);
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



    error(code): RouterResponse {
        const obj = <RouterResponse>E.obj(code);
        if (obj) {
            obj['route'] = this.param('route');
        }
        return obj;
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

}