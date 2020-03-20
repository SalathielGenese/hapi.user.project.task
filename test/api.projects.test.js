const { sequelize } = require( '../src/config/database/models' );
const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /projects', () =>
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

    it( 'responds with JSON body matching $[*].{ name: string }', async () =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ body: string }', async () =>
    {
        const [ { body } ] = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ status: "ACTIVE" | "INACTIVE" }', async () =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    it( 'responds with JSON body matching $[*].{ declined: boolean }', async () =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    it( 'responds with JSON body matching $[*].{ complete: boolean }', async () =>
    {
        const [ { complete } ] = JSON.parse( response.payload );

        expect( complete ).to.be.a.boolean();
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        await sequelize.sync({ force: true });
        response = await server.inject({ method: 'GET', url: '/api/projects' });
    });

});

describe( 'POST /projects', () =>
{

    it( 'responds with HTTP 201', async () =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    it( 'responds with JSON body', async () =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body matching $.{ name: string }', async () =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ body: string }', async () =>
    {
        const { body } = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ status: "ACTIVE" | "INACTIVE" }', async () =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    it( 'responds with JSON body matching $.{ declined: boolean }', async () =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    it( 'responds with JSON body matching $.{ complete: boolean }', async () =>
    {
        const { complete } = JSON.parse( response.payload );

        expect( complete ).to.be.a.boolean();
    });

    let response;

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async () =>
    {
        await server.start();
        await sequelize.sync({ force: true });
        response = await server.inject({ method: 'POST', url: '/api/projects' });
    });

});



module.exports = {
    lab,
};
