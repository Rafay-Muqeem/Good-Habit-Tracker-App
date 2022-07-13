import React, { useState } from 'react';
import './EditModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateHabit } from '../../services/updateHabit';

const EditModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [empty, setEmpty] = useState(false);

    const id = location.state.id;
    const token = location.state.token;

    const data = {
        name: editName,
        description: editDesc
    }

    async function UpdateHabit() {
        try {
            if (editName !== '' || editDesc !== '') {
                await updateHabit(id, data, token);
                setEditName('');
                setEditDesc('');
                navigate('/dashboard', { state: { token: token } });
                setEmpty(false)
            }
            else{
                setEmpty(true);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="modalCard">
            <Link className="cancelIcon" to="/dashboard" replace={true} state={{ token: token }}> <FontAwesomeIcon icon={faTimesCircle} /></Link>
            <h1>Edit Habit</h1>
            <p>(Add new credentials)</p>
            {empty ? <p>Please! enter a new name or description</p> : null}
            <div className="edit_inputs">
                <input type="text" value={editName} placeholder="Enter name here..." onChange={(e) => setEditName(e.target.value)} />
                <input type="text" value={editDesc} placeholder="Enter description here..." onChange={(e) => setEditDesc(e.target.value)} />
                <button onClick={() => { UpdateHabit() }} className="editButton">edit</button>
            </div>
        </div>
    );
}

export default EditModal;