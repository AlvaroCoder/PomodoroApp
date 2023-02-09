import PanelTask from "./Models/PanelTask";
import PanelTimer from "./Models/PanelTimer";
import './Assets/Home.css'
import './App.css'
import TaskContext from "./Hooks/TaskHook";
function App() {
  return (
    <TaskContext>
      <div id="container">
        <PanelTask></PanelTask>
        <PanelTimer></PanelTimer>
      </div>
    </TaskContext>
    );
}

export default App;
