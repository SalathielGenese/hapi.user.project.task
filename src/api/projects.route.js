const { Projects } = require( '../config/database/models' );
const { logError, toPlain } = require( '.' );
const logger = require( '../logger' );



function getProjects( request, hapi )
{
    return Projects.findAll()
        .catch( logError( logger.debug ) );;
}

createProject.method = 'POST';
function createProject(request, hapi )
{
    const {
        name,
        body = '',
        assignerId,
        declined = false,
        completed = false,
        status = 'ACTIVE',
    } = request.payload;

    return Projects.create({
        assignerId,
        completed,
        declined,
        status,
        body,
        name,
    })
    .then( toPlain )
    .then( content => hapi.response( content ).code( 201 ) )
    .catch( logError( logger.debug ) );
}



module.exports = {
    createProject,
    getProjects,
};
