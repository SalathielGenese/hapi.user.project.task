const { sequelize, Projects, Tasks, Users } = require( '../src/config/database/models' );
const { expect, server, uuid, lab } = require( '.' );



lab.describe( 'GET /tasks', () =>
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

    lab.it( 'responds with JSON body matching $[*].{ id: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { id } ] = JSON.parse( response.payload );

        expect( id ).to.equals( task.id );
    });

    lab.it( 'responds with JSON body matching $[*].{ projectId: number }', async ({ context: { response } }) =>
    {
        const [ { projectId } ] = JSON.parse( response.payload );

        expect( projectId ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $[*].{ projectId: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { projectId } ] = JSON.parse( response.payload );

        expect( projectId ).to.equals( task.projectId );
    });

    lab.it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ name: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.equals( task.name );
    });

    lab.it( 'responds with JSON body matching $[*].{ description: string }', async ({ context: { response } }) =>
    {
        const [ { description } ] = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $[*].{ description: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { description } ] = JSON.parse( response.payload );

        expect( description ).to.equals( task.description );
    });

    lab.it( 'responds with JSON body matching $[*].{ score: number }', async ({ context: { response } }) =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $[*].{ score: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.equals( task.score );
    });

    lab.it( 'responds with JSON body matching $[*].{ score: number >= 1 }', async ({ context: { response } }) =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
    });

    lab.it( 'responds with JSON body matching $[*].{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    lab.it( 'responds with JSON body matching $[*].{ status: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.equals( task.status );
    });

    lab.it( 'responds with JSON body matching $[*].{ declined: boolean }', async ({ context: { response } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $[*].{ declined: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.equals( task.declined );
    });

    lab.it( 'responds with JSON body matching $[*].{ completed: boolean }', async ({ context: { response } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $[*].{ completed: database value }', async ({ context: { response, tasks: [ task ] } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.equals( task.completed );
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
        const { id: projectId } = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        });

        context.tasks = [ await Tasks.create({
            description: uuid(),
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            projectId,
        }) ];
        await server.start();
        context.response = await server.inject({ method: 'GET', url: '/api/tasks' });
    });

});

lab.describe( 'POST /tasks', () =>
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

    lab.it( 'responds with JSON body matching $.{ projectId: number }', async ({ context: { response } }) =>
    {
        const { projectId } = JSON.parse( response.payload );

        expect( projectId ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $.{ projectId: payload value }', async ({ context: { response, task } }) =>
    {
        const { projectId } = JSON.parse( response.payload );

        expect( projectId ).to.equals( task.projectId );
    });

    lab.it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ name: payload value }', async ({ context: { response, task } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.equals( task.name );
    });

    lab.it( 'responds with JSON body matching $.{ description: string }', async ({ context: { response } }) =>
    {
        const { description } = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    lab.it( 'responds with JSON body matching $.{ description: payload value }', async ({ context: { response, task } }) =>
    {
        const { description } = JSON.parse( response.payload );

        expect( description ).to.equals( task.description );
    });

    lab.it( 'responds with JSON body matching $.{ score: number }', async ({ context: { response } }) =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    lab.it( 'responds with JSON body matching $.{ score: payload value }', async ({ context: { response, task } }) =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.equals( task.score );
    });

    lab.it( 'responds with JSON body matching $.{ score: number >= 1 }', async ({ context: { response } }) =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
    });

    lab.it( 'responds with JSON body matching $.{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    lab.it( 'responds with JSON body matching $.{ status: payload value }', async ({ context: { response, task } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.equals( task.status );
    });

    lab.it( 'responds with JSON body matching $.{ declined: boolean }', async ({ context: { response } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $.{ declined: payload value }', async ({ context: { response, task } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.equals( task.declined );
    });

    lab.it( 'responds with JSON body matching $.{ completed: boolean }', async ({ context: { response } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    lab.it( 'responds with JSON body matching $.{ completed: payload value }', async ({ context: { response, task } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.equals( task.completed );
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
        const { id: projectId } = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        });

        context.task = {
            description: uuid(),
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            projectId,
            score: 2,
        };
        await server.start();
        context.response = await server.inject({
            payload: context.task,
            url: '/api/tasks',
            method: 'POST'
        });
    });

});



module.exports = {
    lab,
};
