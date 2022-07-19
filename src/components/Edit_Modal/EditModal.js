import React, { useState } from 'react';
import './EditModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateHabit } from '../../services/updateHabit';
import { motion } from 'framer-motion';

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
                navigate('/dashboard', { state: token, replace: true });
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
        <motion.div
            initial={{scale:0.2}}
            animate={{scale:1}}
            exit={{opacity:0}}
            transition={{type:"spring", bounce:0.25, ease: "easeInOut"}}
            className="modalCard"
        >
            <Link className="cancelIcon" to="/dashboard" replace={true} state={token}> <FontAwesomeIcon icon={faTimesCircle} /></Link>
            <h1>Edit Habit</h1>
            <p>(Add new credentials)</p>
            {empty ? <p>Please! enter a new name or description</p> : null}
            <div className="edit_inputs">
                <input type="text" value={editName} placeholder="Enter name here..." onChange={(e) => setEditName(e.target.value)} autoFocus />
                <input type="text" value={editDesc} placeholder="Enter description here..." onChange={(e) => setEditDesc(e.target.value)} />
                <button onClick={() => { UpdateHabit() }} className="editButton">edit</button>
            </div>
        </motion.div>
    );
}

export default EditModal;