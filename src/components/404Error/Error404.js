import { ReactComponent as Err404 } from './404.svg';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Error404.css';
import { motion } from 'framer-motion/dist/framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Error401() {

    const navigate = useNavigate();
    
    return (
        <motion.div 
            className='err401Main'
            initial={{scale: 0.8}}
            animate={{scale: 1}}
            exit={{opacity: 0}}
            transition={{ ease: "easeInOut"}}
        >
            <Err404 />
            <motion.button onClick={() => navigate(-1)} whileTap={{scale: 0.9}}><FontAwesomeIcon className='arrowIcon' icon={faArrowLeft} />Go Back </motion.button>
        </motion.div>
    );
}
