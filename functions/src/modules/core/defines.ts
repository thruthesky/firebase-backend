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
<<<<<<< HEAD
    USERS: 'x-users',
    SETTINGS: 'x-settings',
    POST_DATA: 'x-posts',
    POST_SETTINGS: 'x-post-setttings',
    COMMENTS : 'x-comments'

};

export interface ROUTER_RESPONSE {
=======
    USERS: 'users',
    SETTINGS: 'settings',
    POST_DATA: 'posts',
    POST_SETTINGS: 'post-setttings',
    COMMENTS : 'comments'
};


import { BACKEND_ERROR_OBJECT } from './error';
export interface ROUTER_RESPONSE extends BACKEND_ERROR_OBJECT {
>>>>>>> bedb2b56ee40da974d4feea3d63fbf4674d71c08
    route: string;
    data?: any;
};

