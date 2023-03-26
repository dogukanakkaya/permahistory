class HistoryContract {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    addHistoryItem() {
        const { title, description, content, tags, createdBy, createdAt } = this.action.input.history;

        if (typeof title !== 'string' || typeof content !== 'string') {
            throw new Error('Invalid input: title, description, and content should be strings.');
        }

        if (!Array.isArray(tags)) {
            throw new Error('Invalid input: tags should be array of strings.');
        }

        const item = {
            id: this.state.history.length, // change this later
            title,
            description,
            content,
            tags,
            createdBy,
            createdAt
        };

        this.state.history.push(item);

        return { state: this.state };
    }

    getMyHistory() {
        const { address } = this.action.input.query;

        if (!address) {
            throw new Error('Invalid input: address required to query history.');
        }

        const result = this.state.history.filter(item => item.createdBy === address);

        return { result };
    }
}

export function handle(state, action) {
    const contract = new HistoryContract(state, action);

    if (action.input.function === 'addHistoryItem') {
        return contract.addHistoryItem();
    } else if (action.input.function === 'getMyHistory') {
        return contract.getMyHistory();
    }

    throw new Error('Invalid function.');
}
