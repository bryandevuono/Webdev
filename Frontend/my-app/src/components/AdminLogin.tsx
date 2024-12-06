import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { PostLoginAdmin } from "../api/Admin";

const AdminLogin = (props: {setAuthorized: Function}): JSX.Element => {
    const Navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState(false);
    const [DuplicateLogin, setDuplicateLogin] = useState(false);

    const handleAdminLogin = async () => {
        const AdminInfo = {
            username: Username,
            email: Email,
            password: Password 
        }
        const CheckAdminLogin = await PostLoginAdmin(AdminInfo);

        if(CheckAdminLogin){
            props.setAuthorized(true);
        }
        else{
            setErrorMessage(true);
        }
        Navigate("/dashboard");
    }
    return(
        <div className="admin">
            <label>
                Username:
                <input className="input-style" onChange={(event) => setUsername(event.target.value)}/>
            </label>
            <br/>
            <label>
                Email:
                <input className="input-style" onChange={(event) => setEmail(event.target.value)}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" className="input-style" onChange={(event) => setPassword(event.target.value)}/>
            </label>
            <br/>
            <button className="admin-button" onClick={handleAdminLogin}> Login</button>
 
            {ErrorMessage ? <p className="error-text-admin">Something went wrong...</p> : null}
            {DuplicateLogin ? <p className="error-text-admin">Logged in already</p> : null}
        </div>
    );
}

export default AdminLogin;
