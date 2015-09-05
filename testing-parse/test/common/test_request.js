import {getData} from '../../src/common/request';

describe('Request', () => {
    describe('getData', () => {
        let server;

        beforeEach(() => {
            server = sinon.fakeServer.create();
        });

        afterEach(() => {
            server.restore();
        });

        it('should return promise fulfilled with response', (done) => {
            let promise = getData('/test');
            let responseData = {
                prop: 'Testing',
                didRespond: true
            };

            server.requests[0].respond(
                200,
                {'Content-Type': 'application/json'},
                JSON.stringify(responseData)
            );

            promise.then((response) => {
                expect(response).to.deep.equal(responseData);
                done();
            });
        });

        it('should return promise rejected with error', (done) => {
            let promise = getData('/anotherTest');
            let responseData = {
                error: 'Something went wrong!'
            };

            server.requests[0].respond(
                500,
                {'Content-Type': 'application/json'},
                JSON.stringify(responseData)
            );

            promise.catch((response) => {
                expect(response).to.deep.equal(responseData);
                done();
            });
        });
    });
});
