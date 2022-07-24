import React, { useEffect, useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from '../../services/signIn';
import { motion } from 'framer-motion/dist/framer-motion';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import jwt_decode from 'jwt-decode';
import { signInWithGoogle } from '../../services/signInWithGoogle';
import { ReactComponent as Google } from './google.svg';

const SignIn = () => {

    const navigate = useNavigate();

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPass, setSignInPass] = useState("");
    const [error, setError] = useState(false);

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
            else {
                setError(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                client_id: "379779189631-jt9om5rcmavpjm2t8qfcnl1ahb1kcb14.apps.googleusercontent.com",
                scope: "profile"
            });
        };

        gapi.load('client:auth2', start);
    });

    async function sign_In_Google(data) {
        try {
            const res = await signInWithGoogle(data);
            const token = await res.json();
            navigate('/dashboard', { state: token, replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    const OnSuccess = async (response) => {

        const userObject = jwt_decode(response.tokenId);

        const userDataByGoogle = {
            id: userObject.sub,
            name: userObject.name,
            email: userObject.email,
            client_id: userObject.aud,
            emailVerified: userObject.email_verified
        }

        sign_In_Google(userDataByGoogle);

    }

    const OnFailure = (response) => {

        console.log("failure", response);
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
            {!error ? null : <p>Please! provide correct credentials</p>}
            <div className="signIn_inputs">
                <input type="email" value={signInEmail} placeholder="Enter email here..." onChange={(e) => setSignInEmail(e.target.value)} autoFocus />
                <input type="password" value={signInPass} placeholder="Enter password here..." onChange={(e) => setSignInPass(e.target.value)} />
                <button onClick={() => { sign_In() }} className="signInButton">Sign In</button>
            </div>
            <div className='signInBottomLine'>
                <span>Don't have an account</span>
                <Link to={"/SignUp"} replace>Sign Up</Link>
            </div>
            <span>Or</span>
            <div >

                <GoogleLogin
                    clientId="379779189631-jt9om5rcmavpjm2t8qfcnl1ahb1kcb14.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button className='googleSignInBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <Google />
                            Sign In with Google
                        </button>
                    )}
                    onSuccess={OnSuccess}
                    onFailure={OnFailure}
                    cookiePolicy={'single_host_origin'}
                />

            </div>
        </motion.div>
    );
}

export default SignIn;

