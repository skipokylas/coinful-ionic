import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result: any;
  constructor(private http: HttpClient) { }
  getCoins(coins): Observable<any> {
    let coinList = '';
    coinList = coins.join();
    return this.http
      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=USD`)
      .pipe(map(result => (this.result = result)));
  }
}
