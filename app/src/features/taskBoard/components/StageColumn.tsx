import React from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import Task from './Task';
import { TaskBoardColumn, TaskBoardTask } from '../types/taskBoard.types';

const StageColumn: React.FC<TaskBoardColumn> = ({ tasks, title }) => {
  return (
    <div className={styles.column}>
        <h2 className={styles.columnTitle}>{title}</h2>
        {tasks.map((task: TaskBoardTask) => (
            <Task key={task.name} name={task.name}></Task>
        ))}
    </div>
  );
};

export default StageColumn;