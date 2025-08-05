const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// Importing routes
app.use('/users', require('./routes/usersRoutes'));
app.use('/appointments', require('./routes/appointmentsRoutes'));
app.use('/providers', require('./routes/providersRoutes'));
app.use('/medications', require('./routes/medicationRoutes'));
app.use('/insurances', require('./routes/insuranceRoutes'));





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}` );
})