const es = {};
export const TEST = -11; es[TEST] = 'Test Error';
export const UNKNOWN = -12; es[UNKNOWN] = 'Unknown erorr.';
export const UNHANDLED = -10; es[UNHANDLED] = 'Unhandled error message must have suggestion on which error is to be handled.'
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD] = 'No password.';
export const NO_NAME = -52; es[NO_NAME] = 'No name.';
export const NO_UID = -53; es[NO_UID] = 'No uid.';

export const UID_TOO_LONG = -54; es[UID_TOO_LONG] = 'UID is too long. Must be less than 128 characters.';
export const UID_CANNOT_CONTAIN_SLASH = -55; es[UID_CANNOT_CONTAIN_SLASH] = 'UID cannot contain slashes.';

export const WRONG_GENDER = -40061; es[WRONG_GENDER] = 'Wrong gender.';
export const WRONG_ROUTE = -40060; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -40063; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -40064; es[WRONG_METHOD] = 'Wrong method.';
export const ANONYMOUS_CANNOT_EDIT_PROFILE = -40070; es[ANONYMOUS_CANNOT_EDIT_PROFILE] = 'Anonymous cannot set/update profile.';




export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE = -40005; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE] = 'Document ID "#id" does not exsit for update.';
export const DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET = -40004; es[DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET] = 'Document ID was not found or does not exist in database';


export const USER_NOT_LOGIN = -40010; es[USER_NOT_LOGIN] = 'User has not logged in. Or maybe the has a wrong(expired) ID token.';


export const NO_USER_DOCUMENT_ID = -40020; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';

export const FAILED_TO_VERIFY_USER = -40030; es[FAILED_TO_VERIFY_USER] = 'Failed to verify who you are.';
export const FAILED_TO_CREATE_ANONYMOUS = -40032; es[FAILED_TO_CREATE_ANONYMOUS] = 'Failed to create anonymous account';
export const SYSTEM_ALREADY_INSTALLED = -40100; es[SYSTEM_ALREADY_INSTALLED] = 'System is already installed.';

export const COLLECTION_IS_NOT_SET = -40200; es[COLLECTION_IS_NOT_SET] = 'Collection name is set set on base class.';

// Posting errors
export const EMPTY_POST_BODY = -40301; es[EMPTY_POST_BODY] = 'Post body can\'t be empty';
export const POST_HAS_NO_CATEGORY = -40302; es[POST_HAS_NO_CATEGORY] = 'Post must have category.';
export const NO_POST_ID = -40353; es[NO_POST_ID] = 'No post id. Post id is needed to identify the post.'
export const POST_ID_TOO_LONG = -40354; es[POST_ID_TOO_LONG] = 'post id is too long. Must be less than 128 characters.';
export const POST_ID_CANNOT_CONTAIN_SLASH = -40355; es[POST_ID_CANNOT_CONTAIN_SLASH] = 'post id cannot contain slashes.';
// export const POST_ID_CANNOT_SOLELY_CONSIST_DOT = -40356; es[POST_ID_CANNOT_SOLELY_CONSIST_DOT] = 'Post id or document id cannot be equal to dot [.] or double dot [..] ';

// Categories
export const NO_CATEGORY_ID = -40460; es[NO_CATEGORY_ID] = 'Category should have an ID.';
export const CATEGORY_ID_TOO_LONG = -40454; es[CATEGORY_ID_TOO_LONG] = 'Category id is too long. Must be less than 128 characters.';
export const CATEGORY_ID_CANNOT_CONTAIN_SLASH = -40445; es[CATEGORY_ID_CANNOT_CONTAIN_SLASH] = 'Category id cannot contain slashes.';
export const CATEGORY_LEVEL_ON_WRITE_MUST_CONTAIN_NUMBER = -40446; es[CATEGORY_LEVEL_ON_WRITE_MUST_CONTAIN_NUMBER] = 'Level on write field in category should be number.'
export const CATEGORY_LEVEL_ON_READ_MUST_CONTAIN_NUMBER = -40447; es[CATEGORY_LEVEL_ON_READ_MUST_CONTAIN_NUMBER] = 'Level on read field in category should be a number.'
export const CATEGORY_LEVEL_ON_LIST_MUST_CONTAIN_NUMBER = -40448; es[CATEGORY_LEVEL_ON_LIST_MUST_CONTAIN_NUMBER] = 'Level on list field in category should be a number.'
export const ANONYMOUS_CANNOT_SET_CATEGORY = -40449; es[ANONYMOUS_CANNOT_SET_CATEGORY] = 'Anonymous cannot set a category';

