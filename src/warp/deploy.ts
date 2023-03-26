import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ArweaveSigner, DeployPlugin } from 'warp-contracts-plugin-deploy';
import { WarpFactory } from 'warp-contracts';

const warp = WarpFactory.forMainnet().use(new DeployPlugin());

!async function () {
    const keyfile = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyfile.json'), 'utf-8'));
    const contractSrc = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');

    const { contractTxId } = await warp.deploy({
        wallet: new ArweaveSigner(keyfile),
        initState: JSON.stringify({ history: [] }),
        src: contractSrc,
    });

    fs.writeFileSync(path.join(__dirname, './transaction.ts'), `export const contractTxId = '${contractTxId}';`);
}().catch(console.log);