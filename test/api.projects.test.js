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

    lab.it( 'responds with JSON body matching $[*].{ id: number }', async ({ context: { response } }) =>
    {
        const [ { id } ] = JSON.parse( response.payload );

        expect( id ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $[*].{ id: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { id } ] = JSON.parse( response.payload );

        expect( id ).to.equals( project.id );
    });

    lab.it( 'responds with JSON body matching $[*].{ assignerId: number }', async ({ context: { response } }) =>
    {
        const [ { assignerId } ] = JSON.parse( response.payload );

        expect( assignerId ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $[*].{ assignerId: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { assignerId } ] = JSON.parse( response.payload );

        expect( assignerId ).to.equals( project.assignerId );
    });

    lab.it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ name: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.equals( project.name );
    });

    lab.it( 'responds with JSON body matching $[*].{ body: string }', async ({ context: { response } }) =>
    {
        const [ { body } ] = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ body: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { body } ] = JSON.parse( response.payload );

        expect( body ).to.equals( project.body );
    });

    lab.it( 'responds with JSON body matching $[*].{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    lab.it( 'responds with JSON body matching $[*].{ status: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.equals( project.status );
    });

    lab.it( 'responds with JSON body matching $[*].{ declined: boolean }',async ({ context: { response } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $[*].{ declined: database value }',async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.equals( project.declined );
    });

    lab.it( 'responds with JSON body matching $[*].{ completed: boolean }', async ({ context: { response } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $[*].{ completed: database value }', async ({ context: { response, projects: [ project ] } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.equals( project.completed );
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
        });

        context.projects = [ await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        }) ];
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

    lab.it( 'responds with JSON body matching $.{ id: number }', async ({ context: { response } }) =>
    {
        const { id } = JSON.parse( response.payload );

        expect( id ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $.{ assignerId: number }', async ({ context: { response } }) =>
    {
        const { assignerId } = JSON.parse( response.payload );

        expect( assignerId ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $.{ assignerId: payload value }', async ({ context: { response, project } }) =>
    {
        const { assignerId } = JSON.parse( response.payload );

        expect( assignerId ).to.equals( project.assignerId );
    });

    lab.it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ name: payload value }', async ({ context: { response, project } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.equals( project.name );
    });

    lab.it( 'responds with JSON body matching $.{ body: string }', async ({ context: { response } }) =>
    {
        const { body } = JSON.parse( response.payload );

        expect( body ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ body: payload value }', async ({ context: { response, project } }) =>
    {
        const { body } = JSON.parse( response.payload );

        expect( body ).to.equals( project.body );
    });

    lab.it( 'responds with JSON body matching $.{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    lab.it( 'responds with JSON body matching $.{ status: payload value }', async ({ context: { response, project } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.equals( project.status );
    });

    lab.it( 'responds with JSON body matching $.{ declined: boolean }', async ({ context: { response } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $.{ declined: payload value }', async ({ context: { response, project } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.equals( project.declined );
    });

    lab.it( 'responds with JSON body matching $.{ completed: boolean }', async ({ context: { response } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $.{ completed: payload value }', async ({ context: { response, project } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.equals( project.completed );
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
        });

        context.project = {
            status: 'INACTIVE',
            completed: false,
            declined: false,
            name: uuid(),
            body: uuid(),
            assignerId,
        };
        await server.start();
        context.response = await server.inject({
            payload: context.project,
            url: '/api/projects',
            method: 'POST',
        });
    });

});



module.exports = {
    lab,
};
