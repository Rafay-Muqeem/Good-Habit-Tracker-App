import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEdit, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { doneHabit } from "../services/doneHabit";
import { delHabits } from "../services/delHabits";
import { Link } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { motion, AnimatePresence } from 'framer-motion'

async function doneHabits(id, token, callAdd, setCallAdd, setDoneLoad) {
    setDoneLoad(false);
    try {
        await doneHabit(id, token);
        setCallAdd(!callAdd);
        setTimeout(() => {
            setDoneLoad(true);
        }, 1500);
    } catch (error) {
        console.log(error);
        setCallAdd(!callAdd);
        setDoneLoad(true);
    }
}

async function DeList(id, token, callAdd, setCallAdd, setDeleteLoad) {
    setDeleteLoad(false);
    try {
        await delHabits(id, token);
        setCallAdd(!callAdd);
        setTimeout(() => {
            setDeleteLoad(true);
        }, 1500);
    } catch (error) {
        console.log(error);
        setCallAdd(!callAdd);
        setDeleteLoad(true);
    }

}

const List_Items = (props) => {

    const [show, setShow] = useState(false);
    const [doneLoad, setDoneLoad] = useState(true);
    const [deleteLoad, setDeleteLoad] = useState(true);

    const variants = {
        open: { rotate: -180 },
        closed: { rotate: 0 },
    }

    const weekDays = [
        { day: "SUN", done: false },
        { day: "MON", done: false },
        { day: "TUE", done: false },
        { day: "WED", done: false },
        { day: "THU", done: false },
        { day: "FRI", done: false },
        { day: "SAT", done: false }
    ];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < props.item.weeklyRecord.length; j++) {
            if (props.item.weeklyRecord[j] == i) {
                weekDays[i].done = true;
            }
        }
    }

    return (

        <li id={props.item._id}>
            <div className="content">
                <div className="upper">

                    {
                        !doneLoad ?
                            <div className="doneLoader">
                                <TailSpin color="green" width={25} height={25} />
                            </div>
                            :
                            props.item.done ?
                                <span id="check" className="done" ><FontAwesomeIcon icon={faCheck} /></span> :
                                <span className="done" onClick={() => { doneHabits(props.item._id, props.token, props.callAdd, props.setCallAdd, setDoneLoad) }}></span>

                    }

                    <span className="name">{props.item.name}</span>

                    <motion.span
                        animate={show ? "open" : "closed"}
                        variants={variants}
                        onClick={() => { setShow(!show) }}
                        className="showDesc"
                    >
                        <FontAwesomeIcon icon={faAngleDown} />
                    </motion.span>

                    <Link className="edit" to={`/dashboard/edit/${props.item._id}`} replace={true} state={{ id: props.item._id, token: props.token }}><FontAwesomeIcon icon={faEdit} /></Link>
                    {
                        !deleteLoad ?
                            <div className="deleteLoader">
                                <TailSpin color="red" width={25} height={25} />
                            </div>
                            :
                            <span onClick={() => { DeList(props.item._id, props.token, props.callAdd, props.setCallAdd, setDeleteLoad) }} className="delete"><FontAwesomeIcon icon={faTrash} /></span>
                    }

                </div>
                <AnimatePresence >
                    {show && (

                        <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="lower"
                        >
                            {/* <p>{props.item.description}</p> */}
                            <div className="weeklyRecord">
                                {weekDays.map((dayObj, ind) => {

                                    if (dayObj.done) {
                                        return (
                                            <span key={ind} className="doneDay">{dayObj.day}</span>
                                        );
                                    }
                                    else {
                                        return (
                                            <span key={ind} className="unDoneDay">{dayObj.day}</span>
                                        );
                                    }

                                })}
                            </div>
                            {props.item.streak == 0 || props.item.streak == 1 ? <p>No Streak Yet</p> : <p>Habit's Streak is <b>{props.item.streak} days</b></p>}
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </li>

    );
};

export default List_Items;