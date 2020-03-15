const { name: APP_NAME } = require( '../package' );



const {
    POSTGRES_DIALECT_OPTIONS = '{}',
    POSTGRES_DATABASE = 'database',
    POSTGRES_DIALECT = 'postgres',
    POSTGRES_USERNAME = 'root',
    POSTGRES_HOST = '0.0.0.0',
    POSTGRES_PASSWORD = null,
    POSTGRES_POST = 5432,

    DEBUG = `${ APP_NAME }:*`,
    INIT_CWD: APP_ROOT,
    HOST = '0.0.0.0',
    PORT = 3000,
} = process.env;

process.env.DEBUG = DEBUG;



module.exports = {
    POSTGRES_DIALECT_OPTIONS,
    POSTGRES_DATABASE,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DIALECT,
    POSTGRES_HOST,
    POSTGRES_POST,

    APP_NAME,
    APP_ROOT,
    PORT,
    HOST,
};