// Firebase errors.

export const FIREBASE_CODE = -40900; es[FIREBASE_CODE] = 'Firebase error code';
export const FIREBASE_AUTH_UID_ALREADY_EXISTS = -40901; es[FIREBASE_AUTH_UID_ALREADY_EXISTS] = 'User already exists';
export const FIREBASE_ID_TOKEN_EXPIRED = -40902; es[FIREBASE_ID_TOKEN_EXPIRED] = 'User ID Token has expired.';
export const FIREBASE_FAILED_TO_DECODE_ID_TOKEN = -40905; es[FIREBASE_FAILED_TO_DECODE_ID_TOKEN] = 'Failed to verfiy who you are. The ID Token may be expired or invalid.';
export const FIREBASE_INVALID_PASSWORD = -40906; es[FIREBASE_INVALID_PASSWORD] = '';



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
 * Returns `BACKEND_ERROR_OBJECT` from a number or `Firebase error object`.
 * 
 * @param code It may be a ERROR CODE or a `Error Object`.
 * 
 *          - If `Firestore Error Object` or `Javascript Error Object` was given, then it will be replaced as BACKEND_ERROR_OBJECT.
 * 
 * @return
 *      - If the input is falsy value return the input is retuerned as it is.
 *      - if the input is not a number or Error Object, then the input is returned as it is.
 *      - Otherwise, Backend Error Object is returned.
 */
export function obj(code, info: object = {}): BACKEND_ERROR_OBJECT {

    if (!code) return code; // if falsy, return as it is.

    let re: BACKEND_ERROR_OBJECT;
    if (typeof code === 'number') { // Backend Error Code 
        re = {
            code: code,
            message: es[code]
        };
    }
    else if (typeof code === 'object' && code && code.code !== void 0) { // May be an Error Code Object or `Firestore Error` object.

        const eo = code; // error object
        if (eo['code'] === void 0) { // has no code? then it's not an error object.
            return code; // just return as it is.
        }
        if (typeof eo['code'] === 'string' || (typeof eo['code'] === 'number' && eo['code'] > 0)) { // It is `Firestore` Error Object.
            re = convertFirestoreErrorToBackendError(eo)
        }
        else {
            re = {
                code: code['code'],
                message: code['message']
            }
        }
    }
    // if the input is not number or object. Just return as it was.
    else {
        return code;
    }

    re['message'] = patchWithMarker(re['message'], info);
    return re;
};


/**
 * 
 * Returns a string after patching error information.
 * @param str Error string
 * @param info Error information to patch into the string
 * 
 * @see convertFirestoreErrorToBackendError() to know how to use.
 */
function patchWithMarker(str, info: object = null): string {

    if (info === null || typeof info !== 'object') return str;
    const keys = Object.keys(info);
    if (!keys.length) return str;

    for (const k of keys) {
        str = str.replace('#' + k, (<string>info[k]));
    }
    return str;
}



/**
 * Returns BACKEND_ERROR object.
 * @param FireStoreErrorObject a Firebase Error Object.
 * 
 * 
 */
function convertFirestoreErrorToBackendError(FireStoreErrorObject): BACKEND_ERROR_OBJECT {


    let code = 0;
    let message = '';

    // console.log("convert; ", FireStoreErrorObject);
    switch (FireStoreErrorObject['code']) {
        case 5: /// convert firebase error message into backend error message with information.
            code = DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE;
            message = es[code];
            const error_object_message = <string>FireStoreErrorObject['message'];
            let id = '';
            const arr = error_object_message.split('x-users/');
            if (arr.length === 2) {
                id = arr[1];
            }
            else id = error_object_message;
            message = patchWithMarker(es[code], { id: id });
            break;
        case 'auth/uid-already-exists':
            code = FIREBASE_AUTH_UID_ALREADY_EXISTS;
            message = FireStoreErrorObject['message'];
            break;
        case 'auth/argument-error':
            if (FireStoreErrorObject['message'].indexOf('ID token has expired') !== -1) {
                code = FIREBASE_ID_TOKEN_EXPIRED;
                message = FireStoreErrorObject['message'];
            }
            break;
        case 'auth/invalid-password':
            code = FIREBASE_INVALID_PASSWORD;
            message = <string>FireStoreErrorObject['message'];
            break;
        default:
            return { code: FIREBASE_CODE, message: `Firebase error code. it is not converted. code: ${FireStoreErrorObject['code']}. message: ${FireStoreErrorObject['message']}` }
    }

    return {
        code: code,
        message: message
    };
}
