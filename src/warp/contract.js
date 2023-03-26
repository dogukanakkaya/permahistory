class HistoryContract {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    addHistoryItem() {
        const { title, description, content } = this.action.input.history;

        if (typeof title !== 'string' || typeof content !== 'string') {
            throw new Error('Invalid input: title, description, and content should be strings.');
        }

        const item = {
            id: this.state.history.length,
            title,
            description,
            content
        };

        this.state.history.push(item);
    }
}

export function handle(state, action) {
    const contract = new HistoryContract(state, action);

    if (action.input.function === 'addHistoryItem') {
        contract.addHistoryItem();
    } else {
        throw new Error('Invalid function.');
    }

    return { state };
}
