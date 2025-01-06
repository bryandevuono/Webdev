import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { postLoginAdmin } from "../api/Admin";

const AdminLogin = (props: {setAuthorized: Function, setIsAdmin: Function}): JSX.Element => {
    const Navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [duplicateLogin, setDuplicateLogin] = useState(false);

    const handleAdminLogin = async () => {
        const AdminInfo = {
            username: userName,
            email: email,
            password: password 
        }
        const checkAdminLogin = await postLoginAdmin(AdminInfo);

        if(checkAdminLogin){
            props.setAuthorized(true);
            props.setIsAdmin(true);
            setDuplicateLogin(true);
            Navigate("/dashboard");
        }
        else{
            setErrorMessage(true);
        }
    }
    return(
        <div className="flexbox">
            <div>
                <label>
                    Username:
                    <input className="input-style" onChange={(event) => setUsername(event.target.value)}/>
                </label>
                <br/>
                <label>
                    E-mail :    
                    <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
                </label>
                <br/>
                <button className="admin-button" onClick={handleAdminLogin}> Login</button>
    
                {errorMessage ? <p className="error-text">Something went wrong...</p> : null}
                {duplicateLogin ? <p className="error-text">Logged in already</p> : null}
            </div>
        </div>
    );
}

export default AdminLogin;
