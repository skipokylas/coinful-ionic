import cors from 'cors';
import morgan from 'morgan';
import socket from './services/socket.service'
import express from 'express';
import * as http from 'http';

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

socket(server);

app.use(morgan('dev'));
app.use(cors());

app.get('*', (req, res) => {
    res.json({
        statusCode: 404,
        error: "Not Found",
        message: "Not Found"
    })
});

server.listen(port, () => console.log(`Server has been started on ${port}`));
