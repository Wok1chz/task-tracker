import React, { useMemo, useState } from 'react';
import styles from './TaskBoard.module.css'; // Импортируем стили
import StageColumn from './components/StageColumn';
import { TaskBoardColumn, TaskBoardProps, TaskBoardTask } from './types/taskBoard.types';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { useAppSensors } from './hooks/useAppSensors';
import { createPortal } from 'react-dom';
import Task from './components/Task';

const TaskBoard: React.FC<TaskBoardProps> = ({ columns }) => {
  const [taskColumns, setColumns] = useState<TaskBoardColumn[]>(columns);
  const [activeColumn, setActiveColumn] = useState<TaskBoardColumn | null>(null);
  const [tasks, setTasks] = useState<TaskBoardTask[]>([]);
  const [activeTask, setActiveTask] = useState<TaskBoardTask | null>(null);

  const columnsId = useMemo(() => taskColumns.map((col) => col.id), [taskColumns]);
  const sensors = useAppSensors();

  const handleDragStart = (event: DragStartEvent) => { 
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  const updateColumn = (id: string | number, title: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;
      return {...col, title};
    });

    setColumns(newColumns);
  }

  const createTask = (columnId: string | number) => {
    const newTask: TaskBoardTask = {
      id: uuidv4(),
      columnId: columnId,
      name: 'Generated Task'
    };

    setTasks([...tasks, newTask]);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId);
        const overIndex = tasks.findIndex(task => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(task => task.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className={styles.board}>
      <SortableContext 
        items={columnsId}
      >
          {taskColumns.map((column: TaskBoardColumn) => (
            <StageColumn 
              key={column.id} 
              tasks={tasks.filter(task => task.columnId === column.id)} 
              title={column.title} 
              id={column.id}
              updateColumn={updateColumn}
              createTask={createTask}
            />
          ))}
      </SortableContext>
      </div>

      {createPortal(<DragOverlay>
        {activeColumn && <StageColumn 
          tasks={activeColumn.tasks} 
          title={activeColumn.title} 
          id={activeColumn.id}
          updateColumn={updateColumn}
          createTask={createTask}
        /> }
        {
          activeTask && <Task 
            id={activeTask.id}
            columnId={activeTask.columnId}
            name={activeTask.name}
          />
        }
      </DragOverlay>, document.body)}
    </DndContext>
  );
};

export default TaskBoard;