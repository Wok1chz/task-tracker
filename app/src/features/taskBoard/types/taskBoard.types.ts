export interface TaskBoardProps {
    columns: Array<TaskBoardColumn>;
}

export interface TaskBoardColumn {
    tasks: Array<TaskBoardTask>;
    title: string;
}

export interface TaskBoardTask {
    name: string;
}