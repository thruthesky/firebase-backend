import * as chai from 'chai';
const expect = chai.expect;
import * as _ from 'lodash';
import { Base } from './../../../modules/core/core';
import { Document } from './../../../modules/document/document';
import { init } from './../init';
Base.admin = init();



describe('document.ts', () => {

    beforeEach(() => {
        Base.useUid = true;
    });
    describe('sanitizeData', () => {
        const $document = new Document('settings');

        it('input null', () => {
            const re = $document.sanitizeData(null);
            expect(re).to.be.equal(null);
        });
        it('input empty string', () => {
            const re = $document.sanitizeData('');
            expect(re).to.be.equal('');
        });
        it('input false', () => {
            const re = $document.sanitizeData(false);
            expect(re).to.be.equal(false);
        });
        it('input undefined', () => {
            const re = $document.sanitizeData(undefined);
            expect(re).to.be.equal(undefined);
        });
        it('input empty object', () => {
            const re = $document.sanitizeData( {} );
            expect(re).to.be.a('object');
            expect( Object.keys( re ).length ).to.be.equal( 0 );

            expect( _.isEqual( re, {} ) ).to.be.equal( true );
        });

        it('test with object property', () => {
            const re = $document.sanitizeData( { a: 1 } );
            expect( _.isEqual( re, { a: 1 } ) ).to.be.equal( true );
        });
        it('test object with undefined.', () => {
            const re = $document.sanitizeData( { a: 1, b: undefined } );
            expect( _.isEqual( re, { a: 1 } ) ).to.be.equal( true );

            expect( _.isEqual( $document.sanitizeData({ a: undefined }), {} )).to.be.equal( true );
            expect( _.isEqual( $document.sanitizeData({ a: undefined, cde: undefined }), {} )).to.be.equal( true );
            expect( _.isEqual( $document.sanitizeData({ a: undefined, b: 1, cde: undefined }), { b: 1 } )).to.be.equal( true );
            expect( _.isEqual( $document.sanitizeData({ a: undefined, f: 'fruits', cde: undefined }), { f: 'fruits' } )).to.be.equal( true );
        });
        
    });
});
