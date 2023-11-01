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


const MealsForm = () => {
    const form = useForm<z.infer<typeof mealsGenerateSchema>>({
        resolver: zodResolver(mealsGenerateSchema),
        defaultValues: {
            targetCalories: 2000,
            exclude: "",
            diet: "",
        },
    });

    function onSubmit(data: z.infer<typeof mealsGenerateSchema>) {
        console.log(data);
    }


    return(
        <div className={"p-4 w-1/2 mx-auto"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
                    <FormField
                        control={form.control}
                        name="targetCalories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Calories</FormLabel>
                                <FormControl>
                                    <Input placeholder="Calories" {...field} type={"number"}/>
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
                            <FormItem className={"flex flex-col items-center justify-center"}>
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
                    <Button type="submit" size={"lg"}>Submit</Button>
                </form>
            </Form>
        </div>
    )
};



export default MealsForm;