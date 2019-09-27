import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private dataService: DataService) { }

  ionViewDidEnter() {
    this.dataService.getCoins().subscribe(console.log);
  }

}
