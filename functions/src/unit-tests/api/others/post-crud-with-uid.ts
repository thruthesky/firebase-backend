/**
 * @author Gem
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();


/**
 * 
 * 
 * 
 * 
 *      WARNING.        YOU ARE TESTING WITH UID.
 * 
 * 
 * 
 * 
 * 
 */


// describe('Post creating Test.', () => {
//     it('Should be successful', async () => {
//         const re = await route({ route: 'post.create', uid: 'user-b', body: 'Hello this is test.', category: 'Test' });
//         if (re && re.code) console.log(re);
//         expect(re).to.be.a('object');
//         expect(re.code).to.be.equal( 0 );
//     });
    
    // it('Should be error with no category', async () => {
    //     const re = await route({ route: 'post.create', uid: 'user-b', body: 'Hello this is test.' });
    //     if (re && re.code) console.log(re);
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal( E.POST_HAS_NO_CATEGORY );
    // });

    // it('Should be error with no uid', async () => {
    //     const re = await route({ route: 'post.create', body: 'Hello this is test.' });
    //     if (re && re.code) console.log(re);
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal( E.USER_NOT_LOGIN );
    // });

    // it('Should be error with no body', async () => {
    //     const re = await route({ route: 'post.create', uid: 'user-b', body: '', category: 'Test' });
    //     if (re && re.code) console.log(re);
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal( E.EMPTY_POST_BODY );
    // });
// });



describe('Get post test.', () => {

    beforeEach( () => {
        Base.useUid = true;
    });

    it('Should be error document id does not exist', async () => {
        const re = await route({ route: 'post.get', uid: 'user-b', postId: 'uz1WgOJtEKZ7a47wqqRM' });
        // console.log("re: ", re);
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal( E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET );
        // console.log('Message: ', re.message);
    });


    // it('Should be error user not login', async () => {
    //     const re = await route({ route: 'post.get',  postId: 'dfgsdfsdfasdf' });
    //     console.log(re.message);
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal( E.NO_UID );
    //     // console.log('Message: ', re.message)
    // });

    // it('Should be error no post id', async () => {
    //     const re = await route({ route: 'post.get', uid: 'user-b' });
    //     if (re && re.message) console.log(re.message);
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal( E.NO_POST_ID_ON_GET );
    //     // console.log('Message: ', re.message)
    // });
});