'use strict';
const Sequelize = require( 'sequelize' );
const path = require( 'path' );
const fs = require( 'fs' );



const db = {};
const basename = path.basename( __filename );
const config = require(__dirname + '/../../database.js');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync( __dirname )
    .filter( file => !file.startsWith( '.' ) && file.endsWith( '.js' ) && !( file === basename ) )
    .forEach( file =>
    {
      const model = sequelize[ 'import' ]( path.join( __dirname, file ) );

      db[ model.name ] = model;
    });

Object.keys( db ).forEach( modelName =>
{
  if ( db[ modelName ].associate )
  {
    db[ modelName ].associate( db );
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
