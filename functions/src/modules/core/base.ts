import * as admin from 'firebase-admin';
import { COLLECTION_PREFIX } from './../../settings/settings';

import * as E from './../core/error';


import { ROUTER_RESPONSE, Anonymous } from './../core/defines';
import { Library } from './../library/library';









export class Base {
    collectionName: string = null;

    /**
     * If set to true, it will accept `uid` as user's verficaton instead of `ID Token`.
     * @see README.md
     */
    static useUid = false;

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


    library: Library;
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.library = new Library();
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


    version() {
        return '0.2';
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
    error(code): ROUTER_RESPONSE {
        const obj = <ROUTER_RESPONSE>E.obj(code);
        if (obj) {
            obj['route'] = this.param('route');
        }
        return obj;
    }

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
        return this.library.segment( this.param('route'), '.', 0 );
    }

    /**
     * Returns method name in the HTTP method variable.
     * 
     * @return 
     * 
     */
    get routeMethodName() {
        return this.library.segment( this.param('route'), '.', 1 );
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
     * 
     * 
     * @desc it sets 'null' on `Base.uid` at first.
     * @desc it saves the user's uid at `Base.uid`. It many be Anonymous uid.
     * @desc If no `idToken` was given by HTTP request, then Anonymous uid will be used.
     * @desc If wrong `idToken` was give, then ErrorObject will be returned.
     * @desc IMPORTANT:
     *      If `idToken` is set, but falsy value was given like empty stirng, false, null, undefiend,
     *          Then this is not an error.
     *          The user will be logged in as Anonymous.
     *          This is different from Unit Test with uid.
     *      
     * 
     * 
     * @desc For unit-testing, You will need to set `Base.useUid` to true in settings,
     *          and `uid` will be accepted from HTTP request and will be used as login user's uid.
     * 
     * @return
     *      - TRUE on success.
     *      - Or ErrorObject on error.
     * 
     *      On unit test with uid, If there is no uid. that's NOT an error. the user will be set to Anonymous !!
     *      If the `uid` is set but empty value, then it is an error of 'NO_UID'.
     * 
     *
     * 
     */
    async verifyUser(): Promise<any> {
        this.loginUid = null; // reset ( on every Router() call) before verify.


        if (Base.useUid) {
            // console.log("verifyUser(). Base.useUid==true. Going to use `uid` as Verified..");

            const uid = this.param('uid');
            if (uid === void 0) {
                this.loginUid = Anonymous.uid;
                return true;
            }
            else if (!uid) {
                return this.error(E.NO_UID);
            }
            this.loginUid = uid;
            return true;
        }

        const idToken = this.param('idToken');
        if (idToken) { // token was given
            return await this.auth.verifyIdToken(idToken)
                .then(decodedToken => {
                    this.loginUid = decodedToken.uid;
                    // console.log("===== Verified UID: ", this.loginUid);
                    return true;
                })
                .catch(e => {
                    return this.error(E.FIREBASE_FAILED_TO_DECODE_ID_TOKEN);
                });
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
     * @todo Unit test
     */
    checkDocumentIDFormat(postId) {
        if (!postId) return this.error(E.NO_POST_ID_ON_GET);
        if (postId.length > 128) return this.error(E.POST_ID_TOO_LONG);
        if (postId.indexOf('/') !== -1) return this.error(E.POST_ID_CANNOT_CONTAIN_SLASH);
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



}