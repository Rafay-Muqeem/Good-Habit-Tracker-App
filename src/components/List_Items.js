import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faInfo } from '@fortawesome/free-solid-svg-icons';
import { doneHabit } from "../services/doneHabit";
import { delHabits } from "../services/delHabits";

async function doneHabits(id, token, callAdd, setCallAdd, setDoneLoad) {
    setDoneLoad(false);
    try {
        await doneHabit(id, token);
        setTimeout( () => {
            setDoneLoad(true);
        }, 1000);
        setCallAdd(!callAdd);
    } catch (error) {
        console.log(error);
        setDoneLoad(true);
        setCallAdd(!callAdd);
    }
}

async function DeList(id, token, callAdd, setCallAdd, setDeleteLoad) {
    setDeleteLoad(false);
    try {
        await delHabits(id, token);
        setTimeout( () => {
            setDeleteLoad(true);
        }, 1000);
        setCallAdd(!callAdd);
    } catch (error) {
        console.log(error);
        setDeleteLoad(true);
        setCallAdd(!callAdd);
    }

}

const List_Items = (props) => {

    const [doneLoad, setDoneLoad] = useState(true);
    const [deleteLoad, setDeleteLoad] = useState(true);

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
    return (

        <li id={props.item._id} >
            <div className="content">
                <div className="upper">

                    {
                        !doneLoad ?
                            // <div className="doneLoader">
                                
                            // </div>
                            <span className="skeletonDoneAnimation"></span>
                            :
                            props.item.done ?
                                <span id="check" className="done" ><FontAwesomeIcon icon={faCheck} /></span> :
                                <span className="done" onClick={() => { doneHabits(props.item._id, props.token, props.callAdd, props.setCallAdd, setDoneLoad) }}></span>

                    }

                    <span className="name">{props.item.name}</span>

                    <span onClick={() => { props.setShowDes(true); props.setModal(true); props.setHabitObj(props.item) }} className="showDesc"> <FontAwesomeIcon icon={faInfo} /></span>

                    {
                        !deleteLoad ?
                            // <div className="deleteLoader">
                            //     <TailSpin color="red" width={25} height={25} />
                            // </div>
                            <span className="skeletonDeleteAnimation"></span>
                            :
                            <span onClick={() => { DeList(props.item._id, props.token, props.callAdd, props.setCallAdd, setDeleteLoad) }} className="delete"><FontAwesomeIcon icon={faTrash} /></span>
                    }

                </div>

            </div>
        </li>

    );
};

export default List_Items;