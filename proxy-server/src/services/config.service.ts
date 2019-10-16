import moment from 'moment';

export const config = {
    coinsURL:()=> 'https://api.nomics.com/v1/currencies/ticker?key=b297be749ce2b84de83d68336e851ad5&interval=1h,1d,7d,30d',
    chartsURL: ()=>`https://api.nomics.com/v1/currencies/sparkline?key=b297be749ce2b84de83d68336e851ad5&start=${moment().subtract(1, 'days').toISOString()}&end=${moment().toISOString()}`
}