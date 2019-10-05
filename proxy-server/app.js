
const cors = require('cors');
const morgan = require('morgan');
const rs = require('./request-options/request-options');
const cryptocurrencyRoutes = require('./routes/cryptocurrency.route');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('a user connected');
});

const cache = require('./cache');

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


module.exports = server;