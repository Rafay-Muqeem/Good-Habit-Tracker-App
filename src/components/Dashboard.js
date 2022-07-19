import React, { useEffect, useRef, useState } from "react";
import ListItems from './List_Items';
import { fetctHabits } from "../services/fetchHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner'
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = () => {
    const location = useLocation();
    const token = location.state;
    const navigate = useNavigate();

    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [logOut, setLogOut] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const timeInSec = moment().endOf('day').valueOf();
    const Interval = timeInSec - Date.now();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
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
        const timer2 = setTimeout(() => {
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
        }, 1000)

        return () => {
            clearTimeout(timer2);
        }
    }, [callAdd]);

    let modalRef = useRef();

    useEffect(() => {

        let handler = (e) => {
            if (logOut && !modalRef.current.contains(e.target)) {
                setLogOut(false);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    const signInYes = () => {
        navigate('/signin', { replace: true });
    }

    function Log_out() {
        return (
            <div ref={modalRef} className="logOutCard">
                <div className="logOutCardContent">
                    <h1>Log Out</h1>
                    <span>Do you want to Log out?</span>
                    <div className="logOut_buttons">
                        <button onClick={() => setLogOut(false)} className="signInButton">No</button>
                        <button onClick={signInYes} className="signInButton">Yes</button>
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
                        <Log_out />
                    </motion.div>
                )}
            </AnimatePresence>
            <div id={logOut ? "container" : null} className="card">
                <div className="homeUpper">
                    <Link className="addIcon" to="/dashboard/add" replace={true} state={token}><FontAwesomeIcon icon={faAdd} /></Link>
                    <span>{!userInfo.name ? <ThreeDots color="#590C69" width={20} height={20} /> : userInfo.name}</span>
                    <span className="logOutIcon" onClick={() => setLogOut(true)} ><FontAwesomeIcon icon={faSignOut} /></span>
                </div>
                <h1>Habits List</h1>
                {
                    !loaded ?
                        <div className="loader">
                            <ThreeDots color="#590C69" height={60} width={60} />
                        </div>
                        :
                        <motion.ul variants={container} initial="hidden" animate="show" className="item_list">
                            {listItems.map((itemval) => {
                                return (
                                    <motion.div
                                        variants={listItem}
                                        key={itemval._id}
                                    >
                                        <ListItems item={itemval} token={token} callAdd={callAdd} setCallAdd={setCallAdd} />
                                    </motion.div>
                                );
                            })}

                        </motion.ul>
                }
            </div>
        </motion.div>
    );

}

export default Dashboard;