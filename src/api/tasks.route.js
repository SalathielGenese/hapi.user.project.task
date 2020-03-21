const { Tasks } = require( '../config/database/models' );
const { logError, toPlain } = require( '.' );
const logger = require( '../logger' );



function getTasks(request, hapi )
{
    return Tasks.findAll()
        .catch( logError( logger.debug ) );
}

createTask.method = 'POST';
function createTask(request, hapi )
{
    const {
        status = 'ACTIVE',
        completed = false,
        declined = false,
        description,
        projectId,
        score = 1,
        name,
    } = request.payload;

    return Tasks.create({
        description,
        projectId,
        completed,
        declined,
        status,
        score,
        name,
    })
    .then( toPlain )
    .then( content => hapi.response( content ).code( 201 ) )
    .catch( logError( logger.debug ) );
}



module.exports = {
    createTask,
    getTasks,
};
