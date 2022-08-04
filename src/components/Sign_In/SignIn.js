import React, { useEffect, useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from '../../services/signIn';
import { motion } from 'framer-motion/dist/framer-motion';
import { signInWithGoogle } from '../../services/signInWithGoogle';
import { ReactComponent as Google } from './google.svg';
import { SignInWithGoogle } from '../../Firebase';
import { RotatingLines } from 'react-loader-spinner';

const SignIn = () => {

    const navigate = useNavigate();

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPass, setSignInPass] = useState("");
    const [signInLoad, setSignInLoad] = useState(true);
    const [googleSignInLoad, setGoogleSignInLoad] = useState(true);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    let reqStatusCode = 0;


    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('Token'));
        if (token) navigate(-1);

    }, []);

    const data = {
        email: signInEmail,
        password: signInPass
    }

    async function sign_In() {

        setSignInLoad(false);

        try {
            setErrMessage("");
            const res = await signIn(data);
            reqStatusCode = res.status;

            if (reqStatusCode >= 200 && reqStatusCode <= 299) {
                const token = await res.json();
                setSignInEmail('');
                setSignInPass('');
                setError(false);
                setSignInLoad(true);
                localStorage.setItem('Token', JSON.stringify(token));
                navigate('/dashboard', { replace: true });
            }
            else if (reqStatusCode === 400) {
                setErrMessage("Oops something wrong! You may provide a wrong email or an empty password field");
                setSignInLoad(true);
                setError(true);
            }
            else if (reqStatusCode === 404) {
                setErrMessage("Oops something wrong! This email is not linked with any account. Please Sign Up first");
                setSignInLoad(true);
                setError(true);
            }

        } catch (error) {
            console.log(error);
            setSignInLoad(true);
        }
    }

    async function sign_In_Google(data) {

        setGoogleSignInLoad(false);

        try {
            setErrMessage("");
            const res = await signInWithGoogle(data);
            const token = await res.json();
            setError(false);
            setGoogleSignInLoad(true);
            localStorage.setItem('Token', JSON.stringify(token));
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.log(error);
            setGoogleSignInLoad(true);
        }
    }

    const OnSuccess = async () => {

        const userDataByGoogle = await SignInWithGoogle();

        sign_In_Google(userDataByGoogle);

    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="SignInCard"
        >
            <h1>Sign In</h1>

            {error && (
                <motion.p
                    className='errText'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {errMessage}
                </motion.p>
            )}

            <div className="signIn_inputs">
                <input type="email" value={signInEmail} placeholder="Enter email here..." onChange={(e) => setSignInEmail(e.target.value)} autoFocus />
                <input type="password" value={signInPass} placeholder="Enter password here..." onChange={(e) => setSignInPass(e.target.value)} />
                {
                    signInLoad ?
                        <motion.button onClick={() => { sign_In() }} className="signInButton" whileTap={{ scale: 0.9 }} >Sign In</motion.button>
                        :
                        <button className="signInButton" >
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="20"
                                visible={true}
                            />
                        </button>
                }
            </div>
            <div className='signInBottomLine'>
                <span>Don't have an account</span>
                <Link to={"/SignUp"} replace>Sign Up</Link>
            </div>
            <span className='orText'>Or</span>
            {
                googleSignInLoad ?
                    <motion.button className='googleSignInBtn' onClick={OnSuccess} whileTap={{ scale: 0.9 }} >
                        <Google />
                        Sign In with Google
                    </motion.button>
                    :
                    <button className='googleSignInBtn'>
                        <RotatingLines
                            strokeColor="gray"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="20"
                            visible={true}
                        />
                    </button>
            }
        </motion.div>
    );
}

export default SignIn;

