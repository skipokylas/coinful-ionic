import io from 'socket.io';
import { Server } from 'http';
import { Store } from './store.service';


const store = new Store();

const socket = (server: Server) => {
    const socketServer = io(server);

    socketServer.on('connection', (socket) => {
        let itemsNumber = 20;

        store.coinsUpdated$.subscribe((status) => {
            if (status) {
                socket.emit('cryptoupdated', store.getCoinsInfo(itemsNumber));
            }
        });

        socket.on('getcoins', () => {
            socket.emit('cryptoupdated', store.getCoinsInfo());
        })

        socket.on('getmorecoins', () => {
            itemsNumber += 10;
            socket.emit('cryptoupdated', store.getCoinsInfo(itemsNumber));
        })
    });

    return socketServer;
}

export default socket;
