import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as Logo } from './Logo.svg';
import { ReactComponent as DropDown } from './DropDown.svg';
import { ReactComponent as User } from './User.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { State } from '../../state/Context';
import Menu from '../MenuIcon/Menu';
import { SignOut } from '../../Firebase';

export default function Navbar() {

    const navigate = useNavigate();
    const navRef = useRef();
    const mainMenuRef = useRef();
    const dropDownRef = useRef();

    const { state, dispatch } = State();
    const [dropDown, setDropDown] = useState(false);


    useEffect(() => {
        const timer = setInterval(() => {

            if (state.userToken) {
                const sessExp = JSON.parse(localStorage.getItem('sessionExp'));

                if (Date.now() >= sessExp) {
                    dispatch({ type: "RESET" });
                    dispatch({ type: 'SET_SESSION_EXP', payload: true });
                    localStorage.removeItem('User');
                    localStorage.removeItem('Token');
                    localStorage.removeItem('sessionExp');
                    navigate('/signin');
                }

            }
        }, 5 * 1000);

        return () => clearInterval(timer);
    });

    useEffect(() => {

        let handler = (e) => {

            if (dropDown && !mainMenuRef.current.contains(e.target) && !dropDownRef.current.contains(e.target)) {
                setDropDown(false);
            }

        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    useEffect(() => { 
        console.log(localStorage.getItem('Token'))
        if (localStorage.getItem('Token')) {
            const token = JSON.parse(localStorage.getItem('Token'));
            dispatch({ type: 'SET_TOKEN', payload: token });
            const user = JSON.parse(localStorage.getItem('User'));
            if (user) dispatch({ type: 'SET_USER', payload: user });
        }
    }, []);

    const sign_out = async() => {
        if (state.userInfo.emailVerifiedByGoogle) {
            try {
                await SignOut();
                dispatch({ type: 'RESET' });
                localStorage.removeItem('Token');
                localStorage.removeItem('User');
                localStorage.removeItem('sessionExp');
                setDropDown(false);
                navigate('/');

            } catch (error) {
                console.log(error);
            }

        }
        else {
            dispatch({ type: 'RESET' });
            localStorage.removeItem('Token');
            localStorage.removeItem('User');
            localStorage.removeItem('sessionExp');
            setDropDown(false);
            navigate('/');
        }
    }

    return (
        <div ref={navRef} className='navbar'>

            <div onClick={() => navigate('/')} className='navLeft'>
                <Logo />
                <h1>Habit Tracker</h1>
            </div>
            {
                !state.userToken ?

                    <motion.div
                        className='navRightLogOut'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeInOut" }}
                    >
                        <div className='mainMenu'>
                            <button onClick={() => navigate('/signin')}>Sign In</button>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                        <div onClick={() => dispatch({ type: 'SET_MOBILE_MENU', payload: !state.mobileMenu })} className='mobileMenu'>
                            <Menu />
                        </div>

                    </motion.div>

                    :

                    <motion.div
                        className='navRightLogIn'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeInOut" }}
                    >

                        {
                            Object.keys(state.userInfo).length === 0 ?

                                <div className='SkeletonAnimationMainMenu'>
                                    <span className='picSkeleton'></span>
                                    <span className='nameSkeleton'></span>
                                    <span className='dropDownSkeleton'></span>
                                </div>
                                :
                                <div ref={mainMenuRef} onClick={() => setDropDown(!dropDown)} className='mainMenu'>
                                    <User className="userSvg" />
                                    <span>{state.userInfo.name}</span>
                                    {
                                        !dropDown ?
                                            <motion.span
                                                animate={{ rotate: 0 }}
                                                transition={{ ease: 'easeInOut' }}
                                            >
                                                <DropDown onClick={() => setDropDown(!dropDown)} className="dropDownSvg" />
                                            </motion.span>
                                            :
                                            <motion.span
                                                animate={{ rotate: -180 }}
                                                transition={{ ease: 'easeInOut' }}
                                            >
                                                <DropDown className="dropDownSvg" />
                                            </motion.span>
                                    }
                                </div>
                        }
                        <AnimatePresence>
                            {
                                dropDown && (
                                    <motion.div
                                        ref={dropDownRef}
                                        className='dropDownMenu'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ ease: 'easeInOut' }}
                                    >
                                        <motion.div
                                            whileHover={{ opacity: 0.7 }}
                                            transition={{ ease: 'easeInOut' }}
                                            onClick={() => sign_out()}
                                        >
                                            <span >Sign Out</span>
                                            <FontAwesomeIcon icon={faSignOut} />
                                        </motion.div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>

                        <div onClick={() => dispatch({ type: 'SET_MOBILE_MENU', payload: !state.mobileMenu })} className='mobileMenu'>
                            <Menu />
                        </div>

                    </motion.div>

            }

            <AnimatePresence>
                {state.mobileMenu && (

                    !state.userToken ?
                        <motion.div
                            className='navLogOutMobileMenu'
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ ease: "easeInOut" }}
                        >
                            <span onClick={() => { navigate('/signin'); dispatch({ type: 'SET_MOBILE_MENU', payload: false }) }}>Sign In</span>
                            <span onClick={() => { navigate('/signup'); dispatch({ type: 'SET_MOBILE_MENU', payload: false }) }}>Sign Up</span>
                        </motion.div>

                        :

                        <motion.div
                            className='navLogInMobileMenu'
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ ease: "easeInOut" }}
                        >
                            <div className='intro'>
                                <User className='userSvg' />
                                <span>{state.userInfo.name}</span>
                            </div>
                            <motion.div className='logOut'
                                onClick={() => sign_out()}
                            >
                                <span>Sign Out</span><FontAwesomeIcon icon={faSignOut} />
                            </motion.div>
                        </motion.div>
                )}
            </AnimatePresence>

        </div>

    )
}
