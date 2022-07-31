import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import { signUp } from '../../services/signUp';
import { motion } from 'framer-motion/dist/framer-motion';

const SignUp = () => {

    const navigate = useNavigate();

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");
    const [error, setError] = useState(false);
    let errMessage = '';

    const data = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPass
    }

    async function sign_Up(data) {
        try {
            if (signUpName !== '' && signUpEmail !== '' && signUpPass !== '') {
                const res = await signUp(data);
                if (res.status >= 200 && res.status <= 299) {
                    setSignUpName('');
                    setSignUpEmail('');
                    setSignUpPass('');
                    setError(false);
                    navigate('/signin', { replace: true });
                }
                else if( res.status === 400 ) {
                    errMessage = "Please! Provide correct credentials";
                    setError(true);
                }
                else if( res.status === 403) {
                    errMessage = "This email is already linked with an account!";
                    setError(true);
                }
            }
            else {
                errMessage = "Please! Fill each field"
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
            {error ? <p>{errMessage}</p> : null}
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