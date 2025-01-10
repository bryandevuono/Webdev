type UserInfoResponse = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
};

export const getUserData = async (userId: string): Promise<UserInfoResponse> => {
    console.log(userId);
    const response = await fetch(`http://localhost:5053/api/user/getuserbyid?userId=${userId}`, {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    const UserInfo: UserInfoResponse = {
        userName: data.username,
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email
    };

    return UserInfo;
}
