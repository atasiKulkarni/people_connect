import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./features/Dasboard/View/Screens/Dashboard";
import { Employee } from "./features/Employee/View/Screen/Employee";
import { Login } from "./features/Login/View/Screen/Login";
import { Engage } from "./features/Engage/View/Screen/Engage";
import { Home } from "./Home"; 
import { Profile } from "./features/Profile/View/Screen/Profile";
import {TimeCard} from "./features/TimeCard/View/Screen/TimeCard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="home" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employee" element={<Employee />} />
        <Route path="engage" element={<Engage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="timeCard" element={<TimeCard />} />
      </Route>
    </Routes>
  );
}

export default App;
