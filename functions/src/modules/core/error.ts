const es = {};
export const TEST = -11; es[TEST] = 'Test Error';
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD] = 'No password.';
export const NO_NAME = -52; es[NO_NAME] = 'No name.';
export const NO_UID = -53; es[NO_UID] = 'No uid.';
export const UID_TOO_LONG = -54; es[UID_TOO_LONG] = 'UID is too long. Must be less than 128 characters.';
export const UID_CANNOT_CONTAIN_SLASH = -55; es[UID_CANNOT_CONTAIN_SLASH] = 'UID cannot contain slashes.';


export const WRONG_GENDER = -61; es[WRONG_GENDER] = 'Wrong gender.';
export const WRONG_ROUTE = -60; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -61; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -61; es[WRONG_METHOD] = 'Wrong method.';

export const NO_USER_DOCUMENT_ID = -4010; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';
export const DOCUEMNT_ID_DOES_NOT_EXISTS_FOR_UPDATE = 5; es[DOCUEMNT_ID_DOES_NOT_EXISTS_FOR_UPDATE] = 'Document ID does not exsits for update.';
export const FAILED_TO_VERIFY_USER = -4020; es [FAILED_TO_VERIFY_USER] = 'Failed to verify who you are.';
export const FAILED_TO_CREATE_ANONYMOUS = -4022; es[FAILED_TO_CREATE_ANONYMOUS] = 'Failed to create anonymous account';
export const SYSTEM_ALREADY_INSTALLED = -4100; es[SYSTEM_ALREADY_INSTALLED] = 'System is already installed.';

export const COLLECTION_IS_NOT_SET = -4200; es[COLLECTION_IS_NOT_SET] = 'Collection name is set set on base class.';
/**
 * 
 * @desc `code` can be a string or a number.
 *      Firestore error code is usually bigger than 0 and sometimes it is evena  string like `auth/uid-already-exists`.
 * 
 * @desc `code` is a falsy value if it is not error.
 * 
 */
export interface ERROR_OBJECT {
    code: number | string;
    message: string;
};


/**
 * 
 * @param code It may be a ERROR CODE or a `Firestore Error` object. 
 * 
 *          - If `Firestore Error` was give, then it will be replaced as ERROR_OBJECT.
 */
export function obj(code): ERROR_OBJECT {

    if (typeof code === 'number') { // ERROR CODE
        return {
            code: code,
            message: es[code]
        };
    }

    else if (typeof code === 'object') { // `Firestore Error` object.
        return {
            code: code['code'],
            message: code['message']
        }
    }

    return null;
};
