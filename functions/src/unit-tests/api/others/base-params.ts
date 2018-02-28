import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
import { Router } from './../../../modules/router/router';

describe("Base::params()", () => {
    beforeEach( () => {
        Base.params = null;
    });
    it("Parameter test", () => {
        const router = new Router({ route: 'user.get', a: 'Apple'} );
        expect(Base.params['route']).to.be.equal('user.get');
        expect( router.param('route') ).to.be.equal('user.get');
        expect( router.params['route'] ).to.be.equal('user.get');
        expect( router.param('a') ).to.be.equal( 'Apple' );
        expect( router.param('b') ).to.be.equal( undefined );
    });
});
