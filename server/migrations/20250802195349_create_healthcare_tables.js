/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // USERS
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('role').notNullable(); // patient, provider, etc.
        table.timestamps(true, true);
    });

    // PROVIDERS
    await knex.schema.createTable('providers', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('specialty').notNullable();
        table.string('phone');
        table.string('email');
        table.timestamps(true, true);
    });

    // INSURANCES
    await knex.schema.createTable('insurances', (table) => {
        table.increments('id').primary();
        table.string('company').notNullable();
        table.string('policy_number').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    // MEDICATIONS
    await knex.schema.createTable('medications', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('dosage');
        table.string('frequency');
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    // APPOINTMENTS
    await knex.schema.createTable('appointments', (table) => {
        table.increments('id').primary();
        table.integer('patient_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('provider_id').unsigned().references('id').inTable('providers').onDelete('CASCADE');
        table.timestamp('appointment_time').notNullable();
        table.string('status').notNullable(); // scheduled, completed, canceled
        table.text('notes');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('appointments');
    await knex.schema.dropTableIfExists('medications');
    await knex.schema.dropTableIfExists('insurances');
    await knex.schema.dropTableIfExists('providers');
    await knex.schema.dropTableIfExists('users');
};
