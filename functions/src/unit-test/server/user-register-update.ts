import * as chai from 'chai';
const expect = chai.expect;

import * as rpn from 'request-promise-native';
import * as E from './../../modules/core/error';
import { req } from './server-library';

describe('User Register Test', () => {
    it('Expect error  without id', async () => {
        const data = req({ route: 'user.set', a: 'B', c: 'd' });
        const re = await rpn(data).catch(err => err);

        // console.log(re);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.NO_ID);
    });
    it('Expect success', async () => {
        const data = req({ route: 'user.set', id: 'user-10', a: 'B', c: 'd' });
        const re = await rpn(data).catch(err => err);

        // console.log(re);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(0);
    });
});
