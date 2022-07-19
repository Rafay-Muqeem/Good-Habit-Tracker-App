import './App.css';
import React from 'react';
import {  BrowserRouter as Router } from "react-router-dom";
import AnimatedComps from './components/AnimatedComponents';

function App() {
  return (
    <Router>
      <AnimatedComps />
    </Router>
  );
}

export default App;
