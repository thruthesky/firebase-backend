export const COLLECTIONS = {
    USERS: 'users',
    POST_DATA: 'post-data',
    POST_CONFIG: 'post-config',
};



export interface RouterResponse {
    route: string;
    code: number;
    message?: string;
    data?: any;
};

