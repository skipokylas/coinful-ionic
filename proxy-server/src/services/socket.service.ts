import io from 'socket.io';
import { Server } from 'http';
import { Store } from './cache.service';

const store = new Store('https://api.nomics.com/v1/currencies/ticker?key=b297be749ce2b84de83d68336e851ad5');

const socket = (server: Server) => {
    const socketServer = io(server);

    socketServer.on('connection', (socket) => {
        let itemsNumber = 10;

        socket.emit('cryptoupdate', store.get(itemsNumber));

        store.coinsUpdated$.subscribe((status) => {
            if (status) {
                socket.emit('cryptoupdate', store.get(itemsNumber));
            }
        });

        socket.on('getmore', () => {
            itemsNumber += 10;
            socket.emit('cryptoupdate', store.get(itemsNumber));
        })
    });

    return socketServer;
}

export default socket;
