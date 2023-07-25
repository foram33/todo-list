import { MdDelete } from "react-icons/md";
import "./todo-item.css";

const ToDoItem = ({task, onDelete, onToggleStateChange}) => {
    return(
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <input type="checkbox" checked={task.completed} onChange={() => onToggleStateChange(task.id)} />
                    <span className={`task-test ${task.completed ? 'completed-text' : ''}`}>{task.title}</span>
                    <button className="delete-button" onClick={() => onDelete(task.id)}> <MdDelete /> </button>
                </div>
    )
};

export default ToDoItem;