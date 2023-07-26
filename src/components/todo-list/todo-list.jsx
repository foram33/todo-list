import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import ToDoItem from "../todo-item/todo-item";
import './todo-list.css';

const ToDoList = () => {

    const [todoItem, setToDoItem] = useState([]);
    const [newTaskValue, setNewTaskValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setToDoItem(response.data);
        }
        catch(error) {
            console.error(error)
        };
    }

    const handleAddTask = async () => {
        if(newTaskValue.trim() !== '') {
            const newTask = {
                "userId": 1, 
                "id":newTaskValue.toLowerCase, 
                "title": newTaskValue, 
                "completed": false
            };
            try {  
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
                setToDoItem([...todoItem, response.data]);
                setNewTaskValue('');
            }
            catch(error) { 
                console.error(error) 
            };
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
            setToDoItem(todoItem.filter(task => task.id !== taskId))
        }
        catch(error) {
            console.error(error);
        }
    }

    return(
        <>
            <div className="input-container">
                <input type="text" name="newtask" className="task-input" value={newTaskValue} onChange={(event) => setNewTaskValue(event.target.value)} />
                <button className="add-button" onClick={handleAddTask}> <MdAdd /> </button>
            </div>
            <div className="task-list">
                {todoItem.map((task) => <ToDoItem
                    key={task.id}
                    task={task}
                    onDelete={() => handleDeleteTask(task.id)}
                    onToggleStateChange={(taskId) => setToDoItem(todoItem.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))} />
                )}
            </div>
        </>
    );

};

export default ToDoList;