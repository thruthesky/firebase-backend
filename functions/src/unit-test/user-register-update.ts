// Firestore init
import * as admin from 'firebase-admin';
import { serviceAccount } from './../settings/serviceAccountKey';
admin.initializeApp({ // Enable on development.
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});
const db = admin.firestore();

// Testing tools
import * as chai from 'chai';
import * as util from 'util';
const expect = chai.expect;

// Firebase-backend
import * as E from './../modules/core/error';
import { Base } from './../modules/core/base';
import { Router } from './../modules/router/router';
Base.db = db;

async function route(data) {
    return await (new Router(data)).run()
}

describe('Registration TEST', () => {
    it('Without uid', async () => {
        const re = await route({ route: 'user.register', a: 'b' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.NO_UID);
    });
    it('Without name', async () => {
        const re = await route({ route: 'user.register', id: 'uid-a' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.NO_NAME);
    });
    it('Should be OK', async () => {
        const re = await route({ route: 'user.register', id: 'uid-a', name: 'user-a', nick: 'Jae' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        const user = await route({ route: 'user.get', id: 'uid-a' });
        // console.log(user);
    });
});


describe('User Update TEST', () => {
    it(`1. Should success on register`, async () => {
        const re = await route({ route: 'user.register', id: 'user-b', name: 'name-b' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        const got = await route({ route: 'user.get', id: 'user-b' });
        expect(got).to.be.a('object');
        expect(got['data']['name']).to.be.equal('name-b');
    })
    it(`2. Should failed on update because emtpy document id.`, async() => {
        expect(1).to.be.equal(2);
    })
    it(`3. Should failed on update because wrong document id.`, async() => {
        expect(1).to.be.equal(2);
    })
    it(`4. Should failed on update because wrong gender.`, async() => {
        expect(1).to.be.equal(2);
    })
    it(`5. Should failed on update because wrong name.`, async() => {
        expect(1).to.be.equal(2);
    })
})


describe('User get TEST', () => {
    it(`Should be error(${E.NO_USER_DOCUMENT_ID}) with no id`, async () => {
        const re = await route({ route: 'user.get' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.NO_USER_DOCUMENT_ID);
    })
    it('Should re[data] be null with wrong document id', async () => {
        const re = await route({ route: 'user.get', id: 'wrong-document-id' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        expect(re.data).to.be.equal(null);
    })
});



