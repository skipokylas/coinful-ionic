import io from 'socket.io';
import { Server } from 'http';
import { Store } from './store.service';

const store = new Store(
    'https://api.nomics.com/v1/currencies/ticker?key=b297be749ce2b84de83d68336e851ad5&interval=1h,1d,7d,30d',
    'https://api.nomics.com/v1/currencies/sparkline?key=b297be749ce2b84de83d68336e851ad5&start=2019-10-08T10%3A59%3A59.999Z&end=2019-10-09T10%3A59%3A59.999Z'
);

const socket = (server: Server) => {
    const socketServer = io(server);

    socketServer.on('connection', (socket) => {
        let itemsNumber = 20;

        socket.emit('cryptoupdate', store.getCoinsInfo(itemsNumber));

        store.coinsUpdated$.subscribe((status) => {
            if (status) {
                socket.emit('cryptoupdate', store.getCoinsInfo(itemsNumber));
            }
        });

        store.chartsUpdated$.subscribe((status) => {
            if (status) {
                socket.emit('chartsupdate', store.getChartsInfo(itemsNumber));
            }
        });

        socket.on('getmore', () => {
            itemsNumber += 10;
            socket.emit('cryptoupdate', store.getCoinsInfo(itemsNumber));
        })
    });

    return socketServer;
}

export default socket;
