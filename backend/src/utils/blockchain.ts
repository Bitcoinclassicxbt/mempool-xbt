import { IEsploraApi } from '../api/bitcoin/esplora-api.interface';
import { Transaction as BitcoinJsTransaction } from 'bitcoinjs-lib';

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
        0xffffffff,
        Buffer.from(input.scriptsig, 'hex')
      );
      return;
    }

    const txidBuffer = Buffer.from(input.txid, 'hex').reverse();
    const scriptSigBuffer = Buffer.from(input.scriptsig, 'hex');

    const vinIndex = transaction.addInput(
      txidBuffer,
      input.vout,
      input.sequence
    );

    transaction.ins[vinIndex].script = scriptSigBuffer;
  });

  tx.vout.forEach((output) => {
    const scriptPubKeyBuffer = Buffer.from(output.scriptpubkey, 'hex');
    const valueSatoshis = Math.round(output.value * 1e8);
    transaction.addOutput(scriptPubKeyBuffer, BigInt(valueSatoshis));
  });

  return transaction.toHex();
};
