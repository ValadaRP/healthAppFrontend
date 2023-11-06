import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import { PlusCircle} from "lucide-react";
import DatePicker from "@/components/ui/datePicker.tsx";
import {useContext, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "react-toastify";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {AuthContext} from "@/context/auth-context.ts";

export interface UserSpoonData {
    id: number;
    email: string;
    username: string;
    spoonacularPassword: string;
    hash: string;
}

const AddRecipeButton = ({id, servings, title, imageType}: {id: number, servings: number, title: string, imageType: string}) => {
    const queryClient = useQueryClient();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [mealType, setMealType] = useState<string | number | undefined>(1);
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
    const userSpoonData = useQuery<UserSpoonData>({
            queryKey: ['userSpoonData'],
            queryFn: fetchUserSpoonData,
            onSuccess: () => {
                queryClient.invalidateQueries('plannedMeals');
            }
        },
    );
    const {data} = userSpoonData;

    const dateToUnix = (date: Date | undefined) => {
        if(date){
            // change for GMT timezone
            date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
            return Math.floor(date.getTime() / 1000);
        }
        return undefined;
    }

    const addRecipe = async () => {
        return await toast.promise(axios.post(`https://api.spoonacular.com/mealplanner/${data?.username}/items?hash=${data?.hash}`, {
            date: dateToUnix(date),
            slot: mealType,
            position: 0,
            type: "RECIPE",
            value: {
                id: id,
                servings: servings,
                title: title,
                imageType: imageType,
            }
        },{
            params: {
                apiKey: apiKey,
            }
        }),{
            pending: 'Adding meal...',
            success: 'Succesfully added meal ! 👍',
            error: 'Something went wrong ! 😒',
        });
    }
    const addRecipeSubmit = useMutation({
        mutationFn: addRecipe,
    });
    const onSubmit = async () => {
        addRecipeSubmit.mutate();
    }

    return(
        <Dialog>
            <DialogTrigger className={"bg-green-700 hover:bg-green-800 hover:duration-300 p-2 rounded-md"}>
                <PlusCircle className={"text-white"}/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add recipe to your plan</DialogTitle>
                </DialogHeader>
                <DatePicker date={date} setDate={setDate} />
                <Select onValueChange={(value) => setMealType(value)} defaultValue={"1"}>
                    <SelectTrigger className="w-full mx-auto">
                        <SelectValue placeholder="Select a type of meal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Meal type</SelectLabel>
                            <SelectItem value="1">Breakfast</SelectItem>
                            <SelectItem value="2">Lunch</SelectItem>
                            <SelectItem value="3">Dinner</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogTrigger>
                    <Button className={"w-full mt-4"} onClick={onSubmit}>Add</Button>
                </DialogTrigger>
            </DialogContent>
        </Dialog>
    );
};

export default AddRecipeButton;