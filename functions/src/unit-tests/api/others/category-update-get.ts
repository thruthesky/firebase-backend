/**
 * @author jaeho
 */
import * as chai from 'chai';
// import * as _ from 'lodash';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { route } from './../init';
import { CATEGORY } from '../../../modules/post/category';




// const $base = new Base('');

const categoryId = "test-" + (new Date).getTime();



describe('[ category-create.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Category create and overwrite test', () => {

        it('With admin uid / Category id.', async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.create', uid: adminEmail, id: categoryId });
            // console.log(re);
            expect ( re.code ).to.be.equal( 0 );
        });
        it("Permission test", async () => {
            const re = await route({ route: 'category.update' });
            expect ( re.code ).to.be.equal( E.PERMISSION_DENIED_ADMIN_ONLY ); 
        });
        it("No category test", async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.update', uid: adminEmail });
            expect ( re.code ).to.be.equal( E.NO_CATEGORY_ID ); 
        });
        it("Expect success. set numberOfPosts to 10.", async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.update', uid: adminEmail, id: categoryId, numberOfPosts: 15 });
            expect( re.code ).to.be.equal( 0 ); 
            expect( re.data ).to.be.equal( categoryId );
        });

        it("Expect success. get numberOfPosts.", async () => {
            await (new Base).loadSystemSettings();
            const adminEmail = (new Base).getAdminEmail();
            const re = await route({ route: 'category.get', uid: adminEmail, id: categoryId });
            expect( re.code ).to.be.equal( 0 );
            expect( (<CATEGORY>re.data).numberOfPosts ).to.be.equal(15);
            
        });

    });






    
});
