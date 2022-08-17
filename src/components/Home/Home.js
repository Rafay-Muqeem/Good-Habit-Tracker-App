import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { ReactComponent as BackImage } from './BackImage.svg';
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
      <div className='text'>
        <h2>Track yourself</h2>
        <h2>in a smart way.</h2>
      </div>
      <div className='backImage'>
          <BackImage className="image"/>
      </div>
    </motion.div>
  )
}
