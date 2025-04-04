import { query } from '../../utils/axios-query';
import priceUpdater, { PriceFeed, PriceHistory } from '../price-updater';

type CTime = number;
type COpen = number;
type CHigh = number;
type CLow = number;
type CClose = number;
type CVolume = number;

type Candle = [CTime, COpen, CHigh, CLow, CClose, CVolume];

type MCEXHistoricalDataResponse = {
  bars: Candle[];
};

class MecacexApi implements PriceFeed {
  public name: string = 'Mecacex';
  public currencies: string[] = ['USD'];

  public url: string =
    'https://mecacex.com/api/v2/trade/public/markets/xbtusdt/trades';
  public urlHist: string =
    'https://mecacex.com/api/v2/trade/public/markets/xbtusdt/k-line?period={GRANULARITY}';

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
        )) as MCEXHistoricalDataResponse
      )?.bars;

      const pricesRaw = response ? response : [];

      for (const price of pricesRaw as Candle[]) {
        const time = Math.round(price[0] / 1000);
        if (priceHistory[time] === undefined) {
          priceHistory[time] = priceUpdater.getEmptyPricesObj();
        }
        priceHistory[time][currency] = price[4];
      }
    }

    return priceHistory;
  }
}

export default MecacexApi;
