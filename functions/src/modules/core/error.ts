const es = {};
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD] = 'No password.';
export const NO_NAME = -52; es[NO_NAME] = 'No name.';
export const NO_UID = -53; es[NO_UID] = 'No uid.';
export const WRONG_ROUTE = -60; es[WRONG_ROUTE] = 'The given route is not exists. It is a wrong route.';
export const EMPTY_ROUTE = -61; es[EMPTY_ROUTE] = 'Empty route.';
export const WRONG_METHOD = -61; es[WRONG_METHOD] = 'Wrong method.';
export const NO_USER_DOCUMENT_ID = -4010; es[NO_USER_DOCUMENT_ID] = 'Empty document path for user collection.';




interface ErrorObject {
    code: number;
    message: string;
};


export function obj(code): ErrorObject {

    if (typeof code === 'number') {
        return {
            code: code,
            message: es[code]
        };
    }

    else if (typeof code === 'object') {
        return {
            code: code['code'],
            message: code['message']
        }
    }

    return null;
};
