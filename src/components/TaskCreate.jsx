import { useState } from "react";
import "./TaskCreate.css";
import {useContext } from "react";
import TasksContext from "../context/tasks";


function TaskCreate({taskFormUpdate, task, onUpdate }) {
  const { createTasks } = useContext(TasksContext);

  const [taskTitle, setTaskTitle] = useState(task ? task.taskTitle : "" );
  const [taskDescription, setTaskDescription] = useState(task ? task.taskDescription :"");

  const handleInputChange = (event) => {
    setTaskTitle(event.target.value);
  };
  const handleTextAreaChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(taskFormUpdate){
      onUpdate(task.id, taskTitle, taskDescription)
    }else{
      createTasks(taskTitle, taskDescription);

    }
    setTaskDescription("");
    setTaskTitle("");
  };

  return (
    <div>
      {taskFormUpdate ? (
        <div className="task-update ">
          <h4 >Please edit the Task!</h4>
          <form className="task-form ">
            <label className="task-label task-label-update">Please edit the title!</label>
            <input
              value={taskTitle}
              onChange={handleInputChange}
              className="task-input update-input"
            />
            <label className="task-label">Please edit the description!</label>
            <textarea
              value={taskDescription}
              onChange={handleTextAreaChange}
              className="task-input update-input"
            ></textarea>
            <button className="task-button update-button" onClick={handleSubmit}>
              Edit
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create ">
          <h4 className="task-title">Please enter the Task!</h4>
          <form className="task-form ">
            <label className="task-label">Title</label>
            <input
              value={taskTitle}
              onChange={handleInputChange}
              className="task-input"
            />
            <label className="task-label">Description</label>
            <textarea
              value={taskDescription}
              onChange={handleTextAreaChange}
              className="task-input"
              rows="5"
            ></textarea>
            <button className="task-button" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
