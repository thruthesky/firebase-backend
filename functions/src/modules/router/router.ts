import { UserRouter } from './../user/user.router';
import { SystemRouter } from './../system/system.router';
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

        if ( ! this.verifyUser() ) {
            return this.error(E.FAILED_TO_VERIFY_USER);
        }

        // console.log('run:');
        let $router = null;
        if (this.routeClassName === 'user') $router = new UserRouter();
        else if (this.routeClassName === 'system' ) $router = new SystemRouter();
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