import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

type AuthProvider = {
    children: ReactNode;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null)
    const signInUrl = 'https://github.com/login/oauth/authorize?scope=user&client_id=ed7639d0c5f15188fc91';
    const tokenKey = '@dowhile:token'
    async function signIn(code: string) {
        const response = await api.post<AuthResponse>('authenticate', { code: code });
        const { token, user } = response.data;
        setUser(user)
        localStorage.setItem(tokenKey, token)

        api.defaults.headers.common.authorization = `Bearer ${token}`
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem(tokenKey)
    }

    useEffect(() => {
        const token = localStorage.getItem(tokenKey)

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`
            api.get<User>('profile').then(response => {
                setUser(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('?code=')) {
            const [baseUrl, code] = url.split('?code=');
            window.history.pushState({}, '', baseUrl);
            signIn(code);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}