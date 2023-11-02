import {useForm} from "react-hook-form";
import {z} from "zod";
import {mealsGenerateSchema} from "@/models/Schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {ChevronsUpDown, Check} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command.tsx";
import {diets} from "@/models/Dietes.ts";
import axios from "axios";
import {useQuery} from "react-query";
import {toast} from "react-toastify";
import Meal from "@/components/ui/meal.tsx";

interface MealProps {
        meals:{
            id: number;
            imageType: string;
            title: string;
            readyInMinutes: number;
            servings: number;
            sourceUrl: string;
        }[],
        nutrients:{
            calories: number;
            protein: number;
            fat: number;
            carbohydrates: number;
        },
}

const MealsForm = () => {
    const apiKey = import.meta.env.VITE_SPOON_KEY;

    const form = useForm<z.infer<typeof mealsGenerateSchema>>({
        resolver: zodResolver(mealsGenerateSchema),
        defaultValues: {
            targetCalories: 2000,
            exclude: "",
            diet: "",
        },
    });

    const fetchSpoonMeals = async (): Promise<MealProps> => {
        const res = await toast.promise(axios.get(`https://api.spoonacular.com/mealplanner/generate`,{
            params: {
                timeFrame: "day",
                targetCalories: form.getValues("targetCalories"),
                diet: form.getValues("diet"),
                apiKey: apiKey,
            },
        }),{
            pending: 'Generating...',
            success: 'Success ! 😁',
            error: 'Something went wrong ! 😒',
        })
        return res.data;
    };

    const {data,refetch} = useQuery({
        queryKey: ['spoonMeals'],
        queryFn: fetchSpoonMeals,
        enabled: false,
    }) as {data: MealProps, refetch: () => void};

    function onSubmit() {
        refetch();
    }


    return(
        <div className={"w-full shadow-2xl rounded-md"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 p-4"}>
                    <FormField
                        control={form.control}
                        name="targetCalories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Calories</FormLabel>
                                <FormControl>
                                    <Input placeholder="Calories" {...field} type={"number"} onChange={event => field.onChange(parseInt(event.target.value))}/>
                                </FormControl>
                                <FormDescription>
                                    Your target Calories for the day.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="diet"
                        render={({ field }) => (
                            <FormItem className={"flex flex-col "}>
                                <FormLabel>Diet</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                role={"combobox"}
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? diets.find((diet) => diet.name === field.value)?.name : "Select a diet"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className={"w-[200px] p-0"}>
                                        <Command>
                                            <CommandInput placeholder={"Search your diet"} />
                                            <CommandEmpty>No diet found</CommandEmpty>
                                            <CommandGroup>
                                                {diets.map((diet) => (
                                                    <CommandItem
                                                        value={diet.name}
                                                        key={diet.name}
                                                        onSelect={() => {
                                                            form.setValue("diet", diet.name);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                diet.name === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {diet.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Based on this diet, you will get a most suitable meal plan.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="exclude"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Items you want exclude</FormLabel>
                                <FormControl>
                                    <Input placeholder="Excluded items" {...field} type={"text"}/>
                                </FormControl>
                                <FormDescription>
                                    Items you want to exclude from your meals.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size={"lg"}>Generate</Button>
                </form>
            </Form>
            <div>

                <Meal data={data} />
            </div>

        </div>
    )
};



export default MealsForm;