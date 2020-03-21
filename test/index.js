const { server } = require( '../src/server' );
const { expect } = require('@hapi/code');
const { v4: uuid } = require( 'uuid' );
const Lab = require('@hapi/lab');



function toPlain( model )
{
    return model.get({ plain: true });
}



module.exports = {
    toPlain,
    expect,
    server,
    uuid,
    get lab()
    {
        return Lab.script();
    },
};
