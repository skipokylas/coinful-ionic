import { Observable, BehaviorSubject, from, zip } from 'rxjs';
import { map, switchMap, first, delay, take } from 'rxjs/operators';
import axios from 'axios';
import { TInfo } from '../models/models';
import { config } from './config.service';

export class Store {
    private coinsInfo: Array<any> = [];
    private chartsInfo: Array<any> = [];
    public coinsUpdated$ = new BehaviorSubject<boolean>(false);

    private responseSubject = new BehaviorSubject<boolean>(true);

    constructor() {

        this.responseSubject.pipe(
            delay(100000),
            switchMap(() =>  zip(this.getInfo$(config.coinsURL()).pipe(take(500)),this.getInfo$(config.chartsURL())))
         ).subscribe((result) => {
            this.initData(result[0], 'coinsInfo');
            this.initData(result[1], 'chartsInfo');
            this.responseSubject.next(true);
            this.coinsUpdated$.next(true);
            console.log('geg!!', config.chartsURL())
        });
    }

    private getInfo$(url: string): Observable<any> {
        return from(axios.get(url)).pipe(first(), map(res => res.data));
    }

    private initData(result: any[], resultName: TInfo): void {
        this[resultName] = result;
    }

    public getCoinsInfo(number: number): string {
        const info = this.coinsInfo.slice(0, number).map((coin) => {
            coin.chart = this.chartsInfo.find((chartInfo) => chartInfo.currency === coin.id);
            return coin
        });

        return JSON.stringify(info);
    }
}
