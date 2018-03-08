// import * as admin from 'firebase-admin';
import { Anonymous, E } from '../core/core';
import { USER_DATA } from '../user/user';
import { System } from './system';
// import { Base } from './../core/base';






export class SystemRouter extends System {
    constructor() {
        super();
    }


    /**
     * 
     * 
     * @todo see todo list in readme.md
     */
    async install() {

        // console.log('params: ', this.params);
        // console.log(Base.params);
        const installed:boolean = await this.isInstalled();
        // console.log("insalled:.. ", installed);
        if ( installed ) return this.error( E.SYSTEM_ALREADY_INSTALLED );

        const adminEmail = this.param('adminEmail');
        // console.log(this.params);
        // console.log(adminEmail);
        if (  ! adminEmail ) return this.error( E.NO_ADMIN_EMAIL );

        // const sys = this.getSettings('system');

        // console.log(sys);


        // console.log("DI?");

        const re = await this.set({adminEmail: this.param('adminEmail')}, 'system' );
        if ( this.isErrorObject( re ) ) return re;

        // Create Anonymous account.
        const user = await this.auth.createUser({
            uid: Anonymous.uid,
            email: Anonymous.email,
            password: Anonymous.password,
            displayName: Anonymous.displayName
        })
            .catch(e => this.error(e));

        // If Anonymous account is already exists, then it is considered to be installed already.
        // Or any error, just return the error.
        if (this.isErrorObject(user)) {
            if ( user['code'] !== E.FIREBASE_AUTH_UID_ALREADY_EXISTS ) return this.error( E.SYSTEM_ALREADY_INSTALLED );
        }

        // Anonymouse created. set it under 'users'.
        const data: USER_DATA = {
            email: Anonymous.email,
            displayName: Anonymous.displayName
        };
        const setResult = await this.set( data, Anonymous.uid, 'users');
        // console.log('collectionName: ', this.collectionName, setResult);
        if ( this.isErrorObject( setResult ) ) {
            return setResult;
        }

        return true;
    }


    /**
     * @desc This method does not return an error when the system is not installed. it returns false instread.
     * 
     * @return true on success. false if the system is not installed.
     */
    async checkInstall() {
        return this.isInstalled();
    }

    /**
     * 
     * 
     * If success, true will be returned.
     */
    async uninstall() {

        const reDelete = await this.delete( 'system' );
        if ( this.isErrorObject(reDelete) ) return reDelete;


        // Delete anonymous user
        const re = await this.auth.deleteUser(Anonymous.uid)
            .then( x => {
                return true;
            })
            .catch(e => this.error(e));

        return re;
    }
}