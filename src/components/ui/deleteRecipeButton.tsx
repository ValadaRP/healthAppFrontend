import {toast} from "react-toastify";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";
import {Button} from "@/components/ui/button.tsx";
import {XCircle} from "lucide-react";
import {format} from "date-fns";

const DeleteRecipeButton = ({username, hash, mealId, date} : {username: string | undefined, hash: string | undefined, mealId: number | undefined, date: Date | undefined}) => {
    const apiKey = import.meta.env.VITE_SPOON_KEY;
    const queryClient = useQueryClient();
    // @ts-ignore
    const queryKey = ['plannedMeals', format(date, "yyyy-MM-dd")];
    const deleteRecipeCall = async () => {
        return await toast.promise(axios.delete(`https://api.spoonacular.com/mealplanner/${username}/items/${mealId}`, {
            params: {
                apiKey: apiKey,
                hash: hash,
            },
        }), {
            pending: 'Deleting recipe...',
            success: 'Recipe deleted successfully ! 😁',
            error: 'Something went wrong ! 😒',
        });
    }
    const deleteRecipe = useMutation({
        mutationFn: deleteRecipeCall,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });

    function onSubmitDelete() {
        deleteRecipe.mutate();
    }

    return(
        <div className={"w-full flex justify-center"}>
            <Button variant={"default"} onClick={onSubmitDelete} className={"bg-red-600 hover:bg-red-700"}><XCircle /></Button>
        </div>
    )
}

export default DeleteRecipeButton;