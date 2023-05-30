import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useEffect, useContext } from "react";
import TasksContext from "./context/tasks";

function App() {
  const { fetchData } = useContext(TasksContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="App">
          <TaskCreate />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
