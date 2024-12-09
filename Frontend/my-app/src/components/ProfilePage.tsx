import {useEffect, useState} from "react";
import { getUserInfo, logOut } from "../api/Login";
import { Link } from "react-router-dom";

interface ProfilePageProps {
    setAuthorized: Function
}

const ProfilePage = ({setAuthorized}: ProfilePageProps): JSX.Element => {
    const [userName, setUserName] = useState("");
    
    const getUserName = async () =>{
        const usernameFromAPI = await getUserInfo();
        return setUserName(usernameFromAPI);
    }

    const logOutAPI = async () => {
        setAuthorized(false);
        logOut();

    }
    useEffect(() => {
        getUserName();
    }, []);

    return (
        <div className="profile-page">
            <p className="">E-mail/Username: {userName}</p>
            <p>Points: </p>
            <Link to={"/"}><button className="login-button" onClick={() => logOutAPI()}>Log out</button></Link>
        </div>
    );
}

export default ProfilePage;