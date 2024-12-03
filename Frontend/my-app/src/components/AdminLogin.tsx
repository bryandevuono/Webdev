import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = (): JSX.Element => {
    const Navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);
    const [DuplicateLogin, setDuplicateLogin] = useState(false);

    return(
        <div className="login-box">
            <label>
                Username:{" "}
                <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <label>
                Email:{" "}
                <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <br/>
            <label>
                Password:{" "}
                <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <br/>
            <button className="login-button" >Login</button>
 
            {ErrorMessage ? <p className="error-text">Something went wrong...</p> : null}
            {DuplicateLogin ? <p className="error-text">Logged in already</p> : null}
        </div>
    );
}

export default AdminLogin;
