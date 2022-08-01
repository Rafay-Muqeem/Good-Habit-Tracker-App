import React, { useState } from "react";
import { addHabits } from "../../services/addHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import './AddHabit.css';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { RotatingLines } from 'react-loader-spinner';

const AddHabit = () => {

    const location = useLocation();
    const token = location.state;

    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [error, setError] = useState(false);
    const [added, setAdded] = useState(false);
    const [addLoad, setAddLoad] = useState(true);
    const [resMessage, setResMessage] = useState("");

    async function addHabit() {

        setAddLoad(false);

        if (inputName !== '') {

            const data = {
                name: inputName,
                description: inputDesc
            }

            try {
                const res = await addHabits(token, data);

                if (res.status >= 200 && res.status <= 299) {
                    setResMessage("Added Successfully");
                    setInputName("");
                    setInputDesc("");
                    setAddLoad(true);
                    setAdded(true);
                    setTimeout(() => {
                        setAdded(false);
                    }, 5000);
                }

            } catch (error) {
                console.log(error);
                setResMessage("Internal server error");
                setError(true);
                setAddLoad(true);
                setTimeout(() => {
                    setError(false);
                }, 5000);
            }
        }
        else {
            setResMessage("Name field can't be empty!");
            setError(true);
            setAddLoad(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
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

                <AnimatePresence>
                    {error && (
                        <motion.span
                            className="errText"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {resMessage}
                        </motion.span>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {added && (
                        <motion.span
                            className="succText"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {resMessage}
                        </motion.span>
                    )}
                </AnimatePresence>

                <div className="add_task_inputs">
                    <input type="text" value={inputName} placeholder="Enter name here..." onChange={(e) => setInputName(e.target.value)} autoFocus />
                    <input type="text" value={inputDesc} placeholder="Enter description here..." onChange={(e) => setInputDesc(e.target.value)} />
                    {
                        addLoad ?
                            <motion.button onClick={addHabit} whileTap={{ scale: 0.9 }} >add</motion.button>
                            :
                            <button >
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="20"
                                    visible={true}
                                />
                            </button>
                    }

                </div>
            </div>
        </motion.div>
    );
}

export default AddHabit;