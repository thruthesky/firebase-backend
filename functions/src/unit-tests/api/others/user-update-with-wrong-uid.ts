import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();

describe('[ user-update-with--wrong-uid.ts ]', () => {
    beforeEach(() => {
        Base.useUid = true;
    });
    describe('User update test with UID.', () => {
        it(`Expect 'Document ID does not exists' with wrong uid.`, async () => {
            const wrong_uid = 'This-is-Wrong-UID';
            const re = await route({ route: 'user.update', uid: wrong_uid }); //
            // console.log("============= re: ");
            // console.log('re: ', re);
            expect(re.code).to.be.equal(0);
            expect(re.data).to.be.equal(wrong_uid);
        });
    });
});

