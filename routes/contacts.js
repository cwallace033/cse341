const express = require('express');
const router = express.Router();

const myController = require('../controllers/contacts');

router.get('/', myController.getData);

router.get('/:id', myController.getDataById);

router.post('/', myController.createData);

router.put('/:id', myController.updateData);

router.delete('/:id', myController.deleteData);

module.exports = router;