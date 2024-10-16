import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeList from './components/EmployeesList';
import LoadAccessControl from './components/LoadAccessControl';
import ExtraHoursList from './components/ExtraHoursList';
import DiscountHoursList from './components/DiscountHoursList';
import CalculatePaycheck from './components/CalculatePaycheck';
import PaycheckDetails from './components/PaycheckDetails';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar></Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/employee/list" element={<EmployeeList/>} />
          <Route path="/LoadAccessControl" element={<LoadAccessControl/>} />
          <Route path="/extraHours/list" element={<ExtraHoursList/>} />
          <Route path="/discountHours/list" element={<DiscountHoursList/>} />
          <Route path="/paycheck/calculate" element={<CalculatePaycheck/>} />
          <Route path="/paycheck/Details" element={<PaycheckDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
