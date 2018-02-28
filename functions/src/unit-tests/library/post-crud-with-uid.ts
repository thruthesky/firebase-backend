﻿/**
 * @author Gem
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E, Anonymous } from './../../modules/core/core';
import { init, route } from '../../unit-tests/library/init';
import { PostRouter } from '../../modules/post/post.router';
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


// describe('post-verify-with-uid', () => {
//     const postId = '4LNEQ5sNcazSiAv4TcjX';
//     beforeEach( () => {
//         Base.useUid = true;
//     });
//     describe('Post verify without UID. The user will login as Anonymous.', () => {
//         describe('Post get without UID.', () => {
//             it('Anonymous uid with router. If uid is not set, then the user will be an anonymous.', async () => {
//                 const $post = new PostRouter(); // Set input data
//                 const re = await $post.validatePostRequest( { route: 'post.get', postId: postId, uid: Anonymous.uid } );
//                 expect($post.loginUid).to.be.equal(Anonymous.uid);
//                 expect(re).to.be.a('object');
//                 expect(re['code']).to.be.equal(0);

//             });
//         });
    
// });



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



// describe('post-crud-with-uid', () => {

//     beforeEach( () => {
//         Base.useUid = true;
//     });
//     describe('Get post test.', () => {
//         it('Should be error document id does not exist', async () => {
//             const re = await route({ route: 'post.get', uid: 'user-b', postId: 'uz1WgOJtEKZ7a47wqqRM' });
//             // console.log("re: ", re);
//             expect(re).to.be.a('object');
//             expect(re.code).to.be.equal( E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET );
//             // console.log('Message: ', re.message);
//         });
//         it('Should be error user not login.', async () => {
//             const re = await route({ route: 'post.get',  postId: 'dfgsdfsdfasdf' });
//             // console.log(re.message);
//             expect(re).to.be.a('object');
//             expect(re.code).to.be.equal( E.NO_UID );
//             // console.log('Message: ', re.message)
//         });

//         it('Should be error no post id', async () => {
//             const re = await route({ route: 'post.get', uid: 'user-b' });
//             // if (re && re.message) console.log(re.message);
//             expect(re).to.be.a('object');
//             expect(re.code).to.be.equal( E.NO_POST_ID_ON_GET );
//             // console.log('Message: ', re.message)
//         });
//     });

// });

