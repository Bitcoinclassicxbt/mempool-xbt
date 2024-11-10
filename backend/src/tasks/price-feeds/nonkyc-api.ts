import { query } from '../../utils/axios-query';
import priceUpdater, { PriceFeed, PriceHistory } from '../price-updater';

type Candle = {
  time: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
};

type NKYCHistoricalDataResponse = {
  bars: Candle[];
};

class NonkycApi implements PriceFeed {
  public name: string = 'NonKYC';
  public currencies: string[] = ['USD'];

  public url: string =
    'https://nonkyc.io/api/v2/market/tradehistory?symbol=LKY_USDT&limit=100';
  public urlHist: string =
    'https://api.nonkyc.io/api/v2/market/candles?symbol=LKY%2FUSDT&resolution={GRANULARITY}&countBack=10000000000000&firstDataRequest=1';

  constructor() {}

  public async $fetchPrice(currency): Promise<number> {
    const response = await query(this.url);
    if (response && response[0]) {
      return parseFloat(response[0].price);
    } else {
      return -1;
    }
  }

  public async $fetchRecentPrice(
    currencies: string[],
    type: 'hour' | 'day'
  ): Promise<PriceHistory> {
    const priceHistory: PriceHistory = {};

    for (const currency of currencies) {
      if (this.currencies.includes(currency) === false) {
        continue;
      }

      const response = (
        (await query(
          this.urlHist.replace('{GRANULARITY}', type === 'hour' ? '60' : '1440')
        )) as NKYCHistoricalDataResponse
      )?.bars;

      const pricesRaw = response ? response : [];

      for (const price of pricesRaw as Candle[]) {
        const time = Math.round(price.time / 1000);
        if (priceHistory[time] === undefined) {
          priceHistory[time] = priceUpdater.getEmptyPricesObj();
        }
        priceHistory[time][currency] = price.close;
      }
    }

    return priceHistory;
  }
}

export default NonkycApi;
