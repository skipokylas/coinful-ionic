import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-coins',
  templateUrl: 'coins.page.html',
  styleUrls: ['coins.page.scss'],
})
export class HomePage {
  constructor(private dataService: DataService) { }

  ionViewDidEnter() {
    this.dataService.getCoins(['BTC', 'ETC', 'MIOTA']).subscribe(console.log);
  }

}
