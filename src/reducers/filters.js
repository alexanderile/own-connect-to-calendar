export default (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return action.filters || {};
    }
    return state;
};