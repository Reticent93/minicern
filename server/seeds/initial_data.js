/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('appointments').del();
  await knex('medications').del();
  await knex('insurances').del();
  await knex('providers').del();
  await knex('users').del();

  // Insert Users
  const [patient] = await knex('users')
      .insert({ name: 'Alice Patient', email: 'alice@example.com', role: 'patient' })
      .returning('*');

  const [provider] = await knex('providers')
      .insert({ name: 'Dr. Bob', specialty: 'Cardiology', phone: '555-1234', email: 'bob@hospital.com' })
      .returning('*');

  // Insert Insurance
  await knex('insurances').insert({
    company: 'Blue Shield',
    policy_number: 'BS123456',
    user_id: patient.id
  });

  // Insert Medication
  await knex('medications').insert({
    name: 'Atorvastatin',
    dosage: '10mg',
    frequency: 'Once daily',
    user_id: patient.id
  });

  // Insert Appointment
  await knex('appointments').insert({
    patient_id: patient.id,
    provider_id: provider.id,
    appointment_time: new Date('2025-08-10T10:00:00Z'),
    status: 'scheduled',
    notes: 'Routine checkup'
  });
};
