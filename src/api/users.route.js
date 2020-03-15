function getUsers( request, hapi )
{
    return [ datum ];
}

createUser.method = 'POST';
function createUser( request, hapi )
{
    return hapi.response( datum ).code( 201 );
}

const datum = { email: 'john@doe.name', name: 'jon.doe', surname: 'John' };



module.exports = {
    createUser,
    getUsers,
};
