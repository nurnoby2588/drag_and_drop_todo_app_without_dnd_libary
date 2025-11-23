export type Task = {
    id: string | number,
    content: string
}
export type Column = {
    name: string,
    items: Task[]
}
export type Columns = {
    [key: string]: Column
}
export type ColumnsStyles = {
    [key: string]: {
        header: string;
        border: string;
    };
}