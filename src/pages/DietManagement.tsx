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
    const apiKey = import.meta.env.VITE_SPOON_KEY;
    const auth = useContext(AuthContext);

    const fetchUserSpoonData = async (): Promise<UserSpoonData> => {
        const res = await axios.get(`http://localhost:8080/api/spoonacular?userEmail=${auth.email}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        });
        return res.data;
    };
    const fetchSpoonMeals = async () => {
        const res = await axios.get(`https://api.spoonacular.com/mealplanner/generate`,{
            params: {
                timeFrame: "day",
                apiKey: apiKey,
            },
        })
        return res.data;
    };


    const userSpoonData = useQuery<UserSpoonData>({
        queryKey: ['userSpoonData'],
        queryFn: fetchUserSpoonData,
        },
    );
    // const {data} = userSpoonData;
    const spoonMeals = useQuery({
        queryKey: ['spoonMeals'],
        queryFn: fetchSpoonMeals,
        enabled: false,
    });


    if (!userSpoonData.data) return null;

    return(
        <>
            <div className={"text-center"}>
                <MealsForm />
            </div>

        </>
    )
}

export default DietManagement;