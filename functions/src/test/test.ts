import * as chai from 'chai';
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;


import * as util from 'util';

import * as request from 'request';
import * as rpn from 'request-promise-native';
import { Library as lib } from './../modules/library/library';
import * as e from './../modules/core/error';


const apiUrl = 'http://localhost:8010/test-ec3e3/us-central1/api';

function req(obj, debug = false) {

    const data: request.UrlOptions = <request.UrlOptions>{};
    data['method'] = 'POST';
    data['url'] = apiUrl;
    data['json'] = true;
    data['body'] = obj;

    if (debug) {
        console.log("Debug Url: " + apiUrl + '?' + lib.httpBuildQuery(obj));
    }
    return data;
}



console.log("========= [ Unit Test begins ] =========== " + new Date());

describe('User Register', () => {

    it('Register error check without uid', async () => {
        const data = req({ route: 'user.register', a: 'b', c: 'd' });
        const re = await rpn(data);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal( e.NO_UID );
    });

    it('Register error check without name', async () => {
        const data = req({ route: 'user.register', uid: 'uid-b', c: 'd' });
        const re = await rpn(data);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal( e.NO_NAME );
    });

    it('Expect: register success.', async () => {
        const data = req({ route: 'user.register', uid: 'uid-c', name: 'my-name', gender: 'M' }, true);
        const re = await rpn(data);
        console.log('re: ', re);
        expect(re).to.be.an('object');
        expect(re['code']).to.be.equal( 0 );
    });



});

// describe('Registration', () => {
//     it('get response', async ( ) => {
//         const url = 'http://localhost:8010/fire-db123-3cc28/us-central1/api';
//         const re = await rpn.get( url );
//         re.should.be.a('object');
//         // expect(re).to.include('10');
//     });

// });