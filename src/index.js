const logger = require( './logger' );
const Hapi = require( '@hapi/hapi' );



( async () =>
{
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    logger.debug( 'Web server started at localhost:3000' );
})().catch( logger.error );
