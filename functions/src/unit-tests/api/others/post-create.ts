/**
 * @author jaeho
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E, Anonymous, CATEGORY } from './../../../modules/core/core';
import { route, adminEmail } from './../init';

const categoryId = "test-" + (new Date).getTime();



describe('[ post-create.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;
    });

    describe('Error tests on creating a post.', () => {
        it('No category id', async () => {
            const re = await route({ route: 'post.create' });
            // console.log(re);
            expect(re.code).to.be.equal(E.NO_CATEGORY_ID);
        });
        it('Expect error with E.POST_CATEGORY_DOES_NOT_EXIST', async () => {
            const re = await route({ route: 'post.create', categoryId: 'wrong-category-id' });
            // console.log(re);
            expect(re.code).to.be.equal(E.POST_CATEGORY_DOES_NOT_EXIST);
        });
    });

    describe('Create a success test.', () => {
        //
        it("Create a category for posting test.", async () => {
            // console.log("adminEmail: ", categoryId, await adminEmail());
            const re = await route({ route: 'category.create', id: categoryId, uid: await adminEmail() });
            // console.log(re);
            expect(re.code).to.be.equal(0);
        });
        it("Create a post", async () => {
            const re = await route({ route: 'post.create', categoryId: categoryId });
            expect(re.code).to.be.equal(0);
        });
        it("numberOfPosts test. Should be 1.", async () => {
            const re: CATEGORY = (await route({ route: 'category.get', id: categoryId })).data;
            expect(re.numberOfPosts).to.be.equal(1);
        });
        it("Create second post", async () => {
            const re = await route({ route: 'post.create', categoryId: categoryId, title: 'second post' });
            expect(re.code).to.be.equal(0);
        });
        it("numberOfPosts test. Should be 2.", async () => {
            const re: CATEGORY = (await route({ route: 'category.get', id: categoryId })).data;
            expect(re.numberOfPosts).to.be.equal(2);
        });
        it("Post content check", async () => {

            const title = "This is for writing and reading check.";

            const re = await route({ route: 'post.create', categoryId: categoryId, title: title });
            expect(re.code).to.be.equal(0);

            // console.log(re);

            const ret = await route({ route: 'post.get', id: re.data });
            // console.log('-- data: ', ret);

            const post = ret.data;

            expect(post.displayName).to.be.equal(Anonymous.displayName);
            expect(post.title).to.be.equal(title);



        });
    });




});
