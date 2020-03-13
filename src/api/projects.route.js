function getProjects(request, hapi )
{
    // userId
    return [{ name: 'COVID-19', body: 'Start in China and spread in Europe', status: 'ACTIVE', declined: false, complete: false }];
}

createProject.method = 'POST';
function createProject(request, hapi )
{
    // userId
    return { name: 'COVID-19', body: 'Start in China and spread in Europe', status: 'ACTIVE', declined: false, complete: false };
}



module.exports = {
    createProject,
    getProjects,
};
