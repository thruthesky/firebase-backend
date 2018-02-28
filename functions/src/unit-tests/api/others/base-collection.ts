import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
// import { Router } from './../../modules/router/router';

describe("Base::collection()", () => {
    beforeEach(() => {
        //
    });
    it("Parameter test.", () => {
        const $base = new Base('users');
        expect('x-users').to.be.equal( $base.collectionNameWithPrefix($base.collectionName) );
    });
});


