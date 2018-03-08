
import * as chai from 'chai';
const expect = chai.expect;
// import { Base } from './../../../modules/core/core';
// import { Router } from './../../modules/router/router';

import { Document } from '../../../modules/document/document';

import { Base, E } from './../../../modules/core/core';
import { init } from './../init';
Base.admin = init();



const $document = new Document('');

describe("[ add.ts ] - Transaction Testing.", () => {
    beforeEach(() => {
        //
    });
    it("Create a document to test transaction.", async () => {
        const re = await $document.set({}, 'add-test', 'test');
        expect( re ).to.be.equal( 'add-test' );
    });

    it("Error test. Wrong document ID.", async () => {
        const re = await $document.add('wrong-collection', 'wrong-document-id', 'prop', 3);
        expect( re.code ).to.be.equal( E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_UPDATE );
    });

    it("5 Request to add num of document", async () => {

        const oldData = await $document.get( 'add-test', 'test' );
        const ps = [];
        for( let i = 0; i < 5; i ++ ) {
            const r = $document.add( 'test', 'add-test', 'num', 1);
            ps.push( r );
        }
        await Promise.all( ps );
        const newData = await $document.get( 'add-test', 'test' );

        expect( oldData.num + 5 ).to.be.equal( newData.num );

    });
});


