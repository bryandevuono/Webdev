import React, { useState } from "react";
import AdminManageEvents from "./AdminManageEvents";

interface AdminNavbarProps {
    usersToggle: Function,
    eventsToggle: Function
}

const AdminNavbar = ({ usersToggle, eventsToggle }: AdminNavbarProps): JSX.Element => {
    return (
        <div>
            <nav className="admin-nav">
                <ul>
                    <li className="astext" onClick={() => eventsToggle(true)}>Manage events</li>
                    <br/>
                    <li className="astext" onClick={() => usersToggle(true)}>Manage users</li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavbar;