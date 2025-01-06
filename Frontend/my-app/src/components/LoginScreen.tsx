import React, { useState } from "react";
import { checkIfLoggedIn, loginInput , postLogin} from "../api/Login"
import { useNavigate, Link } from "react-router-dom";

interface LoginScreenProps {
    setAuthorized: Function
}
const LoginScreen = ({setAuthorized}: LoginScreenProps) : JSX.Element =>
{
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [duplicateLogin, setDuplicateLogin] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        const userInfo: loginInput = {email: email, password: password};
        const checkLogin = await postLogin(userInfo, Navigate);
        if(checkLogin){
            setAuthorized(true);
            Navigate("/calendar");
        }
        else{
            setErrorMessage(true);
        }
    }

    const handleLoginClick = async ()=> {
        const loginCheck = await checkIfLoggedIn()
        if(loginCheck){
            setDuplicateLogin(true);
            return;
        }
        handleLogin(email, password)
    }
    return(
        <div className="flexbox">
            <div className="login-box">
                <label>
                    Username:{" "}
                    <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:{" "}
                    <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
                </label>
                <br/>
                <button className="login-button" onClick={handleLoginClick}>Login</button>
                <Link className="signup-button" to={'/signup'}><p>Sign up</p></Link>
                <Link className="signup-button" to={'/adminlogin'}><p>Login as an admin</p></Link>
                
                {errorMessage ? <p className="error-text">Something went wrong...</p> : null}
                {duplicateLogin ? <p className="error-text">Logged in already</p> : null}
            </div>
        </div>
    );
}

export default LoginScreen;