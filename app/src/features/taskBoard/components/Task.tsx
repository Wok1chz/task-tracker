import React from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили

interface TaskProps {
  name: string;
}

const Task: React.FC<TaskProps> = ({ name }) => {
  return (
        <div className={styles.task}>{name}</div>
  );
};

export default Task;