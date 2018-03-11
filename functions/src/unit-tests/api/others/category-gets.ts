/**
 * @author jaeho
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, COLLECTIONS } from './../../../modules/core/core';
import { route, adminEmail } from './../init';




const $base = new Base( COLLECTIONS.CATEGORIES );

const categoryId = "test-" + (new Date).getTime();




describe('[ category-create.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });


    describe('Category create for gets() test', () => {
        it('Expect success. With admin uid / Category id', async () => {
            const re = await route({ route: 'category.create', uid: await adminEmail(), id: categoryId, name: 'Hello', description: 'This is description' });
            // console.log(re);
            expect ( re.code ).to.be.equal( 0 );
            expect ( re.data ).to.be.equal( categoryId );
        });
    });


    describe('Category gets() test.', () => {
        it('Get all the categories and delete them. and Get all categories again and no category must be in database.', async () => {
            const re = await route({ route: 'category.gets', properties: [ 'id', 'name', 'description', 'created', 'wrong-properties' ] });
            if ( re.code === 0 ) {
                for( const category of re.data ) {
                    // console.log("categories: ", category);
                    expect( category['wrong-properties'] ).to.be.undefined;
                    await $base.collection.doc( category.id ).delete();
                }
            }
            const got = await route({ route: 'category.gets' });
            expect ( got.code ).to.be.equal( 0 );
            expect ( got.data.length ).to.be.equal( 0 );
        });
    });

});
