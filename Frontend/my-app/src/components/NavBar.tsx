import React from "react"
import "../App.css"

interface NavBarProps{
    items: String[]
}

const NavBar = ({items}: NavBarProps): JSX.Element =>{
    return(
    <div className="navbar">
        <h1 className="navbar-text">Office Calendar</h1>
        <ul className="navbar-buttons">
        {
          items.map(item => 
            <button className="navbar-button">{item}</button>
            )
        }
        </ul>  
    </div>
    )
}

export default NavBar