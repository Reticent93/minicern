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





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}` );
})