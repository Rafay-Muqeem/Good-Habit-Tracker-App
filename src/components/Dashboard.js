import React, { useEffect, useRef, useState } from "react";
import ListItems from './List_Items';
import { fetctHabits } from "../services/fetchHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSignOut, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner'
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { updateHabit } from '../services/updateHabit';

function Description(props) {

    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState(props.habitObj.name);
    const [editDesc, setEditDesc] = useState(props.habitObj.description);
    const desModalRef = useRef();

    const data = {
        name: editName,
        description: editDesc
    }

    const weekDays = [
        { day: "SUN", done: false, current: false },
        { day: "MON", done: false, current: false },
        { day: "TUE", done: false, current: false },
        { day: "WED", done: false, current: false },
        { day: "THU", done: false, current: false },
        { day: "FRI", done: false, current: false },
        { day: "SAT", done: false, current: false }
    ];

    async function UpdateHabit() {
        try {
            if (editName !== '' && props.token) {
                const res = await updateHabit(props.habitObj._id, data, props.token);
                props.setCallAdd(!props.callAdd);
                await props.setHabitObj(res.habit);
                setEditName(res.habit.name);
                setEditDesc(res.habit.description);
                setEdit(false);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getWeekData = (habit) => {
        if (habit) {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < habit.weeklyRecord.length; j++) {
                    if (habit.weeklyRecord[j] === i) {
                        weekDays[i].done = true;
                    }
                }
                if ((new Date()).getDay() === i) {
                    weekDays[i].current = true;
                }
            }
        }

        return weekDays;
    }

    useEffect(() => {

        let handler = (e) => {
            if (props.showDes && !desModalRef.current.contains(e.target)) {
                props.setShowDes(false);
                props.setModal(false);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    useEffect(() => {

        let handler = (e) => {

            if (e.keyCode === 13) {
                UpdateHabit()
            }
        }

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        }
    })

    let week;

    if (props.habitObj) {
        week = getWeekData(props.habitObj, weekDays);
    }

    if (props.habitObj) {
        return (
            <div ref={desModalRef} className="desCard">
                <div className="desUpper">
                    <span className="backIcon" onClick={() => { props.setShowDes(false); props.setModal(false) }}><FontAwesomeIcon icon={faTimesCircle} /></span>
                    <span className="editIcon" onClick={() => setEdit(true)}><FontAwesomeIcon icon={faEdit} /></span>
                </div>
                <div className="desMain">

                    <AnimatePresence>
                        {!edit ?
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >

                                {props.habitObj.name}

                            </motion.h2>
                            :
                            <motion.input
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                size={editName.length > 0 ? editName.length : 1}
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value.length < 15 ? e.target.value : editName)} autoFocus
                            />

                        }

                    </AnimatePresence>

                    <AnimatePresence>

                        {!edit ?
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                {props.habitObj.description === '' ?
                                    "No Description"
                                    :
                                    props.habitObj.description
                                }
                            </motion.p>
                            :
                            <motion.input
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                size={40}
                                type="text" value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                            />

                        }
                    </AnimatePresence>
                </div>
                <div className="weeklyRecord">
                    {week.map((dayObj, ind) => {

                        if (dayObj.done) {
                            if (dayObj.current) {
                                return (
                                    <span key={ind} className="currentAndDoneDay">{dayObj.day}</span>
                                );
                            }
                            return (
                                <span key={ind} className="doneDay">{dayObj.day}</span>
                            );
                        }
                        else {
                            if (dayObj.current) {
                                return (
                                    <span key={ind} className="currentAndUnDoneDay">{dayObj.day}</span>
                                );
                            }
                            return (
                                <span key={ind} className="unDoneDay">{dayObj.day}</span>
                            );
                        }

                    })}
                </div>
                {props.habitObj.streak === 0 || props.habitObj.streak === 1 ? <p>No Streak Yet</p> : <p>Habit's Streak is <b>{props.habitObj.streak} days</b></p>}
            </div>
        );
    }

}

const Dashboard = () => {
    const location = useLocation();
    const token = location.state;
    const navigate = useNavigate();

    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [logOut, setLogOut] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [modal, setModal] = useState(false);
    const [habitObj, setHabitObj] = useState({});

    const timeInSec = moment().endOf('day').valueOf();
    const Interval = timeInSec - Date.now();

    const logOutModalRef = useRef();
    
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCallAdd(!callAdd);
        }, Interval)

        return () => {
            clearInterval(timer);
        }
    });

    useEffect(() => {
        async function habits() {
            try {
                const habitsArr = await fetctHabits(token);
                setListItems(habitsArr);
                const UserInfo = await getUserDetails(token);
                setUserInfo(UserInfo);
                setLoaded(true);
            }
            catch (error) {
                console.log(error);
                setLoaded(true);
            }
        }
        habits();
       
    }, [callAdd]);

    useEffect(() => {

        let handler = (e) => {
            if (logOut && !logOutModalRef.current.contains(e.target)) {
                setLogOut(false);
                setModal(false);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    const signOutYes = () => {
        navigate('/signin', { replace: true });
    }

    function LogOut() {
        return (
            <div ref={logOutModalRef} className="logOutCard">
                <div className="logOutCardContent">
                    <h1>Log Out</h1>
                    <span>Do you want to Log out?</span>
                    <div className="logOut_buttons">
                        <button onClick={() => { setLogOut(false); setModal(false) }} >No</button>
                        <button className='logOut_buttons' onClick={signOutYes}>Yes</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
        >
            <AnimatePresence>
                {logOut && (
                    <motion.div
                        initial={{ position: "absolute", zIndex: 2, x: "65%", y: -300, opacity: 0 }}
                        animate={{ position: "absolute", zIndex: 2, x: "65%", y: 0, opacity: 1 }}
                        exit={{ position: "absolute", zIndex: 2, x: "65%", y: -300, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
                    >
                        <LogOut />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showDes && (
                    <motion.div
                        initial={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                        animate={{ position: "absolute", zIndex: 2, x: 0, y: 100, opacity: 1 }}
                        exit={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
                    >
                        <Description token={token} showDes={showDes} setShowDes={setShowDes} callAdd={callAdd} setCallAdd={setCallAdd} setModal={setModal} habitObj={habitObj} setHabitObj={setHabitObj} />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div id={modal ? "backDull" : null} className="card">
                <div className="dashboardUpper">
                    <div className="dashboardUpperBar">
                        <Link className="addIcon" to="/dashboard/add" replace={true} state={token}><FontAwesomeIcon icon={faAdd} /></Link>
                        <span>{!userInfo.name ? <ThreeDots color="#590C69" width={20} height={20} /> : userInfo.name}</span>
                        <span className="logOutIcon" onClick={() => { setLogOut(true); setModal(true) }} ><FontAwesomeIcon icon={faSignOut} /></span>
                    </div>
                    <h1>Habits List</h1>
                </div>
                {
                    !loaded ?
                        <div className="loader">
                            <ThreeDots color="#590C69" height={60} width={60} />
                        </div>
                        :
                        <div className="dashboardContent">
                            <motion.ul variants={container} initial="hidden" animate="show" className="item_list">
                                {listItems.map((itemval) => {
                                    return (
                                        <motion.div
                                            variants={listItem}
                                            key={itemval._id}
                                        >
                                            <ListItems item={itemval} token={token} callAdd={callAdd} setCallAdd={setCallAdd} setShowDes={setShowDes} setModal={setModal} setHabitObj={setHabitObj} />
                                        </motion.div>
                                    );
                                })}

                            </motion.ul>
                        </div>
                }
            </div>
        </motion.div>
    );

}

export default Dashboard;