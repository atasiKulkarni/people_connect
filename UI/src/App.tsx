import './App.css'
import { Dashboard } from './features/Dasboard/View/Screens/Dasboard'

import { AllUpdates } from './features/AllUpdates/AllUpdates'
import { Routes, Route } from 'react-router-dom'
import { Employee } from './features/Employee/View/Screen/Employee'
import { Login } from './features/Login/View/Screen/Login'
function App() {

  return (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/engage" element={<AllUpdates />} />
    <Route path="/employee" element={<Employee />} />
  </Routes>
  )
}

export default App
