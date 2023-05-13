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
    const playerProxy = proxy({ target: 'http://player:4002', changeOrigin: true });
    const gameProxy = proxy({ target: 'http://game:4001', changeOrigin: true });

    app.use('/r/:room', proxy({ target: 'http://player:4002', changeOrigin: true }))
    app.use('/', proxy({ target: 'http://game:4001', changeOrigin: true }))
}
else {
    app.use('/room', express.static(path.join(__dirname, '/player/dist')));
    app.use('/assets', express.static(path.join(__dirname, '/player/dist/assets')));
    app.use('/', express.static(path.join(__dirname, '/game/dist')));
}

class Room {
    public host: string;
    public players: string[] = [];
    constructor(host: string) {
        this.host = host;
    }
}

const rooms: Map<string, Room> = new Map();

io.on('connection', (socket) => {
    const id = Math.random().toString(36).substring(2, 15);
    let code: string | undefined;

    socket.on('room', (request, callback) => {
        if(code) return;
        
        function newCode() {
            return Math.random().toString(36).substring(2, 6);
        }
        
        code = newCode();
        while(rooms.has(code)) {
            code = newCode();
        }
        rooms.set(code, new Room(id));
        socket.join(code);
        
        console.log('Room ' + code + ' created');

        callback({ code, id });
    });

    socket.on('disconnect', () => {
        if(!code) return;

        rooms.delete(code);
        socket.to(code).emit('closed');

        console.log('Room ' + code + ' closed');
    });

    socket.on('join', (request, callback) => {
        const { code } = request;
        if(rooms.has(code)) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
});

server.listen(port, () => console.log('Server running on port ' + port));