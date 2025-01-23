"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UserListPopup = ({ isOpen, onClose, users, eventTitle }) => {
    if (!isOpen)
        return null;
    return (<div className="popup-overlay">
            <div className="popup-form">
                <h2>Attendees for {eventTitle}</h2>
                <ul>
                    {users.map((users, index) => (<li key={index}>{users}</li>))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>);
};
exports.default = UserListPopup;
