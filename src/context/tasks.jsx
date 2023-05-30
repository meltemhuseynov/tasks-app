import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'



const TasksContext= createContext();

function Provider ({children}){
    const [tasks, setTasks] = useState([]);

  const createTasks = async (taskTitle, taskDescription) => {
    const response= await axios.post('http://localhost:3000/tasks',{
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      status: "pending",
    })
    const createdTask = [...tasks, response.data];
    console.log(response)
    setTasks(createdTask);
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
    const afterDeletingTask = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTask);
  };

  const updatedTaskById = async (
    id,
    updatedTaskTitle,
    updatedTaskDescription,
    status
  ) => {
    await axios.put(`http://localhost:3000/tasks/${id}`,{
      taskTitle: updatedTaskTitle,
      taskDescription: updatedTaskDescription,
      status: status

    })

    const uptatedTask = tasks.map((task) => {
      if (task.id === id) {
        return {
          id: id,
          taskTitle: updatedTaskTitle,
          taskDescription: updatedTaskDescription,
          status: status,
        };
      } else {
        return task;
      }
    });

    setTasks(uptatedTask);
  };

  const fetchData= async()=>{
    const response= await axios.get('http://localhost:3000/tasks')
    setTasks(response.data)
  }
  const sharedMethodsandValues= {
    tasks,
    createTasks,
    deleteTaskById,
    updatedTaskById,
    fetchData

  }
  return(
    <TasksContext.Provider value={sharedMethodsandValues}>
        {children}
    </TasksContext.Provider>

  )  
}

export {Provider}
export default TasksContext; 