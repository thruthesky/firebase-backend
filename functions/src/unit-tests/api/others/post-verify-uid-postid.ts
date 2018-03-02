
/**
 * @author Gem
 */
import * as chai from 'chai';
const expect = chai.expect;
import * as _ from 'lodash';
import { Base, E, Anonymous } from './../../../modules/core/core';
import { PostRouter } from './../../../modules/post/post.router';
import { Document } from './../../../modules/document/document';
import { init } from './../init';
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


// if ( !uid ) return this.error(E.NO_UID);
// if ( uid.length > 128 ) return this.error(E.UID_TOO_LONG);
// if ( uid.indexOf('/') !== -1 ) return this.error(E.UID_CANNOT_CONTAIN_SLASH);

describe('post-verify-uid-postid', () => {
    const postId = '4LNEQ5sNcazSiAv4TcjX';
    // const postId = '..';
    beforeEach( () => {
        Base.useUid = true;
    });
        describe('Validation test post request\'s UID.', () => {

            it(`Should be okay with post ID and '${Anonymous.uid}' is accepted as UID`, async () => {
                const $post = new PostRouter(); // Set input data
                const re = await $post.validatePostRequest( {  postId: postId, uid: Anonymous.uid } );
                expect(re).to.be.equal(false);

            });

            it(`UID lenght exceeds 128, Expected error: '${E.obj(E.UID_TOO_LONG).message}' `, async () => {
                const $post = new PostRouter(); // Set input datad
                const re = await $post.validatePostRequest( { postId: postId, uid: 'kjadfkjagfhaskfjhgaskdfhgasddkjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
                // expect(re).to.be.equal(false);
                expect(re['code']).to.be.equal(E.UID_TOO_LONG);
            });

            it(`UID cannot contain slashes. Expected error: '${E.obj(E.UID_CANNOT_CONTAIN_SLASH).message}' `, async () => {
                const $post = new PostRouter(); // Set input datad
                const re = await $post.validatePostRequest( { postId: postId, uid: 'kjadfkjagfasjhgaskdfhg/sddjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
                // expect(re).to.be.equal(false);
                expect(re['code']).to.be.equal(E.UID_CANNOT_CONTAIN_SLASH);
            });
        });

        describe('Validation test post request\'s PostID.', () => {

            it(`Should be okay, expect 'false'`, async () => {
                const $post = new PostRouter(); // Set input data
                const re = await $post.validatePostRequest( {  postId: postId, uid: Anonymous.uid } );
                if ( re ) console.log( re );
                expect(re).to.be.equal(false);
            });

            it(`Post ID exceeds 128 length. Expected error: '${E.obj(E.POST_ID_TOO_LONG).message}' `, async () => {
                const $post = new PostRouter(); // Set input datad
                const re = await $post.validatePostRequest( { uid: Anonymous.uid, postId: 'kjadfasdfasfdsfaskjagfhaskffhgasddkjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
                // expect(re).to.be.equal(false);
                expect(re['code']).to.be.equal(E.POST_ID_TOO_LONG);
            });

            it(`Post id cannot contain slashes,  Expected error: '${E.obj(E.POST_ID_CANNOT_CONTAIN_SLASH).message}' `, async () => {
                const $post = new PostRouter(); // Set input datad
                const re = await $post.validatePostRequest( { uid: Anonymous.uid, postId: 'kjadfkjagfasjhgaskdfhg/sddjfddhd5dgskjdfhgsakjdfhgskjfgaskjfhgaskjdfgsakjfgaskjfhgskjfgsakjdfgaskjdfgaksjdfgaksdjfgaskjdfgaskjd' } );
                // expect(re).to.be.equal(false);
                expect(re['code']).to.be.equal(E.POST_ID_CANNOT_CONTAIN_SLASH);
            });
        });

});