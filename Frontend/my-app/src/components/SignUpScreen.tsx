import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { PostSignUp, SignUpInput } from "../api/Signup";
const SignUpScreen = (): JSX.Element => {
    const Navigate = useNavigate();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);

    const handleSignUp = async (firstname: string, lastname: string, email: string, password: string) => {
        const UserInfo: SignUpInput = {
            FirstName: firstname,
            Lastname: lastname,
            Email: email,
            Password: password
        }

        const CheckSignUp = await PostSignUp(UserInfo, Navigate);
        !CheckSignUp ? setErrorMessage(true) : setErrorMessage(ErrorMessage); 
    }

    return(
        <div className="signup-box">
            <label>
                Firstname:
                <input className="input-style" onChange={(event) => setFirstName(event.target.value)}/>
            </label>
            <br/>
            <label>
                Lastname:
                <input className="input-style" onChange={(event) => setLastName(event.target.value)}/>
            </label>
            <br/>
            <label>
                Username:
                <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <br/>
            <button className="login-button" onClick={() => handleSignUp(FirstName, LastName, Email, Password)}>Sign up</button>
            
            {ErrorMessage ? <p className="error-text">Missing required fields!</p> : null}
        </div>
    );
}

export default SignUpScreen;