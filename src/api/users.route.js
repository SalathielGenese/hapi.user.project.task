const { Users } = require( '../config/database/models' );
const { logError, toPlain } = require( '.' );
const logger = require( '../logger' );



function getUsers( request, hapi )
{
    return Users.findAll({
            raw: true,
        })
        .catch( logError( logger.debug ) );
}

createUser.method = 'POST';
function createUser( request, hapi )
{

    const {
        name,
        email,
        surname,
    } = request.payload;

    return Users.create({
        surname,
        email,
        name,
    })
    .then( toPlain )
    .then( content => hapi.response( content ).code( 201 ) )
    .catch( logError( logger.debug ) );
}



module.exports = {
    createUser,
    getUsers,
};
