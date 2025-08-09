const db = require('../db')

const createUniversalController = (tableName) => {
    return {
        create: async (req, res) => {
            try {
                const [record] = await db(tableName).insert(req.body).returning('*');
                res.status(201).json(record);
            } catch (e) {
                res.status(500).json({ error: 'Error creating record', details: e.message });
            }
        },

        getAll: async (req, res) => {
            try {
                const records = await db(tableName).select('*');
                res.json(records);
            } catch (e) {
                res.status(500).json({ error: 'Error getting all records', details: e.message });
            }
        },

        getById: async (req, res) => {
            try {
             const record = await db(tableName).where({ id: req.params.id }).first();
             if(!record) {
                 res.status(404).json({error: 'No record found with id ' + req.params.id});
             }
             res.json(record);
            } catch (e) {
                res.status(500).json({ error: 'Error getting record by ID', details: e.message });
            }
        },

        update: async (req, res) => {
            try {
                const [record] = await db(tableName).where({ id: req.params.id }).update(req.body).returning('*');
                if (!record) return res.status(404).json({ error: 'Not found' });
                res.json(record);
            }catch (e) {
                res.status(500).json({ error: 'Error getting record by ID', details: e.message });
            }
        },

        delete: async (req, res) => {
            try {
                const deleted = await db(tableName).where({ id: req.params.id }).del();
                if(!deleted) return res.status(404).json({ error: 'Not found' });
                res.status(204).send();
            } catch (e) {
                res.status(500).json({ error: 'Error deleting record', details: e.message });
            }
        },
    }
}

module.exports = createUniversalController;