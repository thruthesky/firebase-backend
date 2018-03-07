import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { COLLECTION_PREFIX } from './../../settings/settings';

import * as E from './../core/error';


import { ROUTER_RESPONSE, Anonymous, COLLECTIONS, SYSTEM_SETTINGS } from './../core/defines';
import { Library } from './../library/library';




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
    static admin;

    /**
     * HTTP Request parameters.
     */
    static params: any = null;


    /**
     * Login user `uid` if the user is logged in. The user may be Anonymous.
     * @desc Whether the user logged in with ID Token or `uid`, this value will hold login user's uid.
     */
    static uid: string = null;

    static hookObj = null;

    /**
     * If the user logs in, it will have user data. It may have anonymous user data.
     */
    loginUser: USER_DATA = null;
    library: Library;

    collectionName: string = null;

    constructor(collectionName) {
        this.collectionName = collectionName;
        // console.log("collectionName: ", this.collectionName);
        this.library = new Library();
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
        return '2018-03-06-9-9-pm';
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
        return this.library.segment(this.param('route'), '.', 0);
    }

    /**
     * Returns method name in the HTTP method variable.
     * 
     * @return 
     * 
     */
    get routeMethodName() {
        return this.library.segment(this.param('route'), '.', 1);
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
        return Base.uid
    }

    get collectionUsers(): string {
        return this.collectionNameWithPrefix(COLLECTIONS.USERS)
    }
    get collectionSettings(): string {
        return this.collectionNameWithPrefix(COLLECTIONS.SETTINGS)
    }

    /**
     * returns a promise of firestore snapshot
     * @param collectionName collection name
     * @param documentID document id
     */
    getDocument(collectionName, documentID): Promise<admin.firestore.DocumentSnapshot> {
        return this.db.collection(collectionName).doc(documentID).get()
    }
    /**
     * Returns user data or backend error object.
     * @desc This is a simple way to get user data.
     * @param uid User uid
     * @return A resolved promise of User document data object or `backend error object`
     */
    async getUserDocument(uid): Promise<USER_DATA> {
        return this.getDocument(this.collectionUsers, uid)
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    return this.hook('base.getUserDocument_then', data);
                }
                else return this.error(E.USER_ID_NOT_EXISTS_IN_USER_COLLECTION, { id: uid });
            })
            .catch(e => this.error(e));
    }



    /**
     * Returns a document under `settings` collection.
     * @param documentID Document ID to get the settings document.
     * @return a `settings` document object in resolved promise.
     * @todo test
     */
    async getSettings(documentID): Promise<any> {
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
        return Base.systemSettings.adminEmail === this.loginUid;
    }

    isSystemInstalled(): boolean {
        return !!this.getAdminEmail();
    }




    /**
     * Returns false if there is no error. Otherwise, error code will be returned.
     * @param uid User uid
     */
    checkUIDFormat(uid) {

        if (!uid) return this.error(E.NO_UID);
        if (uid.length > 128) return this.error(E.UID_TOO_LONG);
        if (uid.indexOf('/') !== -1) return this.error(E.UID_CANNOT_CONTAIN_SLASH);

        return false;
    }

    /**
     * 
     * Checks if the Document ID is in right format.
     * 
     * Returns false if there is no error. Otherwise, error code will be returned.
     * 
     * @since 2018-03-01. We cannot create methods of all entity.
     *      - And it is even in wrong place.
     *      - It should be a global method to check all the Document ID.
     *          Hence, method name changes from `checkPostIDFormat` to `checkDocumentIDFormat`
     * 
     * @param uid User uid
     * @param routerName Router name to distinguish which error will be returned.
     * @todo Unit test
     */
    checkDocumentIDFormat(docID, routerName: string) {
        routerName = routerName.toUpperCase();
        if ( _.isEmpty( docID ) ) return this.error( E.NO_DOCUMENT_ID );
        if (docID.length > 128) return this.error( E.DOCUMENT_ID_TOO_LONG );
        if (docID.indexOf('/') !== -1) return this.error( E.DOCUMENT_ID_CANNOT_CONTAIN_SLASH );
        return false;
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

        /** Remove `idToken` */
        if ( obj && obj['idToken'] !== void 0 ) delete obj['idToken'];

        return this.hook('sanitizeData', obj);
        
    }



}