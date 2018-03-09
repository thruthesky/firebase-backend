/**
 * @author jaeho
 */
import * as chai from 'chai';
const expect = chai.expect;
import { Base, E } from './../../../modules/core/core';
import { route, adminEmail } from './../init';
// import { CATEGORY } from '../../../modules/post/category';
// import { POST_DATA } from '../../../modules/post/post';


const categoryId = "test-" + (new Date).getTime();

let postId;
// const userId = 'user-a';



describe('[ post-delete.ts ]', () => {

    beforeEach(() => {
        Base.useUid = true;

    });

    describe('Delete test as anonymous', () => {
        it("Create a category for delete post test.", async () => {
            const re = await route({ route: 'category.create', id: categoryId, uid: await adminEmail() });
            expect(re.code).to.be.equal(0);
        });

        it("Creaet a post for delete", async () => {
            const re = await route({ route: 'post.create', categoryId: categoryId, title: 'delete 1', password: '12345a' });
            expect(re.code).to.be.equal(0);
            postId = re.data;
        });

        it("Delete the post without password", async () => {
            const re = await route({ route: 'post.delete', id: postId });
            expect(re.code).to.be.equal(E.ANONYMOUS_PASSWORD_IS_EMPTY);
        });
        it("Delete the post with wrong password.", async () => {
            const re = await route({ route: 'post.delete', id: postId, password: 'wrong-password' });
            expect(re.code).to.be.equal(E.ANONYMOUS_WRONG_PASSWORD);
        });
        it("Expect success.", async () => {
            const re = await route({ route: 'post.delete', id: postId, password: '12345a' });
            expect(re.code).to.be.equal(0);

            const got = await route({ route: 'post.get', id: postId });
            expect(got.code).to.be.equal( E.DOCUMENT_ID_DOES_NOT_EXISTS_FOR_GET );
        });
    });

    // describe('Edit test as a user', () => {
    //     it("Create a post with user - " + userId, async () => {
    //         const re = await route({ route: 'post.create', categoryId: categoryId, uid: userId, title: 'AAA' });
    //         expect(re.code).to.be.equal(0);
    //         postId = re.data;
    //     });
    //     it("Edit the post without uid ( as anoymous )", async () => {
    //         const re = await route({ route: 'post.edit', id: postId, title: 'BBB' });
    //         expect(re.code).to.be.equal(E.NOT_OWNED_BY_ANONYMOUS);
    //         expect((await route({ route: 'post.get', id: postId })).data.title).to.be.equal('AAA');
    //     });
    //     it("Edit the post as wrong user", async () => {
    //         const re = await route({ route: 'post.edit', id: postId, uid: 'wrong-user-id', title: 'CCC' });
    //         // console.log("--- re: ", re);
    //         expect(re.code).to.be.equal(E.NOT_YOUR_POST);
    //         expect((await route({ route: 'post.get', id: postId })).data.title).to.be.equal('AAA');
    //     });
    //     it("Edit the post", async () => {
    //         const re = await route({ route: 'post.edit', id: postId, uid: userId, title: 'DDD' });
    //         expect(re.code).to.be.equal(0);
    //         expect((await route({ route: 'post.get', id: postId })).data.title).to.be.equal('DDD');
    //     });
    // });

    // describe('Edit as admin', () => {
    //     it("Admin edits the post", async () => {
    //         const re = await route({ route: 'post.edit', id: postId, uid: await adminEmail(), title: 'EEE' });
    //         // console.log(re);
    //         expect(re.code).to.be.equal(0);
    //         expect((await route({ route: 'post.get', id: postId })).data.title).to.be.equal('EEE');
    //     });
    // });
});
