import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedComps from './components/AnimatedComponents';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
      <Router>
        <Navbar />
        <AnimatedComps />
      </Router>
  );
}

export default App;
