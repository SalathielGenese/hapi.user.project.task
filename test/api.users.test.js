const { sequelize, Users } = require( '../src/config/database/models' );
const { expect, server, uuid, lab } = require( '.' );



lab.describe( 'GET /users', () =>
{

    lab.it( 'responds with HTTP 200', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 200 );
    });

    lab.it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    lab.it( 'responds with JSON body array', async ({ context: { response } }) =>
    {
        expect( JSON.parse( response.payload ) ).to.be.array();
    });

    lab.it( 'responds with JSON body matching $[*].{ id: number }', async ({ context: { response } }) =>
    {
        const [ { id } ] = JSON.parse( response.payload );

        expect( id ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $[*].{ id: database value }', async ({ context: { response, users: [ user ] } }) =>
    {
        const [ { id } ] = JSON.parse( response.payload );

        expect( id ).to.equals( user.id );
    });

    lab.it( 'responds with JSON body matching $[*].{ surname: string }', async ({ context: { response } }) =>
    {
        const [ { surname } ] = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ surname: database value }', async ({ context: { response, users: [ user ] } }) =>
    {
        const [ { surname } ] = JSON.parse( response.payload );

        expect( surname ).to.equals( user.surname );
    });

    lab.it( 'responds with JSON body matching $[*].{ email: string }', async ({ context: { response } }) =>
    {
        const [ { email } ] = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ email: database value }', async ({ context: { response, users: [ user ] } }) =>
    {
        const [ { email } ] = JSON.parse( response.payload );

        expect( email ).to.equals( user.email );
    });

    lab.it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ name: database value }', async ({ context: { response, users: [ user ] } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.equals( user.name );
    });

    lab.afterEach( async () =>
    {
        await server.stop();
    });

    lab.beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });
        context.users = [ await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }) ];
        await server.start();
        context.response = await server.inject({ method: 'GET', url: '/api/users' });
    });

});

lab.describe( 'POST /users', () =>
{

    lab.it( 'responds with HTTP 201', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    lab.it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    lab.it( 'responds with JSON body matching $.{ id: number }', async ({ context: { response } }) =>
    {
        const { id } = JSON.parse( response.payload );

        expect( id ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $.{ surname: string }', async ({ context: { response } }) =>
    {
        const { surname } = JSON.parse( response.payload );

        expect( surname ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ surname: payload value }', async ({ context: { response, user } }) =>
    {
        const { surname } = JSON.parse( response.payload );

        expect( surname ).to.equals( user.surname );
    });

    lab.it( 'responds with JSON body matching $.{ email: string }', async ({ context: { response } }) =>
    {
        const { email } = JSON.parse( response.payload );

        expect( email ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ email: payload value }', async ({ context: { response, user } }) =>
    {
        const { email } = JSON.parse( response.payload );

        expect( email ).to.equals( user.email );
    });

    lab.it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ name: payload value }', async ({ context: { response, user } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.equals( user.name );
    });

    lab.afterEach( async () =>
    {
        await server.stop();
    });

    lab.beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });
        context.user = {
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        };
        await server.start();
        context.response = await server.inject({
            payload: context.user,
            url: '/api/users',
            method: 'POST',
        });
    });

});



module.exports = {
    lab,
};
