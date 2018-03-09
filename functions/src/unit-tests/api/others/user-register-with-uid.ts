import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { route } from './../init';



describe('[ user-register-with-uid.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Registration test with Base.useUid=true.', () => {
        it('Anoymous cannot set/update', async () => {
            const re = await route({ route: 'user.set', uid: '', a: 'b' });
            // console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.ANONYMOUS_CANNOT_EDIT_PROFILE);
        });

        it('Must fail with long uid', async () => {
            const re = await route({ route: 'user.set', uid: '1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-' });
            // console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.UID_TOO_LONG);
        });

        it('Must fail with wrong uid containing slash.', async () => {
            const re = await route({ route: 'user.set', uid: 'aaIA9UwD3INzCF8PtbzbD23rzSD3https://us-centns.net/api?route=user.set&uid=aaIA9UwD3INzCF8PtbzbD23rzSD3' });
            // console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.UID_CANNOT_CONTAIN_SLASH);
        });

        it('Without name should be OK', async () => {
            const re = await route({ route: 'user.set', uid: 'uid-a' });
            if (re && re.code) console.log(re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });


        it('Should be OK with a property that does not exists on Interface USER_DATA.', async () => {
            const re = await route({ route: 'user.set', uid: 'uid-new-2', name: 'user-a', nick: 'Jae' });
            // console.log("re: ", re);
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            // const user = await route({ route: 'user.get', uid: 'uid-a' });
            // console.log(user);
        });

    });
});
