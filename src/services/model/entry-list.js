import moment from 'moment';

let entries = [
    {
        id: 0,
        status: 0,
        user: '1',
        startTime: '11:03',
        endTime: '12:31',
        date: '1995-12-25',
        description: 'Hello world'
    },
    {
        id: 1,
        status: 1,
        user: '0',
        startTime: '11:02',
        endTime: '13:31',
        date: '1996-12-25',
        description: 'Hello world'
    },
    {
        id: 2,
        status: 3,
        user: '1',
        startTime: '03:02',
        endTime: '23:31',
        date: '1996-12-25',
        description: 'Hello world'
    }
];

const isValid = (data) => {
    return [data.status, data.user, data.date].every(v => v !== undefined && v !== null) &&
        (data.allTime || (data.startTime && data.endTime));
} ;

export async function getEntries(page = 1, filters = {}) {
    await new Promise(res => setTimeout(res, 200));
    return entries
        .filter(entry => {
            const baseDate = moment(entry.date);

            if (filters.selectedUser && entry.user !== filters.selectedUser) {
                return false;
            }
            if (filters.startDate && baseDate.diff(filters.startDate) < 0) {
                return false;
            }
            if (filters.endDate && filters.endDate.diff(baseDate) < 0) {
                return false;
            }
            return true;
        })
        .slice((page - 1) * 10, (page - 1) * 10 + 10) || [];
}

export async function getEntry(id) {
    if (!id) {
        return {};
    }
    await new Promise(res => setTimeout(res, 200));
    if (!entries[id]) {
        throw new Error('404, entry not found');
    }
    return {...entries[id]};
}

export async function postEntry(data) {
    await new Promise(res => setTimeout(res, 200));
    data.id = entries.length;
    if (!isValid(data)) {
        throw new Error('Fields didn`t filled');
    }
    data.date = data.date.toISOString();
    entries = [...entries, data];
    return [...entries];
}

export async function patchEntry(data) {
    await new Promise(res => setTimeout(res, 1000));
    if (!isValid(data)) {
        throw new Error('Fields didn`t filled');
    }
    data.date = data.date.toISOString();
    Object.assign(entries[data.id], data);
    return [...entries];
}

export async function removeEntry(id) {
    await new Promise(res => setTimeout(res, 200));
    entries.splice(id, 1);
    return [...entries];
}