import { Component } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-coins',
  templateUrl: 'coins.page.html',
  styleUrls: ['coins.page.scss'],
})
export class CoinPage {
  coins$: Observable<any>;
  subject = webSocket('ws://localhost:5000/');
  constructor(private coinService: CoinService) { }

  ionViewDidEnter() {
    this.coins$ = this.coinService.getCoins();

    this.subject.subscribe(
      (message) => console.log(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
    this.subject.next({
      a: 3,
      isBroadcast: false
    });
  }

}
