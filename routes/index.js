const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.person);

module.exports = routes;