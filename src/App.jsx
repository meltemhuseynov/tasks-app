import { useState,useEffect } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from 'axios'

function App() {
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

  useEffect(()=>{
    fetchData();
  },[])



  return (
    <>
      <div className="container">
        <div className="App">
          <TaskCreate onCreate={createTasks} />
          <TaskList
            tasks={tasks}
            onDelete={deleteTaskById}
            onUpdated={updatedTaskById}
          />
        </div>
      </div>
    </>
  );
}

export default App;
