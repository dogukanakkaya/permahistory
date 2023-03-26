class HistoryContract {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    addHistoryItem() {
        const { title, description, content, tags } = this.action.input.history;

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
            tags
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
