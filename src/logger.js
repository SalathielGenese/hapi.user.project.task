const { APP_NAME } = require( './env' );
const debug = require( 'debug' );



/**
 *
 * Get a scoped logger
 *
 * @param { string } scope
 * @return { function( ...parameters: any[] ) }
 */
function getLogger( scope )
{
    return function ( ...parameters )
    {
        const [ , callee ] = new Error().stack.split( /\r?\n/ )[ 2 ].match( CALLEE_REGEX );

        debug( `${ APP_NAME }:${ callee }:${ scope }` )( ...parameters );
    };
}

const { INIT_CWD } = process.env;
const CALLEE_REGEX = new RegExp( `${ INIT_CWD.replace( /[-\[](){}:.]/g, '\\$1') }[\\/]\(.*\)\.js:\\d+:\\d+` );



module.exports = {
    debug: getLogger( 'debug' ),
    error: getLogger( 'error' ),
};
