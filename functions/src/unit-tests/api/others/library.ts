import { Library as _ } from './../../../modules/library/library';

import * as chai from 'chai';
const e = chai.expect;



const build = _.httpBuildQuery;
const segment = _.segment;




describe('[ library.ts ]', () => {

    describe('httpBuildQuery', () => {

        it("Empty input", () => { e(build('')).to.be.null; });
        it("Null input", () => { e(build(null)).to.be.null; });
        it("Undefined input", () => { e(build(undefined)).to.be.null; });
        it("False input", () => { e(build(false)).to.be.null; });
        it("True input", () => { e(build(true)).to.be.null; });
        it("Number input", () => { e(build(123)).to.be.null; });
        it("Empty object input", () => { e(build({})).to.be.null; });
    
        it("Query string test", () => { e(build({ a: 'Apple' })).to.be.equal('a=Apple'); });
        it("Query string test", () => { e(build({ a: 'A', b: 'B' })).to.be.equal('a=A&b=B'); });
        it("Query string test", () => { e(build({ a: 'A', 1: '123' })).to.be.equal('1=123&a=A'); });
        it("Query string test", () => { e(build({ a: 'A', u: undefined })).to.be.equal('a=A&u=undefined'); });
    
    });

    describe('segment', () => {
        it('undefined', () => e(segment(undefined)).to.be.null);
        it('null', () => e(segment(null)).to.be.null);
        it('empty', () => e(segment('')).to.be.null);
        it('false', () => e(segment(<any>false)).to.be.null);
        it('true', () => e(segment(<any>true)).to.be.null);
        it('number', () => e(segment(<any>123)).to.be.null);
        it('object', () => e(segment(<any>{})).to.be.null);
        it('separator', () => e(segment('','')).to.be.null);
        it('separator', () => e(segment('a b c','')).to.be.null);
        it('Expect success', () => e(segment('a, b, c')).to.be.equal('a,'));
        it('Expect success', () => e(segment('a, b, c', ',')).to.be.equal('a'));
        it('Expect success', () => e(segment('a, b, c', ',', 1)).to.be.equal(' b'));
        it('Expect success', () => e(segment('a, b, c', ',', 1).trim()).to.be.equal('b'));
    });
});