import axios from "axios";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    }
    catch(error) {
        console.error(error);
        return []; //Return an empty array if there is error in fetching data
    };
}

export const addTask = async (newTask) => {
    try {  
        const response = await axios.post(API_BASE_URL, newTask);
        return response.data;
    }
    catch(error) { 
        console.error(error);
        return null; //Return null if there is error in adding new data.
    }
}

export const updateTask = async (taskId, newTitle) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${taskId}`, {title: newTitle});
        return response.data;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
        return response.data;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}