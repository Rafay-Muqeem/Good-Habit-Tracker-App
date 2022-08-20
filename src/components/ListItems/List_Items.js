import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { delHabits } from "../../services/delHabits";
import './List_Items.css';
import { State } from "../../state/Context";
import { doneHabit } from "../../services/doneHabit";

async function DeList(id, token, setDeleteLoad, state, dispatch) {
    setDeleteLoad(false);
    try {
        await delHabits(id, token);
        setTimeout(() => {
            setDeleteLoad(true);
        }, 1000);
        dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
    } catch (error) {
        console.log(error);
        setDeleteLoad(true);
        dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
    }

}

const List_Items = (props) => {

    const { state, dispatch } = State()
    const [deleteLoad, setDeleteLoad] = useState(true);
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

    let timer;

    async function doneHabits(id) {

        setDoneLoad(false);

        try {
            await doneHabit(id, state.userToken);

            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });

        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_REFRESH_DASHBOARD', payload: !state.refreshDashboard });
        }

        dispatch({ type: 'SET_DONE_MESSAGE', payload: true })
        setDoneLoad(true);

        timer = setTimeout(() => {
            dispatch({ type: 'SET_DONE_MESSAGE', payload: false })
            dispatch({ type: 'SET_DONE_ID', payload: '' });
        }, 5000)

    }

    useEffect( () => {
        return () => clearTimeout(timer);
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
                                <span className="done" onClick={() => { dispatch({ type: 'SET_DONE_ID', payload: props.item._id }); doneHabits(props.item._id)}}></span>

                    }

                    <span className="name">{props.item.name}</span>

                    <span onClick={() => { props.setShowDes(true); props.setModal(true); props.setHabitObj(props.item) }} className="showDesc"> <FontAwesomeIcon icon={faInfo} /></span>

                    {
                        !deleteLoad ?
                            <span className="skeletonDeleteAnimation"></span>
                            :
                            <span onClick={() => { DeList(props.item._id, props.token, setDeleteLoad, state, dispatch) }} className="delete"><FontAwesomeIcon icon={faTrash} /></span>
                    }

                </div>

            </div>
        </li>

    );
};

export default List_Items;