import { useState, useEffect } from "react";
import "../App.css"
import { Link } from 'react-router-dom';
import ProfileImg from "../img/user.png";
import { GetUserInfo } from "../api/Login";

interface NavBarItemProps {
    navItems: string[]
    loggedIn: boolean
}

const NavBar = ({ navItems, loggedIn }: NavBarItemProps): JSX.Element => {
    const [Username, setUsername] = useState("");
    const GetUserName = async () => {
        const UserName = await GetUserInfo();
        setUsername(UserName);
    }
    useEffect(() => {
        GetUserName();
    }, [loggedIn]);
    return (
        <header className="navbar">
            <h1 className="navbar-text">Office Calendar</h1>
            <ul className="navbar-buttons">
                {
                    loggedIn ?
                        navItems.map(item =>
                            <Link to={"/" + item}><button className="navbar-button">{item}</button></Link>
                        )
                        : null
                }
            </ul>
            {loggedIn ? <img alt="" className="profile-img" src={ProfileImg}></img> : null}
            {loggedIn ? <p className="profile-text">{Username}</p> : null}
        </header>
    );
}

export default NavBar;
