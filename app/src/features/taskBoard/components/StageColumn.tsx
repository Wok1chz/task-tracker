import React, { useMemo, useState } from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import Task from './Task';
import { TaskBoardColumn, TaskBoardTask } from '../types/taskBoard.types';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const StageColumn: React.FC<TaskBoardColumn> = ({ id, tasks, title, updateColumn, createTask }) => {

  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map(tasks => tasks.id);
  }, [tasks]);

  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: id,
      data: {
        type: "Column",
        column: {
          id: id,
          tasks: tasks,
          title: title
        },
      },
      disabled: editMode
    });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isDragging) {
    return <div 
      ref={setNodeRef} 
      style={style}
      className={styles.dragableColumn}
    ></div>
  }

  return (

      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={styles.column}
      >
        <div onClick={() => {
          setEditMode(true);
        }}>
          <h2 className={styles.columnTitle}>{!editMode && title}
          {editMode && 
          <input 
            value={title}
            onChange={(e) => {if (updateColumn) updateColumn(id, e.target.value)}}
            autoFocus 
            onBlur={() => {setEditMode(false)}}
            />}</h2>
        </div>
            <SortableContext items={tasksIds}>
              {tasks.map((task: TaskBoardTask) => (
                  <Task key={task?.id} 
                  name={task?.name} 
                  id={task?.id} 
                  columnId={task?.columnId}></Task>
              ))}
            </SortableContext>
        <div>
          <button
            onClick={() => {
              if(createTask) createTask(id);
            }}
          >Добавить задачу</button>
        </div>
      </div>
  );
};

export default StageColumn;