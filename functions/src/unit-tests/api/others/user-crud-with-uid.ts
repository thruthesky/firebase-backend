import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



describe('[ user-crud-with-uid.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    

    describe('User update test with UID.', () => {
        it(`Should success on register`, async () => {
            const re = await route({ route: 'user.set', uid: 'user-b', name: 'name-b' }); // test without ID token.
            // const re = await route({ route: 'user.set', idToken: idToken, name: 'name-b' });
            // if (re && re.code) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            const got = await route({ route: 'user.get', uid: 'user-b' }); // TEST with UID.
            // const got = await route({ route: 'user.get', idToken: idToken });
            // if (got && got.code) console.log(got);
            expect(got).to.be.a('object');
            expect(got['data']['name']).to.be.equal('name-b');
        })


        it(`Should failed on update because emtpy uid`, async () => {
            const re = await route({ route: 'user.update', uid: '', name: 'name-b-updated' }) // TEST with UID.
            // const re = await route({ route: 'user.update', idToken: '', name: 'name-b-updated' })
            // console.log("=============== re: ", re);
            expect(re.code).to.be.equal(E.ANONYMOUS_CANNOT_EDIT_PROFILE);
        })

        
        it(`Should failed on update because wrong gender.`, async () => {
            const re = await route({ route: 'user.update', uid: 'user-b', gender: 'D' });
            expect(re.code).to.be.equal(E.WRONG_GENDER);
        })

        it(`Should be success on update name to name-updated.`, async () => {
            const re = await route({ route: 'user.update', uid: 'user-b', name: 'name-updated' });
            expect(re.code).to.be.equal(0);
        })
    })




});

