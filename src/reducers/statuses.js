export default (state = [], action) => {
    switch (action.type) {
        case 'SET_STATUSES':
            return (action.statuses || []).map(u => ({value: u.id, label: u.name}));
    }
    return state;
};