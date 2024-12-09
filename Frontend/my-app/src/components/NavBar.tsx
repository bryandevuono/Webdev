import { useState, useEffect } from "react";
import "../App.css"
import { Link } from 'react-router-dom';
import ProfileImg from "../img/user.png";
import { getUserInfo } from "../api/Login";

interface NavBarItemProps {
    navItems: string[]
    loggedIn: boolean
}

const NavBar = ({navItems, loggedIn }: NavBarItemProps): JSX.Element =>{
    const [username, setUsername] = useState("");
    const getUserName = async () =>{
        const userName = await getUserInfo();
        setUsername(userName);
    }
    useEffect(() => {
        getUserName();
      }, [loggedIn]);
    return(
    <header className="navbar">
        <h1 className="navbar-text">Office Calendar</h1>
        <ul className="navbar-buttons">
        {
          loggedIn ?
          navItems.map(item =>  
            <Link to={"/"+ item}><button key={item} className="navbar-button">{item}</button></Link>
            )
            : null
        }
        </ul>
        {loggedIn ? <Link to={"/profile"} className="profile-img"><img alt="" className="profile-img" src={ProfileImg}></img></Link>: null}
        {loggedIn ? <p className="profile-text">{username}</p>: null}
    </header>
    );
}

export default NavBar;
