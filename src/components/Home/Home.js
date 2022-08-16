import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { ReactComponent as Construction } from './Construction.svg';
import { motion } from "framer-motion/dist/framer-motion";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem('Token'));
    if (token) {
      navigate('/dashboard');
    }
  }, [])


  return (
    <motion.div 
      className='homeMain'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{ ease: 'easeInOut'}}
    >
      <h2>Home Page Under Construction...</h2>
      <Construction className="icon" />
    </motion.div>
  )
}
