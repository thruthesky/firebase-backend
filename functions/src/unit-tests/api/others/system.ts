import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
// import { Router } from './../../modules/router/router';
import { route } from './../init';

describe("[ system.ts ]", () => {
    beforeEach( () => {
        Base.useUid = true;
    });

    it("Uninstall", async () => {
        const re = await route({ route: 'system.checkInstall' });
        // console.log('re:', re);
        if (re.data) {
            // console.log("Going to uninstall");


        const un = await route({ route: 'system.uninstall' });
        // console.log(un);
        expect(un.code).to.be.equal(0);


        }
        else {
            // console.log("un installed. No need to install.");
        }
    });


    it("Expect error without admin email", async () => {
        const re = await route({ route: 'system.install' });
        // console.log(re);
        expect(re.code).to.be.equal(E.NO_ADMIN_EMAIL);
    });


    it("Expect success", async () => {
        const re = await route({ route: 'system.install', adminEmail: 'thruthesky@gmail.com' });
        // console.log(re);
        expect(re.code).to.be.equal(0);
    });

    it("Check if admin", async() => {
        const re = await route( { route: 'system.version', uid: 'thruthesky@gmail.com'} );
        expect(re.role).to.be.equal('admin');
    });

});
