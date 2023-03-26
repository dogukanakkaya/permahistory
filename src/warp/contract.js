class HistoryContract {
    constructor(state, action, input) {
        this.state = state;
        this.action = action;
        this.input = input;
    }

    addHistoryItem() {
        const { title, description, content } = this.input;

        if (typeof title !== 'string' || typeof description !== 'string' || typeof content !== 'string') {
            throw new Error('Invalid input: title, description, and content should be strings.');
        }

        const newItem = {
            id: this.state.history.length,
            title,
            description,
            content,
        };

        this.state.history.push(newItem);
        return this.state;
    }

    getHistory() {
        // const { start, limit } = this.input;

        return this.state.history;
    }

    getHistoryItem() {
        const { id } = this.input;

        if (typeof id !== 'number') {
            throw new Error('Invalid input: id should be a number.');
        }

        const item = this.state.history.find((item) => item.id === id);

        if (!item) {
            throw new Error('Item not found.');
        }

        return item;
    }
}

function handle(state, action) {
    const input = JSON.parse(action.input);
    const contract = new HistoryContract(state, action, input);

    if (action.method === 'addHistoryItem') {
        return contract.addHistoryItem();
    }

    if (action.method === 'getHistoryItem') {
        return contract.getHistoryItem();
    }

    throw new Error('Invalid method.');
}

export { handle };
