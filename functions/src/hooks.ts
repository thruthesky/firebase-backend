
import { Base } from './modules/core/base';
import * as E from './modules/core/error';

export class Hooks extends Base {

    constructor(collectionName) {
        super(collectionName);
    }


    /**
     * 
     * Retruns hook data after processing the hook.
     * 
     * 
     * @param name Hook name.
     * @param data Hook data. `data` may be passed by refereced. But must be returned.
     */
    run(name, data) {
        // console.log("Hooks::run with : ", this.collectionName );
        const hookName = name.replace(/\./g, '_');      // Translate `.` into `_` to call the method.
        if ( this[hookName] ) {                  // If method exists
            return this[hookName]( data );
        }
        else return data;
    }


    user_router_sanitizeUserData(data) {

        // console.log("db: ", this.db);
        // console.log("collection: ", this.collection);
        // console.log("params: ", this.params);

        data['hooked'] = 'yes';
        return data;
    }


    /**
     * 
     * If it returns `ERROR_OBJECT`, then the `UserRoute::set()` will return this `ERROR_OBJECT`
     *          without setting data.
     *          Otherwise (If it returns other than Error Object),
     *          `UserRouter::set()` will set data normally.
     * 
     */
    user_set() {
        return false;
        // return this.error( E.TEST );
    }
}


