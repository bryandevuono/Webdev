import React, { useState } from "react";
import { LoginInput , PostLogin} from "../api/Login"
import { useNavigate, Link } from "react-router-dom";


const LoginScreen = () : JSX.Element =>
{
    const Navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);
    const Login = PostLogin;

    const handleLogin = async (email: string, password: string) => {
        const UserInfo: LoginInput = {email: email, password: password};
        const CheckLogin = await Login(UserInfo, Navigate);
        !CheckLogin ? setErrorMessage(true): setErrorMessage(false)
    }

    const ChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        handleLogin(Email, Password)
    }
    return(
        <div className="login-box">
            <label>
                Username:{" "}
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
        </div>
    );
}

export default LoginScreen;