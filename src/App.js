import "./App.css";
import SortingComponentBackUp from "./SortingComponentBackUp";
import SortingModify from "./SortingModify";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Sorting Algorithm Visualization</h3>
        {/* <SortingComponentBackUp /> */}
        <SortingModify></SortingModify>
        {/* <demo /> */}
      </header>
    </div>
  );
}

export default App;
