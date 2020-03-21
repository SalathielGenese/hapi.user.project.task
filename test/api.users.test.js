const { sequelize, Users } = require( '../src/config/database/models' );
const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const { v4: uuid } = require( 'uuid' );
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /users', () =>
{

    it( 'responds with HTTP 200', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 200 );
    });

    it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body array', async ({ context: { response } }) =>
    {
        expect( JSON.parse( response.payload ) ).to.be.array();
    });

    it( 'responds with JSON body matching $[*].{ surname: string }', async ({ context: { response } }) =>
    {
        const [ { surname } ] = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ email: string }', async ({ context: { response } }) =>
    {
        const [ { email } ] = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });
        await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        });
        await server.start();
        context.response = await server.inject({ method: 'GET', url: '/api/users' });
    });

});

describe( 'POST /users', () =>
{

    it( 'responds with HTTP 201', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body matching $.{ surname: string }', async ({ context: { response } }) =>
    {
        const { surname } = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ email: string }', async ({ context: { response } }) =>
    {
        const { email } = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });
        await server.start();
        context.response = await server.inject({
            payload: {
                email: 'john@doe.name',
                surname: uuid(),
                name: uuid(),
            },
            url: '/api/users',
            method: 'POST',
        });
    });

});



module.exports = {
    lab,
};
