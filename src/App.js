import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard';
import AddHabit from './components/Add_Habit/AddHabit';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditModal from './components/Edit_Modal/EditModal';
import SignUp from './components/Sign_Up/SignUp';
import SignIn from './components/Sign_In/SignIn';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/dashboard/add" element={<AddHabit />} />
        <Route path="/dashboard/edit/:id" element={<EditModal />} />
        <Route path="/" element={<Navigate to={"/signin"} replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
