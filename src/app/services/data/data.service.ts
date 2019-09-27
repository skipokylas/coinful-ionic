import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result: any;
  constructor(private http: HttpClient) { }
  getCoins() {
    return this.http
      .get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
      .pipe(map(result => (this.result = result)));
  }
}
