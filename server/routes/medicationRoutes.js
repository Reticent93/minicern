const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const medicationUniversalController = createController('medications');

router.post('/', medicationUniversalController.create);
router.get('/', medicationUniversalController.getAll);
router.get('/:id', medicationUniversalController.getById);
router.put('/:id', medicationUniversalController.update);
router.delete('/:id', medicationUniversalController.delete);

module.exports = router;
