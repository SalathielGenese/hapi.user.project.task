const {
  POSTGRES_DIALECT_OPTIONS: options,
  POSTGRES_DATABASE: database,
  POSTGRES_USERNAME: username,
  POSTGRES_PASSWORD: passport,
  POSTGRES_DIALECT: dialect,
  POSTGRES_HOST: host,
  POSTGRES_POST: port,
} = require( '../env' );


module.exports = {
  host, port, dialect, database, username, passport,
  ...JSON.parse( options ),
};
