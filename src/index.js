const { HOST, PORT } = require( './env' );
const logger = require( './logger' );
const Hapi = require( '@hapi/hapi' );



( async () =>
{
    const server = Hapi.server({ port: PORT, host: HOST });

    server.route({
        method: 'GET',
        path: '/api',
        handler: ( request, h ) =>
        {
            return { a: 'Aa' };
        }
    });

    await server.start();
    logger.debug( `Web server started at ${ HOST }:${ PORT }` );
})().catch( logger.error );
