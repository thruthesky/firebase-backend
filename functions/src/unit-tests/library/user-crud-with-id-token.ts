import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../modules/core/core';
// import { Router } from './../../modules/router/router';
import { init, route } from './init';
Base.admin = init();


const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTA1ZDFmYmVhOGUzNTIxZjYxNjNhMjRlY2JiZTQ5MTA4ZmNkMDIifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhydXRoZXNreS1maXJlYmFzZS1iYWNrZW5kIiwiYXVkIjoidGhydXRoZXNreS1maXJlYmFzZS1iYWNrZW5kIiwiYXV0aF90aW1lIjoxNTE5NjYyOTQ4LCJ1c2VyX2lkIjoiZFV1TUVVdDNqVmJLQVM3VzlWYUFsSVNYOW96MSIsInN1YiI6ImRVdU1FVXQzalZiS0FTN1c5VmFBbElTWDlvejEiLCJpYXQiOjE1MTk2NjQwOTcsImV4cCI6MTUxOTY2NzY5NywiZW1haWwiOiJ1c2VyLWJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXItYkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Kd36imPZCPyD_907D6oAnWFbprVLQoLpcKqcnrMqNlsL2duLKxKZOeTcTvfYuVeT6cHtB66Uwd0LDeUWRDK5J3GLCbCSyfJwYk4aB2bGj26xMizkuro1qGFU7PV1Jl7F5KyyDTLAru7190KgDAd5kB34v93fUXXxzbZ1b53M1ATRC7L8j2ozeJrNEKann8MBXUnOAuyt3ch5QOWGV675hCCcxUCemdn28BKI0qRM_bE-CH2_WJymAyikh4AYElTt1siti0xZpgTTWOBZ9apQGwWjYBuSGpsOS_rVkbmxqc_4_BkVVFmwuuQ-Xz4hHtpT21fFWIb9fc410fCcGNCnvQ';




describe('User Update Test', () => {
    it(`Should success on register`, async () => {
        // const re = await route({ route: 'user.set', uid: 'user-b', name: 'name-b' }); // test without ID token.
        const re = await route({ route: 'user.set', idToken: idToken, name: 'name-b' });
        if (re && re.code) console.log(re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        // const got = await route({ route: 'user.get', uid: 'user-b' }); // TEST with UID.
        const got = await route({ route: 'user.get', idToken: idToken });
        if (got && got.code) console.log(got);
        expect(got).to.be.a('object');
        expect(got['data']['name']).to.be.equal('name-b');
    })

    

    it(`Should failed on update because wrong document id.`, async () => {
        // const re = await route({ route: 'user.update', uid: 'wrong-user-id' }); //
        const re = await route({ route: 'user.update', idToken: 'wrong-user-id' });
        if (re && re.code) console.log(re);
        expect(re.code).to.be.equal(E.FAILED_TO_VERIFY_USER);
    })


    it(`Should failed on update because wrong gender.`, async () => {
        const re = await route({ route: 'user.update', idToken, gender: 'D' });
        expect(re.code).to.be.equal(E.WRONG_GENDER);
    })

    it(`Should be success on update name to name-updated.`, async () => {
        const re = await route({ route: 'user.update', idToken: idToken, name: 'name-updated' });
        expect(re.code).to.be.equal(0);
    })

})


describe('User get TEST', () => {

    // it(`Should be error(${E.NO_USER_DOCUMENT_ID}) with no id`, async () => {
    //     const re = await route({ route: 'user.get' });
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal(E.NO_USER_DOCUMENT_ID);
    // })

    it('Should re[data] be null with wrong document id', async () => {
        const re = await route({ route: 'user.get', idToken: 'wrong-document-id' });
        expect(re).to.be.a('object');
        // expect(re.code).to.be.equal(0);
        expect(re.code).to.be.equal( E.FAILED_TO_VERIFY_USER );
    })
});




