import * as chai from 'chai';
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

import * as util from 'util';

import { Request } from 'express';
import * as request from 'request';
import * as rpn from 'request-promise-native';
import { Library as lib } from './../modules/library/library';
import * as E from './../modules/core/error';
import { Base } from './../modules/core/base';


import { Router } from './../modules/router/router';


import * as admin from 'firebase-admin';
import { serviceAccount } from './../settings/serviceAccountKey';


admin.initializeApp({ // Enable on development.
    credential: admin.credential.cert(<any>serviceAccount),
    databaseURL: "https://pwa-cms.firebaseio.com"
});



const db = admin.firestore();
Base.admin = db;






// const apiUrl = 'http://localhost:8010/test-ec3e3/us-central1/api';

// function req(obj, debug = false) {

//     const data: request.UrlOptions = <request.UrlOptions>{};
//     data['method'] = 'POST';
//     data['url'] = apiUrl;
//     data['json'] = true;
//     data['body'] = obj;

//     if (debug) {
//         console.log("Debug Url: " + apiUrl + '?' + lib.httpBuildQuery(obj));
//     }
//     return data;
// }


console.log("========= [ Unit Test begins ] =========== .: " + new Date());

async function route(data) {
    return await (new Router(data)).run()
}

// describe('Router TEST', () => {
//     it('Empty route', async () => {
//         const re = await route({ route: '', a: 'ab' });
//         expect(re).to.be.a('object');
//         expect(re.code).to.be.equal(E.EMPTY_ROUTE);
//     });
//     it('Wrong route', async () => {
//         const re = await route({ route: 'asd' });
//         expect(re).to.be.a('object');
//         expect(re.code).to.be.equal(E.WRONG_ROUTE);
//     });
// });


describe('Test Post Router', () => {
    it('post.create method', async () => {
        const re = await route({ route: 'post.create', id: 'post-a' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        console.log(re);
    });
    // it('post.edit method', async () => {
    //     const re = await route({ route: 'post.edit' });
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal(0);
    //     console.log(re);
    // });
    // it('post.delete method', async () => {
    //     const re = await route({ route: 'post.delete' });
    //     expect(re).to.be.a('object');
    //     expect(re.code).to.be.equal(0);
    //     console.log(re);
    // });
    it('post.get method', async () => {
        const re = await route({ route: 'post.get', id : 'post-a' });
        expect(re).to.be.a('object');
        expect(re.code).to.be.equal(0);
        console.log(re);
    });
});



// });







// describe('User Register', () => {

//     it('Register error check without uid', async () => {
//         const data = req({ route: 'user.register', a: 'b', c: 'd' });
        // const re = await rpn(data).catch(err => err);
        // if (re['statusCode'] && re['statusCode'] === 500) {
        //     const res = JSON.parse(re.message.split(' - ')[1]);
        //     console.log(res['error']['message']);
        // }


//         expect(re).to.be.an('object');
//         expect(re['code']).to.be.equal(e.NO_UID);
//     });

//     // it('Register error check without name', async () => {
//     //     const data = req({ route: 'user.register', uid: 'uid-b', c: 'd' });
//     //     const re = await rpn(data);
//     //     expect(re).to.be.an('object');
//     //     expect(re['code']).to.be.equal( e.NO_NAME );
//     // });

//     // it('Expect: register success.', async () => {
//     //     const data = req({ route: 'user.register', uid: 'uid-c', name: 'my-name', gender: 'M' }, true);
//     //     const re = await rpn(data);
//     //     console.log('re: ', re);
//     //     expect(re).to.be.an('object');
//     //     expect(re['code']).to.be.equal( 0 );
//     // });



// });

// // describe('Registration', () => {
// //     it('get response', async ( ) => {
// //         const url = 'http://localhost:8010/fire-db123-3cc28/us-central1/api';
// //         const re = await rpn.get( url );
// //         re.should.be.a('object');
// //         // expect(re).to.include('10');
// //     });

// // });