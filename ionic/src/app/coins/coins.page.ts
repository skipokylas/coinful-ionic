import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coins',
  templateUrl: 'coins.page.html',
  styleUrls: ['coins.page.scss'],
})
export class CoinPage {

  coins$: Observable<any>;

  constructor(private socketService: SocketService) {
    this.coins$ = this.socketService.listen('cryptoupdated').pipe(
      map((response: any) => JSON.parse(response))
    )
  }

  ionViewDidEnter() {
    this.socketService.socket.emit('getcoins', null);
  }

  loadData(event) {
    setTimeout(() => {
      this.socketService.socket.emit('getmorecoins', null);
      event.target.complete();
    }, 500);
  }

}
