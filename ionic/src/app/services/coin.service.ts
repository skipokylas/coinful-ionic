import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  result: any;
  constructor(private http: HttpClient) { }

  getCoins(): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/cryptocurrency/listings/latest');
  }
}
