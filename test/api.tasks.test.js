const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /tasks', () =>
{

    it( 'responds with HTTP 200', async () =>
    {
        expect( response.statusCode ).to.equal( 200 );
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'GET', url: '/api/tasks' });
    });

});

describe( 'POST /tasks', () =>
{

    it( 'responds with HTTP 201', async () =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'POST', url: '/api/tasks' });
    });

});



module.exports = {
    lab,
};
