import * as chai from 'chai';
const expect = chai.expect;

import * as E from './../../modules/core/error';
import { route } from './server-library';

describe('Router Test', () => {
    it(`Test with no route`, async () => {
        const re = await route({ No_Route: '' });
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.EMPTY_ROUTE);
    });
    it(`Test with empty route`, async () => {
        const re = await route({ route: '' });
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.EMPTY_ROUTE);
    });
    it(`Test with wrong route`, async () => {
        const re = await route({ route: 'wrong-route' });
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.WRONG_ROUTE);
    });
    it(`Test with wrong method`, async () => {
        const re = await route({ route: 'user.wrong_method' });
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(E.WRONG_METHOD);
    });

    // it(`Should be OK`, async () => {
    //     const data = req({ route: 'user.delete' });
    //     const re = await rpn(data).catch(e => e);
    //     expect(re).to.be.an('object');
    //     expect(re['code']).to.be.equal(0);
    // });
});
