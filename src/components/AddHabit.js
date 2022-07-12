import React, {useState} from "react";
import { addHabits } from "../services/addHabits";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";

const AddHabit = () => {

    const location = useLocation();
    const token = location.state;

    const [inputName,setInputName] = useState("");
    const [inputDesc,setInputDesc] = useState("");
    
    async function addHabit(){

        if (inputName.length > 2 && inputDesc.length > 4 ) {

            const data = {
                name : inputName,
                description: inputDesc
            }
            
            try {
                await addHabits(token, data);
                // console.log(response);
                
            } catch (error) {
                console.log(error);
            }


            setInputName("");
            setInputDesc("");

        }

    };

    return(
        <div>
            <div className="card">
                <Link className="listIcon" to="/dashboard" replace={true} state={{token: token}}> <FontAwesomeIcon icon={faListCheck} /></Link>
                <h1>Add Habit</h1>
                <div className="task_inputs">
                    <input type="text" value={inputName} placeholder="Enter name here..." onChange={(e) => setInputName(e.target.value) } />
                    <input type="text" value={inputDesc} placeholder="Enter description here..." onChange={(e) => setInputDesc(e.target.value) } />
                    <button onClick={addHabit} className="add_button">add</button>
                </div>
            </div>
        </div>
    );
}

export default AddHabit;