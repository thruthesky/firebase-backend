import { Base } from './modules/core/base';

/**
 * 
 * 
 * @desc You can use all the functionality of the project.
 * 
 *      `this.db`, `this.collection`, `this.params`, etc.
 * 
 * 
 * 
 */

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

        // Uncomment below if you want to accept all the input from the user.
        // But becareful on what you are doing. You should be some validation.
        
        // const newData = this.params;
        // newData['hooked'] = 'yes';
        // return newData;

        return data;

    }

    /**
     * 
     * If it returns `BACKEND_ERROR_OBJECT`, then the `UserRoute::set()` will return this `BACKEND_ERROR_OBJECT`
     *          without setting data.
     *          Otherwise (If it returns other than Error Object),
     *          `UserRouter::set()` will set data normally.
     * 
     */
    user_set() {
        return false;
        // return this.error( E.TEST );
    }

    post_router_sanitizePostData(data) {

        // console.log("db: ", this.db);
        // console.log("collection: ", this.collection);
        // console.log("params: ", this.params);

        data['hooked'] = 'yes';
        return data;
    }

    post_create() {
        // Work on hook
        return false;
    }

    post_get() {
        // Work on hook
        return false;
    }

    post_update() {
        // Work on hook
        return false;
    }

    post_delete() {
        // Work on hook
        return false;
    }
}


