const express = require('express');
const router = express.Router();

const myController = require('../controllers/contacts');

router.get('/', myController.getData);

router.get('/:id', myController.getDataById);

module.exports = router;