import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
// import { Router } from './../../../modules/router/router';
import { init, route } from './../init';
import { idToken } from '../../test-data';
Base.admin = init();


describe('user-crud-with-id-token', () => {

    beforeEach(() => Base.useUid = false);

    describe('User get test', () => {

        it('delete user document first', async () => {
            const re = await route({ route: 'user.delete', idToken: idToken });
            // console.log('re:', re);
            expect(re.code).to.be.equal(0);
        });

        it('get user document', async() => {
            const re = await route({ route: 'user.get', idToken: idToken});
            // console.log(re);
            expect(re.code).to.be.equal(0);

        });
    });




});

