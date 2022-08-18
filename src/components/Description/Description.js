import React, { useEffect, useRef, useState } from "react";
import './Description.css';
import { updateHabit } from '../../services/updateHabit';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Description(props) {

  const [edit, setEdit] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(true);
  const [editName, setEditName] = useState(props.habitObj.name);
  const [editDesc, setEditDesc] = useState(props.habitObj.description);
  const desModalRef = useRef();
  const editFormRef = useRef();

  const data = {
    name: editName,
    description: editDesc
  }

  const weekDays = [
    { day: "SUN", done: false, current: false },
    { day: "MON", done: false, current: false },
    { day: "TUE", done: false, current: false },
    { day: "WED", done: false, current: false },
    { day: "THU", done: false, current: false },
    { day: "FRI", done: false, current: false },
    { day: "SAT", done: false, current: false }
  ];

  async function UpdateHabit() {
    setUpdateLoad(false);
    try {
      if (editName !== '' && props.token) {
        const res = await updateHabit(props.habitObj._id, data, props.token);
        props.setCallAdd(!props.callAdd);
        await props.setHabitObj(res.habit);
        setEditName(res.habit.name);
        setEditDesc(res.habit.description);
        setTimeout(() => {
          setUpdateLoad(true);
        }, 1000)
        setEdit(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getWeekData = (habit) => {
    if (habit) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < habit.weeklyRecord.length; j++) {
          if (habit.weeklyRecord[j] === i) {
            weekDays[i].done = true;
          }
        }
        if ((new Date()).getDay() === i) {
          weekDays[i].current = true;
        }
      }
    }

    return weekDays;
  }

  useEffect(() => {

    let handler = (e) => {
      if (props.showDes && !desModalRef.current.contains(e.target)) {
        props.setShowDes(false);
        props.setModal(false);
      }
      else if (edit && !editFormRef.current.contains(e.target) && desModalRef.current.contains(e.target)) {
        UpdateHabit();
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  })

  useEffect(() => {

    let handler = (e) => {

      if (e.keyCode === 13) {
        UpdateHabit()
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    }
  })

  let week;

  if (props.habitObj) {
    week = getWeekData(props.habitObj, weekDays);
  }

  if (props.habitObj) {
    return (
      <div ref={desModalRef} className="desCard">
        <div className="desUpper">
          <span className="backIcon" onClick={() => { props.setShowDes(false); props.setModal(false) }}><FontAwesomeIcon icon={faTimesCircle} /></span>
          <span className="editIcon" onClick={() => setEdit(true)}><FontAwesomeIcon icon={faEdit} /></span>
        </div>
        <div ref={editFormRef} id="skeletonEditFormAnimation" className="desMain">

          <AnimatePresence>
            {
              !edit ?

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >

                  {props.habitObj.name}

                </motion.h2>

                :

                !updateLoad ?
                  <span className="nameSkeletonAnimation"></span>
                  :
                  <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    size={editName.length > 0 ? editName.length : 1}
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value.length < 15 ? e.target.value : editName)} autoFocus
                  />

            }

          </AnimatePresence>

          <AnimatePresence>

            {!edit ?

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {props.habitObj.description === '' ?
                  "No Description"
                  :
                  props.habitObj.description
                }
              </motion.p>


              :

              !updateLoad ?
                <span className="descSkeletonAnimation"></span>
                :
                <motion.input
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  size={35}
                  type="text" value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />

            }
          </AnimatePresence>
        </div>
        <div className="weeklyRecord">
          {week.map((dayObj, ind) => {

            if (dayObj.done) {
              if (dayObj.current) {
                return (
                  <span key={ind} className="currentAndDoneDay">{dayObj.day}</span>
                );
              }
              return (
                <span key={ind} className="doneDay">{dayObj.day}</span>
              );
            }
            else {
              if (dayObj.current) {
                return (
                  <span key={ind} className="currentAndUnDoneDay">{dayObj.day}</span>
                );
              }
              return (
                <span key={ind} className="unDoneDay">{dayObj.day}</span>
              );
            }

          })}
        </div>
        {/* {props.habitObj.streak === 0 || props.habitObj.streak === 1 ? <p>No Streak Yet</p> : <p>Habit's Streak is <b style={{color: 'blue'}}>{props.habitObj.streak} Days</b></p>} */}
        
        <div className="streak">
          <span>Habit's Streak</span>
          <span>{props.habitObj.streak}</span>
        </div>
      </div>
    );
  }

}

export default Description;

