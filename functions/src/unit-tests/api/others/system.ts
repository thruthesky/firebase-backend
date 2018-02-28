import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
// import { Router } from './../../modules/router/router';
import { init, route } from './../init';
Base.admin = init();

describe("System install test", () => {
    it("Install", async () => {
        let re = await route({ route: 'system.install' });
        
        // If already installed, uninstall and install again.
        if ( re.code === E.SYSTEM_ALREADY_INSTALLED ) {
            const un = await route({route: 'system.uninstall'} );

            expect( un.code ).to.be.equal( 0 );

            re = await route({ route: 'system.install' });
        }

        expect(re.code).to.be.equal(0);
    });
});
