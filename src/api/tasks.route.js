function getTasks(request, hapi )
{
    // userId, projectId
    return [{ name: 'Air Travel', description: 'Take the airplane to Johannesburg', score: 1, status: 'ACTIVE', declined: false, complete: false }];
}

createTask.method = 'POST';
function createTask(request, hapi )
{
    // userId, projectId
    return { name: 'Air Travel', description: 'Take the airplane to Johannesburg', score: 1, status: 'ACTIVE', declined: false, complete: false };
}



module.exports = {
    createTask,
    getTasks,
};
