import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



describe('user-crud-with-uid', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Registration test with Base.useUid=true.', () => {
        it('On unit test mode, empty uid, `No Uid` is expected. When Base.useUid is set to true, only UID is acceptable. if No UID is porovided, `No Uid` error will happened. it is caused verifyUser()', async () => {

            const re = await route({ route: 'user.set', uid: '', a: 'b' });
            if (re.code !== E.NO_UID) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.NO_UID);
        });

        it('Must fail with long uid', async () => {
            const re = await route({ route: 'user.set', uid: '1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-' });
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.UID_TOO_LONG);
        });

        it('Must fail with wrong uid containing slash.', async () => {
            const re = await route({ route: 'user.set', uid: 'aaIA9UwD3INzCF8PtbzbD23rzSD3https://us-centns.net/api?route=user.set&uid=aaIA9UwD3INzCF8PtbzbD23rzSD3' });
            // console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.UID_CANNOT_CONTAIN_SLASH);
        });

        it('Without name should be OK', async () => {
            const re = await route({ route: 'user.set', uid: 'uid-a' });
            if (re && re.code) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });


        it('Should be OK with a property that does not exists on Interface USER_DATA.', async () => {
            const re = await route({ route: 'user.set', uid: 'uid-new-2', name: 'user-a', nick: 'Jae' });
            // console.log("re: ", re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            // const user = await route({ route: 'user.get', uid: 'uid-a' });
            // console.log(user);
        });

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


        it(`Should failed on update because emtpy uid.`, async () => {
            const re = await route({ route: 'user.update', uid: '', name: 'name-b-updated' }) // TEST with UID.
            // const re = await route({ route: 'user.update', idToken: '', name: 'name-b-updated' })
            // if (re && re.code) console.log("=============== re: ", re);
            expect(re.code).to.be.equal(E.NO_UID);
        })


        it(`Expect 'Document ID does not exists' with wrong uid.`, async () => {
            const re = await route({ route: 'user.update', uid: 'wrong-user-id' }); //
            // console.log(re);
            expect(re.code).to.be.equal( E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE );
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



    describe('User get test', () => {
        it(`Should be error(${E.NO_UID}) with no uid`, async () => {
            const re = await route({ route: 'user.get' });
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        })
        it('Should fail with wrong document id', async () => {
            const re = await route({ route: 'user.get', uid: 'wrong-document-id' });
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET);
        })
    });




});

