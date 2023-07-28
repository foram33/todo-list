import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { fetchTasks, addTask, updateTask, deleteTask } from "../../apiService";
import ToDoItem from "../todo-item/todo-item";
import './todo-list.css';

const ToDoList = () => {

    const [todoItem, setToDoItem] = useState([]);
    const [newTaskValue, setNewTaskValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const tasks = await fetchTasks();
        const sortedTasks = tasks.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        setToDoItem(sortedTasks);
    }

    const handleAddTask = async () => {
        if(newTaskValue.trim() !== '') {
            const newTask = {
                "userId": 1, 
                "id":newTaskValue.toLowerCase, 
                "title": newTaskValue, 
                "completed": false
            }; 

            const newAddedTask = await addTask(newTask);
            if(newAddedTask) {
                setToDoItem([...todoItem, newAddedTask]);
                setNewTaskValue('');
            }
        }
    }

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        setToDoItem(todoItem.filter(task => task.id !== taskId))
    }

    const handleEditTask = async (taskId, newTitle) => {
        const updatedTasks = todoItem.map((task) => {
            if(task.id === taskId) {
                return { ...task, title: newTitle };
            }
            return task;
        })
        
        setToDoItem(updatedTasks);
        await updateTask(taskId, newTitle);
    }

    return(
        <>
            <div className="input-container">
                <input type="text" name="newtask" className="task-input" value={newTaskValue} onChange={(event) => setNewTaskValue(event.target.value)} placeholder="Add your new task" />
                <button className="add-button" onClick={handleAddTask}> <MdAdd /> </button>
            </div>
            <div className="task-list">
                {todoItem.map((task) => <ToDoItem
                    key={task.id}
                    task={task}
                    onEdit={(newTitle) => handleEditTask(task.id, newTitle)}
                    onDelete={() => handleDeleteTask(task.id)}
                    onToggleStateChange={(taskId) => setToDoItem(todoItem.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))} />
                )}
            </div>
        </>
    );

};

export default ToDoList;