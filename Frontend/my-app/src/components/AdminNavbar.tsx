import React from "react";
import ManageIcon from '../img/planning.png'

interface AdminNavbarProps {
    UsersToggle: Function,
    EventsToggle: Function
}

const AdminNavbar = ({UsersToggle, EventsToggle}: AdminNavbarProps): JSX.Element => {
    return (
        <div>
            <nav className="admin-nav">
                <ul>
                    <li className="astext" onClick={() => EventsToggle(true)}>Manage events</li>
                    <br/>
                    <li className="astext">Manage users</li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavbar;