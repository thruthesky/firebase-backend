/**
 * @author Gem
 */
// import * as chai from 'chai';
// const expect = chai.expect;
// import * as _ from 'lodash';
import { Base } from './../../../modules/core/core';
// import { PostRouter } from '../../../modules/post/post.router';



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
// if ( !uid ) return this.error(E.NO_UID);
// if ( uid.length > 128 ) return this.error(E.UID_TOO_LONG);
// if ( uid.indexOf('/') !== -1 ) return this.error(E.UID_CANNOT_CONTAIN_SLASH);

describe('[ post-verify-data.ts ]', () => {
    beforeEach( () => {
        Base.useUid = true;
    });

        describe('Error Test Post Data Validation', () => {

            // it(`Test sanitize post data with empty fields`, async () => {
            //     const re = (new PostRouter).sanitizePostData(<any>{ id : 'this-is-my-post', uid: 'I-am-poster', content: '12' })
            //     // const re = await (new PostRouter).validatePostData( data );
            //     console.log(re)
            //     // expect(re).to.be.equal(false);
            // });

            // it(`Error Test on String Fields`, () => {
            //     const data = (new PostRouter).sanitizePostData(<any>{ id : 'this-is-my-post', uid: 'I-am-poster', content: 12 });
            //     const re =  (new PostRouter).validatePostData( data );
            //     expect(re.code).to.be.equal(E.MUST_BE_A_STRING);
            // });

            // it(`Error Test on Number Fields`,  () => {
            //     const data = (new PostRouter).sanitizePostData(<any>{ id : 'this-is-my-post', uid: 'I-am-poster', noOfComments: 'five' });
            //     const re =  (new PostRouter).validatePostData( data );
            //     expect(re.code).to.be.equal(E.MUST_BE_A_NUMBER);
            // });

            // it(`Error Test on Boolean Fields`,  () => {
            //     const data = (new PostRouter).sanitizePostData(<any>{ id : 'this-is-my-post', uid: 'I-am-poster', private: 'im not boolean' });
            //     const re =  (new PostRouter).validatePostData( data );
            //     expect(re.code).to.be.equal(E.MUST_BE_A_BOOLEAN);
            // });
        });

        // describe('Validation test post request\'s PostID.', () => {

        //     it(`Should be okay, expect 'false'`, async () => {
        //         const $post = new PostRouter(); // Set input data
        //         const re = await $post.validatePostRequest( {  postId: postId, uid: Anonymous.uid } );
        //         if ( re ) console.log( re );
        //         expect(re).to.be.equal(false);
        //     });

        //     it(`Post ID exceeds 128 length. Expected error: '${E.obj(E.POST_ID_TOO_LONG).message}' `, async () => {
        //         const $post = new PostRouter(); // Set input datad
        //         const re = await $post.validatePostRequest( { uid: Anonymous.uid, postId: 'kjadfasdfasfdsfaskjagfhaskffhgasddkjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
        //         // expect(re).to.be.equal(false);
        //         expect(re['code']).to.be.equal(E.POST_ID_TOO_LONG);
        //     });

        //     it(`Post id cannot contain slashes,  Expected error: '${E.obj(E.POST_ID_CANNOT_CONTAIN_SLASH).message}' `, async () => {
        //         const $post = new PostRouter(); // Set input datad
        //         const re = await $post.validatePostRequest( { uid: Anonymous.uid, postId: 'kjadfkjagfasjhgaskdfhg/sddjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
        //         // expect(re).to.be.equal(false);
        //         expect(re['code']).to.be.equal(E.POST_ID_CANNOT_CONTAIN_SLASH);
        //     });
        // });

});