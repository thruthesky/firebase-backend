/**
 * @author jaeho
 */
import * as chai from 'chai';
// import * as _ from 'lodash';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



// const $base = new Base('');

const categoryId = "test-" + (new Date).getTime();



describe('[ category-create.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Error tests. All must be failed', () => {
        it('Admin only can create category', async () => {
            const re = await route({ route: 'category.create' });
            expect(re.code).to.be.equal(E.PERMISSION_DENIED_ADMIN_ONLY);
        });
        it('With admin uid. without Category id', async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.create', uid: adminEmail });
            expect ( re.code ).to.be.equal( E.NO_CATEGORY_ID );
        });
    });



    describe('Category create and overwrite test', () => {

        it('Expect success. With admin uid / Category id', async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.create', uid: adminEmail, id: categoryId });
            // console.log(re);
            expect ( re.code ).to.be.equal( 0 );
            expect ( re.data ).to.be.equal( categoryId );
        });
        it("Create a category that is already exists.", async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.create', uid: adminEmail, id: categoryId });
            // console.log(re);
            expect ( re.code ).to.be.equal( E.CATEGORY_ALREADY_EXISTS ); 
        });

    });








    // describe('Create category with UID', () => {


    //     it('Should be error field moderator is not an array', async () => {
    //         const re = await route({ route: 'category.create', uid: 'i-am-user', id: 'news', moderators:'mod@sample.com'});
    //         // console.log(re)
    //         expect(re).to.be.a('object');
    //         expect(re.code).to.be.equal(E.MUST_BE_AN_ARRAY);
    //     });

    //     it('Should be success. Test with no error', async () => {
    //         const re = await route({ route: 'categroy.create', uid: 'i-am-user', id: 'news', name: 'NBA' });
    //         // console.log(re)
    //         expect(re).to.be.a('object');
    //         expect(re.code).to.be.equal(0);
    //     });

    // });

});
