import React from 'react';
import styles from './TaskBoard.module.css'; // Импортируем стили
import StageColumn from './components/StageColumn';
import { TaskBoardColumn, TaskBoardProps } from './types/taskBoard.types';

const TaskBoard: React.FC<TaskBoardProps> = ({ columns }) => {
  return (
    <div className={styles.board}>
      {columns.map((column: TaskBoardColumn) => (
        <StageColumn key={column.title} tasks={column.tasks} title={column.title} />
      ))}
    </div>
  );
};

export default TaskBoard;