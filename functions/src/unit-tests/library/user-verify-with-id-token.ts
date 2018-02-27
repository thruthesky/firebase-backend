import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../modules/core/core';
import { Router } from './../../modules/router/router';
import { init, route, idToken } from './init';
Base.admin = init();
Base.useUid = false;


/**
 * This may fail depeding on the `idToken` changes.
 * It is okay NOT to test this test or try to put a ID Token that less changes.
 * 
 */
describe('Expect success', () => {
    it('Token copied from client', async () => {
        const $router = new Router({ idToken: idToken });
        const re = await $router.verifyUser();
        expect(re).to.be.equal(true);
        // console.log( $router.loginUid );
    });
});


