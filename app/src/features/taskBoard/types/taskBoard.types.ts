export interface TaskBoardProps {
    columns: Array<TaskBoardColumnProps>;
    initTasks?: Array<TaskBoardTask>;
}

export type Id = string | number;


export interface TaskBoardColumnProps {
    id: Id;
    tasks: Array<TaskBoardTask>;
    title: string;
    updateColumn?: (id: Id, title: string) => void;
    createTask?: (columnId: Id, name: string) => void;
}

export interface TaskBoardTask {
    id: Id;
    columnId: Id;
    name: string;
}