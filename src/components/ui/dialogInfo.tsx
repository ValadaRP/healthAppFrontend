import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {ArrowRightSquare, Info} from "lucide-react";
import {useQuery} from "react-query";
import axios from "axios";
import {Button} from "@/components/ui/button.tsx";

interface RecipeInfoResponse {
    title: string;
    summary: string;
    spoonacularSourceUrl: string;
}

const DialogInfo = ({recipeId} : {recipeId: number}) => {
    const apiKey = import.meta.env.VITE_SPOON_KEY;
    const fetchRecipeInfo = async (): Promise<RecipeInfoResponse> => {

        const res = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false`,{
            params: {
                apiKey: apiKey,
            },
        })
        return res.data;
    }

    const removeTags = (str: string) => {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace( /(<([^>]+)>|\$)/ig, '');
    }

    const {data} = useQuery({
        queryKey: ['recipeInfo', recipeId],
        queryFn: fetchRecipeInfo,
        // enabled: false,
    });

    function redirectToExternalWebsite(url: string | undefined) {
        window.open(url, '_blank');
    }

    return(
        <Dialog>
            <DialogTrigger className={"bg-blue-700 hover:bg-blue-800 hover:duration-300 p-2 rounded-md"}>
                    <Info className={"text-white"}/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{data?.title}</DialogTitle>
                    <DialogDescription>
                        {data ? <div>{removeTags(data.summary)}</div> : null}
                    </DialogDescription>
                    <Button variant={"default"} onClick={() => redirectToExternalWebsite(data?.spoonacularSourceUrl)}><ArrowRightSquare /></Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DialogInfo;