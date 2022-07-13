import React, { useEffect, useRef, useState } from "react";
import ListItems from './List_Items';
import { fetctHabits } from "../services/fetchHabits";
import { delHabits } from "../services/delHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../services/getUserDetails";
import { ThreeDots } from 'react-loader-spinner'

const Home = () => {
    const location = useLocation();
    let token = location.state.token;
    const navigate = useNavigate();

    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [logOut, setLogOut] = useState(false);
    const [loaded, setLoaded] = useState(true);

    const timeInSec = moment().endOf('day').valueOf();
    const Interval = timeInSec - Date.now();

    useEffect(() => {
        const timer = setInterval(() => {
            setCallAdd(!callAdd);
        }, Interval)

        return () => {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        const timer2 = setTimeout(() => {
            async function habits() {
                try {
                    const habitsArr = await fetctHabits(token);
                    setListItems(habitsArr);
                    const UserInfo = await getUserDetails(token);
                    setUserInfo(UserInfo);
                    setLoaded(false);
                }
                catch (error) {
                    console.log(error);
                }
            }
            habits();
        }, 1500)

        return () => {
            clearTimeout(timer2);
        }
    }, [callAdd]);

    let modalRef = useRef();

    useEffect(() => {

        let handler = (e) => {
            if (!modalRef.current.contains(e.target)) {
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
            <div ref={modalRef} id={logOut ? "showLogOutModal" : null} className="logOutCard">
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

    async function DeList(id) {

        try {
            await delHabits(id, token);
            setCallAdd(!callAdd);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div >
            <Log_out />
            <div id={logOut ? "container" : null} className="card">
                <div className="homeUpper">
                    <Link className="addIcon" to="/dashboard/add" replace={true} state={token}><FontAwesomeIcon icon={faAdd} /></Link>
                    <span>{!userInfo.name? <ThreeDots color="#590C69" width={20} height={20} /> : userInfo.name}</span>
                    <span className="logOutIcon" onClick={() => setLogOut(true)} ><FontAwesomeIcon icon={faSignOut} /></span>
                </div>
                <h1>Habits List</h1>
                {
                    loaded ?
                        <div className="loader">
                            <ThreeDots color="#590C69" height={60} width={60} />
                        </div>
                        :
                        <ul className="item_list">
                            {listItems.map((itemval) => {
                                return (
                                    <div key={itemval._id} ><ListItems id={itemval._id} list_name={itemval.name} list_desc={itemval.description} streak={itemval.streak} done={itemval.done} callAdd={callAdd} token={token} setCallAdd={setCallAdd} onSelect={DeList} /></div>
                                );
                            })}

                        </ul>
                }
            </div>
        </div>
    );

}

export default Home;