import { ReactComponent as Err404 } from './404.svg';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Error404.css';
import { motion } from 'framer-motion/dist/framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Error401() {

    const navigate = useNavigate();

    const signIn = () => {
        navigate('/signin', {replace: true});
    }
    
    return (
        <motion.div 
            className='err401Main'
            initial={{scale: 0.8}}
            animate={{scale: 1}}
            exit={{opacity: 0}}
            transition={{type:'spring', bounce: 0.25, duration: 0.5, ease: "easeInOut"}}
        >
            <Err404 />
            <motion.button onClick={signIn} whileTap={{scale: 0.9}}> Sign In <FontAwesomeIcon className='arrowIcon' icon={faArrowRight} /></motion.button>
        </motion.div>
    );
}
