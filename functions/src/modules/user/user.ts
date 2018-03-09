
// import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { E } from '../core/core';
import { Base } from './../core/base';
import { Document } from './../document/document';
import { COLLECTIONS, Anonymous } from './../core/defines';





export interface USER_COMMON_FIELDS {
    name?: string;
    displayName?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthday?: string;
    gender?: string;
    photoURL?: string;
    phoneNumber?: string;
    landline?: string;
    address?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
    role?: string;
    created?: string;
}


/**
 * User data to create/update.
 * 
 * @desc You can update more.
 * 
 * @desc The Document ID is actually `uid`.
 */
export interface USER_DATA extends USER_COMMON_FIELDS {
    uid?: string;               /// `uid` is needed only for unit test. `uid` should not be saved in document.
    email?: string;
}
export interface USER_REGISTER extends USER_COMMON_FIELDS {
    uid: string;
    email: string;
    password: string;
}


/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class User extends Document {
    constructor( ) {
        super( COLLECTIONS.USERS );
    }
    
    count() {
        return 10;
    }


    // /**
    //  * It sanitize user data to set/update.
    //  * 
    //  * @param data User data 
    //  */
    // sanitizeUserData(data: USER_DATA) {
    //     return this.hook( 'user.router.sanitizeUserData', data );
    // }

    

    /**
     * Returns true if the user is properly verified.
     * 
     * 
     * 
     * @desc it sets 'null' on `Base.uid` at first.
     * @desc it saves the user's uid at `Base.uid`. It may be Anonymous uid.
     * @desc If no `idToken` was given by HTTP request, then Anonymous uid will be used.
     * @desc IMPORTANT:
     *      `Anonymous` will be used if `idToken` is set to falsy like empty string, undefined, null.
     * 
     *      
     * @desc For unit-testing, You will need to set `Base.useUid` to true in settings,
     *          and `uid` will be accepted from HTTP request and will be used as login user's uid.
     *      IMPORTANT: `Anonymous` will be used if uid is falsy like empty string.
     * 
     * 
     * 
     * @desc IMPORTANT: If wrong `UID` or idToken` was give, then new user document will be created.
     * @see 
     * 
     *      
     * 
     * @return
     *      - User Document Object on right `UID` or `ID Token` and if they are falsy.
     *      - User Document on Wrong UID or `ID Token` whose user document does not exists.
     * 
     *      - Or ErrorObject on error like failed to decode `ID Token`
     * 
     * 
     *
     * 
     */
    async verify(): Promise<any> {
        this.loginUid = null; // reset ( on every Router() call) before verify.

        if (Base.useUid) {
            // console.log("verifyUser(). Base.useUid==true. Going to use `uid` as Verified..");
            const uid = this.param('uid');
            
            if (_.isEmpty(uid)) {
                this.loginUid = Anonymous.uid;
            }
            else if (this.checkUIDFormat(uid)) return this.checkUIDFormat(uid);
            else this.loginUid = uid;
        }
        else { // Login with ID Token.
            const idToken = this.param('idToken');
            if (idToken) { // token was given
                const re = await this.auth.verifyIdToken(idToken)
                    .then(decodedToken => {
                        this.loginUid = decodedToken.uid;
                    })
                    .catch(e => {
                        return this.error(E.FIREBASE_FAILED_TO_DECODE_ID_TOKEN);
                    });
                if (this.isErrorObject(re)) { // If there is error on ID Token, then return error.
                    return re;
                }
            }
            else { // no token was given
                this.loginUid = Anonymous.uid;
            }
        }

        Base.loginUser = await this.get( 'createOnVerify' );
        // console.log( this.loginUser );
        return this.loginUser;
    }

    /**
     * 
     */
    async get( field = 'createdOnGet' ) {
        const re = await super.get(this.loginUid);
        /** @todo test more on `create on get` */
        if (this.isErrorObject(re) && re.code === E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET) {
            // console.log("user.router::get() user document does not exists. going to create one");
            const reSet = await super.set({ createdOnGet: true }, this.loginUid);
            if (this.isErrorObject(reSet)) return reSet;
            else if (!reSet) return reSet;
            else {
                // console.log("user.router::get() user documnet has created.");
                return await super.get(this.loginUid);
            }
        }
        else return re;
    }
    

    get isLogin(): boolean {
        if ( this.isAnonymous() ) return false;
        return !! this.loginUid;
    }

    getRole(): string {

        // get admin role if the user is admin.
        if ( this.isAdmin() ) return 'admin';
        else if ( this.isLogin ) {
            return 'member';
        }
        else if ( this.isAnonymous() ) return 'anonymous';
        return '';
    }
}