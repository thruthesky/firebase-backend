/**
 * @author jaeho
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, COLLECTIONS, E } from './../../../modules/core/core';
import { route, adminEmail } from './../init';

// const $base = new Base( COLLECTIONS.CATEGORIES );

const categoryId = "test-" + (new Date).getTime();
let postId;
describe('[ category-delete.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });


    describe('Create and post for delete test', () => {
        it('Expect success. With admin uid / Category id', async () => {
            const re = await route({ route: 'category.create', uid: await adminEmail(), id: categoryId, name: 'Hello', description: 'This is description' });
            expect ( re.code ).to.be.equal( 0 );
            expect ( re.data ).to.be.equal( categoryId );
        });

        it("Create a post", async () => {
            const re = await route({ route: 'post.create', categoryId: categoryId });
            expect(re.code).to.be.equal(0);
            postId = re.data;
        });
    });


    describe('Category delete error test', () => {
        it('Not admin', async () => {
            const re = await route({ route: 'category.delete' });
            expect( re.code ).to.be.equal( E.PERMISSION_DENIED_ADMIN_ONLY );
        });
        it('No category id', async () => {
            const re = await route({ route: 'category.delete', uid: await adminEmail() });
            // console.log(re);
            expect( re.code ).to.be.equal( E.NO_DOCUMENT_ID );
        });
        it('Wrong category id', async () => {
            const re = await route({ route: 'category.delete', uid: await adminEmail(), id: 'wrong name' });
            // console.log(re);
            expect( re.code ).to.be.equal( E.WRONG_CATEGORY_ID );
        });
        it('Delete the category. Expect error since it has a post', async () => {
            const re = await route({ route: 'category.delete', uid: await adminEmail(), id: categoryId });
            // console.log(re);
            expect( re.code ).to.be.equal( E.CATEGORY_CANNOT_BE_DELETED_SINCE_IT_HAS_POST );
        });
        it('Delete the post and then delete the category. Expect success.', async () => {
            const delPost = await route({ route: 'post.delete', id: postId, uid: await adminEmail()});
            expect(delPost.code).to.be.equal(0);
            const re = await route({ route: 'category.delete', uid: await adminEmail(), id: categoryId });
            // console.log(re);
            expect( re.code ).to.be.equal( 0 );
        });
    });

});
