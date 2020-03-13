const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');



const lab = Lab.script();
const { afterEach, beforeEach, describe, it } = lab;

describe( 'Get /api', () =>
{

    it( 'responds with HTTP 200', async () =>
    {
        const response = await server.inject({ method: 'GET', url: '/api' });

        expect( response.statusCode ).to.equal( 200 );
    });

});



module.exports = {
    lab,
};
