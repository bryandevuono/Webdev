export type loginInput = {
    email: string;
    password: string;
};

export const postLogin = async (UserInfoInput: loginInput, navigate: Function): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserInfoInput),
    };

  const response = await fetch(
    "http://localhost:5053/api/login/login/user",
    requestOptions
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const checkIfLoggedIn = async (): Promise<boolean> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

  const data = await response.json();
  const isLoggedIn = data.isLoggedIn;
  if (isLoggedIn) {
    return true;
  }
  return false;
};

export const getUserInfo = async (): Promise<string> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

  const data = await response.json();
  return data.username;
};

export const getUserId = async (): Promise<string> => {
    const response = await fetch('http://localhost:5053/api/login/session', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

  const data = await response.json();
  return data.id;
};

export const logOut = async () => {
    const response = await fetch('http://localhost:5053/api/login/logout', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return true;
    } else {
        return false;
    }
}

