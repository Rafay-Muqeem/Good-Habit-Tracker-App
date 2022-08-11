import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import Dashboard from '../components/Dashboard/Dashboard';
import AddHabit from '../components/Add_Habit/AddHabit';
import SignUp from '../components/Sign_Up/SignUp';
import SignIn from '../components/Sign_In/SignIn';
import Home from '../components/Home/Home';
import Error404 from '../components/404Error/Error404';
import '../App.css';

function AnimatedComps() {
    const location = useLocation();
    return (
        <div className="Main">
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/add" element={<AddHabit />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default AnimatedComps;