import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { PostSignUp, SignUpInput } from "../api/SignUp";
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

    const ChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const ChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const ChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignUpClick = () => {
        handleSignUp(FirstName, LastName, Email, Password);
    }

    return(
        <div className="signup-box">
            <label>
                Firstname:
                <input className="input-style" onChange={ChangeFirstName}/>
            </label>
            <br/>
            <label>
                Lastname:
                <input className="input-style" onChange={ChangeLastName}/>
            </label>
            <br/>
            <label>
                Username:
                <input className="input-style" onChange={ChangeEmail}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" className="input-style" onChange={ChangePassword}/>
            </label>
            <br/>
            <button className="login-button" onClick={handleSignUpClick}>Sign up</button>
            
            {ErrorMessage ? <p className="error-text">Missing required fields!</p> : null}
        </div>
    );
}

export default SignUpScreen;