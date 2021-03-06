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
    const [ , , calleeStackTrace ] = new Error().stack.match( STACK_TRACE_REGEX );
    const callee = calleeStackTrace.replace( LOGGER_PREFIX_REGEX, '$2' );
    const trace = calleeStackTrace.replace( LOGGER_PREFIX_REGEX, '$3' );
    const logger = debug( `${ APP_NAME }:${ callee }:${ scope }` );

    return ( ...parameters ) => logger( `{${ trace }}`, ...parameters );
}

const APP_ROOT_REGEX = APP_ROOT.replace( /([\\/\[](){}*:+-]|\\.)/g, '\\$1' );
const LOGGER_PREFIX_REGEX = new RegExp( `(${ APP_ROOT_REGEX }[\\/])(.*)\\.js:(\\d+:\\d+)` )
const STACK_TRACE_REGEX = new RegExp( `(${ APP_ROOT_REGEX }|internal).*\\.js(:\\d+){2}`, 'gm' );



module.exports = {
    get debug()
    {
        return getLogger( 'debug' );
    },
    get error()
    {
        return getLogger( 'error' );
    },
};
