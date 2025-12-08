import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { Login } from './components/login/Login'
import { AllUpdates } from './components/AllUpdates/AllUpdates'
import { Routes, Route } from 'react-router-dom'
import { Employee } from './components/Employee/UI/Employee'
function App() {

  return (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/all-updates" element={<AllUpdates />} />
    <Route path="/employee" element={<Employee />} />
  </Routes>
  )
}

export default App
