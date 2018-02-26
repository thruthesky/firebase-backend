import { Request, Response } from 'express';
import { UserRouter } from './../user/user.router';
import { PostRouter } from "./../post/post.router";
import { Base } from './../core/base';
import * as E from './../core/error';
import { ROUTER_RESPONSE } from './../core/defines';




export class Router extends Base {
    constructor(params) {
        super(null);
        Base.params = params;
        // console.log("[ params ] ", params );
    }

    async run(): Promise<ROUTER_RESPONSE> {
        if (!this.param('route')) {
            return this.error(E.EMPTY_ROUTE);
        }

        let $router = null;
        if (this.routeClassName === 'user') {
            $router = new UserRouter();
        }

        if (this.routeClassName === 'post') {
            $router = new PostRouter();
        }

        else return this.error(E.WRONG_ROUTE);



        // console.log($router);

        if ($router[this.routeMethodName] === void 0) return this.error(E.WRONG_METHOD);;

        let ret = { route: this.param('route'), code: 0 };
        const result = await $router[this.routeMethodName]();


        if (  this.isErrorObject( result ) ) {
            ret = Object.assign( ret, result );
            // ret['code'] = res['code'];
            // ret['message'] = res['message'];
        }
        else {
            ret['data'] = result;
        }

        return ret;
    }
}