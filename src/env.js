const { name: APP_NAME } = require( '../package' );



process.env.DEBUG = process.env.DEBUG || `${ APP_NAME }:*`;

const {
    HOST = '0.0.0.0',
    PORT = 3000,
} = process.env;



module.exports = {
    APP_NAME,
    PORT,
    HOST,
};
