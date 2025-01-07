import './App.css';
import Header from './features/header/Header';
import Sidebar from './features/sidebar/Sidebar';
import TaskBoard from './features/taskBoard/TaskBoard';
import { TaskBoardProps } from './features/taskBoard/types/taskBoard.types';

const App: React.FC = () => {
  const username = 'User';
  const data: TaskBoardProps = {
    columns: [
      {
        id: 'guid1',
        tasks: [{
          id: 1,
          name: 'Task',
          columnId: 'guid1',
        }, {
          id: 2,
          name: 'Task 2',
          columnId: 'guid1',
        }, {
          id: 3,
          name: 'Task 3',
          columnId: 'guid1',
        }],
        title: 'Column 1'
      },
      {
        id: 'guid2',
        tasks: [{
          id: 4,
          name: 'Task 4',
          columnId: 'guid2',
        }, {
          id: 5,
          name: 'Task 5',
          columnId: 'guid2',
        }, {
          id: 6,
          name: 'Task 6',
          columnId: 'guid2',
        }],
        title: 'Column 2'
      },
      {
        id: 'guid3',
        tasks: [{
          id: 7,
          name: 'Task 7',
          columnId: 'guid3',
        }, {
          id: 8,
          name: 'Task 8',
          columnId: 'guid3',
        }, {
          id: 9,
          name: 'Task 9',
          columnId: 'guid3',
        }],
        title: 'Column 3'
      },
      {
        id: 'guid4',
        tasks: [{
          id: 10,
          name: 'Task 10',
          columnId: 'guid4',
        }, {
          id: 11,
          name: 'Task 11',
          columnId: 'guid4',
        }, {
          id: 12,
          name: 'Task 12',
          columnId: 'guid4',
        }],
        title: 'Column 13'
      }
    ]
  };
  
  return (
    <div className="app-container">
      <Header username={username} />
      <div className="main-container">
        <Sidebar username={username} />
        <main className="main-content">
          <TaskBoard columns={data.columns}></TaskBoard>
        </main>
      </div>
    </div>
  );
}

export default App;
