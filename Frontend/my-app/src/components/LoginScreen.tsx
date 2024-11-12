import React from "react";
import NavBar from "./NavBar";

const LoginScreen = () : JSX.Element =>
{
    return(
        <div>
            <NavBar/>
            <input>Enter username: </input>
            
        </div>
    );
}

export default LoginScreen;