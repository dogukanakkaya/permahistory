import { WarpFactory } from 'warp-contracts';
import { contractTxId } from './transaction';

const warp = WarpFactory.forMainnet();
export const contract = warp.contract(contractTxId).connect('use_wallet');