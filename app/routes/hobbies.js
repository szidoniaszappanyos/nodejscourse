'use strict'

const express = require('express')
const controller = require('../controllers/hobbies')
const router = express.Router();


router.get('/hobbiesById/:id', controller.findHobbiesById);

router.get('/hobbies/all', controller.findHobbiesMidd, controller.responseToJson("hobbies"));

router.get('/hobbies', controller.findHobbiesMiddWithFilter, controller.responseToJson("hobbies"));

router.post('/hobbies', controller.createHobbies)

router.delete('/hobbies', controller.deleteOne)


module.exports = router;