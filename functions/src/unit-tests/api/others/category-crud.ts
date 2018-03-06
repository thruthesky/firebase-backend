import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



describe('category-crud', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Set category', () => {
        it('', async () => {

            const re = await route({ route: 'category.set', id: 'buy and sell', name: 'b' });
            if (re.code !== E.NO_UID) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.NO_UID);
        });
    });

});