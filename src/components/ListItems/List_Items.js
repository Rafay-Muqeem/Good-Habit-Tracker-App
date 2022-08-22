import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { delHabits } from "../../services/delHabits";
import './List_Items.css';
import { State } from "../../state/Context";
import { doneHabit } from "../../services/doneHabit";

const List_Items = (props) => {

    const { state, dispatch } = State()
    const [doneLoad, setDoneLoad] = useState(true);

    const weekDays = [
        { day: "SUN", done: false, current: false },
        { day: "MON", done: false, current: false },
        { day: "TUE", done: false, current: false },
        { day: "WED", done: false, current: false },
        { day: "THU", done: false, current: false },
        { day: "FRI", done: false, current: false },
        { day: "SAT", done: false, current: false }
    ];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < props.item.weeklyRecord.length; j++) {
            if (props.item.weeklyRecord[j] === i) {
                weekDays[i].done = true;
            }
        }
        if ((new Date()).getDay() === i) {
            weekDays[i].current = true;

        }
    }

    let delTimer;

    function handleDel(id) {

        dispatch({ type: 'SET_DELETE', payload: { id: id, message: true } });

        delTimer = setTimeout(() => {
            dispatch({ type: 'SET_DELETE', payload: { id: '', message: false } });
            DeList(id);
        }, 5000)

        props.setDelTimer(delTimer);
    }

    async function DeList(id) {
        try {
            await delHabits(id, state.userToken);
            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
        }
    }

    let doneTimer;

    async function doneHabits(id) {

        setDoneLoad(false);

        try {
            await doneHabit(id, state.userToken);

            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });

        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
        }

        dispatch({ type: 'SET_DONE', payload: { id: id, message: true } });

        setDoneLoad(true);

        doneTimer = setTimeout(() => {
            dispatch({ type: 'SET_DONE', payload: { message: false } });
        }, 5000)

        props.setDoneTimer(doneTimer);

    }

    useEffect(() => {
        return () => {
            clearTimeout(doneTimer);
            clearTimeout(delTimer);
        }
    }, [])

    return (

        <li id={props.item._id} >
            <div className="content">
                <div className="upper">

                    {
                        !doneLoad ?
                            <span className="skeletonDoneAnimation"></span>
                            :
                            props.item.done ?
                                <span id="check" className="done" ><FontAwesomeIcon icon={faCheck} /></span> :
                                <span className="done" onClick={() => { doneHabits(props.item._id) }}></span>
                    }

                    <span className="name">{props.item.name}</span>

                    <span onClick={() => { props.setShowDes(true); props.setModal(true); props.setHabitObj(props.item) }} className="showDesc"> <FontAwesomeIcon icon={faInfo} /></span>

                    <span onClick={() => { handleDel(props.item._id) }} className="delete"><FontAwesomeIcon icon={faTrash} /></span>

                </div>

            </div>
        </li>

    );
};

export default List_Items;