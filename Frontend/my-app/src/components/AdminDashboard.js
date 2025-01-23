"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AdminNavbar_1 = __importDefault(require("./AdminNavbar"));
const AdminManageEvents_1 = __importDefault(require("./AdminManageEvents"));
const AdminSeeAttendees_1 = __importDefault(require("./AdminSeeAttendees"));
const AdminDashboard = () => {
    const [activeSection, setActiveSection] = (0, react_1.useState)(null);
    const handleEventsToggle = () => {
        setActiveSection('events');
    };
    const handleUsersToggle = () => {
        setActiveSection('users');
    };
    const handleAttendeesToggle = () => {
        setActiveSection('attendees');
    };
    return (<div>
            <AdminNavbar_1.default eventsToggle={handleEventsToggle} usersToggle={handleUsersToggle} attendeeToggle={handleAttendeesToggle}/>
            {activeSection === 'events' && <AdminManageEvents_1.default />}
            {activeSection === 'attendees' && <AdminSeeAttendees_1.default />}
        </div>);
};
exports.default = AdminDashboard;
