/**
 * 
 * @file base.ts
 * 
 * @desc Base is the foundation class
 *          - Which mostly holds the information, settings, variables, library methods
 *          - To serve the backend.
 * 
 * @desc It must not contain any code that is depending on a module.
 * 
 * 
 */

import * as admin from 'firebase-admin';

import { COLLECTION_PREFIX } from './../../settings/settings';

import * as E from './../core/error';

import { ROUTER_RESPONSE, Anonymous, COLLECTIONS, SYSTEM_SETTINGS } from './../core/defines';
import { Library as _ } from './../library/library';

import { Hooks } from './../../hooks';
import { USER_DATA } from '../user/user';



export class Base {
    /**
     * If set to true, it will accept `uid` as user's verficaton instead of `ID Token`.
     * @see README.md
     */
    static useUid = false;

    /**
     * This will hold `x-settings/system` document data. This will be set on route call.
     */
    static systemSettings: SYSTEM_SETTINGS = null;

    /**
     * Firestore SDK admin object.
     */
    static admin: admin.app.App = null;

    /**
     * HTTP Request parameters.
     */
    static params: any = null;


    /**
     * Login user `uid` if the user is logged in. The user may be Anonymous.
     * @desc Whether the user logged in with ID Token or `uid`, this value will hold login user's uid.
     */
    static uid: string = null;

    // static hookObj = null;

    /**
     * If the user logs in, it will have user data. It may have anonymous user data.
     */
    static loginUser: USER_DATA = null;

    

    collectionName: string = null;

    constructor(collectionName = '') {
        this.collectionName = collectionName;
        // console.log("collectionName: ", this.collectionName);


    }


    get params(): any {
        // console.log("Base.params: ", Base.params);
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


    version() {
        return '2018-3-9-19-12-pm';
    }


    /**
     * Calls hook
     */
    hook(name, data?) {
        const hook = new Hooks();
        hook.collectionName = this.collectionName;
        return hook.run(name, data);
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



    /**
     * Returns a Reponse of Error Object.
     * @desc the return from this method is good enough to be sent to the client for respond.
     * @param code Error Code or Firebase Error Object
     */
    error(code, info?): ROUTER_RESPONSE {
        const obj = <ROUTER_RESPONSE>E.obj(code, info);
        if (obj) {
            obj['route'] = this.param('route');
        }
        return obj;
    }


    /**
     * @desc Might be useful when parsing error dynamically.
     * 
     * @returns object{ code : E.UNHANDLED, message: suggestion on which error needs to be handled }
     * 
     * @param newError - new error variable name that is not yet handled.
     * 
     * @author gem
     */
    // unhandledError( newError ): ROUTER_RESPONSE {
    //     return {
    //         code: E.UNHANDLED,
    //         message : `You need to handle unknown error [${newError}]`,
    //         route: this.param('route')
    //     }
    // }

    
    /**
     * Returns true if the input `obj` is an Error Object.
     * 
     * 
     */
    isErrorObject(obj): boolean {
        return E.isErrorObject(obj);
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

    /**
     * Returns class name in the HTTP router variable.
     * 
     * @return class name
     */
    get routeClassName() {
        return _.segment(this.param('route'), '.', 0);
    }

    /**
     * Returns method name in the HTTP method variable.
     * 
     * @return 
     * 
     */
    get routeMethodName() {
        return _.segment(this.param('route'), '.', 1);
    }

    /**
     * Returns server timestmap
     */
    serverTime(): admin.firestore.FieldValue {
        return admin.firestore.FieldValue.serverTimestamp();
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
        return Base.uid;
    }
    get loginUser() {
        return Base.loginUser;
    }

    get collectionUsers(): string {
        return this.collectionNameWithPrefix(COLLECTIONS.USERS);
    }
    get collectionSettings(): string {
        return this.collectionNameWithPrefix(COLLECTIONS.SETTINGS);
    }

    /**
     * Returns a Promise of FirestoreSnapshot based on the document ID of the collection.
     * 
     * @param collectionName collection name
     * @param documentID document id
     * 
     * @todo move this to `document.ts`
     */
    getDocument(collectionName, documentID): Promise<admin.firestore.DocumentSnapshot> {
        return this.db.collection(collectionName).doc(documentID).get();
    }



    /**
     * Returns a document under `settings` collection.
     * @param documentID Document ID to get the settings document.
     * @return a `settings` document object in resolved promise.
     * @todo test
     */
    getSettings(documentID): Promise<any> {
        return this.getDocument(this.collectionSettings, documentID)
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    return this.hook('base.getSettings_then', data);
                }
                
                else return this.error(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET_SETTINGS_DOCUMENT);
            })
            .catch(e => this.error(e));
    }

