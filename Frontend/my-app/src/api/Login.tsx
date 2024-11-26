export type LoginInput = {
    email: string;
    password: string;
};

export const PostLogin = async (UserInfoInput: LoginInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

        const response = await fetch('http://localhost:5053/api/login/login/user', requestOptions);
        if (response.ok) {
            return true;
        } else {
            return false; 
        }
};

export const CheckIfLoggedIn = async (): Promise<boolean> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    const isLoggedIn = data.isLoggedIn;
    if(isLoggedIn){
        return true;
    }
    return false;
}

export const GetUserInfo = async (): Promise<string> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data.username;
}

