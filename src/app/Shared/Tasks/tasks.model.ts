export type Task = {
    id: number,
    title: string,
    description: string,
    status: 'Done' | 'Pending',
    date: string,
    category: string
}