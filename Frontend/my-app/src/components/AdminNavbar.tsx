import React, { useState } from "react";
import AdminManageEvents from "./AdminManageEvents";

interface AdminNavbarProps {
    usersToggle: Function,
    eventsToggle: Function
    attendeeToggle: Function
}

const AdminNavbar = ({ usersToggle, eventsToggle, attendeeToggle }: AdminNavbarProps): JSX.Element => {
    return (
        <div>
            <nav className="admin-nav">
                <ul>
                    <li className="astext" onClick={() => eventsToggle(true)}>Manage events</li>
                    <br/>
                    <li className="astext" onClick={() => usersToggle(true)}>Manage users</li>
                    <br/>
                    <li className="astext" onClick={() => attendeeToggle(true)}>See attendees</li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavbar;