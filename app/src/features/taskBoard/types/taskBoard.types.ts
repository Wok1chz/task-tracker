export interface TaskBoardProps {
    columns: Array<TaskBoardColumn>;
}

export interface TaskBoardColumn {
    id: string | number;
    tasks: Array<TaskBoardTask>;
    title: string;
}

export interface TaskBoardTask {
    id: number;
    name: string;
}