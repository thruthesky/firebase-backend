import * as chai from 'chai';
const expect = chai.expect;
import { Base, E, ROUTER_RESPONSE } from './../../../modules/core/core';


describe('base-error', () => {
    describe("falsy test", () => {
        it("input is null", () => {
            const $base = new Base('');
            expect( $base.error(null) ).to.be.equal( null );
        });
        it("input: null, output must not be equal to undefiend.", () => {
            const $base = new Base('');
            expect( $base.error(null) ).to.not.be.equal( undefined );
        });
        it("input: null, output must not be equal to empty string.", () => {
            const $base = new Base('');
            expect( $base.error(null) ).to.not.be.equal( '' );
        });
        it("input: null, output must not be equal false.", () => {
            const $base = new Base('');
            expect( $base.error(null) ).to.not.be.equal( false );
        });
        it("input: null, output must not be equal empty object.", () => {
            const $base = new Base('');
            expect( $base.error(null) ).to.not.be.equal( {} );
        });
    });

    describe('Unknown error test', () => {
        it("input: UNKNOWN", () => {
            const $base = new Base('');
            const re:ROUTER_RESPONSE = $base.error( E.UNKNOWN );
            expect(re).to.be.a('object');
            expect( re.code ).to.be.equal( E.UNKNOWN );
        });
        /**
         * @author gem
         */
        it("input: handle unknown error and expects a suggestion", () => {
            const $base = new Base('');
            const re:ROUTER_RESPONSE = $base.unknownError( `THIS_IS_NEW_ERROR` );
            // console.log( re.message );
            expect(re).to.be.a('object');
            expect( re.code ).to.be.equal( E.UNKNOWN );
        });

        it("Check error.ts::obj() with base::error()", () => {
            const $base = new Base('');
            const re:ROUTER_RESPONSE = $base.error( E.UNKNOWN );
            const e = E.obj( E.UNKNOWN );
            expect( e.code ).to.be.equal( re.code );
        });
    });
    
})
