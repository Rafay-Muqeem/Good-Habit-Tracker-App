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

const Dashboard = () => {

    const navigate = useNavigate();

    const { dispatch } = State()
    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [modal, setModal] = useState(false);
    const [habitObj, setHabitObj] = useState({});
    const [Token, setToken] = useState('');

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

                    if (habitsArr.status === 401) {
                       
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

    }, [callAdd, Token]);

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
                            animate={{ position: "absolute", zIndex: 2, x: 0, y: 100, opacity: 1 }}
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