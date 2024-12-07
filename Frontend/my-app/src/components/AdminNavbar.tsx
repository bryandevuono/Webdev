import React from "react";
import ManageIcon from '../img/planning.png'
const AdminNavbar = (): JSX.Element => {
    return (
        <div>
            <nav className="admin-nav">
                <ul>
                    <li className="astext">Manage events</li>
                    <br/>
                    <li className="astext">Reviews</li>
                    <br/>
                    <li className="astext">Events</li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavbar;