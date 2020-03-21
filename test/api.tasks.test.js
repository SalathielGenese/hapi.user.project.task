const { sequelize, Projects, Tasks, Users } = require( '../src/config/database/models' );
const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const { v4: uuid } = require( 'uuid' );
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /tasks', () =>
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

    it( 'responds with JSON body matching $[*].{ name: string }', async ({ context: { response } }) =>
    {
        const [ { name } ] = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ description: string }', async ({ context: { response } }) =>
    {
        const [ { description } ] = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ score: number }', async ({ context: { response } }) =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    it( 'responds with JSON body matching $[*].{ score: number >= 1 }', async ({ context: { response } }) =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
    });

    it( 'responds with JSON body matching $[*].{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const [ { status } ] = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    it( 'responds with JSON body matching $[*].{ declined: boolean }', async ({ context: { response } }) =>
    {
        const [ { declined } ] = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    it( 'responds with JSON body matching $[*].{ completed: boolean }', async ({ context: { response } }) =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });

        const { id: assignerId } = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );
        const { id: projectId } = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        }).then( user => user.get({ plain: true }) );

        await Tasks.create({
            description: uuid(),
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            projectId,
        });
        await server.start();
        context.response = await server.inject({ method: 'GET', url: '/api/tasks' });
    });

});

describe( 'POST /tasks', () =>
{

    it( 'responds with HTTP 201', async ({ context: { response } }) =>
    {
        expect( response.statusCode ).to.equal( 201 );
    });

    it( 'responds with JSON body', async ({ context: { response } }) =>
    {
        expect( () => JSON.parse( response.payload ) ).not.to.throw();
    });

    it( 'responds with JSON body matching $.{ name: string }', async ({ context: { response } }) =>
    {
        const { name } = JSON.parse( response.payload );

        expect( name ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ description: string }', async ({ context: { response } }) =>
    {
        const { description } = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ score: number }', async ({ context: { response } }) =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    it( 'responds with JSON body matching $.{ score: number >= 1 }', async ({ context: { response } }) =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
    });

    it( 'responds with JSON body matching $.{ status: "ACTIVE" | "INACTIVE" }', async ({ context: { response } }) =>
    {
        const { status } = JSON.parse( response.payload );

        expect( status ).to.satisfies( Array.prototype.includes.bind( [ "ACTIVE", "INACTIVE" ] ) );
    });

    it( 'responds with JSON body matching $.{ declined: boolean }', async ({ context: { response } }) =>
    {
        const { declined } = JSON.parse( response.payload );

        expect( declined ).to.be.a.boolean();
    });

    it( 'responds with JSON body matching $.{ completed: boolean }', async ({ context: { response } }) =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
    });

    afterEach( async () =>
    {
        await server.stop();
    });

    beforeEach( async ({ context }) =>
    {
        await sequelize.sync({ force: true });

        const { id: assignerId } = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );
        const { id: projectId } = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assignerId,
        }).then( user => user.get({ plain: true }) );

        await server.start();
        context.response = await server.inject({
            payload: {
                description: uuid(),
                status: 'ACTIVE',
                completed: false,
                declined: true,
                name: uuid(),
                projectId,
                score: 2,
            },
            url: '/api/tasks',
            method: 'POST'
        });
    });

});



module.exports = {
    lab,
};
