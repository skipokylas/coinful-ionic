import io from 'socket.io';
import { Server } from 'http';
import { Store } from './store.service';


const store = new Store();

const socket = (server: Server) => {
    const socketServer = io(server);

    socketServer.on('connection', (socket) => {
        let itemsNumber = 20;

        setTimeout(() => { socket.emit('cryptoupdated', store.getCoinsInfo(itemsNumber))}, 2000);

        store.coinsUpdated$.subscribe((status) => {
            if (status) {
                socket.emit('cryptoupdated', store.getCoinsInfo(itemsNumber));
            }
        });

        socket.on('getmore', () => {
            itemsNumber += 10;
            socket.emit('cryptoupdated', store.getCoinsInfo(itemsNumber));
        })
    });

    return socketServer;
}

export default socket;
