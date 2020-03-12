const Hapi = require( '@hapi/hapi' );



( async () =>
{
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.start();
    console.log( 'Web server started at localhost:3000' );
})().then( console.error );
