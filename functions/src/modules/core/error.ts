const es = {};
export const TEST = -11; es[TEST] = 'Test Error';
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD] = 'No password.';
export const NO_NAME = -52; es[NO_NAME] = 'No name.';
<<<<<<< HEAD
export const NO_ID = -53; es[NO_ID] = 'No uid.';
export const WRONG_GENDER = -54; es[WRONG_GENDER] = 'Wrong gender.';

export const WRONG_ROUTE = -60; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -61; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -61; es[WRONG_METHOD] = 'Wrong method.';

export const NO_USER_DOCUMENT_ID = -4010; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';
export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE = 5; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE] = 'Document ID does not exsits for update.';
export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET = 6; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET] = 'No data found for document id.';

=======
export const NO_UID = -53; es[NO_UID] = 'No uid.';
export const UID_TOO_LONG = -54; es[UID_TOO_LONG] = 'UID is too long. Must be less than 128 characters.';
export const UID_CANNOT_CONTAIN_SLASH = -55; es[UID_CANNOT_CONTAIN_SLASH] = 'UID cannot contain slashes.';

export const WRONG_GENDER = -61; es[WRONG_GENDER] = 'Wrong gender.';
export const WRONG_ROUTE = -60; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -61; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -61; es[WRONG_METHOD] = 'Wrong method.';
>>>>>>> bedb2b56ee40da974d4feea3d63fbf4674d71c08


export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE = -40005; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE] = 'Document ID does not exsits for update.';
export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET = -40004; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET] = 'Document ID does not exists to get the document data';


export const USER_NOT_LOGIN = -40010; es[USER_NOT_LOGIN] = 'User has not logged in. Or maybe the has a wrong(expired) ID token.';


export const NO_USER_DOCUMENT_ID = -40020; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';

export const FAILED_TO_VERIFY_USER = -40030; es[FAILED_TO_VERIFY_USER] = 'Failed to verify who you are.';
export const FAILED_TO_CREATE_ANONYMOUS = -40032; es[FAILED_TO_CREATE_ANONYMOUS] = 'Failed to create anonymous account';
export const SYSTEM_ALREADY_INSTALLED = -40100; es[SYSTEM_ALREADY_INSTALLED] = 'System is already installed.';

export const COLLECTION_IS_NOT_SET = -40200; es[COLLECTION_IS_NOT_SET] = 'Collection name is set set on base class.';
export const FIREBASE_CODE = -40900; es[FIREBASE_CODE] = 'Firebase error code';

export const FIREBASE_AUTH_UID_ALREADY_EXISTS = 40901; es[FIREBASE_AUTH_UID_ALREADY_EXISTS] = 'User already exists';

/**
 * 
 * 
 * @since 2018-02-26. `code` must be a number and it MUST be less than 0.
 * @desc `code` must be a number less than 0.
 * @desc When `Firestore` throws error, the error code is usually bigger than 0 and sometimes it is evena  string like `auth/uid-already-exists`.
 *  We will convert it into our ERROR CODE.
 * 
 * @desc So, if the `code` is number and less than 0, then it's an error. otherwise. it's not an error.
 * 
 *      if `code` is one of below, it's not an error.
 *      - a falsy value
 *      - string
 *      - number that is bigger than or equal to 0
 * 
 * @desc When `BACKEND_ERROR_OBJECT` is discussed, it means `Backend Error Object`.
 *          While `Error Object` is stated, it means an Error Object that is any kind of error object.
 *              - It can be a `Backend Error Object` or `Firebase Error Object` or `Javascript Error Object`.
 * 
 * 
 */
export interface BACKEND_ERROR_OBJECT {
    code: number;
    message?: string;
};



/**
 * Returns true if the input is an Error Object.
 * @desc It may be a Firebase erorr object or Simple Javascript error objct.
 *          - Meaning, if `code` property exists and none falsy value, it returns true.
 *          - This conflicts the concept of `BACKEND_ERROR_OBJECT`.
 *          - the code of `BACKEND_ERROR_OBJECT` object can only hold number that is less than 0.
 *          - while the code of Error Object can hold any value. number or string.
 * 
 * @param o any value. May be an Error Object.
 * 
 */
export function isErrorObject(o): boolean {
    if (o) {
        if (o['code'] !== void 0) {
            if (typeof o['code'] === 'number') {
                if (o['code'] < 0) {
                    return true;
                }
            }
        }
    }
    return false;
}


/**
 * 
 * @param code It may be a ERROR CODE or a `Error Object`.
 * 
 *          - If `Firestore Error Object` or `Javascript Error Object` was given, then it will be replaced as BACKEND_ERROR_OBJECT.
 */
export function obj(code): BACKEND_ERROR_OBJECT {

    if (typeof code === 'number') { // Backend Error Code 
        return {
            code: code,
            message: es[code]
        };
    }
    else if (typeof code === 'object') { // May be an Error Code Object or `Firestore Error` object.

        const eo = code; // error object
        if (eo['code'] === void 0) { // has no code? then it's not an error object.
            return code; // just return as it is.
        }
        if (typeof eo['code'] === 'string' || ( typeof eo['code'] === 'number' && eo['code'] > 0 ) ) { // It is `Firestore` Error Object.
            return convertFirestoreErrorToBackendError(eo)
        }
        return {
            code: code['code'],
            message: code['message']
        }
    }
    // if the input is not number or object. Just return as it was.
    return code;
};


function convertFirestoreErrorToBackendError( FireStoreErrorObject ) {

    let code = 0;
    switch( FireStoreErrorObject['code'] ) {
        case 5 : code = DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE; break;
        case 'auth/uid-already-exists': code = FIREBASE_AUTH_UID_ALREADY_EXISTS; break;
        default : 
        return { code: FIREBASE_CODE, message: `Firebase error code. it is not converted. code: ${FireStoreErrorObject['code']}. message: ${FireStoreErrorObject['message']}`}
    }

    return {
        code: code,
        message: es[code]
    };
}
