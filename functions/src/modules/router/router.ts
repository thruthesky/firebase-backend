import { Request, Response } from 'express';
import { UserRouter } from './../user/user.router';

export class Router {
    query;
    constructor( public db, public request: Request, public response: Response ) {
        this.query = Object.assign( request.query, request.body );
        return;
    }


    get className() {
        if ( this.query.route === void 0 ) return false;
        const re = this.query.route.split('.');
        return re[0];
    }
    get methodName() {
        const re = this.query.route.split('.');
        return re[1];
    }
    param( name ) {
        if ( this.query[name] === void 0 ) return false;
        else return this.query[name];
    }
    async run() {
        if ( ! this.className ) return { code: -1, message: 'No route was specified.' };
        let route$;
        if ( this.className === 'user' ) {

         route$ = new UserRouter( this.db, this.query, this.response );
        }

        if ( route$[ this.methodName ] === void 0 ) return { code: -1, message: this.methodName + ' - method does not exists.' };
        

        const ret = { route: this.param('route') };
        const res = await route$[ this.methodName ]();

        

        if ( res && res['code'] !== void 0 && res['code'] < 0 ) { // This is error
            ret['code'] = res['code'];
            ret['message'] = res['message'];
        }
        else {
            ret['code'] = 0;
            ret['data'] = res;
        }

        return ret;
    }
}