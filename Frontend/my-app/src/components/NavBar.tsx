import { useState } from "react";
import "../App.css"

interface NavBarProps{
    items: String[]
}

const NavBar = ({items}: NavBarProps): JSX.Element =>{
    return(
    <div>
        <ul>
        {
          items.map(item => 
            <button>{item}</button>
            )
        }
        </ul>  
    </div>
    )
}

export default NavBar