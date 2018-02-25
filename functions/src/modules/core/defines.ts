export const Anonymous = {
    uid: 'anonymous-uid',
    email: 'anonymous@gmail.com',
    password: 'anonymous-password-and-it-is-not-harmful-that-anyone-can-login-as-anonymous',
    emailVerified: false,
    displayName: 'Anonymous',
    photoURL: '',
    disabled: false
};


export const COLLECTIONS = {
    USERS: 'users',
    POST_DATA: 'post-data',
    POST_CONFIG: 'post-config',
};



export interface ROUTER_RESPONSE {
    route: string;
    code: number;
    message?: string;
    data?: any;
};

