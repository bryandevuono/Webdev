import React, { useState } from "react";
import { CheckIfLoggedIn, LoginInput , PostLogin} from "../api/Login"
import { useNavigate, Link } from "react-router-dom";

interface LoginScreenProps {
    setAuthorized: Function
}
const LoginScreen = ({setAuthorized}: LoginScreenProps) : JSX.Element =>
{
    const Navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);
    const [DuplicateLogin, setDuplicateLogin] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        const UserInfo: LoginInput = {email: email, password: password};
        const CheckLogin = await PostLogin(UserInfo, Navigate);
        if(CheckLogin){
            setAuthorized(true);
            Navigate("/calendar");
        }
        else{
            setErrorMessage(true);
        }
    }

    const handleLoginClick = async ()=> {
        const LoginCheck = await CheckIfLoggedIn()
        if(LoginCheck){
            setDuplicateLogin(true);
            return;
        }
        handleLogin(Email, Password)
    }
    return(
        <div className="login-box">
            <label>
                username:{" "}
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
            <Link className="signup-button" to={'/signup'}><p>Login as an admin</p></Link>
            {ErrorMessage ? <p className="error-text">Something went wrong...</p> : null}
            {DuplicateLogin ? <p className="error-text">Logged in already</p> : null}
        </div>
    );
}

export default LoginScreen;