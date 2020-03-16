const { sequelize } = require( './config/database/models' );
const { HOST, PORT } = require( './env' );
const { server } = require( './server' );
const logger = require( './logger' );



( async () =>
{
    await server.start();
    await sequelize.authenticate({ retry: 10 });
    logger.debug( `Web server started at ${ HOST }:${ PORT }` );
})().catch( logger.error );
