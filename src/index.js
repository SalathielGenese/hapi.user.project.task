const { sequelize } = require( './config/database/models' );
const { HOST, PORT } = require( './env' );
const { server } = require( './server' );
const logger = require( './logger' );



( async () =>
{
    await sequelize.authenticate({ retry: 10 });
    await sequelize.sync();
    await server.start();
    logger.debug( `Web server started at ${ HOST }:${ PORT }` );
})().catch( logger.error );
