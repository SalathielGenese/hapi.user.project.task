const { name: APP_NAME } = require( '../package' );



const {
    DEBUG = `${ APP_NAME }:*`,
    INIT_CWD: APP_ROOT,
    HOST = '0.0.0.0',
    PORT = 3000,
} = process.env;

process.env.DEBUG = DEBUG;



module.exports = {
    APP_NAME,
    APP_ROOT,
    PORT,
    HOST,
};
