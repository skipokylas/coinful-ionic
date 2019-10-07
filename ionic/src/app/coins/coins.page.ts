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
  coins$: Observable<any>;

  constructor(private coinService: CoinService, private socketService: SocketService) {
    this.coins$ = this.socketService.listen('cryptoupdate').pipe(
      map((response: any) => JSON.parse(response))
    );
  }

  ionViewDidEnter() {
    // this.coins$ = this.coinService.getCoins();
  }

}
