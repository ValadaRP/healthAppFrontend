import {useState, useCallback, useEffect} from "react";
import {toast} from "react-toastify";


let logoutTimer: NodeJS.Timeout;
export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);
    const [email, setEmail] = useState<string | null>(null);


    const login = useCallback((token: string, email: string,expirationDate?: Date) => {
        if (token) {
            setToken(token);
            setEmail(email);
            const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
            setTokenExpirationDate(tokenExpirationDate);
            localStorage.setItem('userData', JSON.stringify({
                token: token,
                expiration: tokenExpirationDate.toISOString(),
                email: email
            }));
        }else {
            console.log("Pass parameters to login function");
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
        toast.success("You have been logged out !🫡");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        }else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate,email]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.token, storedData.email, new Date(storedData.expiration));
        }
    }, [token, login, logout, email]);

    return {token, login, logout, email};
};

