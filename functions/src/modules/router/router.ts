import { UserRouter } from './../user/user.router';

export class Router {
    constructor( public db, public request, public response ) {
        return;
    }
    get className() {
        const re = this.request.body.route.split('.');
        return re[0];
    }
    get methodName() {
        const re = this.request.body.route.split('.');
        return re[1];
    }
    async run() {
        let route$;
        if ( this.className === 'user' ) {
         route$ = new UserRouter( this.db, this.request );       
        }

        if ( route$[ this.methodName ] === void 0 ) return { code: -1, message: this.methodName + ' - method does not exists' };
        
        return await route$[ this.methodName ]();
    }
}