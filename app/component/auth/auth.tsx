import axios from "axios"

const apiUrl = 'https://techtest.youapp.ai/api';

export const login =async (credential:any) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Login Failed");
        }

        const loginData = await response.json();
        localStorage.setItem('accessToken', loginData.access_token);
        return loginData;

    } catch (error) {
        throw error;
    }
}

export const register = async (credential:any) => {
    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Registration Failed");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (accessToken: any) => {
    try {
        const response = await fetch(`${apiUrl}/getProfile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            }
        })

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Failed to get profile");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const createProfile =async (data:any, accessToken:any) => {
    try {
        const response = await fetch(`${apiUrl}/createProfile`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Failed to create profile");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const updateProfile =async (data:any, accessToken:any) => {
    console.log(data)
    try {
        const response = await fetch(`${apiUrl}/updateProfile`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Failed to create profile");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const setAccessTokenLocalStorage = (accessToken:any) => {
    localStorage.setItem('accessToken', accessToken);
};

export const getAccessTokenLocalStorage = () => {
    return localStorage.getItem('accessToken');
};