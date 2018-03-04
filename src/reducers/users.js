export default (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS':
            return (action.users || []).map(u => ({value: u.id, label: u.name}));
    }
    return state;
};