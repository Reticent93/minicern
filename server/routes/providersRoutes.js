const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const providerUniversalController = createController('providers');

router.post('/', providerUniversalController.create);
router.get('/', providerUniversalController.getAll);
router.get('/:id', providerUniversalController.getById);
router.put('/:id', providerUniversalController.update);
router.delete('/:id', providerUniversalController.delete);

module.exports = router;
