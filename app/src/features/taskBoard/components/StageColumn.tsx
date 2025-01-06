import React, { useState } from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import Task from './Task';
import { TaskBoardColumn, TaskBoardTask } from '../types/taskBoard.types';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const StageColumn: React.FC<TaskBoardColumn> = ({ id, tasks, title }) => {

  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({
      id: id,
      data: {
        type: "Column"
      }
    });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (

      <div ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={styles.column}
      >

          <h2 className={styles.columnTitle}>{title}</h2>
          <SortableContext
            items={tasks}
          >
            {tasks.map((task: TaskBoardTask) => (
                <Task key={task?.id} name={task?.name} id={task?.id} containerId={id}></Task> // TODO при БЕСКОНЕЧНОМ И ОЧЕНЬ БЫСТРОМ перетаскивании таски - возникает ошибка
            ))}
          </SortableContext>
      </div>
  );
};

export default StageColumn;