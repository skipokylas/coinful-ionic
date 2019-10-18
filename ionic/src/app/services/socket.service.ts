import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SocketService {
    socket: any;
    constructor() {
        this.socket = io('http://localhost:3000');
    }

    listen(eventName: string): Observable<any> {
        return new Observable(subscriber => {
            this.socket.on(eventName, data => {
                subscriber.next(data);
            });
        });
    }
}
