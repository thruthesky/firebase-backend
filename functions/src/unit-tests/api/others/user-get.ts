import * as chai from 'chai';
const expect = chai.expect;
import { Base } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();


describe('[user.get.ts] User get test', () => {
    it(`Expect success. Guest with no uid will get his profile data.`, async () => {
        const re = await route({ route: 'user.get' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
    });
    it(`Expect success. If wrong UID is given, it will create a new user document since
            1. wrong UID is a uid anyway,
            2. If docuemnt does not exist on user.get, it will create one.`, async () => {
            const re = await route({ route: 'user.get', uid: 'wrong-document-id' });
            // console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });
});