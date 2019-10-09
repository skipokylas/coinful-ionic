import { Observable, BehaviorSubject, from, interval } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import axios from 'axios';

export class Store {
    private coins = [];
    public coinsUpdated$ = new BehaviorSubject<boolean>(false);

    constructor(private url: string) {
        this.getCoinsInfo$().subscribe(this.initCoins.bind(this));
        this.runAutoUpdate();
    }

    private runAutoUpdate(): void {
        interval(100000).pipe(switchMap(() => this.getCoinsInfo$()))
            .subscribe(this.initCoins.bind(this));
    }

    private getCoinsInfo$(): Observable<any> {
        return from(axios.get(this.url)).pipe(
            take(1),
            map(res => res.data)
        )
    }

    private initCoins(result: any): void {
        this.coins = result;
        this.coinsUpdated$.next(true);
    }

    public get(number: number): string {
        return JSON.stringify(this.coins.slice(0, number));
    }
}
