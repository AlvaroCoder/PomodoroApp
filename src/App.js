import PanelTimer from "./Models/PanelTimer";
import './Assets/Home.css'
import TaskContext from "./Hooks/TaskHook";
import NavBar from "./Models/NavBar";
import PanelAdd from "./Models/PanelAdd";
function App() {
  return (
    <TaskContext>
      <div>
        <PanelAdd></PanelAdd>
        <div id="container" >
          <NavBar></NavBar>
          <PanelTimer></PanelTimer>
        </div>
      </div>
    </TaskContext>
    );
}

export default App;
