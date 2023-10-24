import {useState, useCallback, useEffect} from "react";

let logoutTimer: NodeJS.Timeout;
export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);

    const login = useCallback((token?: string, expirationDate?: Date) => {
        if (token && expirationDate) {
            setToken(token);
            const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
            setTokenExpirationDate(tokenExpirationDate);
            localStorage.setItem('userData', JSON.stringify({
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            }));
        }else {
            console.log("Pass parameters to login function");
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.token, new Date(storedData.expiration));
        }
    }, [token, login, logout]);

    return {token, login, logout};
};

