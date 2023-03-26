class HistoryContract {
    constructor(state, action) {
        this.state = state;
        this.action = action;
    }

    addHistoryItem() {
        const { title, description, content, tags, visibility, createdBy, createdAt } = this.action.input.history;

        if (typeof title !== 'string') {
            throw new Error('Invalid input: title, description, and content should be strings.');
        }

        if (!['private', 'public'].includes(visibility)) {
            throw new Error('Invalid input: visibility should be private or public.');
        }

        if (typeof content !== 'object') {
            throw new Error('Invalid input: content should be an object.');
        }

        if (!Array.isArray(tags)) {
            throw new Error('Invalid input: tags should be an array of strings.');
        }

        const item = {
            id: this.state.id++,
            title,
            description,
            content,
            tags,
            visibility,
            createdBy,
            createdAt
        };

        this.state.history.push(item);

        return { state: this.state };
    }

    getHistory() {
        const query = this.action.input.query;

        let history = [...this.state.history];

        function filterFn(item, filterBy = {}) {
            if (filterBy.address && item.createdBy !== filterBy.address) {
                return false;
            }

            if (filterBy.visibility && !filterBy.visibility.includes(item.visibility)) {
                return false;
            }

            return true;
        }

        if (query.filterBy) {
            history = history.filter(item => filterFn(item, query.filterBy));
        }

        if (query.orderBy) {
            const { field, direction } = query.orderBy;

            history = history.sort((a, b) => {
                if (a[field] < b[field]) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (a[field] > b[field]) {
                    return direction === 'asc' ? 1 : -1;
                }

                return 0;
            });
        }

        if (query.start && query.end) {
            history = history.slice(query.start, query.end);
        }

        return {
            result: {
                history,
                total: this.state.history.length
            }
        };
    }

    getHistoryById() {
        const { id } = this.action.input.query;

        const item = this.state.history.find(item => item.id === parseInt(id));

        return {
            result: {
                item
            }
        };
    }
}

export function handle(state, action) {
    const contract = new HistoryContract(state, action);

    if (action.input.function === 'addHistoryItem') {
        return contract.addHistoryItem();
    } else if (action.input.function === 'getHistory') {
        return contract.getHistory();
    } else if (action.input.function === 'getHistoryById') {
        return contract.getHistoryById();
    } else if (action.input.function === 'evolve' && state.canEvolve) {
        if (SmartWeave.contract.owner !== action.caller) {
            throw new ContractError('Only the owner can evolve a contract.');
        }

        state.evolve = action.input.value;

        return { state };
    }

    throw new Error('Invalid function.');
}
