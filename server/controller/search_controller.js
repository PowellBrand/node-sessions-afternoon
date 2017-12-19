const swag = require('../../server/models/swag');

// const catergory = ['hats', 'shirts', 'jackets', 'sweater', 'pants', 'shorts'];

module.exports = {
    search: (req, res, next) => {
        const { catergory } = req.query;
        //if the query is not a category in swag. Return a 200 status code and all of the swag.
        if(!catergory){
            res.status(200).send(swag);
        }else{
        //if the above does not execute, then look through the swag categories that I asked for.
            const searchedSwag = swag.filter(swag => swag.catergory === catergory)
            res.status(200).send(searchedSwag);
        }
    }
}

