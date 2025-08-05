const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const userUniversalController = createController('users');

router.post('/', userUniversalController.create);
router.get('/', userUniversalController.getAll);
router.get('/:id', userUniversalController.getById);
router.put('/:id', userUniversalController.update);
router.delete('/:id', userUniversalController.delete);

module.exports = router;
