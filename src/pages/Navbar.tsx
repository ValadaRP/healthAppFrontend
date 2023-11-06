import LogButton from "@/components/ui/link.tsx";
import {NavLink} from "react-router-dom";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";
import {cn} from "@/lib/utils.ts";

const Navbar = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return(
        <nav className={"w-full bg-[#17163e] h-16 font-semibold"}>
            <div className={"grid grid-cols-2 h-full content-center"}>
                <div><p className={"text-white ml-14 text-2xl"}>Health App</p></div>
                <div className={"h-full"}>
                    <ul className={"flex justify-end h-full items-center gap-x-14 mr-8 "}>
                        <li className={"text-white hover:bg-gray-600"}><NavLink to={"/"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Home</NavLink></li>
                        {isLoggedIn ? <li className={"text-white "}><NavLink to={"/diet-management"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Diet Management</NavLink></li> : null}
                        {isLoggedIn ? <li className={"text-white "}><NavLink to={"/heart-prediction"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Heart prediction</NavLink></li> : null}
                        <li className={"text-white "}><LogButton to={"/login"}/></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;