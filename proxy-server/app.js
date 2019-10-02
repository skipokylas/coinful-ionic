
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cryptocurrencyRoutes = require('./routes/cryptocurrency.route');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/cryptocurrency', cryptocurrencyRoutes);

app.get('*', (req, res) => {
    res.json({
        statusCode: 404,
        error: "Not Found",
        message: "Not Found"
    })
});


module.exports = app;