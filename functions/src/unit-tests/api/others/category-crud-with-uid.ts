/**
 * @author gem
 */
import * as chai from 'chai';
import * as _ from 'lodash';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { init, route } from './../init';
Base.admin = init();



describe('category-crud-with-uid', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Create category with UID', () => {
        const _route = 'category.create'

        // PERMISSION NOT YET WORKING. UNCOMMENT WHEN TESTING PERMISSION
        // it('Permission testing non-admin users cannot create category', async () => {
        //     const re = await route({ route: _route, uid: 'i-am-not-admin', id: 'b' });
        //     expect(re).to.be.a('object');
        //     expect(re.code).to.be.equal(E.PERMISSION_DENIED_ADMIN_ONLY);
        //     // expect( re.code ).to.be.equal(0); // permissions not yet working
        // });


        it('Should be error field moderator is not an array', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: 'news', moderators:'mod@sample.com'});
            // console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(E.MUST_BE_AN_ARRAY);
        });

        it('Should be success. Test with no error', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: 'news', name: 'NBA' });
            // console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });

    });

    describe('Get category', () => {
        const _route = 'category.get'

        it('Should be okay, Returns information about the category', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: 'sports'});
            // console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });

        it('Should be success. Test with no error', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: 'sports', name: 'NBA' });
            // console.log(re)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
        });

    });

    describe('Update category', () => {
        const _route = 'category.update';
        const editName ='Basketball' + _.now();
        it('Should be okay, update the category and then checks if its updated', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: 'sports', name: editName});
            const get = await route({ route: 'category.get', uid: 'i-am-user', id: 'sports'});
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            expect(get.data.name).to.be.equal(editName);


        });

    });

    
    describe('Remove category', () => {
        const _route = 'category.remove';
        const category = 'news'
        it('Should be okay, Remove category and then checks if document still exists.', async () => {
            const re = await route({ route: _route, uid: 'i-am-user', id: category, });
            const get = await route({ route: 'category.get', uid: 'i-am-user', id: category});
            // console.log(get)
            expect(re).to.be.a('object');
            expect(re.code).to.be.equal(0);
            expect(get.code).to.be.equal(E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET);
            
        });

    });


});
