import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
import { Router } from './../../../modules/router/router';
import { User } from './../../../modules/user/user';

import { idToken } from '../../test-data';

const $user: User = new User();


/**
* This may fail depeding on the `idToken` changes.
* It is okay NOT to test this test or try to put a ID Token that less changes.
* 
*/
describe('Expect success', () => {
    beforeEach( () => {
        Base.useUid = false;
    });
    it('Token copied from client', async () => {
        new Router({ idToken: idToken }); // save data to base.
        const re = await $user.verify();
        expect(re).to.be.equal(true);
        // console.log('re: ', re );
    });
});


