const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /users', () =>
{

    it( 'responds with HTTP 200', async () =>
    {
        expect( response.statusCode ).to.equal( 200 );
    });

    it( 'responds with JSON body', async () =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body array', async () =>
    {
        expect( JSON.parse( response.payload ) ).to.be.array();
    });

    it( 'responds with JSON body matching $[*].{ surname: string }', async () =>
    {
        const [ { surname } ] = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ email: string }', async () =>
    {
        const [ { email } ] = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ name: string }', async () =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'GET', url: '/api/users' });
    });

});

describe( 'POST /users', () =>
{

    it( 'responds with HTTP 201', async () =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    it( 'responds with JSON body', async () =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body matching $.{ surname: string }', async () =>
    {
        const { surname } = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ email: string }', async () =>
    {
        const { email } = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ name: string }', async () =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        response = await server.inject({ method: 'POST', url: '/api/users' });
    });

});



module.exports = {
    lab,
};
