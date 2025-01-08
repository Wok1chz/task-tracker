import React, { useMemo, useRef, useState } from 'react';
import styles from './../TaskBoard.module.css'; // Импортируем стили
import Task from './Task';
import { TaskBoardColumnProps, TaskBoardTask } from '../types/taskBoard.types';
import {SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const StageColumn: React.FC<TaskBoardColumnProps> = ({ id, tasks, title, updateColumn, createTask }) => {

  const [editMode, setEditMode] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const newTaskValueRef = useRef<HTMLTextAreaElement>(null);

  const tasksIds = useMemo(() => {
    return tasks.map(tasks => tasks.id);
  }, [tasks]);

  const handleCreateTaskKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = event;
    
    if (key === 'Enter' && newTaskValue.trim()) {
      event.preventDefault();
      
      if (createTask) {
        createTask(id, newTaskValue.trim());
      }
      
      setNewTaskValue('');
      newTaskValueRef.current?.blur();
    }
  };

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
          <textarea 
            value={newTaskValue}
            ref={newTaskValueRef}
            placeholder='Добавить задачу'
            className={styles.textAreaTaskAdd}
            onChange={(event) => {
              setNewTaskValue(event.target.value)
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => handleCreateTaskKeyDown(event)}
          />
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
      </div>
  );
};

export default StageColumn;