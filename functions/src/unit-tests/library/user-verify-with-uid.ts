import * as chai from 'chai';
const expect = chai.expect;
import { Base, Anonymous } from './../../modules/core/core';
import { Router } from './../../modules/router/router';
import { init } from './init';
Base.admin = init();


describe( 'User verify with UID', () => {
    beforeEach(() => {
        Base.useUid = true;
    });

    describe('User Verify with UID with Router.', () => {
        it('Anonymous uid with router', async () => {
            const $router = new Router({ uid: '' }); // Set input data
            const re = await $router.verifyUser();
            expect(re).to.be.equal(true);
            expect( $router.loginUid ).to.be.equal( '' );
        });
    });
    
    
    describe('User Verify UID with Base.', () => {
        it('Anonymous uid with base', async () => {
            Base.params = { uid: '' }; // Set input data
            const base = new Base('');
            const re = await base.verifyUser();
            expect(re).to.be.equal(true);
            expect( base.loginUid ).to.be.equal( '' );
        });
    });
        
});
