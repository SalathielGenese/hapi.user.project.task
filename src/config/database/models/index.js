const logger = require( '../../../logger' );
const config = require( '../../database' );
const Sequelize = require( 'sequelize' );
const find = require( 'find' );



const sequelize = new Sequelize({
    logging: logger.debug,
    ...config,
});
const db = {};

find.fileSync( /\.js$/, __dirname )
    .filter( file => file !== __filename )
    .map( path => sequelize.import( path ) )
    .forEach( model => db[ model.name ] = model );
Object.keys( db )
    .map( name => db[ name ] )
    .filter( ({ associate }) => associate )
    .forEach( model => model.associate( db ) );

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
