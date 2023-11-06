import LogButton from "@/components/ui/link.tsx";
import {NavLink} from "react-router-dom";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";

const Navbar = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return(
        // <nav className={"w-full bg-[#17163e] h-16 font-semibold"}>
        //     <div className={"grid grid-cols-2 h-full content-center"}>
        //         <p className={"text-white ml-14 text-2xl"}>Health App</p>
        //         <div className={"h-full bg-green-800"}>
        //             <ul className={"flex justify-end h-full items-center gap-x-14 mx-8"}>
        //                 <li className={"text-white hover:bg-gray-600 hover:duration-300"}><NavLink to={"/"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Home</NavLink></li>
        //                 {isLoggedIn ? <li className={"text-white "}><NavLink to={"/diet-management"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Diet Management</NavLink></li> : null}
        //                 {isLoggedIn ? <li className={"text-white "}><NavLink to={"/heart-prediction"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Heart prediction</NavLink></li> : null}
        //                 <li className={"text-white "}><LogButton to={"/login"}/></li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        <nav className={"w-full bg-[#17163e] h-16 font-semibold"}>
            <div className={"flex flex-row justify-between h-full "}>
                <div className={"flex items-center"}>
                    <p className={"text-white ml-14 text-2xl"}>Health App</p>
                </div>
                <div className={"h-full"}>
                    <ul className={"flex h-full justify-stretch items-center gap-x-14 mx-8"}>
                        <NavLink to={"/"} className={({isActive}) => isActive ? "text-white underline underline-offset-2" : "text-white"}>Home</NavLink>
                        {isLoggedIn ? <li className={"text-white h-full flex items-center"}><NavLink to={"/diet-management"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Diet Management</NavLink></li> : null}
                        {isLoggedIn ? <li className={"text-white h-full flex items-center"}><NavLink to={"/heart-prediction"} className={({isActive}) => isActive ? "underline underline-offset-2" : ""}>Heart prediction</NavLink></li> : null}
                        <li className={"text-white h-full flex items-center"}><LogButton to={"/login"}/></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;