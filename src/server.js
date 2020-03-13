const { APP_ROOT, HOST, PORT } = require( './env' );
const logger = require( './logger' );
const Hapi = require( '@hapi/hapi' );
const find = require( 'find' );



const BASE_ROUTE_PATH = `${ APP_ROOT }/src`;
const server = Hapi.server({ port: PORT, host: HOST });

const METHODS = [ 'GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH' ];
const files = find.fileSync( /[\\/.]route\.js$/, BASE_ROUTE_PATH );

files
    .map( file => file.substr( BASE_ROUTE_PATH.length, file.length ) )
    .map(source => ({ source, path: source.replace( /[\\/]/g, '/' ).replace( /^(.*)[\\/.]route\.js$/, '$1' ) }) )
    .forEach( ({ path, source }) =>
    {
        const module = require( `${ BASE_ROUTE_PATH }${ source }` );

        'function' === typeof module
            ? registerRoute( module )
            : Object.keys( module )
                .filter( key => 'function' === typeof module[ key ])
                .map( key => module[ key ] )
                .forEach( handler => registerRoute( path, handler ) );
    });

/**
 *
 * @param { string } path
 * @param { function } handler
 */
function registerRoute( path, handler )
{
    const { method: _method = handler.name } = handler;
    const method = METHODS.includes( _method.toUpperCase() ) ? _method.toUpperCase() : 'GET';

    logger.debug( `${ method } "${ path }" (${ handler.name })` );
    server.route({
        handler,
        method,
        path,
    });
}



module.exports = {
    server,
};
