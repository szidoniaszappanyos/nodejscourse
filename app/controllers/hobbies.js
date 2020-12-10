'use strict'

module.exports = {
    findHobbiesById: findHobbiesById,
    findHobbiesMidd: findHobbiesMidd,
    findHobbiesMiddWithFilter: findHobbiesMiddWithFilter,
    createHobbies: createHobbies,
    deleteOne: deleteOne,
    responseToJson: responseToJson

}
const hobby = require('../models/hobbies')

/*
POSTMAN EXAMPLE
{
    "name": "hiking",
    "hobby_type": "sports",
    "details": "{\"equipment_required\": true, \"costs_to_practice\": 0}",
    "practice_buddies": "[{\"name\": \"Alex\"}]"
}
*/
function createHobbies(req, res, next) {
    console.log("Creating hobby");

    const addUser = req.body;
    addUser.details = JSON.parse(addUser.details);
    addUser.practice_buddies = JSON.parse(addUser.practice_buddies);

    const h = new hobby(addUser);
    h.save(function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        console.log("Hobby saved", addUser);
        return res.json(result);
    });
}

function findHobbiesMidd(req, res, next) {
    console.log("Find hobbies midd");
    hobby.find(function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.hobbies = result;
        next();
    });
}

function findHobbiesMiddWithFilter(req, res, next) {
    console.log("Find hobbies midd with filter");
    console.log("If request query name was set => return filtered hobbies by name");
    console.log("If request query name was not set => return all hobbies");

    var filter = initNameFilter(req);
    hobby.find(filter, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);

        }
        req.resources.hobbies = result;
        next();
    });
}

function initNameFilter(req) {
    console.log(req.query);
    var filter = {};
    if (req.query.name !== undefined) {
        filter = {name: req.query.name};
    }
    return filter;
}

function findHobbiesById(req, res, next) {
    hobby.find({_id: req.params.id}, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("hobby by id", result);
        return res.json(result);
    });

}

function deleteOne(req, res, next) {
    hobby.deleteOne(req.body, function (err, result) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log("One hobby deleted", req.body);
        return res.json(result);
    });

}


function responseToJson(prop) {
    return function (req, res, next) {
        console.log(prop);
        res.send(req.resources[prop]);
    }
}