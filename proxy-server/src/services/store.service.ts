import { Observable, BehaviorSubject, from, interval } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import axios from 'axios';
import { TInfo } from '../models/models';

export class Store {
    private coinsInfo: Array<any> = [];
    private chartsInfo: Array<any> = [];
    public coinsUpdated$ = new BehaviorSubject<boolean>(false);
    public chartsUpdated$ = new BehaviorSubject<boolean>(false);

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
        interval(15000).pipe(switchMap(() => this.getInfo$(this.url)))
            .subscribe((coinsInfoRes) => {
                this.initData(coinsInfoRes, 'coinsInfo');
                this.coinsUpdated$.next(true);
            });

        interval(15000).pipe(switchMap(() => this.getInfo$(this.url2)))
            .subscribe((chartsInfoRes) => {
                this.initData(chartsInfoRes, 'chartsInfo');
                this.chartsUpdated$.next(true);
            });
    }

    private getInfo$(url: string): Observable<any> {
        return from(axios.get(url)).pipe(first(), map(res => res.data));
    }

    private initData(result: any[], resultName: TInfo): void {
        this[resultName] = result;
    }

    public getCoinsInfo(number: number): string {
        return JSON.stringify(this.coinsInfo.slice(0, number));
    }

    public getChartsInfo(number: number): string {
        const coinPortion = this.coinsInfo.slice(0, number).map((coin) => coin.id);
        return JSON.stringify(this.chartsInfo.filter((chartsItem: any) => coinPortion.includes(chartsItem.currency)));
    }
}
