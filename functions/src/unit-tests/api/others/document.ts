import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { Document } from './../../../modules/document/document';
import { init, route } from './../init';
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



            // Warning: this isn't true?
            // expect( re ).to.be.equal( {} );
        });

        it('test with object property', () => {
            const re = $document.sanitizeData( { a: 1 } );
            expect( re ).to.be.equal( { a: 1 } );

        });
        
    });
});
