import React from "react";
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import AddHabit from '../components/Add_Habit/AddHabit';
import EditModal from '../components/Edit_Modal/EditModal';
import SignUp from '../components/Sign_Up/SignUp';
import SignIn from '../components/Sign_In/SignIn';

function AnimatedComps() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/add" element={<AddHabit />} />
                <Route path="/dashboard/edit/:id" element={<EditModal />} />
                <Route path="/" element={<Navigate to={"/signin"} replace />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedComps;