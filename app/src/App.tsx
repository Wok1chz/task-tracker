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
        tasks: [{
          name: 'Task'
        }, {
          name: 'Task 2'
        }, {
          name: 'Task 3'
        }],
        title: 'Column 1'
      },
      {
        tasks: [{
          name: 'Task'
        }, {
          name: 'Task 2'
        }, {
          name: 'Task 3'
        }],
        title: 'Column 2'
      },
      {
        tasks: [{
          name: 'Task'
        }, {
          name: 'Task 2'
        }, {
          name: 'Task 3'
        }],
        title: 'Column 3'
      },
      {
        tasks: [{
          name: 'Task'
        }, {
          name: 'Task 2'
        }, {
          name: 'Task 3'
        }],
        title: 'Column 4'
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
