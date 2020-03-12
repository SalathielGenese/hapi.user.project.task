const { HOST, PORT } = require( './env' );
const Hapi = require( '@hapi/hapi' );



const server = Hapi.server({ port: PORT, host: HOST });

server.route({
    method: 'GET',
    path: '/api',
    handler: ( request, h ) =>
    {
        return { a: 'Aa' };
    }
});



module.exports = {
    server,
};
