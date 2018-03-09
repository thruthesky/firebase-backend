/**
 * This will test user registration.
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { route } from './../init';


describe('[ user-email-password-register.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    const user_email = 'user' + (new Date).getTime() + '@gmail.com';

    describe("Register with email/password", () => {
        it("Expect error without emal", async () => {
            const re = await route({ route: 'user.register', gender: 'M' });
            // console.log('re:', re);
            expect( re.code ).to.be.equal( E.NO_EMAIL );
        });
        it("Expect error without password", async () => {
            const re = await route({ route: 'user.register', email: user_email, gender: 'M' });
            // console.log('re:', re);
            expect( re.code ).to.be.equal( E.NO_PASSWORD );
        });
        
        it("Expect error with weak password", async () => {
            const re = await route({ route: 'user.register', email: user_email, password: '1234', gender: 'M' });
            // console.log('re:', re);
            expect( re.code ).to.be.equal( E.FIREBASE_INVALID_PASSWORD );
        });
        it("Expect success", async () => {
            const re = await route({ route: 'user.register', email: user_email, password: '12345a', displayName: 'User Display Name', gender: 'M' });
            // console.log('re:', re);
            expect( re.code ).to.be.equal( 0 );
        });
        
        it("Expect error for email existing", async () => {
            const re = await route({ route: 'user.register', email: user_email, password: '12345a', gender: 'M' });
            expect( re.code ).to.be.equal( E.FIREBASE_AUTH_UID_ALREADY_EXISTS );
        });
        
    });
});
