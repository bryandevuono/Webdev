
export const CheckAdmin = async (): Promise<boolean> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if(data.role == "admin"){
        return true;
    }
    else{
        return false;
    }
}

type AdminLoginInfo = {
    username: string,
    email: string,
    password: string
}
export const PostLoginAdmin = async (AdminInfo: AdminLoginInfo): Promise<boolean> => {
    const response = await fetch('http://localhost:5053/api/login/login/admin', {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(AdminInfo)
    });
    if (response.ok){
        return true;
    }
    else{
        return false;
    }
}
