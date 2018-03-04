const statusList = [
    {id: 0, name: 'On-site work'},
    {id: 1, name: 'Remote work'},
    {id: 2, name: 'Sickness'},
    {id: 3, name: 'Vacation'}
];

export async function getStatus() {
    await new Promise(res => setTimeout(res, 200));
    return statusList;
}