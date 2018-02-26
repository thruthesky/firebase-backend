export const UID = 'uid';

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
    SETTINGS: 'settings',
    POST_DATA: 'posts',
    POST_SETTINGS: 'post-setttings',
    COMMENTS : 'comments'
};


import { BACKEND_ERROR_OBJECT } from './error';
export interface ROUTER_RESPONSE extends BACKEND_ERROR_OBJECT {
    route: string;
    data?: any;
};

