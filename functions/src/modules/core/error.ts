const es = {};
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD] = 'No password.';
export const NO_NAME = -52; es[NO_NAME] = 'No name.';
export const NO_ID = -53; es[NO_ID] = 'No uid.';
export const WRONG_GENDER = -61; es[WRONG_GENDER] = 'Wrong gender.';
export const WRONG_ROUTE = -60; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -61; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -61; es[WRONG_METHOD] = 'Wrong method.';
export const NO_USER_DOCUMENT_ID = -4010; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';
export const DOCUEMNT_ID_DOES_NOT_EXISTS_FOR_UPDATE = 5; es[DOCUEMNT_ID_DOES_NOT_EXISTS_FOR_UPDATE] = 'Document ID does not exsits for update.';



/**
 * 
 * @desc `code` can be bigger than 0. Firestore error code is bigger than 0
 * 
 */
export interface ERROR_OBJECT {
    code: number;
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
