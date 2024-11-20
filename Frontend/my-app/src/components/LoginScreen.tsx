import React, { useState } from "react";
import { LoginInput , PostLogin} from "../api/Login"
import { useNavigate } from "react-router-dom";


const LoginScreen = () : JSX.Element =>
{
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);
    const Login = PostLogin;

    const HandleLogin = async (email: string, password: string) => {
        const userInfo: LoginInput = {email: email, password: password};
        const CheckLogin = await Login(userInfo, navigate);
        !CheckLogin ? setErrorMessage(true): setErrorMessage(false)
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        HandleLogin(Email, Password)
    }
    return(
        <div className="login-box">
            <label>
                username:{" "}
                <input className="input-style" onChange={changeEmail}/>
            </label>
            <br/>
            <label>
                Password:{" "}
                <input className="input-style" onChange={changePassword}/>
            </label>
            <br/>
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <button className="login-button">Sign up</button>
            {ErrorMessage ? <p className="error-text">Wrong username/password</p> : null}
        </div>
    );
}

export default LoginScreen;