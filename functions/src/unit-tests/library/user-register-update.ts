import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../modules/core/core';
// import { Router } from './../../modules/router/router';
import { init, route } from './init';
Base.admin = init();

describe('Registration Test.', () => {
    it('Without uid', async () => {
        const re = await route({ route: 'user.set', a: 'b' });
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
        console.log("re: ", re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        // const user = await route({ route: 'user.get', uid: 'uid-a' });
        // console.log(user);
    });
});


describe('User Update Test', () => {
    it(`1. Should success on register`, async () => {
        const re = await route({ route: 'user.set', uid: 'user-b', name: 'name-b' });
        if (re && re.code) console.log(re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        const got = await route({ route: 'user.get', uid: 'user-b' });
        if (got && got.code) console.log(got);
        expect(got).to.be.a('object');
        expect(got['data']['name']).to.be.equal('name-b');
    })
    it(`2. Should failed on update because emtpy document id.`, async () => {
        const re = await route({ route: 'user.update', uid: '', name: 'name-b-updated' })
        expect(re.code).to.be.equal(E.NO_UID);
    })
    it(`3. Should failed on update because wrong document id.`, async () => {
        const re = await route({ route: 'user.update', uid: 'wrong-user-id' });
        // console.log(re);
        expect(re.code).to.be.equal(E.DOCUEMNT_ID_DOES_NOT_EXISTS_FOR_UPDATE);
    })

    it(`4. Should failed on update because wrong gender.`, async () => {
        const re = await route({ route: 'user.update', uid: 'user-b', gender: 'D' });
        expect(re.code).to.be.equal(E.WRONG_GENDER);
    })

    it(`5. Should be success on update name to name-updated.`, async () => {
        const re = await route({ route: 'user.update', uid: 'user-b', name: 'name-updated' });
        expect(re.code).to.be.equal(0);
    })
})


describe('User get TEST', () => {
    it(`Should be error(${E.NO_USER_DOCUMENT_ID}) with no id`, async () => {
        const re = await route({ route: 'user.get' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.NO_USER_DOCUMENT_ID);
    })
    it('Should re[data] be null with wrong document id', async () => {
        const re = await route({ route: 'user.get', uid: 'wrong-document-id' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        expect(re.data).to.be.equal(null);
    })
});



