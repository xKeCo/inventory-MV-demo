require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const provRoute = require('./routes/provRoute');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// User route 
app.use('/api/user', userRoute);

// User route 
app.use('/api/proveedor', provRoute);

app.listen(port, () => {
    console.log(`Sever up on port ${port}`);
});