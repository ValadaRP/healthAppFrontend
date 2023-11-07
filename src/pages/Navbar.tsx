import LogButton from "@/components/ui/link.tsx";
import {NavLink} from "react-router-dom";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";

const Navbar = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return(
        <nav className={"w-full bg-[#17163e] h-16 font-semibold"}>
            <div className={"flex flex-row justify-between h-full "}>
                <div className={"flex items-center"}>
                    <p className={"text-white ml-14 text-2xl"}>Health App</p>
                </div>
                <div className={"h-full"}>
                    <ul className={"flex h-full justify-stretch items-center gap-x-14 mx-8"}>
                        {/*<NavLink to={"/"} className={({isActive}) => isActive ? "text-white underline underline-offset-2" : "text-white"}>Home</NavLink>*/}
                        {isLoggedIn ? <li className={"text-white h-full flex items-center"}><NavLink to={"/diet-management"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Diet Management</NavLink></li> : null}
                        {isLoggedIn ? <li className={"text-white h-full flex items-center"}><NavLink to={"/labs"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Labs</NavLink></li> : null}
                        <li className={"text-white h-full flex items-center"}><LogButton to={"/login"}/></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;