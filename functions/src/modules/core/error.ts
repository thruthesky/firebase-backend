const es = {};
export const NO_EMAIL = -50; es[NO_EMAIL] = 'No email address.';
export const NO_PASSWORD = -51; es[NO_PASSWORD]= 'No password.';
export const NO_NAME = -52; es[NO_NAME]= 'No name.';
export const NO_UID = -53; es[NO_UID]= 'No uid.';



export function obj( code ) {
    return {
        code: code,
        message: es[ code ]
    };
};
