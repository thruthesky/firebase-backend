import * as chai from 'chai';
const expect = chai.expect;

import * as rpn from 'request-promise-native';
import * as E from './../../modules/core/error';
import { req } from './server-library';

describe('Router Test', () => {
    it(`Test with no route`, async () => {
        const data = req({ No_Route: '' });
        const re = await rpn(data).catch(e => e);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.EMPTY_ROUTE);
    });
    it(`Test with empty route`, async () => {
        const data = req({ route: '' });
        const re = await rpn(data).catch(e => e);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.EMPTY_ROUTE);
    });
    it(`Test with wrong route`, async () => {
        const data = req({ route: 'wrong-route' });
        const re = await rpn(data).catch(e => e);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.WRONG_ROUTE);
    });
    it(`Test with wrong method`, async () => {
        const data = req({ route: 'user.wrong_method' });
        const re = await rpn(data).catch(e => e);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.WRONG_METHOD);
    });
    it(`Should be OK`, async () => {
        const data = req({ route: 'user.version' });
        const re = await rpn(data).catch(e => e);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(0);
    });
});
