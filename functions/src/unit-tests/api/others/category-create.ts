/**
 * @author jaeho
 */
import * as chai from 'chai';
// import * as _ from 'lodash';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { route, adminEmail } from './../init';




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
            const re = await route({ route: 'category.create', uid: await adminEmail() });
            // console.log(re);
            expect ( re.code ).to.be.equal( E.NO_CATEGORY_ID );
        });
    });



    describe('Category create and overwrite test', () => {

        it('Expect success. With admin uid / Category id', async () => {
            const re = await route({ route: 'category.create', uid: await adminEmail(), id: categoryId });
            // console.log(re);
            expect ( re.code ).to.be.equal( 0 );
            expect ( re.data ).to.be.equal( categoryId );
        });
        it("Create a category that is already exists.", async () => {
            const re = await route({ route: 'category.create', uid: await adminEmail(), id: categoryId });
            // console.log(re);
            expect ( re.code ).to.be.equal( E.CATEGORY_ALREADY_EXISTS ); 
        });

    });

});
