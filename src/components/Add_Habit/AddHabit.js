import React, { useEffect, useState } from "react";
import { addHabits } from "../../services/addHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import './addHabit.css';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { RotatingLines } from 'react-loader-spinner';
import { State } from "../../state/Context";

const AddHabit = () => {

    const navigate = useNavigate();

    const { dispatch } = State();
    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [error, setError] = useState(false);
    const [added, setAdded] = useState(false);
    const [addLoad, setAddLoad] = useState(true);
    const [resMessage, setResMessage] = useState("");
    const [Token, setToken] = useState('');
    // const [resStatusCode, setResStatusCode] = useState(0);

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('Token'));
        if (token) setToken(token);
        if (!token) navigate('/signin');

    }, [])

    async function addHabit() {

        setAddLoad(false);

        if (inputName !== '') {

            const data = {
                name: inputName,
                description: inputDesc
            }

            try {
                const res = await addHabits(Token, data);

                if (res.status === 401) {
                    dispatch({ type: "RESET" });
                    dispatch({ type: 'SET_SESSION_EXP', payload: true })
                    localStorage.removeItem('User');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('sessionExp');
                    navigate('/signin');
                }

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

    if (Token) {
        return (
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
            >
                <div className="addCard">
                    <div className='upperBar'>
                        <Link className="listIcon" to="/dashboard" replace={true}> <FontAwesomeIcon icon={faListCheck} /></Link>

                        <AnimatePresence>
                            {error && (
                                <motion.span
                                    className="errText"
                                    initial={{ opacity:0, width: 0 }}
                                    animate={{ opacity:1, width: "auto" }}
                                    exit={{ opacity:0, width: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut'}}
                                >
                                    {resMessage}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {added && (
                                <motion.span
                                    className="succText"
                                    initial={{ opacity:0, width: 0 }}
                                    animate={{ opacity:1, width: "auto" }}
                                    exit={{ opacity:0, width: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut'}}
                                >
                                    {resMessage}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <h1>Add Habit</h1>

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

}

export default AddHabit;