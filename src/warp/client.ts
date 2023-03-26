import { smartweave} from 'smartweave';

// Replace this with the contract's deployed address
const contractAddress = 'CONTRACT_ADDRESS';


async function addHistoryItem(history: any) {
    const input = {
        method: 'addHistoryItem',
        ...history
    };

    const txId = await smartweave.interactWrite(contractAddress, input);
    return txId;
}

async function getHistoryItem(id) {
    const input = {
        method: 'getHistoryItem',
        id,
    };

    const result = await smartweave.interactRead(contractAddress, input);
    return result;
}