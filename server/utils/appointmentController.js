// controllers/appointmentsController.js
const db = require('../db');
const createUniversalController = require('./universalController');

// Get the base controller
const baseController = createUniversalController('appointments');

// Create custom appointments controller that extends the base
const appointmentsController = {
    // Use all base methods
    ...baseController,

    // Override getAll to include joined data
    getAll: async (req, res) => {
        try {
            const records = await db('appointments')
                .select([
                    'appointments.*',
                    'users.name as patient_name',
                    'users.email as patient_email',
                    'providers.name as provider_name',
                    'providers.specialty as provider_specialty'
                ])
                .leftJoin('users', 'appointments.patient_id', 'users.id')
                .leftJoin('providers', 'appointments.provider_id', 'providers.id');

            res.json(records);
        } catch (e) {
            res.status(500).json({ error: 'Error getting appointments', details: e.message });
        }
    },

    // Override getById to include joined data
    getById: async (req, res) => {
        try {
            const record = await db('appointments')
                .select([
                    'appointments.*',
                    'users.name as patient_name',
                    'users.email as patient_email',
                    'providers.name as provider_name',
                    'providers.specialty as provider_specialty'
                ])
                .leftJoin('users', 'appointments.patient_id', 'users.id')
                .leftJoin('providers', 'appointments.provider_id', 'providers.id')
                .where('appointments.id', req.params.id)
                .first();

            if (!record) {
                return res.status(404).json({ error: 'No appointment found with id ' + req.params.id });
            }
            res.json(record);
        } catch (e) {
            res.status(500).json({ error: 'Error getting appointment by ID', details: e.message });
        }
    },

    // Override create to return joined data after creation
    create: async (req, res) => {
        try {
            const [appointmentId] = await db('appointments').insert(req.body).returning('id');

            // Fetch the complete appointment with joined data
            const record = await db('appointments')
                .select([
                    'appointments.*',
                    'users.name as patient_name',
                    'users.email as patient_email',
                    'providers.name as provider_name',
                    'providers.specialty as provider_specialty'
                ])
                .leftJoin('users', 'appointments.patient_id', 'users.id')
                .leftJoin('providers', 'appointments.provider_id', 'providers.id')
                .where('appointments.id', appointmentId)
                .first();

            res.status(201).json(record);
        } catch (e) {
            res.status(500).json({ error: 'Error creating appointment', details: e.message });
        }
    }
};

module.exports = appointmentsController;