const knex = require('knex');
const knexConfig = require('./knexfile');


const env = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[env]);

// Export the database connection
module.exports = db;