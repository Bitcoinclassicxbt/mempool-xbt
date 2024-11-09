import { query } from '../../utils/axios-query';
import priceUpdater, { PriceFeed, PriceHistory } from '../price-updater';

class NonkycApi implements PriceFeed {
  public name: string = 'NonKYC';
  public currencies: string[] = ['USD'];

  public url: string =
    'https://nonkyc.io/api/v2/market/tradehistory?symbol=LKY_USDT&limit=100';
  public urlHist: string =
    'https://api.gemini.com/v2/candles/BTC{CURRENCY}/{GRANULARITY}';

  constructor() {}

  public async $fetchPrice(currency): Promise<number> {
    const response = await query(this.url + currency);
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
    return [];
  }
}

export default NonkycApi;
