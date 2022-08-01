import React, { useEffect, useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from '../../services/signIn';
import { motion } from 'framer-motion/dist/framer-motion';
import { signInWithGoogle } from '../../services/signInWithGoogle';
import { ReactComponent as Google } from './google.svg';
import { SignInWithGoogle } from '../../Firebase';

const SignIn = () => {

    const navigate = useNavigate();

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPass, setSignInPass] = useState("");
    const [error, setError] = useState(false);
    const [resMessage, setResMessage] = useState("");

    let reqStatusCode = 0;

    const data = {
        email: signInEmail,
        password: signInPass
    }

    useEffect(() => {
        const handler = (e) => {
            if (e.keyCode === 13) {
                sign_In();
            }
        }
        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        }
    })

    async function sign_In() {
        try {
            const res = await signIn(data);
            reqStatusCode = res.status;
            if (reqStatusCode >= 200 && reqStatusCode <= 299) {
                const token = await res.json();
                setSignInEmail('');
                setSignInPass('');
                setError(false);
                setResMessage("Successfully Sign in");
                navigate('/dashboard', { replace: true, state: token });
            }
            else if (reqStatusCode === 400) {
                console.log("here")
                setResMessage("Oops something wrong! You may provide a wrong email or an empty password field");
                setError(true);
            }
            else if (reqStatusCode === 404) {
                console.log("here")
                setResMessage("Oops something wrong! This email is not linked with any account. please Sign up first");
                setError(true);
            }
            
        } catch (error) {
            console.log(error);            
        }
    }

    async function sign_In_Google(data) {
        try {
            const res = await signInWithGoogle(data);
            const token = await res.json();
            setResMessage("Successfully Sign in");
            navigate('/dashboard', { state: token, replace: true });
        } catch (error) {
            console.log(error);
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
            {error ? <p className='errText'>{resMessage}</p> : <p className='succText'>{resMessage}</p>}
            <div className="signIn_inputs">
                <input type="email" value={signInEmail} placeholder="Enter email here..." onChange={(e) => setSignInEmail(e.target.value)} autoFocus />
                <input type="password" value={signInPass} placeholder="Enter password here..." onChange={(e) => setSignInPass(e.target.value)} />
                <button onClick={() => { sign_In() }} className="signInButton">Sign In</button>
            </div>
            <div className='signInBottomLine'>
                <span>Don't have an account</span>
                <Link to={"/SignUp"} replace>Sign Up</Link>
            </div>
            <span className='orText'>Or</span>
            <button className='googleSignInBtn' onClick={OnSuccess} >
                <Google />
                Sign In with Google
            </button>

        </motion.div>
    );
}

export default SignIn;

