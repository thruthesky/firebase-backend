import * as chai from 'chai';
const expect = chai.expect;
import { Base, Anonymous } from './../../modules/core/core';
import { Router } from './../../modules/router/router';
import { init } from './init';
Base.admin = init();


describe('User Verify Test with Router.', () => {
    it('Anonymous uid', async () => {
        const $router = new Router({ idToken: '' }); // Set input data
        const re = await $router.verifyUser();
        expect(re).to.be.equal(true);
        expect( $router.loginUid ).to.be.equal( Anonymous.uid );
    });
});

describe('User Verify Test with Base.', () => {
    it('Anonymous uid', async () => {
        Base.params = { idToken: '' }; // Set input data
        const base = new Base('');
        const re = await base.verifyUser();
        expect(re).to.be.equal(true);
        expect( base.loginUid ).to.be.equal( Anonymous.uid );
    });
});

describe('Expect error with wrong token', () => {
    it('Wrong token', async () => {
        const $router = new Router({ idToken: 'wrong token' });
        const re = await $router.verifyUser();
        // console.log(re);
        expect(re).to.be.not.equal(true);
        expect( $router.loginUid ).to.be.equal( null );
    })
});

