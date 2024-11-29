import {useEffect, useState} from "react";
import { GetUserInfo, Logout } from "../api/Login";
import { Link } from "react-router-dom";

interface ProfilePageProps {
    setAuthorized: Function
}

const ProfilePage = ({setAuthorized}: ProfilePageProps): JSX.Element => {
    const [UserName, setUserName] = useState("");
    
    const GetUserName = async () =>{
        const UsernameFromAPI = await GetUserInfo();
        return setUserName(UsernameFromAPI);
    }

    const LogOutAPI = async () => {
        setAuthorized(false);
        Logout();

    }
    useEffect(() => {
        GetUserName();
    }, []);

    return (
        <div className="profile-page">
            <p className="">E-mail/Username: {UserName}</p>
            <p>Points: </p>
            <Link to={"/"}><button className="login-button" onClick={() => LogOutAPI()}>Log out</button></Link>
        </div>
    );
}

export default ProfilePage;