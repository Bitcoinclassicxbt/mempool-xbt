export type HolderResponse = {
  page: number;
  total: number;
  data: Array<{
    address: string;
    balance: number;
    position: number;
    last_seen: number;
  }>;
};

export type CirculatingSupplyResponse = {
  circulatingSupply: number;
};
