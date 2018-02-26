export const COLLECTIONS = {
    USERS: 'x-users',
    SETTINGS: 'x-settings',
    POST_DATA: 'x-posts',
    POST_SETTINGS: 'x-post-setttings',
    COMMENTS : 'x-comments'

};

export interface ROUTER_RESPONSE {
    route: string;
    code: number;
    message?: string;
    data?: any;
};

