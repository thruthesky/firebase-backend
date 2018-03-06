import { User } from './../user/user';
import { UserRouter } from './../user/user.router';
import { SystemRouter } from './../system/system.router';
import { PostRouter } from "./../post/post.router";
import { CategoryRouter } from "./../post/category.router";
import { Base } from './../core/base';
import * as E from './../core/error';
import { ROUTER_RESPONSE } from './../core/defines';




export class Router extends Base {

    user:User;
    constructor(params) {
        super(null);
        Base.params = params;
        this.user = new User();
        // console.log("[ params ] ", params );
    }

    async run(): Promise<ROUTER_RESPONSE> {




        if (!this.param('route')) {
            return this.error(E.EMPTY_ROUTE);
        }

        // Check router class.
        let $router = null;
        if (this.routeClassName === 'user') {
            const userRouter = <UserRouter>(new UserRouter());
            $router = userRouter;
        }
        else if (this.routeClassName === 'system' ) $router = new SystemRouter();
        else if (this.routeClassName === 'post') $router = new PostRouter();
        else if (this.routeClassName === 'category') $router = new CategoryRouter();
        else return this.error(E.WRONG_ROUTE);

        
        // Check router method.
        if ($router[this.routeMethodName] === void 0) return this.error(E.WRONG_METHOD);



        await this.loadSystemSettings();
        

        // Check user login.
        // Once user is verified, `this.loginUid` and `this.loginUser` is available.
        const reLogin = await this.user.verify();
        if ( this.isErrorObject( reLogin ) ) {
            return reLogin;
        }

        /// get default return value
        let returnData = { route: this.param('route'), code: 0, role: this.user.getRole() };


        // check if system is installed.
        if ( ! this.isSystemInstalled() ) returnData['installed'] = false;



        // Run router.
        const result = await $router[this.routeMethodName]();


        if (  this.isErrorObject( result ) ) {
            returnData = Object.assign( returnData, result );
            // ret['code'] = res['code'];
            // ret['message'] = res['message'];
        }
        else {
            returnData['data'] = result;
        }

        return returnData;
    }
}