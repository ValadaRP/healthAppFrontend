import LogButton from "@/components/ui/link.tsx";
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className={"w-full bg-[#17163e] h-16 font-semibold fonte"}>
            <div className={"grid grid-cols-2 h-full content-center"}>
                <div><p className={"text-white ml-14 text-2xl"}>Health App</p></div>
                <div>
                    <ul className={"flex justify-end h-full items-center gap-x-14 mr-8"}>
                        <li className={"text-white "}><Link to={"/"}>Home</Link></li>
                        <li className={"text-white "}><Link to={"/diet-management"}>Diet</Link></li>
                        <li className={"text-white "}>Contact</li>
                        <li className={"text-white "}><LogButton to={"/login"}/></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;