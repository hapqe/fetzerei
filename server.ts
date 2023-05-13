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
    app.use('/', proxy({ target: 'http://game:4001', changeOrigin: true }));
    // app.use('/', proxy({ target: 'http://player:4002', changeOrigin: true }));
}
else {
    app.use('/', express.static(path.join(__dirname, '/game/dist')));
}

const rooms: Map<string, string> = new Map();

io.on('connection', (socket) => {
    socket.on('room', (request, callback) => {
        const id = Math.random().toString(36).substring(2, 15);
        const code = Math.random().toString(36).substring(2, 6);
        rooms.set(id, code);
        socket.join(id);
        callback({ id, code });
    });

    socket.on('join', (request, callback) => {
        const { id, code } = request;
        if(rooms.has(id) && rooms.get(id) === code) {
            socket.join(id);
            callback(true);
        }
        else {
            callback(false);
        }
    });
});

server.listen(port, () => console.log('Server running on port ' + port));