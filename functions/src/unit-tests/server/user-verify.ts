import * as chai from 'chai';
const expect = chai.expect;

import * as E from './../../modules/core/error';
import { route } from './server-library';
import { idToken } from '../test-data';



/**
 * This may fail depeding on the `idToken` changes.
 * It is okay NOT to test this test or try to put a ID Token that less changes.
 * 
 */
describe('Expect to login as Anonymous with no idToken or Falsy idToken.', () => {
    it('No idToken. User will login as anonymous.', async () => {
        const re = await route({ route: 'user.get' });
        expect( re.code ).to.be.equal(0);
    });

    it('If idToken is set but Empty string was given. User will login as Anonymous.', async () => {
        const re = await route({ route: 'user.get', idToken: '' });
        expect( re.code ).to.be.equal(0);
    });
    it('If idToken is set but null was given. User will login as Anonymous.', async () => {
        const re = await route({ route: 'user.get', idToken: null });
        expect( re.code ).to.be.equal(0);
    });
    it('If idToken is set but false was given. User will login as Anonymous.', async () => {
        const re = await route({ route: 'user.get', idToken: false });
        expect( re.code ).to.be.equal(0);
    });
    it('If idToken is set but undefined was given. User will login as Anonymous.', async () => {
        const re = await route({ route: 'user.get', idToken: undefined });
        expect( re.code ).to.be.equal(0);
    });
});

describe('Login error with wrong idToken', () => {
    it('Expect error with wrong idToken', async () => {
        const re = await route({ route: 'user.get', idToken: '....' });
        expect( re.code ).to.be.equal( E.FIREBASE_FAILED_TO_DECODE_ID_TOKEN );
    });
});

describe('Login with real idToken', () => {
    it('Expect success with real idToken', async () => {
        const re = await route({ route: 'user.get', idToken: idToken });
        console.log(re);
        expect( re.code ).to.be.equal(0);
    });
});


