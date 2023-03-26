import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
import { contractTxId } from './transaction.js';

const warp = WarpFactory.forMainnet().use(new DeployPlugin());

const keyfile = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyfile.json'), 'utf-8'));
const contract = warp.contract(contractTxId).connect(keyfile);

async function addHistoryItem(history) {
    const input = {
        function: 'addHistoryItem',
        history
    };

    const txId = await contract.writeInteraction(input);
    return txId;
}

addHistoryItem({ title: 'test', description: 'test', content: 'test' }).then(console.log);
