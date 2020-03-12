const { HOST, PORT } = require( './env' );
const logger = require( './logger' );
const Hapi = require( '@hapi/hapi' );



( async () =>
{
    const server = Hapi.server({ port: PORT, host: HOST });

    await server.start();
    logger.debug( `Web server started at ${ HOST }:${ PORT }` );
})().catch( logger.error );
