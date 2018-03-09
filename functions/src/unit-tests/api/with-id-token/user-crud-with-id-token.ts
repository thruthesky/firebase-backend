import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { User } from './../../../modules/user/user';
import { Router } from './../../../modules/router/router';
import { route } from './../init';
import { idToken } from '../../test-data';

const $user: User = new User();


describe('user-crud-with-id-token', () => {

    beforeEach(() => Base.useUid = false);

    /**
     * This may fail depeding on the `idToken` changes.
     * It is okay NOT to test this test or try to put a ID Token that less changes.
     * 
     */
    describe('Expect success.', () => {
        it('Token copied from client', async () => {
            new Router({ idToken: idToken });
            const re = await $user.verify();

            if (re !== true) console.log(re);
            expect(re).to.be.equal(true);
            // console.log( $router.loginUid );
        });
    });


    describe('User test with ID Token', () => {
        it(`Expect success on register`, async () => {
            // const re = await route({ route: 'user.set', uid: 'user-b', name: 'name-b' }); // test without ID token.
            const re = await route({ route: 'user.set', idToken: idToken, name: 'name-b' });
            // if (re && re.code) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            // const got = await route({ route: 'user.get', uid: 'user-b' }); // TEST with UID.
            const got = await route({ route: 'user.get', idToken: idToken });
            // if (got && got.code) console.log(got);
            expect(got).to.be.a('object');
            expect(got['data']['name']).to.be.equal('name-b');
        });

        it(`Should failed on update because wrong ID Token.`, async () => {
            // const re = await route({ route: 'user.update', uid: 'wrong-user-id' }); //
            const re = await route({ route: 'user.update', idToken: 'wrong-user-id' });
            // console.log(re);
            expect(re.code).to.be.equal(E.FIREBASE_FAILED_TO_DECODE_ID_TOKEN);
        });


        it(`Should failed on update because wrong gender.`, async () => {
            const re = await route({ route: 'user.update', idToken, gender: 'D' });
            expect(re.code).to.be.equal(E.WRONG_GENDER);
        });

        it(`Should be success on update name to name-updated.`, async () => {
            const re = await route({ route: 'user.update', idToken: idToken, name: 'name-updated' });
            expect(re.code).to.be.equal(0);
        });

    });
    

});

