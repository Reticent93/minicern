const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const useUniversalController = createController('users');

router.post('/', useUniversalController.create);
router.get('/', useUniversalController.getAll);
router.get('/:id', useUniversalController.getById);
router.put('/:id', useUniversalController.update);
router.delete('/:id', useUniversalController.delete);

module.exports = router;
