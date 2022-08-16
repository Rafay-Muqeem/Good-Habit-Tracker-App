import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import { signUp } from '../../services/signUp';
import { motion } from 'framer-motion/dist/framer-motion';
import { RotatingLines } from 'react-loader-spinner';

const SignUp = () => {

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPass, setSignUpPass] = useState("");
    const [signUpLoad, setSignUpLoad] = useState(true);
    const [error, setError] = useState(false);
    const [resMessage, setResMessage] = useState(false);

    let reqStatusCode = 0;

    const navigate = useNavigate();

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('Token'));
        if (token) navigate(-1);

    }, []);

    const data = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPass
    }

    async function sign_Up(data) {

        setSignUpLoad(false);

        try {
            setResMessage("");
            if (signUpName !== '' && signUpEmail !== '' && signUpPass !== '') {
                const res = await signUp(data);
                reqStatusCode = res.status;

                if (reqStatusCode >= 200 && reqStatusCode <= 299) {
                    setSignUpName('');
                    setSignUpEmail('');
                    setSignUpPass('');
                    setSignUpLoad(true);
                    setError(false);
                    setResMessage("Successfully Sign up! Now you can Sign In");
                }
                else if (reqStatusCode === 400) {
                    setResMessage("Please! Provide correct credentials");
                    setSignUpLoad(true);
                    setError(true);
                }
                else if (reqStatusCode === 403) {
                    setResMessage("This email is already linked with an account!");
                    setSignUpLoad(true);
                    setError(true);
                }
            }
            else {
                setResMessage("Please! Fill each field");
                setSignUpLoad(true);
                setError(true);
            }

        } catch (error) {
            console.log(error);
            setSignUpLoad(true);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="SignUpCard"
        >
            <h1>Sign Up</h1>
            {
                error ?
                    <motion.p
                        className='errText'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {resMessage}
                    </motion.p>
                    :
                    <motion.p
                        className='succText'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {resMessage}
                    </motion.p>
            }
            <div className="signUp_inputs">
                <input type="text" value={signUpName} placeholder="Enter name here..." onChange={(e) => setSignUpName(e.target.value)} autoFocus />
                <input type="email" value={signUpEmail} placeholder="Enter email here..." onChange={(e) => setSignUpEmail(e.target.value)} />
                <input type="password" value={signUpPass} placeholder="Enter password here..." onChange={(e) => setSignUpPass(e.target.value)} />
                {
                    signUpLoad ?
                        <motion.button onClick={() => { sign_Up(data) }} className="signUpButton" whileTap={{ scale: 0.9 }} >Sign Up</motion.button>
                        :
                        <button className="signUpButton" >
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
            <div className='signUpBottomLine'>
                <p>Already have an account</p>
                <Link to={"/SignIn"} replace>Sign In</Link>
            </div>
        </motion.div>
    );
}

export default SignUp;