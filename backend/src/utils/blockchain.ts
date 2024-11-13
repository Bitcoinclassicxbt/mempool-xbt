import { IEsploraApi } from '../api/bitcoin/esplora-api.interface';
import { Transaction as BitcoinJsTransaction } from 'bitcoinjs-lib';

const INITIAL_SUBSIDY = 88n;
const HALVING_INTERVAL = 100000;

export const getCirculatingSupplyAtHeight = (height: number): bigint => {
  const n = Math.floor(height / HALVING_INTERVAL);
  const totalFromCompletedCycles =
    INITIAL_SUBSIDY *
    BigInt(HALVING_INTERVAL) *
    BigInt((1 - 1 / Math.pow(2, n)) / (1 - 1 / 2));
  const remainingBlocks = height - HALVING_INTERVAL * n;
  const currentSubsidy = INITIAL_SUBSIDY / BigInt(Math.pow(2, n));
  return totalFromCompletedCycles + BigInt(remainingBlocks) * currentSubsidy;
};

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

export const txJsonToHex = (tx: IEsploraApi.Transaction): string => {
  const transaction = new BitcoinJsTransaction();

  transaction.version = tx.version;
  transaction.locktime = tx.locktime;

  tx.vin.forEach((input) => {
    if (input.is_coinbase) {
      // Coinbase transactions dont have txid
      transaction.addInput(
        Buffer.alloc(32),
        0xffffffff,
        input.sequence,
        Buffer.from(input.scriptsig, 'hex')
      );
      return;
    }

    const txidBuffer = Buffer.from(input.txid, 'hex').reverse();
    const scriptSigBuffer = Buffer.from(input.scriptsig, 'hex');

    const vinIndex = transaction.addInput(
      txidBuffer,
      input.vout,
      input.sequence,
      Buffer.from(input.scriptsig, 'hex')
    );

    transaction.ins[vinIndex].script = scriptSigBuffer;
  });

  tx.vout.forEach((output) => {
    const scriptPubKeyBuffer = Buffer.from(output.scriptpubkey, 'hex');
    transaction.addOutput(scriptPubKeyBuffer, BigInt(output.value));
  });

  return transaction.toHex();
};
