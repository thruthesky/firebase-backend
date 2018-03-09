import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { Router } from './../../../modules/router/router';

import { route } from './../init';


describe('Router test.', () => {
    beforeEach(() => Base.useUid = true);
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

    describe('Router class/method name', () => {
        it('Empty base params', () => {
            Base.params = { route: '' };
            expect((new Base('')).routeClassName).to.be.null;
        });
        it('Empty router', () => {
            const router = new Router({ route: '' });
            expect(router.routeClassName).to.be.null;
        });
        it('Undefined input on router', () => {
            const router = new Router({ route: undefined });
            expect(router.routeClassName).to.be.null;
        });
        it('No router input on router', () => {
            const router = new Router({ abc: undefined });
            expect(router.routeClassName).to.be.null;
        });
        it('Without name', () => {
            const router = new Router({ route: '.' });
            expect(router.routeClassName).to.be.null;
        });
        it('Number', () => {
            const router = new Router({ route: 123 });
            expect(router.routeClassName).to.be.null;
        });
        it('Without method', () => {
            const router = new Router({ route: 'class.' });
            expect(router.routeClassName).to.be.equal('class');
        });
        it('Without class', () => {
            const router = new Router({ route: '.abc' });
            expect(router.routeMethodName).to.be.equal('abc');
        });
        it('Expect success', () => {
            const router = new Router({ route: 'abc.def' });
            expect(router.routeClassName).to.be.equal('abc');
            expect(router.routeMethodName).to.be.equal('def');
        });
    });
});



