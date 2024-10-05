import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeList from './components/EmployeesList';
import LoadAccessControl from './components/LoadAccessControl';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/employee/list" element={<EmployeeList/>} />
          <Route path="/LoadAccessControl" element={<LoadAccessControl/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
