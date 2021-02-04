const express = require('express');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/seed', require('./routes/seed'));

app.use((req, res) => { // catches all non used urls
    res.status(404).json({
        success: false,
        msg: 'Url Not Found',
        data: {},
    })
});

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`App listening on port:${PORT}`));