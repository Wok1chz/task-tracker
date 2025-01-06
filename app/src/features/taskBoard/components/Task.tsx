import React from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'

interface TaskProps {
  id: number;
  containerId: string | number;
  name: string;
}

const Task: React.FC<TaskProps> = ({ id, name, containerId }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id, data: {
    type: 'Task',
    containerId: containerId
  }})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
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