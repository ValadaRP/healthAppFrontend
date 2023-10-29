import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext, useState} from "react";

const LogButton = ({to, className} : {to:string, className? : string}) => {
    const { logout, isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate();
    const [manageLink,setManageLink] = useState<boolean>(false);

    return(
        <Link to={to} className={className} onClick={() => {
            if (isLoggedIn){
                logout();
                navigate("/login");
                setManageLink(!manageLink);
            }
        }}>{isLoggedIn ? "Logout" : "Login"}</Link>
    );
}

export default LogButton;