import {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUpScreen = (): JSX.Element => {
    const Navigate = useNavigate();
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);

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
            <button className="login-button">Sign up</button>
            {ErrorMessage ? <p className="error-text">Wrong username/password</p> : null}
        </div>
    );
}

export default SignUpScreen;