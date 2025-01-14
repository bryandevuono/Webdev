import React from 'react';

interface UserListPopupProps {
    isOpen: boolean;
    onClose: () => void;
    users: string[];
    eventTitle: string;
}

const UserListPopup: React.FC<UserListPopupProps> = ({ isOpen, onClose, users, eventTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <h2>Attendees for {eventTitle}</h2>
                <button onClick={onClose}>Close</button>
                {users.length === 0 ? (
                    <p>No attendees yet</p>
                ) : (
                    <ul>
                        {users.map((users, index) => (
                            <li key={index}>{users}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default UserListPopup;