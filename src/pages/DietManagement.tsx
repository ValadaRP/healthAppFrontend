import {useQuery} from "react-query";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";
import axios from "axios";

interface UserSpoonData {
    id: number;
    email: string;
    username: string;
    spoonacularPassword: string;
    hash: string;
}

const DietManagement = () => {
    const auth = useContext(AuthContext);
    const fetchUserSpoonData = async (): Promise<UserSpoonData> => {
        const res = await axios.get(`http://localhost:8080/api/spoonacular?userEmail=${auth.email}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            }
        });
        return res.data;
    };

    const {data, isLoading} = useQuery<UserSpoonData>({
        queryKey: ['userSpoonData'],
        queryFn: fetchUserSpoonData,
        },
    );

    if (!data) return null;

    return(
        <>
            <div className={"text-center"}>
                {isLoading ? <p className={"bg-gray-600"}>Loading...</p> :
                <>
                <h1>Diet Management</h1>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
                <p>Spoonacular Password: {data.spoonacularPassword}</p>
                <p>Hash: {data.hash}</p>
                </>}
            </div>

        </>
    )
}

export default DietManagement;