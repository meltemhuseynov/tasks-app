import { useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const createTasks = (taskTitle, taskDescription) => {
    const createdTask = [
      ...tasks,
      {
        id: tasks.length + 1,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        status: "pending",
      },
    ];
    setData(createdTask);
  };

  const deleteTaskById = (id) => {
    const afterDeletingTask = tasks.filter((task) => {
      return task.id !== id;
    });
    setData(afterDeletingTask);
  };

  const updatedTaskById = (
    id,
    updatedTaskTitle,
    updatedTaskDescription,
    status
  ) => {
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

    setData(uptatedTask);
  };

  const setData = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
    loadData();
  };

  const loadData = () => {
    const item = JSON.parse(localStorage.getItem("tasks"));

    if (item) {
      setTasks(item);
    }
  };

  const onStatusChange = (task) => {};

  useEffect(() => {
    loadData();
  }, []);

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
