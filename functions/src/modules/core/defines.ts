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

