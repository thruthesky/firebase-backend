import * as chai from 'chai';
const expect = chai.expect;
import { Base, Anonymous } from './../../modules/core/core';
import { Router } from './../../modules/router/router';
import { init } from './init';
Base.admin = init();


describe('User Verify Test with Router.', () => {
    it('Anonymous uid', async () => {
        const $router = new Router({ idToken: '' }); // Set input data
        const re = await $router.verifyUser();
        expect(re).to.be.equal(true);
        expect( $router.loginUid ).to.be.equal( Anonymous.uid );
    });
});

describe('User Verify Test with Base.', () => {
    it('Anonymous uid', async () => {
        Base.params = { idToken: '' }; // Set input data
        const base = new Base('');
        const re = await base.verifyUser();
        expect(re).to.be.equal(true);
        expect( base.loginUid ).to.be.equal( Anonymous.uid );
    });
});

describe('Expect error with wrong token', () => {
    it('Wrong token', async () => {
        const $router = new Router({ idToken: 'wrong token' });
        const re = await $router.verifyUser();
        // console.log(re);
        expect(re).to.be.not.equal(true);
        expect( $router.loginUid ).to.be.equal( null );
    })
});


/**
 * This may fail depeding on the `idToken` changes.
 * It is okay NOT to test this test or try to put a ID Token that less changes.
 * 
 */
// describe('Expect success', () => {
//     it('Token copied from client', async () => {
//         const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImUwZDU1NjQ5Yzk4MWI1ZWE2YTZkNzBhYTIyMDhiYWMxNjRkYTViMmMifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGhydXRoZXNreS1maXJlYmFzZS1iYWNrZW5kIiwibmFtZSI6IkphZUhvIFNvbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1XSmNsZDBveHc3WS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFuWS9jYmR5VHRuc1RxQS9waG90by5qcGciLCJhdWQiOiJ0aHJ1dGhlc2t5LWZpcmViYXNlLWJhY2tlbmQiLCJhdXRoX3RpbWUiOjE1MTk1NDY2OTMsInVzZXJfaWQiOiJaSW5CWk9hYmIxU2dKMVJxT0dFQ2xxMTd2Y0UyIiwic3ViIjoiWkluQlpPYWJiMVNnSjFScU9HRUNscTE3dmNFMiIsImlhdCI6MTUxOTU2ODQyMSwiZXhwIjoxNTE5NTcyMDIxLCJlbWFpbCI6InRocnV0aGVza3lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTMyNDgyMDA1NjkzOTQxNDQwMjYiXSwiZW1haWwiOlsidGhydXRoZXNreUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.dMs6O1CsmJRHHiLsgcq0_Kzgn1-UJvuwbDbHQgDmnYb7j_FGHknicMPbnyjksX2yNbSPu-mzgC0F_GR9j4DOGkcJMg045Wu_8b-yP1uZ6kjCFXZtyICmdZoBDSEEq6nOAmadNkJqrJ8HTKbQwaMFZ2VktIJUwTVWY3hcXqVkHU_7brOgWf7g2iWxcSyaCN6OJ9qjZ04UPPxkZEFrkOQ6Nx7fR3C0zhUUtqO31VA6J2Z4b3R5XSvg9H9aQHJt86eVJ20ZNPF4KsSv9wjR6cHrSBVUIRQkx26l4HQuFtd27SewCIWdNDtnZ9Ss3X_khtt1VWNaT3P0QRpbfmcKDnYS7w';
//         const $router = new Router({ idToken: idToken });
//         const re = await $router.verifyUser();
//         expect(re).to.be.equal(true);
//         // console.log( $router.loginUid );
//     });
// });