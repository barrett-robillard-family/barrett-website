const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`App listening on port:${PORT}`));