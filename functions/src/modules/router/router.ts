import { Request, Response } from 'express';
import { UserRouter } from './../user/user.router';
import { Base } from './../core/base';


export class Router extends Base {
    constructor( params ) {
        super( null );
        Base.params = params;
        // console.log("[ params ] ", params );
    }

    async run() {
        if (!this.routeClassName) return { code: -1, message: 'No route was specified.' };

        let $router = null;
        if (this.routeClassName === 'user') {
            $router = new UserRouter();
        }
        else return { code: -20, message: 'Router does exists.' };

        

        // console.log($router);

        if ( $router[this.routeMethodName] === void 0) return { code: -1, message: this.routeMethodName + ' - method does not exists.' };

        const ret = { route: this.param('route') };

        const res = await $router[this.routeMethodName]();

        if (res && res['code'] !== void 0 && res['code'] < 0) { // This is error
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