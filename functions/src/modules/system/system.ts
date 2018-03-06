// import * as admin from 'firebase-admin';

import { Document } from './../document/document';
import { COLLECTIONS } from '../core/core';
// import { SYSTEM_SETTINGS } from './../core/defines';




/**
 * @Attention All the validity, permission check must be done before this class.
 */
export class System extends Document {
    constructor() {
        super(COLLECTIONS.SETTINGS);
    }





    /**
     * Returns true if the system is already installed. or false.
     * 
     * @desc It does not throw or return Error.
     * 
     *      it returns false if the system is not installed.
     * 
     * @return a boolean of reloved promise.
     * 
     */
    async isInstalled(): Promise<boolean> {

        return this.isSystemInstalled();

        // const re: SYSTEM_SETTINGS = await this.getSystemSettings();
        // if (this.isErrorObject(re)) return false;

        // // console.log("ae: ", re, re.adminEmail );
        // if (re.adminEmail === void 0 || !re.adminEmail) return false;
        // else return true;
    }

}
