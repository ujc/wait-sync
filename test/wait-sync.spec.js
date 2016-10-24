var should   = require('chai').should();
var waitSync = require('../index.js');

describe('wait-sync', () => {

    it('does not block the execution thread', done => {
        var isDone = false;
        setTimeout(() => isDone=true, 1500);

        waitSync(2);
        isDone.should.be.true;

        done();
    });

    it('runs the current execution block in non-async serial manner', done => {
        var fakeConsoleLog = [];

        fakeConsoleLog.push(1);

        setTimeout(() => fakeConsoleLog.push(2), 1500);
        waitSync(2);

        fakeConsoleLog.push(3);

        fakeConsoleLog.join('-').should.equal('1-2-3');
        fakeConsoleLog.join('-').should.not.equal('1-3-2');

        done();
    });

    it('throws an error on wrong <seconds> argument', () => {
        try      { waitSync({})    }
        catch(e) { should.exist(e) }
    });

    it('defaults wait-time to 1 seconds', () => {
        var start = new Date().getTime();

        waitSync();

        var delta = new Date().getTime() - start;

        delta.should.be.above(999);
        delta.should.be.below(1100);
    });
});