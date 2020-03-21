function toPlain( model )
{
    return model.get({ plain: true });
}

function logError( logger )
{
    return error =>
    {
        logger( error );

        return Promise.reject( error );
    };
}



module.exports = {
    logError,
    toPlain,
};
