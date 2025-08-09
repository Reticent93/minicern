const express = require('express');
const router = express.Router();
const createController = require('../utils/appointmentController');


router.post('/', createController.create);
router.get('/', createController.getAll);
router.get('/:id', createController.getById);
router.put('/:id', createController.update);
router.delete('/:id', createController.delete);

module.exports = router;
