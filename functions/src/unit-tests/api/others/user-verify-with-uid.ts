import * as chai from 'chai';
const expect = chai.expect;
import { Base, Anonymous, E } from './../../../modules/core/core';
import { User } from './../../../modules/user/user';
import { Router } from './../../../modules/router/router';
import { init } from './../init';
Base.admin = init();


const $base = new Base('');
const $user = new User();

describe('[ user-verify-with-uid.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });


    describe('User verify without UID. The user will login as Anonymous.', () => {
        describe('User Verify with UID with Router.', () => {
            it('Anonymous uid with router. If uid is not set, then the user will be an anonymous.', async () => {
                const $router = new Router({ route: 'user.get' }); 
                const re = await $user.verify();
                expect(re).to.be.a('object');
                expect( $base.isErrorObject( re ) ).to.be.false;
            });
        });


        describe('User Verify UID with Base.', () => {
            it('Anonymous uid with base', async () => {
                Base.params = {}; // Set input data
                const re = await $user.verify();
                expect($base.loginUid).to.be.equal(Anonymous.uid);
            });
        });

    });

});