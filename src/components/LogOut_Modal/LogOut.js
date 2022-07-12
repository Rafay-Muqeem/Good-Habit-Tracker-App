
function LogOut(){
    return(
        <div className="logOutCard">
            <h1>Sign In</h1>
            <span>Do you want to log out</span>
            <div className="logOut_buttons">
                <button onClick={ () => {sign_In()}} className="signInButton">Sign In</button>
                <button onClick={ () => {sign_In()}} className="signInButton">Sign In</button>
            </div>
        </div>
    );
}

export default LogOut;