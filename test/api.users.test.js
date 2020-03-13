const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, describe, it } = lab;

describe( 'GET /users', () =>
{

    beforeEach( async () =>
    {
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

    beforeEach( async () =>
    {
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
