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
    let errMessage = "";

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
            const token = await res.json();
            if (res.status >= 200 && res.status <= 299) {
                setSignInEmail('');
                setSignInPass('');
                setError(false);
                navigate('/dashboard', { replace: true, state: token });
            }
            else if (res.status === 400) {
                errMessage = "Oops something wrong! You may provide a wrong email or an empty password field";
                setError(true);
            }
            else if (res.status === 404) {
                errMessage = "Oops something wrong! This email is not linked to any account. please Sign up first";
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
            {!error ? null : <p>{errMessage}</p>}
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

