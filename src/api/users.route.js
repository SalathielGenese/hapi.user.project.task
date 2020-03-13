function getUsers( request, hapi )
{
    return [{ email: 'john@doe.name', name: 'jon.doe', surname: 'John' }];
}

createUser.method = 'POST';
function createUser( request, hapi )
{
    return { email: 'john@doe.name', name: 'jon.doe', surname: 'John' };
}



module.exports = {
    createUser,
    getUsers,
};
