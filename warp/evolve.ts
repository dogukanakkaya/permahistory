import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { WarpFactory } from 'warp-contracts';
import { contractTxId } from './transaction.js';

const warp = WarpFactory.forMainnet().use(new DeployPlugin());

!async function () {
    const keyfile = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyfile.json'), 'utf-8'));
    const contractSrc = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');

    const src = await warp.createSource({ src: contractSrc }, new ArweaveSigner(keyfile));
    const savedSrc = await warp.saveSource(src);
    const contract = warp.contract(contractTxId).connect(keyfile);
    await contract.evolve(savedSrc);
}().catch(console.log);