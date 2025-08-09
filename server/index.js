const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Importing routes
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/providers', require('./routes/providersRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/insurances', require('./routes/insuranceRoutes'));





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}` );
})