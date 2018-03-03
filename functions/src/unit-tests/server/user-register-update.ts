import * as chai from 'chai';
const expect = chai.expect;



import { route } from './server-library';
import { E } from './../../modules/core/core';





describe('User update without idToken. Meaning, the User is anonymous and will try to update on Anonymous document.', () => {
    it('Expect error  without id.', async () => {
        const re = await route({ route: 'user.update', a: 'Apple', c: 'Cherry' });
        // console.log(re);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal( E.ANONYMOUS_CANNOT_EDIT_PROFILE );
    });

    // it('Expect success', async () => {
    //     const data = req({ route: 'user.set', uid: 'user-10', a: 'B', c: 'd' });
    //     const re = await rpn(data).catch(err => err);

    //     // console.log(re);
    //     expect(re).to.be.an('object');
    //     expect(re['code']).to.be.equal(0);
    // });
});
