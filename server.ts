import express from 'express';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 4000;

const dev = process.env.NODE_ENV !== 'production';

if(dev) {
    app.use('/', proxy({ target: 'http://game:4001/', changeOrigin: true }));
}
else {
    app.use('/', express.static(path.join(__dirname, '/game/dist')));
}

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => console.log('Server running on port ' + port));