import { ITag } from '../../utils/tags';

export type ISingleHolder = {
  address: string;
  balance: number;
  position: number;
  last_seen: number | string;
  tag?: string;
};
export type HolderResponse = {
  page: number;
  total: number;
  data: ISingleHolder[];
};

export type CirculatingSupplyResponse = {
  circulatingSupply: number;
};