    /**
     * Load and save system settings in memory and returns the system settings.
     * 
     * 
     * @code how to use
     *          const re: SYSTEM_SETTINGS = await this.getSystemSettings()
     *          if (this.isErrorObject(re)) return false;
     * @endcode
     * 
     */
    async loadSystemSettings() {
        Base.systemSettings = await this.getSettings('system');
        return Base.systemSettings;
    }

    /**
     * Returns admin email.
     */
    getAdminEmail(): string {
        return Base.systemSettings.adminEmail;
    }

    /**
     * Returns true if the user is admin.
     */
    isAdmin(): boolean {
        // console.log(this.loginUid);
        return this.getAdminEmail() === this.loginUid;
    }

    isSystemInstalled(): boolean {
        return !!this.getAdminEmail();
    }




    /**
     * 
     * Checks `uid` format
     * 
     * @param uid User uid
     * 
     * @returns null if there is no problem. Otherwise `Router Response Error Object`
     */
    checkUIDFormat(uid) {

        if (!uid) return this.error(E.NO_UID);
        if (uid.length > 128) return this.error(E.UID_TOO_LONG);
        if (uid.indexOf('/') !== -1) return this.error(E.UID_CANNOT_CONTAIN_SLASH);

        return null;
    }

    /**
     * 
     * Checks if the Document ID is in right format.
     * 
     * 
     * 
     * @since 2018-03-01. We cannot create methods of all entity.
     *      - And it is even in wrong place.
     *      - It should be a global method to check all the Document ID.
     *          Hence, method name changes from `checkPostIDFormat` to `checkDocumentIDFormat`
     * 
     * @param documentID Document ID
     * @returns null if there is no problem. Otherwise `Router Response Error Object`
     * 
     * @todo Unit test
     */
    checkDocumentIDFormat(documentID) {
        if ( _.isEmpty( documentID ) ) return this.error( E.NO_DOCUMENT_ID );
        if (documentID.length > 128) return this.error( E.DOCUMENT_ID_TOO_LONG );
        if (documentID.indexOf('/') !== -1) return this.error( E.DOCUMENT_ID_CANNOT_CONTAIN_SLASH );
        return null;
    }


    /**
     * 
     * Returns true if the usre is not logged in.
     * 
     */
    isAnonymous() {
        return this.loginUid === Anonymous.uid;
    }





    /**
     * 
     * Removes properties with `undefined` value from the object.
     * 
     * You cannot set `undefiend` value into firestore `document`. It will produce a Critical error.
     * 
     * @param obj Object to be set into `firestore`.
     * 
     * @return object
     */
    sanitizeData(obj) {
        if (obj) {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
            }
        }

        /** Remove `idToken`, `route` */
        if ( obj && obj['idToken'] !== void 0 ) delete obj['idToken'];
        if ( obj && obj['route'] !== void 0 ) delete obj['route'];

        return this.hook('sanitizeData', obj);
        
    }



    /**
     * 
     * Checks if the two object has same types of properties.
     * 
     * 
     * @returns
     *          - null there is no problem on type checking.
     *          - `Router Response Error` Object if there is any error.
     * 
     * 
     * @todo test.
     */
    typeChecker( objectA, objectB ): ROUTER_RESPONSE {
        for( const i of Object( objectA ).keys() ) {
            if ( objectB[i] ) {
                if ( typeof objectA[i] !== typeof objectB[i] ) {
                    return this.error( E.TYPE_CHECK, { name: i, type: typeof objectA[i] });
                }
            }
        }
        return null;
    }

}