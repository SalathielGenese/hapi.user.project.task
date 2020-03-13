const { APP_NAME, APP_ROOT } = require( './env' );
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
        const [ , , calleeLineTarget ] = new Error().stack.split( LINE_END_REGEX );
        const [ goto ] = calleeLineTarget.match( GOTO_REGEX );
        const [ , target ] = goto.match( CALLEE_REGEX );

        debug( `${ APP_NAME }:${ target }:${ scope }` )( ...parameters );
    };
}

const LINE_END_REGEX = /\r?\n/;
const GOTO_REGEX = /(?:[A-Z]:)?(?:[\\/]|internal)[^\b\f\n\r\v]+\.js:\d+:\d+/g;
const CALLEE_REGEX = new RegExp( `(?:${ APP_ROOT.replace( /[-\[](){}:.]/g, '\\$1') }[\\/])?\(.*\)\.js:\\d+:\\d+` );



module.exports = {
    debug: getLogger( 'debug' ),
    error: getLogger( 'error' ),
};
