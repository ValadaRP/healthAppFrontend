import axios from "axios";
import {useQuery} from "react-query";
import {useContext, useState} from "react";
import {AuthContext} from "@/context/auth-context.ts";
import {UserSpoonData} from "@/components/ui/addRecipeButton.tsx";
import DatePicker from "@/components/ui/datePicker.tsx";
import {format} from "date-fns";

interface PlannedMeals{
    nutritionSummary: {
        nutrients: {
            name: string;
            amount: number;
            unit: string;
            percentOfDailyNeeds: number;
        }[]
    },
    nutritionSummaryBreakfast: {
        nutrients: {
            name: string;
            amount: number;
            unit: string;
            percentOfDailyNeeds: number;
        }[]
    },
    nutritionSummaryLunch: {
        nutrients: {
            name: string;
            amount: number;
            unit: string;
            percentOfDailyNeeds: number;
        }[]
    },
    nutritionSummaryDinner: {
        nutrients: {
            name: string;
            amount: number;
            unit: string;
            percentOfDailyNeeds: number;
        }[]
    },
    date: number;
    day: string;
    items: [
        {
            id: number;
            slot: string;
            position: number;
            type: string;
            value: {
                id: number;
                imageType: string;
                title: string;
                servings: number;
            }
        }
    ];
}
const PlannedMeals = () => {
    const apiKey = import.meta.env.VITE_SPOON_KEY;
    const auth = useContext(AuthContext);
    const [date, setDate] = useState<Date | undefined>(new Date());

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

    const formatDate = (date: Date | undefined) => {
        if(date){
            return format(date, 'yyyy-MM-dd')
        }
        return undefined;
    }
    const fetchSpoonMeals = async (): Promise<PlannedMeals> => {
        const res = await axios.get(`https://api.spoonacular.com/mealplanner/${userSpoonData.data?.username}/day/${formatDate(date)}`,{
            params: {
                apiKey: apiKey,
                hash: userSpoonData.data?.hash,
            },
        });
        return res.data;
    };

    const {data} = useQuery({
        queryKey: ['plannedMeals', date],
        queryFn: fetchSpoonMeals,
        // enabled: !!date,
        enabled: false,
    });

    return(
        <>
            <div className={"flex flex-col items-center"}>
                <DatePicker date={date} setDate={setDate} />
                {data ? data.items.map((item) => {
                    return(
                        <div key={item.id} className={"flex flex-col"}>
                            <p>{item.value.title}</p>
                            <p>{item.value.servings}</p>
                            <p>{item.value.imageType}</p>
                        </div>
                    )
                }): null}
            </div>
        </>
    );
}

export default PlannedMeals;