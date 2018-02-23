import { Request, Response } from 'express';
import { UserRouter } from './../user/user.router';
import { Base } from './../core/base';
import * as E from './../core/error';
import { RouterResponse } from './../core/defines';




export class Router extends Base {
    constructor(params) {
        super(null);
        Base.params = params;
        // console.log("[ params ] ", params );
    }

    async run(): Promise<RouterResponse> {
        if (!this.param('route')) {
            return this.error(E.EMPTY_ROUTE);
        }

        let $router = null;
        if (this.routeClassName === 'user') {
            $router = new UserRouter();
        }
        else return this.error(E.WRONG_ROUTE);



        // console.log($router);

        if ($router[this.routeMethodName] === void 0) return this.error(E.WRONG_METHOD);;

        const ret = { route: this.param('route'), code: 0 };

        const res = await $router[this.routeMethodName]();

        if (res && res['code'] !== void 0 && res['code'] < 0) { // This is error
            ret['code'] = res['code'];
            ret['message'] = res['message'];
        }
        else {
            ret['data'] = res;
        }

        return ret;
    }
}