import React, { useMemo, useState } from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import Task from './Task';
import { TaskBoardColumnProps, TaskBoardTask } from '../types/taskBoard.types';
import {SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const StageColumn: React.FC<TaskBoardColumnProps> = ({ id, tasks, title, updateColumn, createTask }) => {

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
        <div 
        className={styles.columnTitle}
          onClick={() => {
            setEditMode(true);
          }}
        >
          <h2>{!editMode && title}
          {editMode && 
          <input 
            value={title}
            onChange={(e) => {if (updateColumn) updateColumn(id, e.target.value)}}
            autoFocus 
            onBlur={() => {setEditMode(false)}}
            />}</h2>
        </div>
        <div className={styles.columnTitle}>
          <input 
            placeholder='Добавить задачу'
            className={styles.fullWidthInput}
          />
        </div>
            <SortableContext items={tasksIds}>
              {tasks.map((task: TaskBoardTask) => (
                <Task 
                  key={task?.id} 
                  name={task?.name} 
                  id={task?.id} 
                  columnId={task?.columnId}
                ></Task>
              ))}
            </SortableContext>
        {/* <div>
          <button
            onClick={() => {
              if(createTask) createTask(id);
            }}
          >Добавить задачу</button>
        </div> */}
      </div>
  );
};

export default StageColumn;