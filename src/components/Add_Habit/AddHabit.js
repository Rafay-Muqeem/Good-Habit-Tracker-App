import React, { useEffect, useState } from "react";
import { addHabits } from "../../services/addHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import './AddHabit.css';
import { motion } from 'framer-motion';

const AddHabit = () => {

    const location = useLocation();
    const token = location.state;

    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [added, setAdded] = useState("");

    async function addHabit() {

        if (inputName.length > 2 ) {

            const data = {
                name: inputName,
                description: inputDesc
            }

            try {
                const res = await addHabits(token, data);
                if (res.status >= 200 && res.status <= 299) {
                    setAdded(true);
                }

            } catch (error) {
                console.log(error);
            }


            setInputName("");
            setInputDesc("");

        }

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAdded(false);
        }, 3500)

        return () => {
            clearTimeout(timer);
        }
    }, [added])

    return (
        <motion.div
            initial={{scale:0.2}}
            animate={{scale: 1}}
            exit={{opacity:0}}
            transition={{type:"spring", bounce:0.25, ease: "easeInOut"}}
        >
            <div className="addCard">
                <Link className="listIcon" to="/dashboard" replace={true} state={token}> <FontAwesomeIcon icon={faListCheck} /></Link>
                <h1>Add Habit</h1>
                <div className="add_task_inputs">
                    <input type="text" value={inputName} placeholder="Enter name here..." onChange={(e) => setInputName(e.target.value)} autoFocus />
                    <input type="text" value={inputDesc} placeholder="Enter description here..." onChange={(e) => setInputDesc(e.target.value)} />
                    <button onClick={addHabit} className="add_button">add</button>
                </div>
                {
                    added ?
                        <div className="successText">
                            <span>Added Successfully</span>
                        </div>
                        :
                        null
                }

            </div>
        </motion.div>
    );
}

export default AddHabit;