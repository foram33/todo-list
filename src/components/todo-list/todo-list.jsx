import React, { useEffect, useState } from "react";
import axios from "axios";
import ToDoItem from "../todo-item/todo-item";

const ToDoList = () => {

    const [todoItem, setToDoItem] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            setToDoItem(response.data);
        })
        .catch(error => console.error(error));
    }, []);

    return(
        <div className="task-list">
            {todoItem.map((task) =>
                <ToDoItem
                    key={task.id}
                    task={task}
                    onDelete={(taskId) => setToDoItem((todoItem.filter(task => task.id !== taskId)))}
                    onToggleStateChange={(taskId) => setToDoItem(todoItem.map((task) => (task.id === taskId ? {...task, completed: !task.completed } : task)))}
                />  
            )}
        </div>
    );

};

export default ToDoList;