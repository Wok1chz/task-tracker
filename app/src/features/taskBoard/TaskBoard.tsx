import React, { useState } from 'react';
import styles from './TaskBoard.module.css'; // Импортируем стили
import StageColumn from './components/StageColumn';
import { TaskBoardColumn, TaskBoardProps } from './types/taskBoard.types';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useAppSensors } from './hooks/useAppSensors';

const TaskBoard: React.FC<TaskBoardProps> = ({ columns }) => {
  const [taskColumns, setColumns] = useState<TaskBoardColumn[]>(columns);
  const [activeColumn, setActiveColumn] = useState<TaskBoardColumn | null>(null);

  const sensors = useAppSensors();
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && active.data.current?.type === 'Task') {

      if (active.data.current?.containerId !== over.data.current?.containerId) {
        const newContainerId = taskColumns.findIndex(item => {
          if (over.data.current?.type === 'Column') {
            return item.id === over.id;
          }
          return item.id === over.data.current?.containerId;
        });

        const oldContainerId = taskColumns.findIndex(item => {
          return item.id === active.data.current?.containerId;
        });

        const taskIndex = taskColumns[oldContainerId]?.tasks.findIndex(item => {
          return item.id === active.id;
        })

        console.log('ACTIVE:', active, 'OVER:', over)
        setColumns((prevColumns) => {
          const newColumns = [...prevColumns];
          newColumns[newContainerId]?.tasks.push(newColumns[oldContainerId]?.tasks[taskIndex]);
          newColumns[oldContainerId]?.tasks.splice(taskIndex, 1);

          return newColumns;
        });
      } else {
        const id = taskColumns.findIndex(item => {
          return item.id === active.data.current?.containerId;
        })

        const items = taskColumns[id]?.tasks;
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        setColumns((prevColumns) => {
          const newColumns = [...prevColumns];
          newColumns[id].tasks = arrayMove(items, oldIndex, newIndex);
      
          return newColumns;
        });
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id && active.data.current?.type === 'Task') {

          if (active.data.current?.containerId !== over.data.current?.containerId) {
            const newContainerId = taskColumns.findIndex(item => {
              if (over.data.current?.type === 'Column') {
                return item.id === over.id;
              }
              return item.id === over.data.current?.containerId;
            });

            const oldContainerId = taskColumns.findIndex(item => {
              return item.id === active.data.current?.containerId;
            });

            const taskIndex = taskColumns[oldContainerId]?.tasks.findIndex(item => {
              return item.id === active.id;
            })

            setColumns((prevColumns) => {
              const newColumns = [...prevColumns];
              newColumns[newContainerId]?.tasks.push(newColumns[oldContainerId]?.tasks[taskIndex]);
              newColumns[oldContainerId]?.tasks.splice(taskIndex, 1);

              return newColumns;
            });
          } else {
            const id = taskColumns.findIndex(item => {
              return item.id === active.data.current?.containerId;
            })
  
            const items = taskColumns[id]?.tasks;
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
  
            setColumns((prevColumns) => {
              const newColumns = [...prevColumns];
              newColumns[id].tasks = arrayMove(items, oldIndex, newIndex);
          
              return newColumns;
            });
          }
        }

        if (active.data.current?.type === 'Column') {
          if(over && active.id !== over.id) {
            setColumns(items => {
              const oldIndex = items.findIndex(item => item.id === active.id);
              const newIndex = items.findIndex(item => item.id === over.id);
              return arrayMove(items, oldIndex, newIndex);
            });
          }  
        }
  }
  

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data.current?.type === 'Column') {
      setActiveColumn(active.data.current.type);
      return;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.board}>
      <SortableContext 
        items={taskColumns}
      >
          {taskColumns.map((column: TaskBoardColumn) => (
            <StageColumn key={column.id} tasks={column.tasks} title={column.title} id={column.id}/>
          ))}
      </SortableContext>
      </div>
    </DndContext>
  );
};

export default TaskBoard;