import React, {useState} from 'react';
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from '../../services/signIn';

const SignIn = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [signInEmail,setSignInEmail] = useState("");
    const [signInPass,setSignInPass] = useState(""); 

    // const id = location.state.id;

    const data = {
        email: signInEmail,
        password: signInPass
    }

    async function sign_In(data){
            try {
                const res = await signIn(data);
                setSignInEmail('');
                setSignInPass('');
                navigate('/home', {state: {token : res} });
            } catch (error) {
                console.log(error);
            }
    }
    return(
        <div className="SignInCard">
            <h1>Sign In</h1>
            <div className="signIn_inputs">
                <input type="email" value={signInEmail} placeholder="Enter email here..." onChange={(e) => setSignInEmail(e.target.value) } />
                <input type="password" value={signInPass} placeholder="Enter password here..." onChange={(e) => setSignInPass(e.target.value) } />
                <button onClick={ () => {sign_In(data)}} className="signInButton">Sign In</button>
            </div>
            <div className='signInBottomLine'>
                <span>Don't have an account</span>
                <Link to={"/SignUp"}>Sign Up</Link>
            </div>
        </div>
    );
}

export default SignIn;