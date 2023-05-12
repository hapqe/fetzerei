import express from 'express';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/', proxy({ target: 'http://game:4001/', changeOrigin: true }));

// app.use('/', (req, res) => { res.send('h World!'); });

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(4000, () => console.log('Server running on port 4000'));