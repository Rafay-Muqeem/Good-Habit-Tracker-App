import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEdit, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { doneHabit } from "../services/doneHabit";
import { Link } from "react-router-dom";

async function doneHabits(id, token, callAdd, setCallAdd) {
    // CheckList(id);

    try {
        await doneHabit(id, token);
        setCallAdd(!callAdd);
    } catch (error) {
        console.log(error);
    }
}

// const CheckList = (li_id) => {
//     var active_span = document.getElementById("#checked" + li_id);
//     active_span.classList.toggle("active");

//     var strike = document.getElementById("#strike" + li_id);
//     strike.classList.toggle("strike-none");

// };

const List_Items = (props) => {

    const [show, setShow] = useState(false);

    return (

        <li id={props.id}>
            <div className="content">

                <div className="upper">
                    {/* <span id={`#checked${props.id}`} onClick={() => { doneHabits(props.id, props.callAdd, props.setCallAdd) }}><FontAwesomeIcon icon={faCheck} /></span> */}
                    {props.done? 
                    <span id="check" className="done" ><FontAwesomeIcon icon={faCheck} /></span>:
                    <span className="done" onClick={() => { doneHabits(props.id, props.token, props.callAdd, props.setCallAdd) }}></span>
                    }
                    {/* <strike id={`#strike${props.id}`} className="strike-none">{props.list_name}</strike> */}
                    <span className="name">{props.list_name}</span>
                    {!show? 
                    <span onClick={() => { setShow(true) }} className="showDesc"><FontAwesomeIcon icon={faAngleDown} /></span>:
                    <span onClick={() => { setShow(false) }} className="showDesc"><FontAwesomeIcon icon={faAngleUp} /></span>
                    }
                    <Link className="edit" to={`/edit/${props.id}`} state={{id: props.id, token: props.token}}><FontAwesomeIcon icon={faEdit} /></Link>
                    <span onClick={() => { props.onSelect(props.id); }} className="delete"><FontAwesomeIcon icon={faTrash} /></span>
                </div>
                <div className={show ? "lower" : "disNone"}>
                    <p>{props.list_desc}</p>
                    {props.streak == 0 ? <p>No Streak Yet</p> : <p>Habit's Streak is {props.streak} days</p>}
                </div>

            </div>

        </li>

    );

};

export default List_Items;