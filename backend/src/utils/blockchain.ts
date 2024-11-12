import { IEsploraApi } from '../api/bitcoin/esplora-api.interface';

export const getRelevantUTXOSFromClosestIndex = (
  allUtxos: IEsploraApi.UTXO[],
  closestIndex: number,
  amount: number
): IEsploraApi.UTXO[] => {
  if (closestIndex === -1) {
    return [allUtxos[0]];
  }

  let totalRecoupedValue = 0n;
  let endIndex = closestIndex;
  while (totalRecoupedValue < BigInt(amount) && endIndex >= 0) {
    totalRecoupedValue += BigInt(allUtxos[endIndex].value);
    endIndex--;
  }

  if (totalRecoupedValue >= BigInt(amount)) {
    return allUtxos.slice(endIndex + 1, closestIndex + 1);
  }

  if (allUtxos[closestIndex + 1]) {
    return [allUtxos[closestIndex + 1]];
  }
  return [];
};
