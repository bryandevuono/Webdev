import React from "react";
import AdminNavbar from "./AdminNavbar";
import Calendar from "./Calendar";
const AdminDashboard = (): JSX.Element => {
    return(
        <div>
            <AdminNavbar/>
            <Calendar view={"agenda"}/>
        </div>
    );
}

export default AdminDashboard;