const { sequelize, Projects, Users } = require( '../src/config/database/models' );
const { expect, server, uuid, lab } = require( '.' );



lab.describe( 'GET /projects', () =>
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

   lab.it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

   lab.it( 'responds with JSON body matching $[*].{ body: string }', async ({ context: { response } }) =>
    {
        const [ { body } ] = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

   lab.it( 'responds with JSON body matching $[*].{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

   lab.it( 'responds with JSON body matching $[*].{ declined: boolean }',async ({ context: { response } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

   lab.it( 'responds with JSON body matching $[*].{ completed: boolean }', async ({ context: { response } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.afterEach( async () =>
    {
        await server.stop();
    });

    lab.beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });

        const { id: assignerId } = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );

        await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        });
        await server.start();
        context.response = await server.inject({ method: 'GET', url: '/api/projects' });
    });

});

lab.describe( 'POST /projects', () =>
{

   lab.it( 'responds with HTTP 201', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

   lab.it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

   lab.it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

   lab.it( 'responds with JSON body matching $.{ body: string }', async ({ context: { response } }) =>
    {
        const { body } = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

   lab.it( 'responds with JSON body matching $.{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

   lab.it( 'responds with JSON body matching $.{ declined: boolean }', async ({ context: { response } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

   lab.it( 'responds with JSON body matching $.{ completed: boolean }', async ({ context: { response } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.afterEach( async () =>
    {
        await server.stop();
    });

    lab.beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });

        const { id: assignerId } = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );

        await server.start();
        context.response = await server.inject({
            payload: {
                status: 'INACTIVE',
                completed: false,
                declined: false,
                name: uuid(),
                body: uuid(),
                assignerId,
            },
            url: '/api/projects',
            method: 'POST',
        });
    });

});



module.exports = {
    lab,
};
