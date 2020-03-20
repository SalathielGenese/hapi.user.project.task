const { Tasks } = require( '../config/database/models' );



function getTasks(request, hapi )
{
    return Tasks.findAll();
}

createTask.method = 'POST';
function createTask(request, hapi )
{
    return hapi.response( datum ).code( 201 );
}

// userId, projectId
const datum = { name: 'Air Travel', description: 'Take the airplane to Johannesburg', score: 1, status: 'ACTIVE', declined: false, complete: false };



module.exports = {
    createTask,
    getTasks,
};
