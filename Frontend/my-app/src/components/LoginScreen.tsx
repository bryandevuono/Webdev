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

    const ChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
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
                <input className="input-style" onChange={ChangeEmail}/>
            </label>
            <br/>
            <label>
                Password:{" "}
                <input type="password" className="input-style" onChange={ChangePassword}/>
            </label>
            <br/>
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <Link className="signup-button" to={'/signup'}><p>Sign up</p></Link>
            {ErrorMessage ? <p className="error-text">Wrong username/password</p> : null}
            {DuplicateLogin ? <p className="error-text">Logged in already</p> : null}
        </div>
    );
}

export default LoginScreen;