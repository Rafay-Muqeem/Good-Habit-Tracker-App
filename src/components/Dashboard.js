import React, { useEffect, useRef, useState } from "react";
import ListItems from './List_Items';
import { fetctHabits } from "../services/fetchHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Description from "./Description/Description";
import Error404 from "./404Error/Error404";


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
    // const [resStatusCode, setResStatusCode] = useState(0);

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
                        // setResStatusCode(habitsArr.status);

                        if (habitsArr.status >= 200 && habitsArr.status <= 299) {
                            setListItems(await habitsArr.json());
                        }

                        const UserInfo = await getUserDetails(token);

                        if (UserInfo.status >= 200 && UserInfo.status <= 299) {
                            setUserInfo(await UserInfo.json());
                        }
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

    if (!token) {
        return <Error404 />
    }
    if (token) {
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
                            initial={{ position: "absolute", zIndex: 2, y: -300, opacity: 0 }}
                            animate={{ position: "absolute", zIndex: 2, y: 0, opacity: 1 }}
                            exit={{ position: "absolute", zIndex: 2, y: -300, opacity: 0 }}
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
                                                    <ListItems item={itemval} token={token} callAdd={callAdd} setCallAdd={setCallAdd} setShowDes={setShowDes} setModal={setModal} setHabitObj={setHabitObj} />
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