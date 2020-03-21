const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const { v4: uuid } = require( 'uuid' );
const Lab = require('@hapi/lab');



module.exports = {
    expect,
    server,
    uuid,
    get lab()
    {
        return Lab.script();
    },
};
