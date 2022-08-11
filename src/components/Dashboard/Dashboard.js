import React, { useEffect, useState } from "react";
import ListItems from '../ListItems/List_Items';
import { fetctHabits } from "../../services/fetchHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Description from "../Description/Description";
import './Dashboard.css';
import { State } from '../../state/Context';

const Dashboard = () => {

    const navigate = useNavigate();
    
    const { state, dispatch } = State()
    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    // const [logOut, setLogOut] = useState(false);
    // const [loaded, setLoaded] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [modal, setModal] = useState(false);
    const [habitObj, setHabitObj] = useState({});
    const [Token, setToken] = useState('');
    // const [resStatusCode, setResStatusCode] = useState(0);

    const timeInSec = moment().endOf('day').valueOf();
    const Interval = timeInSec - Date.now();

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
        // console.log(state);

        const token = JSON.parse(localStorage.getItem('Token'));
        if (token) setToken(token)
        if (!token) navigate('/signin')

        async function habits() {

            if (Token !== '') {

                try {
                    const habitsArr = await fetctHabits(Token);
                    // setResStatusCode(habitsArr.status);
                    
                    if(habitsArr.status === 401){
                        localStorage.removeItem('Token');
                        localStorage.removeItem('User');
                        dispatch({ type: "RESET" });
                        navigate('/');
                    }

                    if (habitsArr.status >= 200 && habitsArr.status <= 299) {
                        setListItems(await habitsArr.json());
                    }

                    const UserInfo = await getUserDetails(Token);

                    if (UserInfo.status >= 200 && UserInfo.status <= 299) {
                        const user = await UserInfo.json();
                        dispatch({ type: 'SET_USER', payload: user });
                        localStorage.setItem('User', JSON.stringify(user));
                    }

                    dispatch({ type: 'SET_DATA_LOAD', payload: true });
                }
                catch (error) {
                    console.log(error);
                    dispatch({ type: 'SET_USER', payload: {}});
                    dispatch({ type: 'SET_DATA_LOAD', payload: true });
                }
            }

        }
        habits();

    }, [callAdd, Token]);

    // useEffect(() => {

    //     let handler = (e) => {
    //         if (state.logOut && !logOutModalRef.current.contains(e.target)) {
    //             // setLogOut(false);
    //             dispatch({ type: 'SET_LOGOUT', payload: false });
    //             setModal(false);
    //         }
    //     }
    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // })

    // console.log(state);

    if (Token) {
        return (
            <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
            >

                {/* <AnimatePresence>
                    {state.logOut && (
                        
                        <motion.div
                            initial={{ position: "absolute", zIndex: 2, y: -300, opacity: 0 }}
                            animate={{ position: "absolute", zIndex: 2, y: 0, opacity: 1 }}
                            exit={{ position: "absolute", zIndex: 2, y: -300, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
                        >   
                            <LogOut />
                        </motion.div>
                    )}
                </AnimatePresence> */}

                <AnimatePresence>
                    {showDes && (
                        <motion.div
                            initial={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                            animate={{ position: "absolute", zIndex: 2, x: 0, y: 100, opacity: 1 }}
                            exit={{ position: "absolute", zIndex: 2, x: 0, y: -300, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
                        >
                            <Description token={Token} showDes={showDes} setShowDes={setShowDes} callAdd={callAdd} setCallAdd={setCallAdd} setModal={setModal} habitObj={habitObj} setHabitObj={setHabitObj} />
                        </motion.div>
                    )}
                </AnimatePresence>
                        
                <div id={ modal ? "backDull" : null } className="card">
                    <div className="dashboardUpper">
                        <div className="dashboardUpperBar">
                            <Link className="addIcon" to="/dashboard/add" replace={true} state={Token}><FontAwesomeIcon icon={faAdd} /></Link>
                        </div>
                        <h1>Habits List</h1>
                    </div>
                    {
                        !state.mainDataLoad ?
                            <div className="loader">
                                <ThreeDots color="#590C69" />
                            </div>
                            :
                            <div className="dashboardContent">
                                <motion.ul variants={container} initial="hidden" animate="show" className="item_list">
                                    {
                                        listItems.map((itemval) => {
                                            return (
                                                <motion.div
                                                    variants={listItem}
                                                    key={itemval._id}
                                                >
                                                    <ListItems item={itemval} token={Token} callAdd={callAdd} setCallAdd={setCallAdd} setShowDes={setShowDes} setModal={setModal} setHabitObj={setHabitObj} />
                                                </motion.div>
                                            );
                                        })
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