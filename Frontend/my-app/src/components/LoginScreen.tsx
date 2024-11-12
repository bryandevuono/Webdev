import React from "react";

const LoginScreen = () : JSX.Element =>
{
    return(
        <div className="login-box">
            <label>
                Username: 
                <input name="username" />
            </label>
            <br/>
            <label>
                Password: 
                <input name="password" />
            </label>
        </div>
    );
}

export default LoginScreen;