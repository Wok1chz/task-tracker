import React from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { TaskBoardTask } from '../types/taskBoard.types';

type TaskProps = TaskBoardTask;
const Task: React.FC<TaskProps> = ({ id, name, columnId }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id, data: {
    type: 'Task',
    task: {
      id: id,
      columnId: columnId,
      name: name
    }
  }})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  if (isDragging) {
    return <div
      ref={setNodeRef}
      style={style}
      className={styles.dragableTask}
    >
    </div>
  }
  return (
    <div  
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles.task}
    >{name}</div>
  );
};

export default Task;