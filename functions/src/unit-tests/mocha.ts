import * as chai from 'chai';

// const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const foo = 'bar';

describe('Chai Should Test', () => {
    it('string test', () => {
        const example = 'hello world';
        example.should.be.a('string');
    });
    it('string length test', () => {
        const example = 'hello world';
        example.should.be.a('string');
        example.should.have.lengthOf(11);
    });
});

describe('Chai Expect Test', () => {
    it('Number Equal', function() {
        const a = 3;
        expect(a).to.be.equal( 1 + 2 );
    });
});

describe('Chai Assertion Test', () => {
    it('Number Assertion Test', () => {
        assert.typeOf(2, 'number'); // without optional message
    });
    it('String Assertion Test', () => {
        assert.typeOf(foo, 'number'); // This will produce an assertion
    });
});
