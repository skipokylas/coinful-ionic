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
  charts$: Observable<any>;

  constructor(private socketService: SocketService) { }

  ionViewDidEnter() {
    this.coins$ = this.socketService.listen('cryptoupdated').pipe(
      map((response: any) => JSON.parse(response))
    );

    this.charts$ = this.socketService.listen('chartsupdated').pipe(
      map((response: any) => JSON.parse(response))
    );
  }

}
