import * as chai from 'chai';
const expect = chai.expect;


import * as E from './../../modules/core/error';
import { route } from './server-library';




describe('User update without idToken. Meaning, Update will be on Anonymous document.', () => {
    it('Expect error  without id.', async () => {
        const re = await route({ route: 'user.update', a: 'Apple', c: 'Cherry' });

        console.log(re);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal(0);
    });

    // it('Expect success', async () => {
    //     const data = req({ route: 'user.set', uid: 'user-10', a: 'B', c: 'd' });
    //     const re = await rpn(data).catch(err => err);

    //     // console.log(re);
    //     expect(re).to.be.an('object');
    //     expect(re['code']).to.be.equal(0);
    // });
});
