import React, { useEffect, useState } from "react";
import ListItems from './List_Items';
import { fetctHabits } from "../services/fetchHabits";
import { delHabits } from "../services/delHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../services/getUserDetails";

const Home = () => {
    const location = useLocation();
    const token = location.state.token;

    const [callAdd, setCallAdd] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const timeInSec = moment().endOf('day').valueOf();
    const Interval = timeInSec - Date.now();
    
    useEffect( () => {
        const timer = setInterval( () => {
            console.log(Interval);
            setCallAdd(!callAdd);
        }, Interval)

        return () => {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        async function habits() {
            try {
                const habitsArr = await fetctHabits(token);
                setListItems(habitsArr);
                const UserInfo = await getUserDetails(token);
                setUserInfo(UserInfo);
            }
            catch (error) {
                console.log(error);
            }
        }
        habits();
    }, [callAdd]);


    async function DeList(id) {

        try {
            await delHabits(id, token);
            setCallAdd(!callAdd);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="homeUpper">
                        <Link className="addIcon" to="/add" state={token}><FontAwesomeIcon icon={faAdd} /> </Link>
                        <span>{userInfo.name}</span>
                        <Link className="logOutIcon" to={"/signin"}><FontAwesomeIcon icon={faSignOut} /></Link>
                    </div>
                    <h1>Habits List</h1>
                    <ul className="item_list">
                        {listItems.map((itemval) => {
                            return (
                                <div key={itemval._id} ><ListItems id={itemval._id} list_name={itemval.name} list_desc={itemval.description} streak={itemval.streak} done={itemval.done} callAdd={callAdd} token={token} setCallAdd={setCallAdd} onSelect={DeList} /></div>
                            );
                        })}

                    </ul>
                </div>
            </div>
        </div>
    );

}

export default Home;