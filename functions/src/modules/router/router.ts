import { UserRouter } from './../user/user.router';
<<<<<<< HEAD
import { SystemRouter } from './../system/system.router';
=======
import { PostRouter } from "./../post/post.router";
>>>>>>> 87596b1f38684073eca2c222d625dd5a21d6c85d
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

<<<<<<< HEAD
        // console.log('run:');
        let $router = null;
        if (this.routeClassName === 'user') $router = new UserRouter();
        else if (this.routeClassName === 'system' ) $router = new SystemRouter();
=======
        if (this.routeClassName === 'post') {
            $router = new PostRouter();
        }

>>>>>>> 87596b1f38684073eca2c222d625dd5a21d6c85d
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