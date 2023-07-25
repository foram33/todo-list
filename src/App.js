import './App.css';
import ToDoList from './components/todo-list/todo-list';

function App() {
  return (
    <div className="app-container">
      <div className="header">Todo List</div>
      <ToDoList />
    </div>
  );
}

export default App;
