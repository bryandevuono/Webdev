export type LoginInput = {
    email: string,
    password: string
}

const useLogin = async (UserInfoInput: LoginInput, navigate: Function) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput)
    };

    await fetch('http://localhost:5053/api/login/login/user', requestOptions)
        .then((response) => {
            if(response.ok){
                alert("Logged in");
                navigate("/");
            }else {
                return alert("Invalid email or password");
            }
    });
}

export default useLogin