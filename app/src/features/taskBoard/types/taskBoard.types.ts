export interface TaskBoardProps {
    columns: Array<TaskBoardColumn>;
}

export interface TaskBoardColumn {
    id: string | number;
    tasks: Array<TaskBoardTask>;
    title: string;
    updateColumn?: (id: string | number, title: string) => void;
    createTask?: (columnId: string | number) => void;
}

export interface TaskBoardTask {
    id: string | number;
    columnId: string | number;
    name: string;
}