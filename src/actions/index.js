export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        users
    };
};

export const setStatuses = (statuses) => {
    return {
        type: 'SET_STATUSES',
        statuses
    };
};

export const setFilters = (filters) => {
    return {
        type: 'SET_FILTERS',
        filters
    };
};