import { Anonymous, UID } from './../../../modules/core/defines';
/**
 * @author gem
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



describe('category-crud-with-uid', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Set category with UID', () => {
        it('Set category no UID. No UID will automatically set to anonymous', async () => {
            const re = await route({ route: 'category.set', uid: '', a: 'b' });
            // if (re.code !== E.NO_UID) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.ANONYMOUS_CANNOT_SET_CATEGORY);
            // console.log(re)
        });

        it('Should be error anonymous user cannot set category', async () => {
            const re = await route({ route: 'category.set', uid: 'anonymous-uid', id: 'b' });
            if (re.code !== E.ANONYMOUS_CANNOT_SET_CATEGORY) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.ANONYMOUS_CANNOT_SET_CATEGORY);
            // console.log(re)
        });

        it('Should be success. Test with no error', async () => {
            const re = await route({ route: 'category.set', uid: 'i-am-user', id: 'social' });
            // if (re.code !== E.ANONYMOUS_CANNOT_SET_CATEGORY) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);

        });
    });


});
