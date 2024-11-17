import './App.css';
import Homepage from './Pages/HomePage';
import ViewBoard from './Pages/ViewBoard'
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/board" element={<ViewBoard />} />
      </Routes>
    </div>
  );
}

export default App;