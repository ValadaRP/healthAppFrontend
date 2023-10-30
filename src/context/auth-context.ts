import {createContext} from "react";

export const AuthContext = createContext({
    token: null as string | null,
    // @ts-ignore
    login: (token: string, values: any): void => {},
    logout: () => {},
    isLoggedIn: false,
    email: null as string | null
});