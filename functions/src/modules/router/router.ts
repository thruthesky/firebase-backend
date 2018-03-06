import { CategoryRouter } from './../post/category.router';
import { UserRouter } from './../user/user.router';
import { SystemRouter } from './../system/system.router';
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

        // Check router class.
        let $router = null;
        if (this.routeClassName === 'user') $router = new UserRouter();
        else if (this.routeClassName === 'system' ) $router = new SystemRouter();
        else if (this.routeClassName === 'post') $router = new PostRouter();
        else if (this.routeClassName === 'category') $router = new CategoryRouter();
        else return this.error(E.WRONG_ROUTE);

        
        // Check router method.
        if ($router[this.routeMethodName] === void 0) return this.error(E.WRONG_METHOD);


        // Check user login.
        // 
        const reLogin = await this.verifyUser();
        if ( reLogin !== true ) {
            return reLogin;
        }


        // Run router.
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