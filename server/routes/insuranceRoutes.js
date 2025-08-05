const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const insuranceUniversalController = createController('insurances');

router.post('/', insuranceUniversalController.create);
router.get('/', insuranceUniversalController.getAll);
router.get('/:id', insuranceUniversalController.getById);
router.put('/:id', insuranceUniversalController.update);
router.delete('/:id', insuranceUniversalController.delete);

module.exports = router;
