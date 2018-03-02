import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
import { Router } from './../../../modules/router/router';


describe("Base::params()", () => {

    Base.params = null;
    const router = new Router({ route: 'user.get', a: 'Apple' });

    it("Base.params[route]", () => { expect(Base.params['route']).to.be.equal('user.get'); });
    it("router.param(route)", () => { expect(router.param('route')).to.be.equal('user.get'); });
    it('router.params[route]', () => expect(router.params['route']).to.be.equal('user.get'));
    it('router.param(a)', () => expect(router.param('a')).to.be.equal('Apple'));
    it('router.param(b)', () => expect(router.param('b')).to.be.equal(undefined));

});


