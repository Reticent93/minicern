const express = require('express');
const router = express.Router();
const createController = require('../utils/universalController');
const appointmentUniversalController = createController('appointments');

router.post('/', appointmentUniversalController.create);
router.get('/', appointmentUniversalController.getAll);
router.get('/:id', appointmentUniversalController.getById);
router.put('/:id', appointmentUniversalController.update);
router.delete('/:id', appointmentUniversalController.delete);

module.exports = router;
