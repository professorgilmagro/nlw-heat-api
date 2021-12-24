import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSessions from 'expo-auth-session'
import axios from "axios";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = 'b7ac70ec025b7cf1760e';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isProcessing: boolean,
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthResponse = {
    token: string;
    user: User;
}

type AuthtorizationResponse = {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);


function AuthProvider({ children }: AuthProviderProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function signIn() {
        try {
            setIsProcessing(true);
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
            const response = await AuthSessions.startAsync({ authUrl }) as AuthtorizationResponse;

            if (response.type === 'success' && response.params.error !== 'access_denied') {
                const authResponse = await api.post('/authenticate', { code: response.params.code });
                const { user, token } = authResponse.data as AuthResponse;
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));

                setUser(user);
            }
        } catch (error) {
            console.log(error)
        }

        setIsProcessing(false);
    }

    async function signOut() {
        setUser(null)
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            setIsProcessing(true);
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
            if (userStorage && tokenStorage) {
                const token = JSON.parse(tokenStorage);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(userStorage));
            }
            setIsProcessing(false);
        }

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, isProcessing }}>
            {children}
        </AuthContext.Provider>
    );
}

function userAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, userAuth }

