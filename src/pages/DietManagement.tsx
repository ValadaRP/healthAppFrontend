import {useQuery} from "react-query";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";
import axios from "axios";
import MealsForm from "@/components/forms/MealsForm.tsx";

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
            },
        });
        return res.data;
    };



    const userSpoonData = useQuery<UserSpoonData>({
        queryKey: ['userSpoonData'],
        queryFn: fetchUserSpoonData,
        },
    );
    const {data} = userSpoonData;
    console.log(data);
    if (!userSpoonData.data) return null;

    return(
        <>
            <div>
                <MealsForm />
            </div>

        </>
    )
}

export default DietManagement;