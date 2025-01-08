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
        tasks: [],
        title: 'Column 1'
      },
      {
        id: 'guid2',
        tasks: [],
        title: 'Column 2'
      },
      {
        id: 'guid3',
        tasks: [],
        title: 'Column 3'
      },
      {
        id: 'guid4',
        tasks: [],
        title: 'Column 13'
      }
    ],
    initTasks: [
      {
        id: 'test1',
        name: "Поставить чайник",
        columnId: 'guid1'
      }
    ]
  };
  
  return (
    <div className="app-container">
      <Header username={username} />
      <div className="main-container">
        <Sidebar username={username} />
        <main className="main-content">
          <TaskBoard columns={data.columns} initTasks={data.initTasks}></TaskBoard>
        </main>
      </div>
    </div>
  );
}

export default App;
