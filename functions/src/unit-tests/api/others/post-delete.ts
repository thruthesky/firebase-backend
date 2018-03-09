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
});
