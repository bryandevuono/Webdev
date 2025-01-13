import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignUp, SignUpInput } from "../api/Signup";

const SignUpScreen = (): JSX.Element => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSignUp = async (firstName: string, lastName: string, email: string, password: string) => {
        const userInfo: SignUpInput = {
            FirstName: firstName,
            Lastname: lastName,
            Email: email,
            Password: password
        };

        if(firstName === "" || lastName === "" || email === "" || password === "") {
            setErrorMessage(true);
            return;
        }
        
        const checkSignUp = await postSignUp(userInfo, navigate);
        !checkSignUp ? setErrorMessage(true) : setErrorMessage(errorMessage); 
    };

    return (
        <div className="flexbox">
            <div className="login-box">
                <label>
                    Firstname:
                    <input className="input-style" onChange={(event) => setFirstName(event.target.value)} />
                </label>

                <br />

                <label>
                    Lastname:
                    <input className="input-style" onChange={(event) => setLastName(event.target.value)} />
                </label>

                <br />

                <label>
                    Username:
                    <input className="input-style" onChange={(event) => setEmail(event.target.value)} />
                </label>

                <br />

                <label>
                    Password:
                    <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)} />
                </label>

                <br />
                
                <button className="login-button" onClick={() => handleSignUp(firstName, lastName, email, password)}>Sign up</button>
                
                {errorMessage ? <p className="error-text">Missing required fields!</p> : null}
            </div>
        </div>
    );
};

export default SignUpScreen;