const { HOST, PORT } = require( './env' );
const { server } = require( './server' );
const logger = require( './logger' );



( async () =>
{
    await server.start();
    logger.debug( `Web server started at ${ HOST }:${ PORT }` );
})().catch( logger.error );
