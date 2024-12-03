
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
