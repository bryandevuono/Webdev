import { useState } from "react";
import "../App.css"

interface NavBarProps{
    items: String[]
}

const NavBar = ({items}: NavBarProps): JSX.Element =>{
    return(
    <div className="navbar">
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