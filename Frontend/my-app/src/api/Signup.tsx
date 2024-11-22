export type SignUpInput = {
    FirstName: string,
    Lastname: string,
    Email: string,
    Password: string
}

export const PostSignUp = async (UserInfoInput: SignUpInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

        const response = await fetch('http://localhost:5053/api/user/adduser', requestOptions);
        if (response.ok) {
            navigate("/calendar");
            return true;
        } else {
            return false; 
        }
};