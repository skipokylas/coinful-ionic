import { Component } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-coins',
  templateUrl: 'coins.page.html',
  styleUrls: ['coins.page.scss'],
})
export class CoinPage {
  coins: any;

  constructor(private socketService: SocketService) { }

  ionViewDidEnter() {
    this.socketService.listen('cryptoupdated').pipe(
      map((response: any) => JSON.parse(response))
    ).subscribe((res => { console.log(res); this.coins = res;}));
  }

  loadData(event) {

    setTimeout(() => {
      this.socketService.socket.emit('getmore', null);
      event.target.complete();
    }, 500);
  }

}
