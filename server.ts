import express from 'express';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';

if (dev) {
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
    public players: (string | undefined)[] = Array(4).fill(undefined);

    constructor(host: string) {
        console.log(this.players);
        this.host = host;
    }
    join(id: string) {
        if (this.players.includes(id))
            return { num: this.players.indexOf(id) }

        const index = this.players.indexOf(undefined);
        if (index < 0)
            return { error: 'Room is full!' }

        this.players[index] = id;
        return { num: index };
    }
}

const rooms: Map<string, Room> = new Map();

io.on('connection', (socket) => {
    const id = Math.random().toString(36).substring(2, 15);
    let code: string | undefined;

    socket.on('room', (request, callback) => {
        if (code) return;

        function newCode() {
            return Math.random().toString(36).substring(2, 6);
        }

        code = newCode();
        while (rooms.has(code)) {
            code = newCode();
        }
        rooms.set(code, new Room(id));
        socket.join(code);

        console.log('Room ' + code + ' created');

        callback({ code, id });
    });

    socket.on('disconnect', () => {
        disconnectHost(code, id, socket);
        disconnectPlayer(code, id, socket);
    });

    socket.on('join', (request, callback) => {
        code = request.code;
        if (!code) return;

        let playerId = request.id ?? id;

        if (!rooms.has(code)) {
            callback({ error: 'Room does not exist!' });
            return;
        }

        const joinRes = rooms.get(code)!.join(playerId);
        io.to(code).emit('joined', joinRes);
        callback({ ...joinRes, id: playerId });
    });
});

server.listen(port, () => console.log('Server running on port ' + port));

function disconnectHost(code: string | undefined, id: string | undefined, socket: Socket) {
    if (!code || !id) return;

    const room = rooms.get(code);
    if (!room || room.host !== id) return;

    rooms.delete(code);
    socket.to(code).emit('closed');

    console.log('Room ' + code + ' closed');
}

function disconnectPlayer(code: string | undefined, id: string | undefined, socket: Socket) {
    if (!code || !id) return;

    const room = rooms.get(code);
    if (!room) return;

    const index = room.players.indexOf(id);
    if (index < 0) return;

    room.players[index] = undefined;
    socket.to(code).emit('left', { num: index });
}