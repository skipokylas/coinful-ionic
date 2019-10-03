import { Component } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coins',
  templateUrl: 'coins.page.html',
  styleUrls: ['coins.page.scss'],
})
export class CoinPage {
  coins$: Observable<any>;

  constructor(private coinService: CoinService) { }

  ionViewDidEnter() {
    this.coins$ = this.coinService.getCoins();
  }

}
