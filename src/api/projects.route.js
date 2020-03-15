function getProjects(request, hapi )
{
    return [ datum ];
}

createProject.method = 'POST';
function createProject(request, hapi )
{
    return hapi.response( datum ).code( 201 );
}

// userId
const datum = { name: 'COVID-19', body: 'Start in China and spread in Europe', status: 'ACTIVE', declined: false, complete: false };



module.exports = {
    createProject,
    getProjects,
};
