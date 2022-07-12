import React, {useEffect, useState} from 'react';
import './SignIn.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from '../../services/signIn';

const SignIn = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [signInEmail,setSignInEmail] = useState("");
    const [signInPass,setSignInPass] = useState("");
    const [error, setError] = useState(false); 

    // const id = location.state.id;

    const data = {
        email: signInEmail,
        password: signInPass
    }

    useEffect( () => {
        let handler = (e) => {
            if(e.keyCode == 13){
                sign_In();
            }
        }
        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        }
    })

    async function sign_In(){
            try {
                const res = await signIn(data);
                const token = await res.json();
                setSignInEmail('');
                setSignInPass('');
                if(res.status >= 200 && res.status <= 299){
                    setError(false);
                    navigate('/dashboard', {replace: true, state: {token : token}});
                }
                else{
                    console.log(res.status);
                    setError(true);
                }
            }catch (error) {
                console.log(error);
            }
    }

    return(
        <div className="SignInCard">
            <h1>Sign In</h1>
            {!error? <p></p> : <p>Please! provide correct credentials</p>}
            <div className="signIn_inputs">
                <input type="email" value={signInEmail} placeholder="Enter email here..." onChange={(e) => setSignInEmail(e.target.value) } />
                <input type="password" value={signInPass} placeholder="Enter password here..." onChange={(e) => setSignInPass(e.target.value) } />
                <button onClick={ () => {sign_In()}} className="signInButton">Sign In</button>
            </div>
            <div className='signInBottomLine'>
                <span>Don't have an account</span>
                <Link to={"/SignUp"} replace>Sign Up</Link>
            </div>
        </div>
    );
}

export default SignIn;