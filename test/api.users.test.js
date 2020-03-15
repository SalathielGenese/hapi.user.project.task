const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /users', () =>
{

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'GET', url: '/api/users' });
    });

    let response;

    it( 'responds with HTTP 200', async () =>
    {
        expect( response.statusCode ).to.equal( 200 );
    });

});

describe( 'POST /users', () =>
{

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'POST', url: '/api/users' });
    });

    let response;

    it( 'responds with HTTP 201', async () =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

});



module.exports = {
    lab,
};