
/**
* @author Gem
*/
import * as _ from 'lodash';
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E, COLLECTIONS } from './../../../modules/core/core';
import { PostRouter } from './../../../modules/post/post.router';
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

const postID = 'post-' + (new Date).getTime();

describe('[ post-create.ts ]', () => {
    beforeEach( () => {
        Base.useUid = true;
    });
    describe('Test Post Create', () => {
        
        it(`No UID/Anonymous can't create post.`, async () => {
            await (new Base).loadSystemSettings();
            const re = await route({ route: 'post.create', id: 'Anonymous-post', uid: '', content: 'I am Anonymous, I\'m not allowed to post.' })
            if ( ! (new Base).isErrorObject(re) ) console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.USER_NOT_LOGIN);
        });
        
        it(`Should be okay, no errors`, async () => {
            await (new Base).loadSystemSettings();
            const data = ( new PostRouter ).sanitizePostData( {id: postID, uid: 'I-am-a-test-user-with-UID', content: 'This should be fine' } )
            const re = await route(Object.assign({route: 'post.create'}, data));
            if ( (new Base).isErrorObject(re) ) console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0); 
        });
        
        it(`Test post, get created post.`, async () => {
            await (new Base).loadSystemSettings();
            const data = ( new PostRouter ).sanitizePostData( {id: postID, uid: 'I-am-a-test-user-with-UID', content: 'I overwrite this document' } )
            const re = await route(Object.assign({route: 'post.get'}, data));
            if ( (new Base).isErrorObject(re) ) console.log(re) 
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });
        
        it(`Test post create overwrite is prohibited`, async () => {
            await (new Base).loadSystemSettings();
            const data = ( new PostRouter ).sanitizePostData( {id: postID, uid: 'I-am-a-test-user-with-UID', content: 'I overwrite this document' } )
            const re = await route(Object.assign({route: 'post.create'}, data));
            if ( !(new Base).isErrorObject(re) ) console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.POST_ALREADY_EXISTS);
        });
        
        // it(`Error Test on Boolean Fields`, async () => {
        
        //     // expect(re.code).to.be.equal(E.MUST_BE_A_BOOLEAN);
        // });
    });
    
});