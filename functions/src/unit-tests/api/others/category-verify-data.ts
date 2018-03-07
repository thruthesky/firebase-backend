// /**
//  * @author gem
//  */
// import { CategoryRouter } from './../../../modules/post/category.router';
// import * as chai from 'chai';
// const expect = chai.expect;
// import { Base, E } from './../../../modules/core/core';
// import { init, route } from './../init';
// Base.admin = init();



// describe('category-verify-data', () => {
    
//     beforeEach(() => {
//         Base.useUid = true;
//     });
    
//     describe('Test category ID', () => {
//         it(`Category with no ID. Expect error: ['${E.obj(E.NO_CATEGORY_ID).message}']`, async () => {
//             const obj = new CategoryRouter().sanitizeCategoryData(<any>{});

//             // console./log(obj)
//             const re = new CategoryRouter().validateCategoryData(obj);
//             if( typeof re != 'boolean' ){
//                 if (re.code !== E.NO_CATEGORY_ID) console.log(re);
//                 expect(re).to.be.a('object');
//                 expect(re.code).to.be.equal(E.NO_CATEGORY_ID);
//             }
//             else console.log( 're: ', re )
//         });

//         it(`Category ID with slashes. Expect error: [${E.obj(E.CATEGORY_ID_CANNOT_CONTAIN_SLASH).message}]`, async () => {
//             const re = new CategoryRouter().validateCategoryData({ id : '/THIS-IS-/MY-CATEGORY' });
//             if( typeof re != 'boolean' ){
//                 if (re.code !== E.CATEGORY_ID_CANNOT_CONTAIN_SLASH) console.log(re);
//                 expect(re).to.be.a('object');
//                 expect(re.code).to.be.equal(E.CATEGORY_ID_CANNOT_CONTAIN_SLASH);
//                 // console.log(re)
//             }
//             else console.log( 're: ', re )
//         });

//         it(`Category ID exceeds maximum ID length. Expect error: [${E.obj(E.CATEGORY_ID_TOO_LONG).message}]`, async () => {
//             const re = new CategoryRouter().validateCategoryData({ id : 'THIS-IS-MY-CATEGORYAKJSDGFKAJSHDGFAHSGASFKJASFJGASFHGASDFHGASKJDFGASKJDFHGASJFGSAKJGAKSJDFAKJFGAKSJFGKAJSFGAKSJDFGAKSJDFGSAKDJFGASKJD' });
//             if( typeof re != 'boolean' ){
//                 if (re.code !== E.CATEGORY_ID_TOO_LONG) console.log(re);
//                 expect(re).to.be.a('object');
//                 expect(re.code).to.be.equal(E.CATEGORY_ID_TOO_LONG);
//                 // console.log(re)
//             }
//             else console.log( 're: ', re )
//         });

//         it(`Category ID Success. Expect: false`, async () => {
//             const re: any = new CategoryRouter().validateCategoryData(new CategoryRouter().sanitizeCategoryData({ id : 'buy-and-sell' }));
//             // console.log('re', re);
//             if( typeof re == 'boolean' ){
//                 expect(re).to.be.a('boolean');
//                 expect(re).to.be.equal(false);
//             }
//             else console.log('Result: ', re)
            
//         });
//     });

//     describe('Test sanitizeCategoryData()', () => {
//         // it(`Sanitize data with no name. Should be success ID becomes the name.`, async () => {
//         //     const id = 'buy-n-sell';
//         //     const re: any = new CategoryRouter().sanitizeCategoryData({ id : id });
//         //     // console.log(re)
//         //     expect(re).to.be.a('object');
//         //     expect(re.name).to.be.equal(id);
//         // });

//         // it(`Check for undefined fields. Should be success.`, async () => {
//         //     const id = 'buy-n-sell';
//         //     const re: any = new CategoryRouter().sanitizeCategoryData({ id : id });
//         //     // console.log(re)
//         //     expect(re).to.be.a('object');
//         //     let key;
//         //     for( key in re ){
//         //         expect(re[key]).to.not.be.an('undefined');
//         //     }
//         //     // console.log(re)
//         // });

//     });

    
// });