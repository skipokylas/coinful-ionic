import { Observable, BehaviorSubject, from, interval, zip } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import axios from 'axios';
import { TInfo } from '../models/models';

export class Store {
    private coinsInfo: Array<any> = [];
    private chartsInfo: Array<any> = [];
    public coinsUpdated$ = new BehaviorSubject<boolean>(false);

    constructor(private url: string, private url2: string) {
        this.getInfo$(this.url).pipe(
            switchMap(
                (coinsInfoRes) => {
                    this.initData(coinsInfoRes, 'coinsInfo');
                    return this.getInfo$(this.url2);
                }
            ),
            first())
            .subscribe((chartsInfoRes) => {
                this.initData(chartsInfoRes, 'chartsInfo');
                this.runAutoUpdate();
            });
    }

    private runAutoUpdate(): void {
        zip(
            interval(150000).pipe(switchMap(() => this.getInfo$(this.url))),
            interval(150000).pipe(switchMap(() => this.getInfo$(this.url2)))
        ).subscribe((result => {
            this.initData(result[0], 'coinsInfo');
            this.initData(result[1], 'chartsInfo');
            this.coinsUpdated$.next(true);
        }))
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
