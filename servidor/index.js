const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

// Create server, connect to DB
const app = express();
const port = process.env.PORT || 4000;
connectDb();

//Routes 
app.use(cors());
app.use('/api/images/', require('./routes/images'));

// Start server
app.listen(port, () => {
	console.log('Server is running on port 4000');
});