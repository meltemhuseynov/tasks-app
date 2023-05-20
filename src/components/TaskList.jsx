import TaskShow from "./TaskShow";
import "./TaskList.css";

function TaskList({ tasks, onDelete, onUpdated }) {
  if (tasks.length == 0) {
    return (
      <div className="task-list">
        <h3 className="task-list-title">Tasks</h3>
        <p className="task-list-underTitle">Empty List.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h3 className="task-list-title">Tasks</h3>

      {tasks.map((task, index) => {
        return (
          <TaskShow
            key={index}
            task={task}
            onDelete={onDelete}
            onUpdated={onUpdated}
          />
        );
      })}
    </div>
  );
}
export default TaskList;
