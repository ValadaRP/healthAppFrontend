import {createContext} from "react";

export const AuthContext = createContext({
    token: null as string | null,
    // @ts-ignore
    login: (token: string): void => {},
    logout: () => {},
    isLoggedIn: false,
});