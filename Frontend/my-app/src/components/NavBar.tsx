import "../App.css"
import { Link } from 'react-router-dom';
import ProfileImg from "../img/user.png";

interface NavBarItemProps {
    navItems: string[]
    loggedIn: boolean
}

const NavBar = ({navItems, loggedIn }: NavBarItemProps): JSX.Element =>{
    return(
    <header className="navbar">
        <h1 className="navbar-text">Office Calendar</h1>
        <ul className="navbar-buttons">
        {
          loggedIn ?
          navItems.map(item =>  
            <Link to={"/"+ item}><button className="navbar-button">{item}</button></Link>
            )
            : null
        }
        </ul>
        <img alt="" className="profile-img" src={ProfileImg}></img>
    </header>
    )
}

export default NavBar