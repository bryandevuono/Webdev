import React from "react"
import "../App.css"
import { Link } from 'react-router-dom';


const NavBar = (): JSX.Element =>{
    let navItems: string[] = ["", "Leaderboard", "Login", "Sign Up"];
    return(
    <header className="navbar">
        <h1 className="navbar-text">Office Calendar</h1>
        <ul className="navbar-buttons">
        {
          navItems.map(item => 
            item === "" ? <Link to={"/"}><button className="navbar-button">Home</button></Link> :
            <Link to={"/"+ item}><button className="navbar-button">{item}</button></Link>
            )
        }
        </ul>  
    </header>
    )
}

export default NavBar