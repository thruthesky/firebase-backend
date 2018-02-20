import * as chai from 'chai';
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

// import * as request from 'request';
import * as rpn from 'request-promise-native';


describe('updateDoc number testing', () => {
    it('get response', async ( ) => {
        const url = 'http://localhost:8010/test-ec3e3/us-central1/updateDoc';
        const re = await rpn.get( url );
        re.should.be.a('string');
        expect(re).to.include('10');
    });
});
