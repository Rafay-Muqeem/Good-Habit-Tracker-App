import React, { useState } from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";
import { signUp } from '../../services/signUp';
import { motion } from 'framer-motion/dist/framer-motion';

const SignUp = () => {

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");
    const [error, setError] = useState(false);
    const [resMessage, setResMessage] = useState(false);

    let reqStatusCode = 0;

    const data = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPass
    }

    async function sign_Up(data) {
        try {
            if (signUpName !== '' && signUpEmail !== '' && signUpPass !== '') {
                const res = await signUp(data);
                reqStatusCode = res.status;

                if (reqStatusCode >= 200 && reqStatusCode <= 299) {
                    setSignUpName('');
                    setSignUpEmail('');
                    setSignUpPass('');
                    setError(false);
                    setResMessage("Successfully Sign up! Now you can Sign in");
                }
                else if( reqStatusCode === 400 ) {
                    setResMessage("Please! Provide correct credentials");
                    setError(true);
                }
                else if( reqStatusCode === 403) {
                    setResMessage("This email is already linked with an account!");
                    setError(true);
                }
            }
            else {
                setResMessage("Please! Fill each field");
                setError(true);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <motion.div
            initial={{ x: -window.innerWidth }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth }}
            transition={{ type: "spring", bounce: 0.25, ease: "easeInOut" }}
            className="SignUpCard"
        >
            <h1>Sign Up</h1>
            {error ? <p className='errText'>{resMessage}</p> : <p className='succText'>{resMessage}</p>}
            <div className="signUp_inputs">
                <input type="text" value={signUpName} placeholder="Enter name here..." onChange={(e) => setSignUpName(e.target.value)} autoFocus />
                <input type="email" value={signUpEmail} placeholder="Enter email here..." onChange={(e) => setSignUpEmail(e.target.value)} />
                <input type="password" value={signUpPass} placeholder="Enter password here..." onChange={(e) => setSignUpPass(e.target.value)} />
                <button onClick={() => { sign_Up(data) }} className="signUpButton">Sign Up</button>
            </div>
            <div className='signUpBottomLine'>
                <p>Already have an account</p>
                <Link to={"/SignIn"} replace>Sign In</Link>
            </div>
        </motion.div>
    );
}

export default SignUp;