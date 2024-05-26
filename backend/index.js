const express = require('express');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config(); // Import the dotenv module
const connectDB = require('./db');
const app = express();

// Middleware
app.use(cors()); // Use the cors middleware
app.use(express.json()); // Use the express.json middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Connect to MongoDB
connectDB();

// Import and use routes
const userRoutes = require('./routes/userRoute');
const propertyRoutes = require('./routes/propertyRoute');

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));