import fs from "fs";
import { IEsploraApi } from "../api/bitcoin/esplora-api.interface";
import { IBitcoinApi } from "../api/bitcoin/bitcoin-api.interface";
import {extractHexStringFromASM} from "./blockchain";

export type ITag = {
  tags?: string[],
  name?: string
}

export type ITags = {[key: string]: ITag};



export const injectTagsIntoTransaction = (tx: IEsploraApi.Transaction, tags: ITags): IEsploraApi.Transaction => {
  tx.vout.forEach((vout) => {
    const tag = tags[vout.scriptpubkey_address ?? extractHexStringFromASM(vout.scriptpubkey_asm)];
    if (tag){
      vout.tag_data = tag;
    }
  })

  tx.vin.forEach((vin) => {
    if(!vin.prevout){ return; }

    const tag = tags[vin.prevout.scriptpubkey_address ?? extractHexStringFromASM(vin.prevout.scriptpubkey_asm)];
    if (tag){
      vin.prevout.tag_data = tag;
    }
  } )
  return tx;
}


export function injectTags<T extends Record<G, string | number>, G extends keyof T>(
  account: T,
  accountKey: G,
  tags: ITags
): T & { tag_data?: ITag } {
  const key = account[accountKey];
  const tag = tags[key];

  if (tag) {
    return { ...account, tag_data: tag};
  }

  return account;
}

export const getTags =  (): ITags => {
  try{
  const tags = fs.readFileSync("tags.json", "utf8");
  return JSON.parse(tags);
  }catch (e){
    return {};
  }
}