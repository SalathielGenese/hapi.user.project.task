const { sequelize, Projects, Tasks, Users } = require( '../src/config/database/models' );
const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const { v4: uuid } = require( 'uuid' );
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { beforeEach, afterEach, describe, it } = lab;

describe( 'GET /tasks', () =>
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

    it( 'responds with JSON body matching $[*].{ description: string }', async () =>
    {
        const [ { description } ] = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    it( 'responds with JSON body matching $[*].{ score: number }', async () =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    it( 'responds with JSON body matching $[*].{ score: number >= 1 }', async () =>
    {
        const [ { score } ] = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
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

    it( 'responds with JSON body matching $[*].{ completed: boolean }', async () =>
    {
        const [ { completed } ] = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
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

        const assigner = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );
        const project = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assigner,
        }).then( user => user.get({ plain: true }) );

        await Tasks.create({
            project,
            name: uuid(),
            declined: true,
            completed: false,
            status: 'ACTIVE',
            description: uuid(),
        });
        response = await server.inject({ method: 'GET', url: '/api/tasks' });
    });

});

describe( 'POST /tasks', () =>
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

    it( 'responds with JSON body matching $.{ description: string }', async () =>
    {
        const { description } = JSON.parse( response.payload );

        expect( description ).to.be.a.string();
    });

    it( 'responds with JSON body matching $.{ score: number }', async () =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.a.number();
    });

    it( 'responds with JSON body matching $.{ score: number >= 1 }', async () =>
    {
        const { score } = JSON.parse( response.payload );

        expect( score ).to.be.at.least( 1 );
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

    it( 'responds with JSON body matching $.{ completed: boolean }', async () =>
    {
        const { completed } = JSON.parse( response.payload );

        expect( completed ).to.be.a.boolean();
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

        const assigner = await Users.create({
            email: 'john@doe.name',
            surname: uuid(),
            name: uuid(),
        }).then( user => user.get({ plain: true }) );
        const { id: projectId } = await Projects.create({
            status: 'ACTIVE',
            completed: false,
            declined: true,
            name: uuid(),
            assigner,
        }).then( user => user.get({ plain: true }) );

        response = await server.inject({
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
