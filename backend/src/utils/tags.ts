import fs from "fs";
import { IEsploraApi } from "../api/bitcoin/esplora-api.interface";
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

export const injectTagsIntoAddress = (account: IEsploraApi.Address, tags: ITags): IEsploraApi.Address => {
  const tag = tags[account.address];
  if (tag){
    account.tag_data = tag;
  }
  return account;
}

export const injectTagsIntoScriptHash = (account: IEsploraApi.ScriptHash, tags: ITags): IEsploraApi.ScriptHash => {
  const tag = tags[account.scripthash];
  if (tag){
    account.tag_data = tag;
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