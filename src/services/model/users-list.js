const fakeUsers = [
    {id: '0', name: 'Иван Иванов'},
    {id: '1', name: 'Петр Петров'},
    {id: '2', name: 'Сидор Сидоров'}
];

export async function getUsers() {
    await new Promise(res => setTimeout(res, 200));
    return fakeUsers;
}