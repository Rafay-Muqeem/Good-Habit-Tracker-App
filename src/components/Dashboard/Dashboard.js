import React, { useEffect, useState } from "react";
import ListItems from '../ListItems/List_Items';
import { fetctHabits } from "../../services/fetchHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Description from "../Description/Description";
import './Dashboard.css';
import { State } from '../../state/Context';
import { ReactComponent as EmptyList } from './EmptyList.svg';
import { undoneHabit } from '../../services/undoneHabit';

const Dashboard = () => {

    const navigate = useNavigate();

    const { state, dispatch } = State()
    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [modal, setModal] = useState(false);
    const [habitObj, setHabitObj] = useState({});
    const [Token, setToken] = useState('');
    const [DelTimer, setDelTimer] = useState('');
    const [DoneTimer, setDoneTimer] = useState('');

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

        const token = JSON.parse(localStorage.getItem('Token'));
        if (token) setToken(token)
        if (!token) navigate('/signin')

        async function habits() {

            if (Token !== '') {
                try {
                    const habitsArr = await fetctHabits(Token);

                    if (habitsArr.status >= 200 && habitsArr.status <= 299) {
                        setListItems(await habitsArr.json());
                    }

                    const UserInfo = await getUserDetails(Token);

                    if (UserInfo.status >= 200 && UserInfo.status <= 299) {
                        const user = await UserInfo.json();
                        dispatch({ type: 'SET_USER', payload: user });
                        localStorage.setItem('User', JSON.stringify(user));
                    }
                    setLoaded(true);
                }
                catch (error) {
                    console.log(error);
                    dispatch({ type: 'SET_USER', payload: {} });
                    dispatch({ type: 'SET_DATA_LOAD', payload: true });
                }
            }

        }
        habits();

    }, [state.refreshDashboard, Token]);

    async function undoneHabits() {

        clearTimeout(DoneTimer);
        dispatch({ type: 'SET_DONE', payload: { message: false } });

        try {
            await undoneHabit(state.done.id, state.userToken);

            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });

        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
        }

        dispatch({ type: 'SET_DONE', payload: { id: '' } });

    }

    let tempArray = [];

    useEffect(() => {
        
        if (state.delete.id !== '') {
            listItems.filter(habit => habit._id !== state.delete.id).map(filtered => {
                return tempArray.push(filtered)
            });
            setListItems(tempArray);
        }

    }, [state.delete.id])
    
    if (Token) {
        return (
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut" }}
            >

                <AnimatePresence>
                    {showDes && (
                        <motion.div
                            initial={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                            animate={{ position: "absolute", zIndex: 2, x: 0, y: 0, opacity: 1 }}
                            exit={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                            transition={{ type: 'spring', bounce: 0.2, ease: "easeInOut" }}
                        >
                            <Description token={Token} showDes={showDes} setShowDes={setShowDes} callAdd={callAdd} setCallAdd={setCallAdd} setModal={setModal} habitObj={habitObj} setHabitObj={setHabitObj} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div id={modal ? "backDull" : null} className="card">
                    <div className="dashboardUpper">
                        <div className="dashboardUpperBar">
                            <Link className="addIcon" to="/dashboard/add" replace={true} state={Token}><FontAwesomeIcon icon={faAdd} /></Link>

                            <AnimatePresence>
                                {state.delete.message && (
                                    <motion.span
                                        className="errText"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        Deleted Successfully
                                        <button onClick={() => { clearTimeout(DelTimer); dispatch({ type: 'SET_DELETE', payload: { id: '', message: false } }); dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard }) }}>Undo</button>
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {state.done.message && (
                                    <motion.span
                                        className="succText"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        Done for today
                                        <button onClick={() => undoneHabits()}>Undo</button>

                                    </motion.span>
                                )}
                            </AnimatePresence>

                        </div>
                        <h1>Habits List</h1>
                    </div>
                    {
                        !loaded ?
                            <div className="loader">
                                <ThreeDots color="#590C69" />
                            </div>
                            :
                            <div className="dashboardContent">
                                <motion.ul variants={container} initial="hidden" animate="show" className="item_list">
                                    {
                                        listItems.length !== 0 ?

                                            listItems.map((itemval) => {
                                                return (
                                                    <motion.div
                                                        variants={listItem}
                                                        key={itemval._id}
                                                    >
                                                        <ListItems item={itemval} setShowDes={setShowDes} setModal={setModal} setHabitObj={setHabitObj} setDelTimer={setDelTimer} setDoneTimer={setDoneTimer} />
                                                    </motion.div>
                                                );
                                            })
                                            :
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ ease: 'easeInOut' }}
                                            >
                                                <EmptyList className="emptyListSvg" />
                                            </motion.div>
                                    }

                                </motion.ul>
                            </div>
                    }
                </div>

            </motion.div>
        );
    }
}

export default Dashboard;