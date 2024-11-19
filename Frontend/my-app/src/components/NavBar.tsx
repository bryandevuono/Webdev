import React, { useState } from "react"
import "../App.css"
import { Link } from 'react-router-dom';
import ProfileImg from "../img/user.png";
import { useLocation } from 'react-router-dom';

const NavBar = (): JSX.Element =>{
    let navItems: string[] = ["Calendar", "Leaderboard"];
    const location = useLocation();
    const {pathname} = location;
    return(
    <header className="navbar">
        <h1 className="navbar-text">Office Calendar</h1>
        <ul className="navbar-buttons">
        {
          pathname == "/" ? null : 
          navItems.map(item =>  
            <Link to={"/"+ item}><button className="navbar-button">{item}</button></Link>
            )
        }
        </ul>
        <img className="profile-img" src={ProfileImg}></img>
    </header>
    )
}

export default NavBar