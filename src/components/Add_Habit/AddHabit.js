import React, { useEffect, useState } from "react";
import { addHabits } from "../../services/addHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './AddHabit.css';
import { motion } from 'framer-motion/dist/framer-motion';

const AddHabit = () => {

    const location = useLocation();
    const token = location.state;
    const navigate = useNavigate();

    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");

    useEffect(() => {
        const handler = (e) => {
            if (e.keyCode === 13) {
                addHabit();
            }
        }
        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler)
        }
    });

    async function addHabit() {

        if (inputName.length > 2) {

            const data = {
                name: inputName,
                description: inputDesc
            }

            try {
                const res = await addHabits(token, data);
                if (res.status >= 200 && res.status <= 299) {
                    setInputName("");
                    setInputDesc("");
                    navigate('/dashboard', { state: token, replace: true });
                }

            } catch (error) {
                console.log(error);
            }


        }

    };

    return (
        <motion.div
            initial={{ scale: 0.2 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
        >
            <div className="addCard">
                <Link className="listIcon" to="/dashboard" replace={true} state={token}> <FontAwesomeIcon icon={faListCheck} /></Link>
                <h1>Add Habit</h1>
                <div className="add_task_inputs">
                    <input type="text" value={inputName} placeholder="Enter name here..." onChange={(e) => setInputName(e.target.value)} autoFocus />
                    <input type="text" value={inputDesc} placeholder="Enter description here..." onChange={(e) => setInputDesc(e.target.value)} />
                    <button onClick={addHabit} className="add_button">add</button>
                </div>
            </div>
        </motion.div>
    );
}

export default AddHabit;