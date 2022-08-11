import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as Logo } from './Logo.svg';
import { ReactComponent as Menu } from './Menu.svg';
import { ReactComponent as DropDown } from './DropDown.svg';
import { ReactComponent as User } from './User.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { State } from '../../state/Context';

export default function Navbar() {

    const navigate = useNavigate();
    const navRef = useRef();
    const mainMenuRef = useRef();
    const dropDownRef = useRef();

    const { state, dispatch } = State();
    const [logOutMenuOpen, setLogOutMenuOpen] = useState(false);
    const [logInMenuOpen, setLogInMenuOpen] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    
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
        const token = JSON.parse(localStorage.getItem('Token'));
        dispatch({ type: 'SET_TOKEN', payload: token });
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) dispatch({ type: 'SET_USER', payload: user });
    }, [state.userToken]);

    // console.log(state.userInfo);

    return (
        <div ref={navRef} className='navbar'>

            <div className='navLeft'>
                <Logo />
                <h1>Habit Tracker</h1>
            </div>
            {
                !state.userToken ?
                    <motion.div
                        className='navRightLogOut'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.25, ease: "easeInOut" }}
                    >
                        <div className='mainMenu'>
                            <button onClick={() => navigate('/signin')}>Sign In</button>
                            <button onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                        <div className='mobileMenu'>
                            <Menu onClick={() => setLogOutMenuOpen(!logOutMenuOpen)} />
                        </div>

                    </motion.div>

                    :

                    <motion.div
                        className='navRightLogIn'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.25, ease: "easeInOut" }}
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
                                            onClick={() => {
                                                dispatch({ type: 'RESET' });
                                                localStorage.removeItem('Token');
                                                localStorage.removeItem('User');
                                                setDropDown(false);
                                                navigate('/');
                                            }}
                                        >
                                            <span >Sign Out</span>
                                            <FontAwesomeIcon icon={faSignOut} />
                                        </motion.div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>

                        <div className='mobileMenu'>
                            <Menu onClick={() => setLogInMenuOpen(!logInMenuOpen)} />
                        </div>

                    </motion.div>

            }

            <AnimatePresence>
                {logOutMenuOpen && (
                    <motion.div
                        className='navLogOutMobileMenu'
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
                    >
                        <span onClick={() => { navigate('/signin'); setLogOutMenuOpen(false) }}>Sign In</span>
                        <span onClick={() => { navigate('/signup'); setLogOutMenuOpen(false) }}>Sign Up</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {logInMenuOpen && (
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
                        <div className='logOut'
                            onClick={() => {
                                dispatch({ type: 'RESET' });
                                setLogInMenuOpen(false);
                                localStorage.removeItem('Token');
                                localStorage.removeItem('User');
                                setDropDown(false);
                                navigate('/');
                            }}
                        >
                            <span>Sign Out</span><FontAwesomeIcon icon={faSignOut} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    )
}
