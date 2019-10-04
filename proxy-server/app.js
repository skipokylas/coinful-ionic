const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rs = require('./request-options/request-options');
const cryptocurrencyRoutes = require('./routes/cryptocurrency.route');

const cache = require('./cache');

const app = express();

app.use(morgan('dev'));
app.use(cors());

cache.init(rs.listingsLatest);

app.use('/api/cryptocurrency', cryptocurrencyRoutes);

app.get('*', (req, res) => {
    res.json({
        statusCode: 404,
        error: "Not Found",
        message: "Not Found"
    })
});


module.exports = app;