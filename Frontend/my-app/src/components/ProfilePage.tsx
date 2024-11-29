import React from "react";

interface ProfileProps{
    name: string,
    lastname: string,
    email: string
}

const ProfilePage = ({name, lastname, email}: ProfileProps): JSX.Element => {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Lastname: {lastname}</p>
            <p>E-mail/Username: {email}</p>
            <button className="login-button">Log out</button>
        </div>
    );
}

export default ProfilePage;