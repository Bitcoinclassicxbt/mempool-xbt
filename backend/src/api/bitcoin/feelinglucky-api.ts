export type HolderResponse = {
  page: number;
  total: number;
  data: Array<{
    address: string;
    balance: number;
    position: number;
    lastSeen: number;
  }>;
};

export type CirculatingSupplyResponse = {
  circulatingSupply: number;
};
