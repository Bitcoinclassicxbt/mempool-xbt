import { IEsploraApi } from '../api/bitcoin/esplora-api.interface';
import { Transaction as BitcoinJsTransaction } from 'bitcoinjs-lib';
import crypto from 'crypto';

export function extractHexStringFromASM(script: string): string {
  // Remove all OP_* commands and trim any extra spaces
  return script.replace(/\bOP_\w+\b/g, '').trim();
}


export async function calcScriptHash(script: string): Promise<string> {
  // Validate the input is a valid hex string
  if (!/^[0-9a-fA-F]*$/.test(script) || script.length % 2 !== 0) {
    throw new Error('Script is not a valid hex string');
  }

  // Convert the script hex string to a Buffer
  const buf = Buffer.from(script, 'hex');

  // Perform SHA256 hashing
  const hash = crypto.createHash('sha256').update(buf).digest().reverse();

  // Convert the hash buffer to a hex string and return
  return hash.toString('hex');
}

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
