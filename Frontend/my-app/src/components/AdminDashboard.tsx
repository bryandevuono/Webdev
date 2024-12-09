import React from "react";
import AdminNavbar from "./AdminNavbar";
import Calendar from "./Calendar";
import AdminManageEvents from "./AdminManageEvents";
const AdminDashboard = (): JSX.Element => {
    return(
        <div>
            <AdminNavbar/>
            <AdminManageEvents/>
        </div>
    );
}

export default AdminDashboard;