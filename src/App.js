import './App.css';
import React from 'react';
import Home from './components/Home';
import AddHabit from './components/AddHabit';
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
        <Route path="/home" element={ <Home />} />
        <Route path="/add" element={<AddHabit />} />
        <Route path="/edit/:id" element={<EditModal />} />
        <Route element={<Navigate to={"/signin"} replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
