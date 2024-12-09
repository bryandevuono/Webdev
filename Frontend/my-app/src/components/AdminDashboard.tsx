import {useState} from "react";
import AdminNavbar from "./AdminNavbar";
import Calendar from "./Calendar";
import AdminManageEvents from "./AdminManageEvents";
const AdminDashboard = (): JSX.Element => {
    const [EventToggle, setEventToggle] = useState(false);
    const [UserToggle, setUserToggle] = useState(false);

    return(
        <div>
            <AdminNavbar EventsToggle={setEventToggle} UsersToggle={setUserToggle}/>
            {EventToggle ? <AdminManageEvents/>: null}
        </div>
    );
}

export default AdminDashboard;