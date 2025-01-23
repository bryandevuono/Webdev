"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AdminNavbar = ({ usersToggle, eventsToggle, attendeeToggle }) => {
    return (<div>
            <nav className="admin-nav">
                <ul>
                    <li className="astext" onClick={() => eventsToggle(true)}>Manage events</li>
                    <br />
                    <li className="astext" onClick={() => attendeeToggle(true)}>See attendees</li>
                </ul>
            </nav>
        </div>);
};
exports.default = AdminNavbar;
