import * as chai from 'chai';
const expect = chai.expect;
import { Base, Anonymous, E } from './../../modules/core/core';
import { Router } from './../../modules/router/router';
import { init } from './init';
Base.admin = init();



describe('user-verify-with-uid', () => {

    beforeEach(() => {
        Base.useUid = true;
    });


    describe('User verify without UID. The user will login as Anonymous.', () => {
        describe('User Verify with UID with Router.', () => {
            it('Anonymous uid with router. If uid is not set, then the user will be an anonymous.', async () => {
                const $router = new Router({ route: 'user.get' }); // Set input data
                const re = await $router.verifyUser();
                expect(re).to.be.equal(true);
                expect($router.loginUid).to.be.equal(Anonymous.uid);
            });
        });


        describe('User Verify UID with Base.', () => {
            it('Anonymous uid with base', async () => {
                Base.params = {}; // Set input data
                const base = new Base('');
                const re = await base.verifyUser();
                expect(re).to.be.equal(true);
                expect(base.loginUid).to.be.equal(Anonymous.uid);
            });
        });

    });


    describe('User verification with empty UID. If uid is set but empty, NO_UID error will appear', () => {
        it('Expect E.NO_UID', async () => {
            const $router = new Router({ route: 'user.get', uid: '' }); // Set input data
            const re = await $router.verifyUser();
            expect(re.code).to.be.equal( E.NO_UID );
            expect($router.loginUid).to.be.equal( null );
        });
    });


});