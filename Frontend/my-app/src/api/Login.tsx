export type LoginInput = {
    email: string;
    password: string;
};

const PostLogin = async (UserInfoInput: LoginInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

        const response = await fetch('http://localhost:5053/api/login/login/user', requestOptions);
        if (response.ok) {
            navigate("/");
            return true;
        } else {
            return false; 
        }
};

export default PostLogin;
