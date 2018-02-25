import * as chai from 'chai';
const expect = chai.expect;
import * as admin from 'firebase-admin';
import { serviceAccount } from './../../settings/serviceAccountKey';

import { Base, E } from './../../modules/core/core';
import { Router } from './../../modules/router/router';

import { init, route } from './init';
Base.admin = init();

describe('Router test.', () => {
    it('Empty route', async () => {
        const re = await route({ route: '', a: 'ab' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.EMPTY_ROUTE);
    });
    it('Wrong route.', async () => {
        const re = await route({ route: 'wrong router', a: 'ab' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(E.WRONG_ROUTE);
    });
});



