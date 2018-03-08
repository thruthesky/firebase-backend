/**
 * @author jaeho
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();

const categoryId = "test-" + (new Date).getTime();



describe('[ post-create.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Error tests on creating a post.', () => {
        it('No category id', async () => {
            const re = await route({ route: 'post.create' });
            expect(re.code).to.be.equal(E.NO_CATEGORY_ID);
        });
        it('Wrong category id', async () => {
            const re = await route({ route: 'post.create', categoryId: 'wrong-category-id' });
            // console.log(re);
            expect ( re.code ).to.be.equal( E.POST_CATEGORY_DOES_NOT_EXIST );
        });
    });

    describe('Create a success test', () => {
        //
    });



    // describe('Category create and overwrite test', () => {

    //     it('Expect success. With admin uid / Category id', async () => {
    //         await (new Base).loadSystemSettings();
    //         const adminEmail = (new Base).getAdminEmail();
    //         const re = await route({ route: 'category.create', uid: adminEmail, id: categoryId });
    //         // console.log(re);
    //         expect ( re.code ).to.be.equal( 0 );
    //         expect ( re.data ).to.be.equal( categoryId );
    //     });
    //     it("Create a category that is already exists.", async () => {
    //         await (new Base).loadSystemSettings();
    //         const adminEmail = (new Base).getAdminEmail();
    //         const re = await route({ route: 'category.create', uid: adminEmail, id: categoryId });
    //         // console.log(re);
    //         expect ( re.code ).to.be.equal( E.CATEGORY_ALREADY_EXISTS ); 
    //     });
    // });

});
