import { MdDelete, MdEdit, MdSave, MdClose } from "react-icons/md";
import "./todo-item.css";
import { useState } from "react";

const ToDoItem = ({task, onEdit, onDelete, onToggleStateChange}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleSave = (editedTitle) => {
        setIsEditing(false);
        onEdit(editedTitle); //Pass the edited title to parent component.
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.title);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    return(
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <input type="checkbox" checked={task.completed} onChange={() => onToggleStateChange(task.id)} />
                    { isEditing ? (
                        <>
                            <input type="text" className="task-input" value={editedTitle} onChange={(event) => setEditedTitle(event.target.value)} />
                            <button className="button save-button" onClick={() => handleSave(editedTitle)}> <MdSave /> </button>
                            <button className="button cancel-button" onClick={() => handleCancel(task.id)}> <MdClose /> </button>
                        </>
                    ) : (
                        <>
                            <span className={`task-test ${task.completed ? 'completed-text' : ''}`}>{task.title}</span>
                            <button className="button edit-button" onClick={() => handleEdit(task.id)}> <MdEdit /> </button>
                            <button className="button delete-button" onClick={() => onDelete(task.id)}> <MdDelete /> </button>
                        </>
                    )}
                </div>
    )
};

export default ToDoItem;