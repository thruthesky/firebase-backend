import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../modules/core/core';
import * as settings from './../../settings/settings';
import { init, route } from './init';
Base.admin = init();
Base.useUid = true;

/**
 * 
 * 
 * 
 * 
 *      WARNING.        YOU ARE TESTING WITH UID. set UTIT_TEST = true
 * 
 * 
 * 
 * 
 * 
 */
describe('Registration Test.', () => {
    it('Without uid. Expect user not log in. When Base.useUid is set to true, only UID is acceptable. if No UID is porovided, this.loginUid will be empty. And it causes error on user.route.ts', async () => {
        const re = await route({ route: 'user.set', a: 'b' });
        if (re && re.code) console.log(re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal( E.USER_NOT_LOGIN );
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
        console.log("re: ", re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        // const user = await route({ route: 'user.get', uid: 'uid-a' });
        // console.log(user);
    });

});


describe('User Update Test', () => {
    it(`Should success on register`, async () => {
        const re = await route({ route: 'user.set', uid: 'user-b', name: 'name-b' }); // test without ID token.
        // const re = await route({ route: 'user.set', idToken: idToken, name: 'name-b' });
        if (re && re.code) console.log(re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        const got = await route({ route: 'user.get', uid: 'user-b' }); // TEST with UID.
        // const got = await route({ route: 'user.get', idToken: idToken });
        if (got && got.code) console.log(got);
        expect(got).to.be.a('object');
        expect(got['data']['name']).to.be.equal('name-b');
    })

    
    it(`Should failed on update because emtpy document id.`, async () => {
        const re = await route({ route: 'user.update', uid: '', name: 'name-b-updated' }) // TEST with UID.
        // const re = await route({ route: 'user.update', idToken: '', name: 'name-b-updated' })
        if (re && re.code) console.log("=============== re: ", re);
        expect(re.code).to.be.equal(E.USER_NOT_LOGIN);
    })


    it(`Should failed on update because wrong document id.`, async () => {
        const re = await route({ route: 'user.update', uid: 'wrong-user-id' }); //
        // const re = await route({ route: 'user.update', idToken: 'wrong-user-id' });
        if (re && re.code) console.log(re);
        expect(re.code).to.be.equal(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE);
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



describe('User get TEST', () => {
    it(`Should be error(${E.USER_NOT_LOGIN}) with no id`, async () => {
        const re = await route({ route: 'user.get' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.USER_NOT_LOGIN);
    })
    it('Should fail with wrong document id', async () => {
        const re = await route({ route: 'user.get', uid: 'wrong-document-id' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET);
    })
});



