import * as chai from 'chai';
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

// import * as request from 'request';
import * as rpn from 'request-promise-native';



// describe('updateDoc number testing', () => {
//     it('get response', async ( ) => {
//         const url = 'http://localhost:8010/test-ec3e3/us-central1/updateDoc';
//         const re = await rpn.get( url );
//         re.should.be.a('string');
//         expect(re).to.include('10');
//     });
// });

describe('Get all users', () => {
    it('Get all users', async ( ) => {
        var post = {
            method: 'POST',
            uri: 'http://localhost:8010/fire-db123-3cc28/us-central1/api',
            body: {
                route: 'user.list',
                collection: 'x-users'
            },
            json: true // Automatically stringifies the body to JSON
        };
        const re = await rpn( post );
        re.should.be.a('object');        
    });
});
