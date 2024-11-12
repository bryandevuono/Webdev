import React, { useState } from "react";
import useLogin, { LoginInput } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom";



const LoginScreen = () : JSX.Element =>
{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = (email: string, password: string) => {
        const userInfo: LoginInput = {email: email, password: password};
        console.log(useLogin(userInfo, navigate));
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        HandleLogin(email, password)
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
        </div>
    );
}

export default LoginScreen;