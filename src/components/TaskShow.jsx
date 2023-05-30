import TaskCreate from "./TaskCreate";
import "./TaskShow.css";
import { useState } from "react";
import {useContext } from "react";
import TasksContext from "../context/tasks";

function TaskShow({task, onUpdate}) {
  const { deleteTaskById, updatedTaskById } = useContext(TasksContext);

  const [showEdit, setShowEdit] = useState(false);
  const [checkInput, setCheckInput] = useState(
    task.status === "completed" ? true : false
  );
  const taskDeleting = () => {
    deleteTaskById(task.id);
  };

  const uptadeTask = () => {
    setShowEdit(!showEdit);
  };

  const handleUpdateSubmit = (id, updatedTaskTitle, updatedTaskDescription) => {
    setShowEdit(false);
    updatedTaskById(id, updatedTaskTitle, updatedTaskDescription);
  };

  const switchInput = () => {
    setCheckInput(!checkInput);
    updatedTaskById(
      task.id,
      task.taskTitle,
      task.taskDescription,
      !checkInput ? "completed" : "pending",
      
    );
  };

  return (
    <div className="task-show">
      {showEdit ? (
        <div>
          <TaskCreate
            task={task}
            taskFormUpdate={true}
            onUpdate={handleUpdateSubmit}
          />
        </div>
      ) : (
        <div className="task-show-create">
          <div>
            <h4
              className={checkInput ? "taskShow-title-under" : "taskShow-title"}
            >
              Title
            </h4>
            <p
              className={
                checkInput
                  ? "taskShow-description-under"
                  : "taskShow-description"
              }
            >
              {task.taskTitle}
            </p>
            <h4
              className={checkInput ? "taskShow-title-under" : "taskShow-title"}
            >
              Description
            </h4>
            <p
              className={
                checkInput
                  ? "taskShow-description-under"
                  : "taskShow-description"
              }
            >
              {task.taskDescription}
            </p>
          </div>
          <div>
            <input
              checked={checkInput}
              onClick={switchInput}
              className="taskShow-checkbox"
              type="checkbox"
            />
            <button onClick={uptadeTask} className="taskShow-Button">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={taskDeleting} className="taskShow-Button">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;
